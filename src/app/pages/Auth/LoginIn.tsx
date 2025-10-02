import { useEffect, useRef, useState } from 'react';
import { Keyboard, KeyboardAvoidingView, ScrollView, TouchableOpacity, View } from 'react-native';
import { Input, Button, Text, CheckBox, useTheme } from '@rneui/themed';
import { globalStyles } from 'styles';
import { loginStyles } from './styles';
import { CommonActions, useNavigation, useRoute } from '@react-navigation/native';
import { showAlert } from 'services/AlertService';
import { LoginStatusCodes, useAuth } from 'contexts/Auth';
import { useDomainContext } from 'contexts/DomainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useGlobalContext } from 'contexts/GlobalContext';
import { horizontalResponsive, verticalResponsive } from 'utils/responsivenessControlFunction';
import { ReCaptcha } from 'components/Recaptcha';
import { ROUTES } from 'constants/routes';

import { useTranslation } from 'react-i18next';

/**
 *
 * @returns SignIn Screen
 */
export const SignInScreen = () => {
  const [loading, setLoader] = useState(false); //sets loader on login button
  const [email, setEmail] = useState(''); // email input
  const [password, setPassword] = useState(''); // password input
  const [emailErr, setEmailErr] = useState(false); //email Err
  const [tfa_code, settfa_code] = useState<string | boolean>(false); // tfa input
  const [passwordErr, setPasswordErr] = useState(false); //password Err
  const [showPassword, setShowPassword] = useState(false); // boolean for password eye icon
  const [trustedDevice, settrustedDevice] = useState(false); // trusted device checkbox
  const toggleTrustedDevice = () => settrustedDevice(!trustedDevice); //toggles trusted device checkbox
  const auth = useAuth(); // auth contex
  const {
    domainSelectionEnabled,
    tfaEnabled,
    setDomainSelection,
    setTfaEnabled,
    setAuthData,
    saveAuth,
  } = useAuth();
  const { updateDomain, domainList } = useDomainContext();
  const {
    signInDisabled,
    setSignInDisabled,
    reCaptchaKeys,
    setCaptchaTokens,
    isCaptchaVisible,
    setCaptchaVisible,
  } = useGlobalContext();
  const navigation = useNavigation();
  const route = useRoute();
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [keyboardStatus, setKeyboardStatus] = useState(false);

  const { theme } = useTheme();
  const { isAppDeprecated } = useGlobalContext();

  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPwdFocused] = useState(false);

  const emailInput = useRef();
  const pwdInput = useRef();

  const { t } = useTranslation();

  const resetLoginForm = () => {
    setEmail('');
    setPassword('');
    if (emailInput.current) {
      emailInput.current.blur();
    }
    if (pwdInput.current) {
      pwdInput.current.blur();
    }
    setEmailFocused(false);
    setPwdFocused(false);
  };

  const validateLogin = () => {
    const isEmailValid = email !== '';
    const isPasswordValid = password !== '';
    isEmailValid ? setEmailErr(false) : setEmailErr(true);
    isPasswordValid ? setPasswordErr(false) : setPasswordErr(true);
    return isEmailValid && isPasswordValid;
  };

  const processResponse = (response: any) => {
    if (response.code === LoginStatusCodes.Locked) {
      setDomainSelection(false);
      setTfaEnabled(true);
      navigation.setParams({ enableBack: true });
    }
    if (response.code === LoginStatusCodes.TooManyRequests) {
      showAlert(response?.message, [
        {
          text: t('Ok'),
          onPress: () => {
            CommonActions.reset({
              index: 0,
              routes: [{ name: ROUTES.AUTH_STACK.LOGIN }],
            });
            resetLoginForm();
            setSignInDisabled(true);
            setCaptchaTokens([]);
          },
        },
      ]);
    }
    if (response.code === LoginStatusCodes.BadRequest) {
      showAlert(t('Login_Failed'), [
        {
          text: t('Ok'),
          onPress: () => {
            CommonActions.reset({
              index: 0,
              routes: [{ name: ROUTES.AUTH_STACK.LOGIN }],
            });
            resetLoginForm();
            setCaptchaTokens([]);
          },
        },
      ]);
    }
    if (response.code === LoginStatusCodes.Locked && tfaEnabled) {
      showAlert(t('Two_Factor_Authentication_Error'), [
        {
          text: t('Ok'),
          onPress: () => {
            setCaptchaTokens([]);
          },
        },
      ]);
    }
    if (response.id) {
      saveAuth(response);
    }
  };

  const processUserExistence = (loginsResponse: any) => {
    //user does not exist in any
    if (loginsResponse === null) {
      showAlert(t('Login_Failed'), [
        {
          text: t('Ok'),
          onPress: () => {
            resetLoginForm();
            setCaptchaTokens([]);
          },
        },
      ]);
      setAuthData(undefined);
      return;
    }
    //user exists in more than 1 server
    else if (loginsResponse.length > 1) {
      setDomainSelection(true);
      navigation.setParams({ enableBack: true });
      return;
    }
    //cooldown enabled on both servers
    else if (loginsResponse.code === LoginStatusCodes.TooManyRequests) {
      showAlert(loginsResponse?.message, [
        {
          text: t('Ok'),
          onPress: () => {
            CommonActions.reset({
              index: 0,
              routes: [{ name: ROUTES.AUTH_STACK.LOGIN }],
            });
            resetLoginForm();
            setSignInDisabled(true);
            setCaptchaTokens([]);
          },
        },
      ]);
      return;
    }

    //user in one server with tfa enabled
    else if (loginsResponse.code === LoginStatusCodes.Locked) {
      setTfaEnabled(true);
      navigation.setParams({ enableBack: true });
      return;
    }
    //user exixts in one of the server
    else {
      const _domain = domainList.find(
        (d) => d.url === `${loginsResponse.protocol}${loginsResponse.url}`
      );
      updateDomain(_domain);
      AsyncStorage.setItem('domain', _domain.url);
      if (loginsResponse?.id) {
        saveAuth(loginsResponse);
      }
    }
  };

  /**
   *
   * ? checks the username/email, password and calls auth.signIn
   */
  const signIn = async () => {
    const isFormValid = validateLogin();
    if (!isFormValid) return;
    setLoader(true);
    const response = await auth.getUserExistence(email, password, reCaptchaKeys.ACTION_KEY);
    processUserExistence(response);
    setLoader(false);
  };

  const resumeSignIn = async () => {
    const response = await auth.signIn(
      email,
      password,
      tfa_code,
      reCaptchaKeys.ACTION_KEY,
      trustedDevice
    );
    processResponse(response);
  };

  /**
   *
   * @returns domains component
   */
  const chooseDomains = () => {
    const domainUpdate = (domain: any) => {
      updateDomain(domain);
      AsyncStorage.setItem('domain', domain.url);
    };

    return (
      <View style={[]}>
        <Text style={{ color: theme.colors.background }}>{t('Account_Selection_Detail')}</Text>
        {domainList.map((d, i) => {
          return (
            <CheckBox
              checked={selectedIndex == i}
              containerStyle={{
                backgroundColor: '#fff',
                borderRadius: horizontalResponsive(12),
                paddingHorizontal: horizontalResponsive(16),
                paddingVertical: verticalResponsive(16),
                marginVertical: verticalResponsive(18),
              }}
              title={d.buttonName}
              textStyle={{
                color: theme.colors.background,
                fontSize: 18,
                fontStyle: 'normal',
                fontWeight: '500',
                paddingLeft: horizontalResponsive(16),
              }}
              checkedIcon="check-circle"
              uncheckedIcon="circle"
              onPress={() => {
                setSelectedIndex(i);
                domainUpdate(d);
              }}
              key={i}
            />
          );
        })}
        <View>
          <Button
            title={t('Continue')}
            onPress={resumeSignIn}
            titleStyle={{ color: theme.colors?.formLabel }}
            color={selectedIndex !== null ? theme.colors.brandColor : theme.colors.borderColor}
            buttonStyle={[
              { borderWidth: 0 },
              tfaEnabled ? globalStyles.marginLeft10 : globalStyles.margin0,
            ]}
            loading={loading}
            loadingProps={{ color: theme.colors.background }}
            disabled={selectedIndex !== null ? false : true}
          />
        </View>
      </View>
    );
  };

  /**
   *
   * @returns login form
   */
  const loginForm = () => {
    return (
      <>
        <Input
          autoComplete="off"
          placeholder={emailFocused ? '' : t('Enter_Email_Address')}
          onChangeText={(email) => {
            setEmailFocused(false);
            setEmail(email);
          }}
          onFocus={() => {
            setEmailFocused(true);
            setEmailErr(false);
          }}
          onBlur={() => setEmailFocused(false)}
          inputContainerStyle={[loginStyles.inputBox, globalStyles.br8, globalStyles.paddingHorz10]}
          inputStyle={[{ color: theme.colors.background }, globalStyles.padding10]}
          containerStyle={globalStyles.paddingHorz0}
          errorStyle={{ color: 'red' }}
          errorMessage={emailErr ? t('Required') : ''}
          value={email}
          ref={emailInput}
        />
        <Input
          autoComplete="off"
          placeholder={passwordFocused ? '' : t('Enter_Password')}
          inputStyle={[{ color: theme.colors.background }, globalStyles.padding10]}
          secureTextEntry={!showPassword ? true : false}
          clearTextOnFocus={false}
          inputContainerStyle={[loginStyles.inputBox, globalStyles.br8, globalStyles.paddingHorz10]}
          containerStyle={globalStyles.paddingHorz0}
          onFocus={() => {
            setPwdFocused(true);
            if (email === '') {
              setEmailErr(true);
            }
            setPasswordErr(false);
          }}
          onBlur={() => setPwdFocused(false)}
          rightIcon={{
            type: 'feather',
            onPress: () => {
              setShowPassword(!showPassword);
            },
            iconProps: { name: showPassword ? 'eye' : 'eye-off', size: 16 },
          }}
          onChangeText={(password) => {
            setPassword(password);
          }}
          errorStyle={{ color: 'red' }}
          errorMessage={passwordErr ? t('Required') : ''}
          value={password}
          ref={pwdInput}
        />
        <View>
          <Button
            title={t('Sign_In')}
            onPress={signIn}
            titleStyle={{ color: theme.colors?.formLabel }}
            color={theme.colors.borderColor}
            buttonStyle={[
              { borderWidth: 0 },
              tfaEnabled ? globalStyles.marginLeft10 : globalStyles.margin0,
            ]}
            loading={loading}
            loadingProps={{ color: theme.colors.background }}
            disabled={signInDisabled || loading ? true : false}
          />
        </View>
      </>
    );
  };

  /**
   *
   * @returns tfa form
   */

  const tfaForm = () => {
    return (
      <>
        <Input
          keyboardType="numeric"
          placeholder={t('Enter_Passcode')}
          onChangeText={(tfa_code) => settfa_code(tfa_code)}
          inputStyle={[{ color: theme.colors.background }, globalStyles.padding10]}
          inputContainerStyle={[loginStyles.inputBox, globalStyles.br8, globalStyles.paddingHorz10]}
          containerStyle={globalStyles.paddingHorz0}
        />
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(ROUTES.AUTH_STACK.LOST2FA);
          }}
        >
          <Text style={[globalStyles.textRight, { color: theme.colors?.background }]}>
            {t('Lost_Your_Key')}
          </Text>
        </TouchableOpacity>
        <CheckBox
          checked={trustedDevice}
          title={t('Dont_Ask_Me_Again_On_This_Device')}
          onPress={toggleTrustedDevice}
          containerStyle={{ backgroundColor: 'transparent' }}
        />
        <View>
          <Button
            title={t('Sign_In')}
            onPress={resumeSignIn}
            titleStyle={{ color: theme.colors?.formLabel }}
            color={theme.colors.borderColor}
            buttonStyle={[
              { borderWidth: 0 },
              tfaEnabled ? globalStyles.marginLeft10 : globalStyles.margin0,
            ]}
            loading={loading}
            loadingProps={{ color: theme.colors.background }}
            disabled={signInDisabled ? true : false}
          />
        </View>
      </>
    );
  };

  useEffect(() => {
    //keyboard events to fix forgot password on keyboard show n hide
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardStatus(true);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardStatus(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  useEffect(() => {
    if (route.params === undefined) {
      setTfaEnabled(false);
      setDomainSelection(false);
      setSelectedIndex(null);
      resetLoginForm();
      setCaptchaTokens([]);
    }
  }, [route.params]);

  useEffect(() => {
    if (password.length > 2 && password.length <= 5) {
      if (!isCaptchaVisible) {
        setCaptchaTokens([]);
        setCaptchaVisible(true);
      }
    }
  }, [password]);

  return (
    <>
      <ReCaptcha />
      <ScrollView
        contentContainerStyle={[
          globalStyles.container,
          { backgroundColor: 'transparent', height: '100%' },
        ]}
        keyboardShouldPersistTaps="always"
      >
        <KeyboardAvoidingView
          behavior="padding"
          style={[globalStyles.flex1, globalStyles.flexGrow]}
        >
          <View
            style={[
              globalStyles.alignItemsCenter,
              globalStyles.flex1,
              globalStyles.flexGrow,
              globalStyles.h100,
            ]}
            pointerEvents={isAppDeprecated ? 'none' : 'auto'}
          >
            <View style={[globalStyles.flex1]}>
              <View style={[globalStyles.w100]}>
                {!tfaEnabled && !domainSelectionEnabled && loginForm()}
                {tfaEnabled && tfaForm()}
                {domainSelectionEnabled && chooseDomains()}
              </View>

              {/* app deprecated section */}
              <View style={[globalStyles.marginTop20]}>
                {isAppDeprecated ? (
                  <>
                    <Text style={{ color: theme.colors.error, textAlign: 'center' }}>
                      {t('Version_Support_Error')}
                    </Text>
                  </>
                ) : (
                  <></>
                )}
              </View>

              {/* forgot password btn */}
              <View
                style={
                  !keyboardStatus
                    ? [
                        globalStyles.flex1,
                        globalStyles.flexGrow,
                        globalStyles.justifyEnd,
                        globalStyles.paddinVert10,
                      ]
                    : [globalStyles.paddinVert10]
                }
              >
                {tfaEnabled || domainSelectionEnabled ? null : (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate(ROUTES.AUTH_STACK.FORGOT_PASSWORD);
                    }}
                    style={[globalStyles.alignItemsCenter]}
                  >
                    <Text style={[globalStyles.textUnderline, { color: theme.colors.white }]}>
                      {t('Forgot_Password')}?
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </>
  );
};
