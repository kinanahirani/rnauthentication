import React, {useState} from 'react';
import {
  verticalScale,
  moderateScale,
  horizontalScale,
} from '../helpers/sizeHelpers';
import {Colors} from '../theme/colors';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';

//Custom Header
const CHeader = ({title, visibleLogoutButton, onPress, backButton}) => {
  const [showLogoutButton, setShowLogoutButton] = useState(visibleLogoutButton);
  const [showBackButton, setShowBackButton] = useState(backButton);
  return (
    <View style={styles.headerContainer}>
      <View style={{width: '15%', alignItems: 'center'}}>
        {showBackButton && (
          <TouchableOpacity onPress={onPress}>
            <Image
              source={require('../assets/images/back.png')}
              style={styles.backBtn}
            />
          </TouchableOpacity>
        )}
      </View>
      <View style={{width: '70%', alignItems: 'center'}}>
        <Text style={styles.titleTxt}>{title}</Text>
      </View>
      <View
        style={{
          width: '15%',
          alignItems: 'center',
        }}>
        {showLogoutButton && (
          <TouchableOpacity onPress={onPress}>
            <Image
              source={require('../assets/images/logout.png')}
              style={styles.logoutBtn}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default CHeader;

const styles = StyleSheet.create({
  headerContainer: {
    height: verticalScale(50),
    backgroundColor: Colors.WHITE,
    alignItems: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
    width: '100%',
  },
  titleTxt: {
    color: Colors.BLACK,
    // marginLeft: 'auto',
    // marginRight: 'auto',
    // alignSelf:'center',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: moderateScale(18),
  },
  logoutBtn: {
    height: verticalScale(18),
    width: horizontalScale(18),
    // marginRight: horizontalScale(20),
    padding: moderateScale(10),
    // backgroundColor: 'yellow',
  },
  backBtn: {
    height: verticalScale(18),
    width: horizontalScale(18),
    // marginLeft: horizontalScale(15),
    padding: moderateScale(10),
  },
});
