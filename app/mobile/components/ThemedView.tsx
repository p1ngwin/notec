import { StyleSheet, View, type ViewProps } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  container?: boolean;
};

export function ThemedView({
  style,
  lightColor,
  darkColor,
  container,
  ...otherProps
}: ThemedViewProps) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    'background',
  );

  return (
    <View
      style={[{ backgroundColor }, container && styles.container, style]}
      {...otherProps}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    flexDirection: 'column',
    flexWrap: 'wrap',
    width: '100%',
    padding: 15,
  },
});
