import {
  DimensionValue,
  StyleSheet,
  Text,
  View,
  ViewProps,
} from 'react-native';
import { Row } from '../Row';
import { Col } from '../Col';

type Props = ViewProps & {
  margin?: DimensionValue;
};

export const Divider: React.FC<Props> = ({ children }) => {
  return (
    <Row style={{ marginVertical: 25 }}>
      <Col style={{ justifyContent: 'center' }}>
        <View style={styles.Container}>
          {children ? (
            <>
              <Col style={styles.Border} />
              <Col>
                <Text style={[{ ...styles.Content }, { textAlign: 'center' }]}>
                  {children}
                </Text>
              </Col>
              <Col style={styles.Border} />
            </>
          ) : (
            <View style={styles.Border} />
          )}
        </View>
      </Col>
    </Row>
  );
};

const styles = StyleSheet.create({
  Container: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  Border: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#dbdbdb',
    marginVertical: 0,
  },
  Content: {
    paddingVertical: 0,
    paddingHorizontal: 10,
    color: '#858585',
  },
});

export default Divider;

/**
 * .Container
    display: flex
    align-items: center
    width: 100%
    
.Border
    border-bottom: 1px solid $border-grey
    width: 100%
    margin: 1rem 0

.Content
    padding: 0 2rem
    color: $grey-03

 */
