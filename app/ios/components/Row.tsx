import React from 'react';
import { View, ViewProps, StyleSheet, DimensionValue } from 'react-native';

export type RowProps = ViewProps & {
  noGutters?: boolean;
  margin?: DimensionValue;
};

export const Row: React.FC<RowProps> = ({
  style,
  children,
  noGutters,
  margin,
  ...props
}) => {
  return (
    <View
      style={[styles.row, noGutters && styles.noGutters, style, { margin }]}
      {...props}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -8,
    display: 'flex',
  },
  noGutters: {
    marginHorizontal: 0,
  },
});
