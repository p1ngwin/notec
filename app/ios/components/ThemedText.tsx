import { Text, type TextProps, StyleSheet } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
  align?: 'left' | 'right' | 'center' | 'justify' | 'auto';
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = 'default',
  align = 'auto', // Default align to 'auto' to avoid undefined
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return (
    <Text
      style={[
        { color },
        type === 'default' && styles.default,
        type === 'title' && styles.title,
        type === 'defaultSemiBold' && styles.defaultSemiBold,
        type === 'subtitle' && styles.subtitle,
        type === 'link' && styles.link,
        align && { textAlign: align },
        { width: '100%' },
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
  },
  title: {
    fontSize: 32,
    fontWeight: 'normal',
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'light',
    color: '#858585',
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: 'black',
  },
});
