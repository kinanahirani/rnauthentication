import React from 'react';
import {Colors} from '../theme/colors';
import CButton from '../components/CButton';
import CHeader from '../components/CHeader';
import {useRoute} from '@react-navigation/native';
import {StyleSheet, Text, View} from 'react-native';
import {moderateScale, verticalScale} from '../helpers/sizeHelpers';
import {BUTTON_TITLE, HEADER_TITLE, MESSAGES} from '../constants/messages';

const EmailVerificationScreen = ({navigation}) => {
  const route = useRoute();
  const {email} = route.params;

  return (
    <View style={styles.container}>
      <CHeader title={HEADER_TITLE.EMAIL_VERIFICATION} />
      <View style={styles.welcomeTxtContainer}>
        <Text style={styles.welcomeTxt}>
          {MESSAGES.VERIFICATION_EMAIL_SEND_FIRST}
          <Text style={styles.emailOrUsernameTxt}> {email} </Text>
          {MESSAGES.VERIFICATION_EMAIL_SEND_LAST}
        </Text>
        <CButton
          title={BUTTON_TITLE.CONTINUE}
          extraStyles={{width: '90%', marginTop: verticalScale(15)}}
          onPress={()=>navigation.replace('DashboardScreen',{email})}
        />
      </View>
    </View>
  );
};

export default EmailVerificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  welcomeTxtContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcomeTxt: {
    fontSize: moderateScale(16),
    padding: moderateScale(12),
    textAlign: 'center',
    textAlignVertical: 'center',
    color: Colors.BLACK,
  },
  emailOrUsernameTxt: {
    color: Colors.BLUE,
  },
});
