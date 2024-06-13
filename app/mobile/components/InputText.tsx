import Ionicons from '@expo/vector-icons/Ionicons';
import { KeyboardTypeOptions, StyleSheet, TextInput, View } from 'react-native';
import { Row } from './Row';
import { Col } from './Col';

type Props = {
  placeholder?: string;
  keyboardType?: KeyboardTypeOptions;
  icon?: keyof typeof Ionicons.glyphMap;
  isPasword?: boolean;
};

export default function InputText({
  placeholder,
  keyboardType = 'default',
  icon,
  isPasword,
}: Props) {
  return (
    <View style={styles.textView}>
      <Row style={{ justifyContent: 'center' }}>
        <Col size={icon ? 11 : 12}>
          <TextInput
            placeholder={placeholder}
            keyboardType={keyboardType}
            style={{ paddingVertical: 15, paddingHorizontal: 20 }}
            secureTextEntry={isPasword}
          />
        </Col>
        {icon && (
          <Col
            size={1}
            style={{ justifyContent: 'center', alignItems: 'center' }}
          >
            <Ionicons name={icon} />
          </Col>
        )}
      </Row>
    </View>
  );
}

const styles = StyleSheet.create({
  textView: {
    borderWidth: 1,
    borderRadius: 35,
    borderColor: '#dbdbdb',
  },
});
