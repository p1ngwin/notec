import React from 'react';
import { View, ViewProps, StyleSheet } from 'react-native';

export type ColProps = ViewProps & {
  size?: number;
  centered?: boolean;
};

export const Col: React.FC<ColProps> = ({
  style,
  size,
  children,
  centered,
  ...props
}) => {
  return (
    <View
      style={[
        styles.col,
        size ? { flexBasis: `${(size / 12) * 100}%` } : { flexBasis: 'auto' },
        style,
        centered && { justifyContent: 'center', alignItems: 'center' },
      ]}
      {...props}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  col: {
    flex: 1,
    paddingHorizontal: 8,
  },
});
