import ActionButton from '@/components/ActionButton';
import { Col } from '@/components/Col';
import InputText from '@/components/InputText';
import { Row } from '@/components/Row';
import { Divider } from '@/components/Divider';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Keyboard, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { i18n } from '@/i18n';

const Login = () => (
  <Pressable onPress={Keyboard.dismiss}>
    <ThemedView container>
      <Row>
        <Col centered style={{ marginTop: 50 }}>
          <Image
            source={require('@/assets/logo.svg')}
            style={{
              flexGrow: 1,
              width: '100%',
              minHeight: 200,
              maxWidth: 250,
            }}
          />
        </Col>
      </Row>
      <ThemedText align="center" type="title" style={{ marginBottom: 25 }}>
        Welcome
      </ThemedText>
      <ThemedText align="center" type="subtitle" style={{ marginBottom: 50 }}>
        {i18n.t('login.log_in_subtext')}
      </ThemedText>
      <Row margin={15}>
        <Col size={12}>
          <InputText
            placeholder={i18n.t('login.email_address')}
            icon="mail-outline"
          />
        </Col>
      </Row>
      <Row margin={15}>
        <Col size={12}>
          <InputText
            placeholder={i18n.t('login.password')}
            icon="lock-closed-outline"
            isPasword
          />
        </Col>
      </Row>
      <Row margin={25}>
        <Col>
          <ActionButton label={i18n.t('login.log_in')} isPrimary />
        </Col>
      </Row>
      <Divider>or</Divider>
      <Row>
        <Col>
          <ThemedText align="center" type="link">
            {i18n.t('login.no_account')}
          </ThemedText>
        </Col>
      </Row>
    </ThemedView>
  </Pressable>
);

export default Login;
