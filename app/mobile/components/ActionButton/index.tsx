import { Button as MuiButton } from '@mui/material';
import classNames from 'classnames';
import { Button, Pressable, StyleSheet, Text } from 'react-native';

type Props = {
  label: string;
  onClick?: () => void;
  isSecondary?: boolean;
  isPrimary?: boolean;
  icon?: SVGElement | null;
  isPlain?: boolean;
};

const ActionButton = ({
  label,
  onClick,
  isSecondary,
  isPrimary,
  isPlain,
}: Props) => {
  return (
    <Pressable
      onPress={onClick}
      style={({ pressed }) => [
        {
          ...styles.button,
          ...(pressed ? styles.primaryPressed : styles.primary),
        },
      ]}
    >
      {({ pressed }) => {
        return (
          <Text
            style={{ textAlign: 'center', color: pressed ? 'black' : 'white' }}
          >
            {label}
          </Text>
        );
      }}
    </Pressable>
  );
};

export default ActionButton;

const styles = StyleSheet.create({
  button: {
    fontSize: 16,
    paddingVertical: 18,
    paddingHorizontal: 24,
    fontWeight: 'bold',
    borderColor: '#000000',
    borderWidth: 1,
    borderRadius: 35,
  },
  primary: {
    backgroundColor: 'black',
    color: 'white',
  },
  primaryPressed: {
    backgroundColor: 'white',
    color: 'black',
  },
  secondary: {
    backgroundColor: '#ffffff',
    color: '#000000',
    borderColor: '#000000',
  },
  plain: {
    borderWidth: 0,
    color: '#000000',
    textTransform: 'none',
  },
});
