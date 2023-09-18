import React, {useState} from 'react';
import {Colors} from '../theme/colors';
import CButton from '../components/CButton';
import CTextInput from '../components/CTextInput';
import {moderateScale, verticalScale} from '../helpers/sizeHelpers';
import {View, Text, StyleSheet, ScrollView, SafeAreaView} from 'react-native';
import {
  MESSAGES,
  BUTTON_TITLE,
  TEXT_INPUT_PLACEHOLDER,
} from '../constants/messages';
import {validateEmail} from '../helpers/validationHelpers';

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const handleAuthentication = () => {
    const errors = {};

    if (!email) {
      errors.email = VALIDATION_MESSAGES.PLEASE_ENTER_EMAIL_ID;
    } else if (!validateEmail(email)) {
      errors.email = VALIDATION_MESSAGES.PLEASE_ENTER_VALID_EMAIL_ID;
    }

    setEmailError(errors);

    if (errors.email) {
      notifyMessage(errors.email);
    } else {
      notifyMessage(MESSAGES.EMAIL_SENT);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headingTxt}>{MESSAGES.FORGOT_PASSWORD}</Text>
      <Text style={styles.forgotPasswordSubTxt}>
        {MESSAGES.FORGOT_PASSWORD_SUBTITLE}
      </Text>
      <View style={styles.textInputContainer}>
        <CTextInput
          placeholder={TEXT_INPUT_PLACEHOLDER.EMAIL}
          onChangeText={text => setEmail(text)}
        />
      </View>
      <View style={styles.sendBtnContainer}>
        <CButton title={BUTTON_TITLE.SEND} onPress={handleAuthentication}/>
      </View>
    </SafeAreaView>
  );
};

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: moderateScale(20),
  },
  headingTxt: {
    fontSize: moderateScale(20),
    color: Colors.BLACK,
    marginTop: verticalScale(20),
  },
  textInputContainer: {
    marginTop: verticalScale(15),
  },
  forgotPasswordSubTxt: {
    fontSize: moderateScale(14),
    color: Colors.GRAY,
    marginVertical: verticalScale(15),
  },
  sendBtnContainer: {
    marginTop: verticalScale(30),
    marginBottom: verticalScale(20),
  },
});
