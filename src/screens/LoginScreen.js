import React, {useState} from 'react';
import {Colors} from '../theme/colors';
import CButton from '../components/CButton';
import CTextInput from '../components/CTextInput';
import {useNavigation} from '@react-navigation/native';
import {
  View,
  Text,
  StatusBar,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import {moderateScale, verticalScale} from '../helpers/sizeHelpers';
import {
  MESSAGES,
  BUTTON_TITLE,
  TEXT_INPUT_PLACEHOLDER,
  VALIDATION_MESSAGES,
} from '../constants/messages';
import {notifyMessage} from '../helpers/toastMessageHelpers';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [formFields, setFormFields] = useState({
    emailOrUsername: '',
    password: '',
  });
  const [formErrors, setFormErrors] = useState({});

  const handleAuthentication = () => {
    const errors = {};

    if (!formFields.emailOrUsername) {
      errors.emailOrUsername =
        VALIDATION_MESSAGES.PLEASE_ENTER_EMAIL_OR_USERNAME;
    }

    if (!formFields.password) {
      errors.password = VALIDATION_MESSAGES.PLEASE_ENTER_PASSWORD;
    }

    // Set the errors in the formError state
    setFormErrors(errors);

    // If there are errors, stop submitting the form
    // if (Object.keys(errors).length > 0) {
    //   Object.keys(errors).forEach(key => {
    //     notifyMessage(errors[key]);
    //   });
    //   return;
    // }

    if (errors.emailOrUsername) {
      notifyMessage(errors.emailOrUsername);
    } else if (errors.password) {
      notifyMessage(errors.password);
    }
  };
  return (
    <>
      <StatusBar backgroundColor={Colors.BLACK} />

      {/* <SafeAreaView style={styles.container}> */}
      <KeyboardAvoidingView style={styles.container} behavior="height">
        <ScrollView>
          <Text style={styles.headingTxt}>{MESSAGES.SIGN_IN}</Text>
          <View style={styles.textInputContainer}>
            <CTextInput
              placeholder={TEXT_INPUT_PLACEHOLDER.EMAIL_USERNAME}
              onChangeText={text =>
                setFormFields({...formFields, emailOrUsername: text})
              }
            />
            <CTextInput
              placeholder={TEXT_INPUT_PLACEHOLDER.PASSWORD}
              isPassword={true}
              onChangeText={text =>
                setFormFields({...formFields, password: text})
              }
            />
          </View>
          <TouchableOpacity
            style={styles.forgotPasswordBtn}
            onPress={() => navigation.navigate('ForgotPasswordScreen')}>
            <Text style={styles.forgotPasswordTxt}>
              {BUTTON_TITLE.FORGOT_PASSWORD_QUESTION_MARK}
            </Text>
          </TouchableOpacity>
          <View style={styles.signInBtnContainer}>
            <CButton
              title={BUTTON_TITLE.SIGN_IN}
              onPress={handleAuthentication}
            />
          </View>
          <Text style={styles.signUpMainTxt}>
            {MESSAGES.DONT_HAVE_ACCOUNT_YET}
            <Text
              onPress={() => navigation.navigate('SignUpScreen')}
              style={styles.signUpSubTxt}>
              {' '}
              {MESSAGES.SIGN_UP}
            </Text>
          </Text>
          <View style={styles.emptySpace} />
        </ScrollView>
      </KeyboardAvoidingView>

      <View style={styles.bottomViewContainer}>
        <Text style={styles.signUpMainTxt}>{MESSAGES.OR_SIGN_IN_WITH}</Text>
        <View style={styles.bottomContainer}>
          <CButton
            title={BUTTON_TITLE.FACEBOOK}
            extraStyles={styles.facebookBtn}
          />
          <CButton title={BUTTON_TITLE.GOOGLE} extraStyles={styles.googleBtn} />
        </View>
      </View>
      {/* </SafeAreaView> */}
    </>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: moderateScale(20),
    backgroundColor: Colors.WHITE,
  },
  headingTxt: {
    fontSize: moderateScale(20),
    color: Colors.BLACK,
    marginTop: verticalScale(20),
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
  },
  signUpSubTxt: {
    color: Colors.BLUE,
    textDecorationLine: 'underline',
    fontSize: moderateScale(14),
  },
  emptySpace: {
    height: verticalScale(120),
  },
  bottomViewContainer: {
    padding: moderateScale(20),
    backgroundColor: Colors.WHITE,
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
});
