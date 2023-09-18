import React from 'react';
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

const ForgotPasswordScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headingTxt}>{MESSAGES.FORGOT_PASSWORD}</Text>
      <Text style={styles.forgotPasswordSubTxt}>
        {MESSAGES.FORGOT_PASSWORD_SUBTITLE}
      </Text>
      <View style={styles.textInputContainer}>
        <CTextInput placeholder={TEXT_INPUT_PLACEHOLDER.EMAIL} />
      </View>
      <View style={styles.sendBtnContainer}>
        <CButton title={BUTTON_TITLE.SEND} />
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
