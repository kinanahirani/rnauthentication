import React, {useState} from 'react';
import {Colors} from '../theme/colors';
import CModal from '../components/CModal';
import CHeader from '../components/CHeader';
import {useRoute} from '@react-navigation/native';
import {StyleSheet, Text, View} from 'react-native';
import {moderateScale} from '../helpers/sizeHelpers';
import {HEADER_TITLE, MESSAGES} from '../constants/messages';

const DashboardScreen = ({navigation}) => {
  const route = useRoute();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  // const {emailOrUsername} = route.params;
const {email}=route.params

  return (
    <View style={styles.container}>
      <CHeader
        title={HEADER_TITLE.AUTHENTICATION_DEMO}
        visibleLogoutButton={true}
        onPress={() => setShowLogoutModal(true)}
      />
      <View style={styles.welcomeTxtContainer}>
        <Text style={styles.welcomeTxt}>
          {MESSAGES.WELCOME_MESSGE_FIRST}
          <Text style={styles.emailOrUsernameTxt}> {email} </Text>
          {MESSAGES.WELCOME_MESSGE_LAST}
        </Text>
      </View>
      {showLogoutModal && (
        <CModal
          navigation={navigation}
          onOutsidePress={() => setShowLogoutModal(false)}
          showLogoutModal={showLogoutModal}
        />
      )}
    </View>
  );
};

export default DashboardScreen;

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
