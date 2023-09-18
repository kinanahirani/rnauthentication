import React, {useState} from 'react';
import {
  verticalScale,
  moderateScale,
  horizontalScale,
} from '../helpers/sizeHelpers';
import {Colors} from '../theme/colors';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';

const CHeader = ({title, visibleLogoutButton, onPress}) => {
  const [showLogoutButton, setShowLogoutButton] = useState(visibleLogoutButton);
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.titleTxt}>{title}</Text>
      {showLogoutButton && (
        <TouchableOpacity onPress={onPress}>
          <Image
            source={require('../assets/images/logout.png')}
            style={styles.logoutBtn}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default CHeader;

const styles = StyleSheet.create({
  headerContainer: {
    height: verticalScale(50),
    alignItems: 'center',
    flexDirection: 'row',
  },
  titleTxt: {
    color: Colors.BLACK,
    marginLeft: 'auto',
    marginRight: 'auto',
    fontWeight: 'bold',
    fontSize: moderateScale(18),
  },
  logoutBtn: {
    height: verticalScale(18),
    width: horizontalScale(18),
    marginRight: horizontalScale(10),
    padding: moderateScale(10),
  },
});
