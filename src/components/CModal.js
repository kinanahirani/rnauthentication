import {
  Text,
  View,
  Modal,
  Pressable,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {Colors} from '../theme/colors';
import {MESSAGES} from '../constants/messages';
import {
  moderateScale,
  verticalScale,
  horizontalScale,
} from '../helpers/sizeHelpers';

//Custom Modal
const CModal = ({navigation, onOutsidePress, showLogoutModal}) => {
  const handleLogout = async () => {
    onOutsidePress();
    setTimeout(() => {
      navigation.replace('LoginScreen');
    }, 500);
  };

  return (
    <>
      <StatusBar backgroundColor={Colors.BLACK} />
      <Modal
        animationType="fade"
        transparent={true}
        visible={showLogoutModal}
        onRequestClose={onOutsidePress}>
        <TouchableOpacity
          style={styles.centeredView}
          activeOpacity={1}
          onPress={onOutsidePress}>
          {/* <View style={styles.centeredView}> */}
          <View style={styles.modalView}>
            <Text style={styles.signOutTxt}>{MESSAGES.SIGN_OUT}</Text>
            <Text style={styles.modalText}>{MESSAGES.LOGOUT_CONFIRMATION}</Text>
            <Pressable style={styles.button} onPress={handleLogout}>
              <Text style={styles.textStyle}>OK</Text>
            </Pressable>
          </View>
          {/* </View> */}
        </TouchableOpacity>
      </Modal>
    </>
  );
};

export default CModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.LIGHT_BLACK,
  },
  modalView: {
    backgroundColor: Colors.WHITE,
    borderRadius: moderateScale(2),
    paddingTop: verticalScale(15),
    shadowColor: Colors.BLACK,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: moderateScale(4),
    elevation: 5,
    width: '88%',
    paddingTop: moderateScale(10),
    paddingLeft: moderateScale(20),
  },
  button: {
    width: horizontalScale(80),
    alignSelf: 'flex-end',
    marginTop: verticalScale(30),
  },
  textStyle: {
    color: Colors.BLACK,
    textAlign: 'center',
    fontWeight: '500',
    fontSize: moderateScale(14),
    padding: 20,
  },
  modalText: {
    marginTop: 10,
    fontSize: moderateScale(16),
    color: Colors.BLACK,
  },
  signOutTxt: {
    marginTop: 5,
    fontSize: moderateScale(18),
    color: Colors.BLACK,
    fontWeight: '500',
  },
});
