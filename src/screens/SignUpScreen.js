import React, {useState} from 'react';
import {Colors} from '../theme/colors';
import CButton from '../components/CButton';
import CTextInput from '../components/CTextInput';
import {
  View,
  Text,
  Image,
  Alert,
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
} from '../constants/messages';
import {notifyMessage} from '../helpers/toastMessageHelpers';

const SignUpScreen = ({navigation}) => {
  const [checkboxIsSelected, setCheckboxIsSelected] = useState(false);
  const [formFields, setFormFields] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [formErrors, setFormErrors] = useState({});

  const toggleCheckBox = () => {
    console.log(checkboxIsSelected);
    setCheckboxIsSelected(!checkboxIsSelected);
  };

  const validatePassword = password => {
    // Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one digit
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return passwordPattern.test(password);
  };

  // Helper function for email validation
  const validateEmail = email => {
    // Simple email validation regex pattern
    const emailPattern = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    return emailPattern.test(email);
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
    } else if (!validatePassword(formFields.password)) {
      errors.password = VALIDATION_MESSAGES.INVALID_EMAIL;
    }

    if (!formFields.confirmPassword) {
      errors.confirmPassword =
        VALIDATION_MESSAGES.PLEASE_ENTER_CONFIRM_PASSWORD;
    } else if (formFields.confirmPassword !== formFields.password) {
      errors.confirmPassword =
        VALIDATION_MESSAGES.CONFIRM_PASSWORD_SHOULD_MATCH_WITH_PASSWORD;
    }

    if (!formFields.checkboxIsSelected) {
      errors.checkboxIsSelected =
        VALIDATION_MESSAGES.PLEASE_SELECT_TERMS_AND_CONDITIONS;
    }
    // Set the errors in the formError state
    setFormErrors(errors);

    // If there are errors, stop submitting the form
    if (Object.keys(errors).length > 0) {
      Object.keys(errors).forEach(key => {
        notifyMessage(errors[key]);
      });
      return;
    }
  };

  return (
    <>
      <StatusBar backgroundColor={Colors.BLACK} />
      {/* <SafeAreaView style={styles.container}> */}
      <KeyboardAvoidingView style={styles.container} behavior="height">
        <ScrollView>
          <Text style={styles.headingTxt}>{MESSAGES.SIGN_UP}</Text>
          <View style={styles.textInputContainer}>
            <CTextInput
              placeholder={TEXT_INPUT_PLACEHOLDER.NAME}
              onChangeText={text => setFormFields({...formFields, name: text})}
            />
            <CTextInput
              placeholder={TEXT_INPUT_PLACEHOLDER.EMAIL}
              onChangeText={text => setFormFields({...formFields, email: text})}
            />
            <CTextInput
              placeholder={TEXT_INPUT_PLACEHOLDER.PASSWORD}
              isPassword={true}
              onChangeText={text =>
                setFormFields({...formFields, password: text})
              }
            />
            <CTextInput
              placeholder={TEXT_INPUT_PLACEHOLDER.CONFIRM_PASSWORD}
              isPassword={true}
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
                onPress={() => navigation.navigate('SignUpScreen')}
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

export default SignUpScreen;

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
    width: horizontalScale(20),
    height: verticalScale(20),
  },
  emptySpace: {
    height: verticalScale(120),
  },
  bottomViewContainer: {
    padding: moderateScale(20),
    backgroundColor: Colors.WHITE,
  },
});
