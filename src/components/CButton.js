import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Colors} from '../theme/colors';
import {moderateScale, verticalScale} from '../helpers/sizeHelpers';

const CButton = ({title, extraStyles, onPress}) => {
  return (
    <TouchableOpacity style={[styles.btn, extraStyles]} onPress={onPress}>
      <Text style={styles.btnText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CButton;

const styles = StyleSheet.create({
  btn: {
    backgroundColor: Colors.BLACK,
    height: verticalScale(50),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: moderateScale(25),
  },
  btnText: {
    fontSize: moderateScale(16),
    color: Colors.WHITE,
  },
});
