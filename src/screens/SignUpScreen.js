import {Colors} from '../theme/colors';
import CButton from '../components/CButton';
import React, {useState, useEffect} from 'react';
import CTextInput from '../components/CTextInput';
import {
  View,
  Text,
  Image,
  Alert,
  Linking,
  Platform,
  StatusBar,
  ScrollView,
  StyleSheet,
  ToastAndroid,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import {
  moderateScale,
  verticalScale,
  horizontalScale,
} from '../helpers/sizeHelpers';
import {
  MESSAGES,
  BUTTON_TITLE,
  TEXT_INPUT_PLACEHOLDER,
  VALIDATION_MESSAGES,
  GOOGLE_AUTH,
} from '../constants/messages';
import {useRoute} from '@react-navigation/native';
import {validateEmail} from '../helpers/validationHelpers';
import {notifyMessage} from '../helpers/toastMessageHelpers';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {
  handleFacebookSignIn,
  handleGoogleSignIn,
} from '../helpers/loginHelpers';
import CHeader from '../components/CHeader';

GoogleSignin.configure({
  webClientId: GOOGLE_AUTH.RELEASE_BUILD_CLIENT_ID,
});

const SignUpScreen = ({navigation}) => {
  const [checkboxIsSelected, setCheckboxIsSelected] = useState(false);
  const [formFields, setFormFields] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [isUserAvailedSocialLogin, setIsUserAvailedSocialLogin] =
    useState(false);
  const [userDataFromSocialLogin, setUserDataFromSocialLogin] = useState({});
  const route = useRoute();

  useEffect(() => {
    GoogleSignin.configure();
  }, []);

  useEffect(() => {
    if (route.params && route.params.data) {
      setIsUserAvailedSocialLogin(true);
      setUserDataFromSocialLogin(route.params.data);
    } else {
      setIsUserAvailedSocialLogin(false);
    }
  }, [route.params]);

  const toggleCheckBox = () => {
    console.log(!checkboxIsSelected);
    setCheckboxIsSelected(!checkboxIsSelected);
  };

  const handleAuthentication = () => {
    const errors = {};
    if (!formFields.name) {
      errors.name = VALIDATION_MESSAGES.PLEASE_ENTER_NAME;
    }

    if (!formFields.email) {
      errors.email = VALIDATION_MESSAGES.PLEASE_ENTER_EMAIL_ID;
    } else if (!validateEmail(formFields.email)) {
      errors.email = VALIDATION_MESSAGES.PLEASE_ENTER_VALID_EMAIL_ID;
    }

    if (!formFields.password) {
      errors.password = VALIDATION_MESSAGES.PLEASE_ENTER_PASSWORD;
    }

    if (!formFields.confirmPassword) {
      errors.confirmPassword =
        VALIDATION_MESSAGES.PLEASE_ENTER_CONFIRM_PASSWORD;
    } else if (formFields.confirmPassword !== formFields.password) {
      errors.confirmPassword =
        VALIDATION_MESSAGES.CONFIRM_PASSWORD_SHOULD_MATCH_WITH_PASSWORD;
    }

    if (!checkboxIsSelected) {
      errors.checkboxIsSelected =
        VALIDATION_MESSAGES.PLEASE_SELECT_TERMS_AND_CONDITIONS;
    }

    if (errors.name) {
      notifyMessage(errors.name);
    } else if (errors.email) {
      notifyMessage(errors.email);
    } else if (errors.password) {
      notifyMessage(errors.password);
    } else if (errors.confirmPassword) {
      notifyMessage(errors.confirmPassword);
    } else if (errors.checkboxIsSelected) {
      notifyMessage(errors.checkboxIsSelected);
    } else {
      navigation.navigate('EmailVerificationScreen', {
        email: formFields.email,
      });
      setFormFields({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
      });
      setCheckboxIsSelected(false);
    }
  };

  const handleSocialLogin = () => {
    const errors = {};
    if (!userDataFromSocialLogin.name) {
      errors.name = VALIDATION_MESSAGES.PLEASE_ENTER_NAME;
    }

    if (!checkboxIsSelected) {
      errors.checkboxIsSelected =
        VALIDATION_MESSAGES.PLEASE_SELECT_TERMS_AND_CONDITIONS;
    }

    if (errors.name) {
      notifyMessage(errors.name);
    } else if (errors.email) {
      notifyMessage(errors.email);
    } else if (errors.checkboxIsSelected) {
      notifyMessage(errors.checkboxIsSelected);
    } else {
      navigation.navigate('EmailVerificationScreen', {
        email: userDataFromSocialLogin.email,
      });
    }
  };

  return (
    <>
      <StatusBar backgroundColor={Colors.BLACK} />
      <SafeAreaView style={{flexGrow: 1, backgroundColor: Colors.WHITE}}>
        <CHeader backButton={true} onPress={() => navigation.goBack()} />
        <KeyboardAvoidingView style={styles.container} behavior="height">
          {isUserAvailedSocialLogin ? (
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.headingTxt}>{MESSAGES.COMPLETE_PROFILE}</Text>
              <View style={styles.textInputContainer}>
                <CTextInput
                  placeholder={TEXT_INPUT_PLACEHOLDER.ID}
                  editable={false}
                  value={userDataFromSocialLogin.id}
                />
                <CTextInput
                  placeholder={TEXT_INPUT_PLACEHOLDER.NAME}
                  value={userDataFromSocialLogin.name}
                  onChangeText={text =>
                    setUserDataFromSocialLogin({
                      ...userDataFromSocialLogin,
                      name: text,
                    })
                  }
                />
                <CTextInput
                  placeholder={TEXT_INPUT_PLACEHOLDER.EMAIL}
                  editable={false}
                  value={userDataFromSocialLogin.email}
                />
              </View>

              <View style={styles.termsAndConditionsContainer}>
                <TouchableOpacity
                  onPress={toggleCheckBox}
                  style={styles.checkBoxBtn}>
                  <Image
                    source={
                      checkboxIsSelected
                        ? require('../assets/images/checkbox-on.png')
                        : require('../assets/images/checkbox-off.png')
                    }
                    style={styles.checkBoxImg}
                  />
                </TouchableOpacity>

                <Text style={styles.signUpMainTxt}>
                  {MESSAGES.I_AGREE_TERMS_AND_CONDITIONS}
                  <Text
                    onPress={() => {
                      Linking.openURL('https://www.google.com'); // Open google.com when "Terms & Conditions" is pressed
                    }}
                    style={styles.signUpSubTxt}>
                    {' '}
                    {BUTTON_TITLE.TERMS_CONDITIONS}
                  </Text>
                </Text>
              </View>
              <View style={styles.signInBtnContainer}>
                <CButton
                  title={BUTTON_TITLE.PROCEED}
                  onPress={handleSocialLogin}
                />
              </View>
              <View style={styles.emptySpace} />
            </ScrollView>
          ) : (
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.headingTxt}>{MESSAGES.SIGN_UP}</Text>
              <View style={styles.textInputContainer}>
                <CTextInput
                  placeholder={TEXT_INPUT_PLACEHOLDER.NAME}
                  value={formFields.name}
                  onChangeText={text =>
                    setFormFields({...formFields, name: text})
                  }
                />
                <CTextInput
                  placeholder={TEXT_INPUT_PLACEHOLDER.EMAIL}
                  value={formFields.email}
                  onChangeText={text =>
                    setFormFields({...formFields, email: text})
                  }
                />
                <CTextInput
                  placeholder={TEXT_INPUT_PLACEHOLDER.PASSWORD}
                  value={formFields.password}
                  isPassword={true}
                  onChangeText={text =>
                    setFormFields({...formFields, password: text})
                  }
                />
                <CTextInput
                  placeholder={TEXT_INPUT_PLACEHOLDER.CONFIRM_PASSWORD}
                  isPassword={true}
                  value={formFields.confirmPassword}
                  onChangeText={text =>
                    setFormFields({...formFields, confirmPassword: text})
                  }
                />
              </View>

              <View style={styles.termsAndConditionsContainer}>
                <TouchableOpacity
                  onPress={toggleCheckBox}
                  style={styles.checkBoxBtn}>
                  <Image
                    source={
                      checkboxIsSelected
                        ? require('../assets/images/checkbox-on.png')
                        : require('../assets/images/checkbox-off.png')
                    }
                    style={styles.checkBoxImg}
                  />
                </TouchableOpacity>

                <Text style={styles.signUpMainTxt}>
                  {MESSAGES.I_AGREE_TERMS_AND_CONDITIONS}
                  <Text
                    onPress={() => {
                      Linking.openURL('https://www.google.com'); // Open google.com when "Terms & Conditions" is pressed
                    }}
                    style={styles.signUpSubTxt}>
                    {' '}
                    {BUTTON_TITLE.TERMS_CONDITIONS}
                  </Text>
                </Text>
              </View>
              <View style={styles.signInBtnContainer}>
                <CButton
                  title={BUTTON_TITLE.SIGN_UP}
                  onPress={handleAuthentication}
                />
              </View>
              <View style={styles.emptySpace} />
            </ScrollView>
          )}
        </KeyboardAvoidingView>
      </SafeAreaView>

      {!isUserAvailedSocialLogin && (
        <View style={styles.bottomViewContainer}>
          <Text style={styles.signUpMainTxt}>{MESSAGES.OR_SIGN_IN_WITH}</Text>
          <View style={styles.bottomContainer}>
            <CButton
              title={BUTTON_TITLE.FACEBOOK}
              extraStyles={styles.facebookBtn}
              onPress={() => handleFacebookSignIn({navigation})}
            />
            <CButton
              title={BUTTON_TITLE.GOOGLE}
              extraStyles={styles.googleBtn}
              onPress={() => handleGoogleSignIn({navigation})}
            />
          </View>
        </View>
      )}
    </>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    // flexGrow: 1,
    // backgroundColor: Colors.WHITE,
    padding: moderateScale(20),
  },
  headingTxt: {
    fontSize: moderateScale(20),
    color: Colors.BLACK,
    // marginTop: verticalScale(45),
  },
  textInputContainer: {
    marginTop: verticalScale(15),
  },
  forgotPasswordBtn: {
    alignSelf: 'flex-end',
  },
  forgotPasswordTxt: {
    fontSize: moderateScale(14),
    color: Colors.BLACK,
  },
  signInBtnContainer: {
    marginTop: verticalScale(30),
    marginBottom: verticalScale(20),
  },
  signUpMainTxt: {
    alignSelf: 'center',
    fontSize: moderateScale(14),
    color: Colors.BLACK,
    marginLeft: horizontalScale(10),
  },
  signUpSubTxt: {
    color: Colors.BLUE,
    textDecorationLine: 'underline',
    fontSize: moderateScale(14),
  },
  bottomContainer: {
    flexDirection: 'row',
    marginTop: verticalScale(15),
    justifyContent: 'space-between',
  },
  facebookBtn: {
    width: '48%',
    backgroundColor: Colors.DENIM_BLUE,
  },
  googleBtn: {
    width: '48%',
    backgroundColor: Colors.PALE_RED,
  },
  termsAndConditionsContainer: {
    flexDirection: 'row',
  },
  checkBoxBtn: {
    marginLeft: horizontalScale(10),
  },
  checkBoxImg: {
    width: horizontalScale(24),
    height: verticalScale(24),
  },
  emptySpace: {
    height: verticalScale(120),
  },
  bottomViewContainer: {
    padding: moderateScale(20),
    backgroundColor: Colors.WHITE,
  },
});
