import React, {useState} from 'react';
import {Colors} from '../theme/colors';
import {
  View,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {
  moderateScale,
  verticalScale,
  horizontalScale,
} from '../helpers/sizeHelpers';

const CTextInput = ({placeholder, isPassword, onChangeText, editable, value}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <View style={styles.textInputView}>
      <TextInput
        placeholder={placeholder}
        style={styles.textInput}
        secureTextEntry={isPassword && !showPassword}
        onChangeText={onChangeText}
        editable={editable}
        value={value}
      />
      {isPassword && (
        <TouchableOpacity
          style={styles.eyeIconContainer}
          onPress={togglePasswordVisibility}>
          <Image
            source={
              showPassword
                ? require('../assets/images/eye-off.png')
                : require('../assets/images/eye-on.png')
            }
            style={styles.eyeIcon}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default CTextInput;

const styles = StyleSheet.create({
  textInputView: {
    borderWidth: 1,
    borderColor: Colors.GRAY,
    borderRadius: moderateScale(6),
    marginBottom: verticalScale(15),
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: {
    marginLeft: horizontalScale(5),
    flex: 1,
    paddingVertical: moderateScale(10),
    fontSize: moderateScale(16),
    color:Colors.BLACK
  },
  eyeIconContainer: {
    padding: moderateScale(10),
    // position: 'absolute',
    // top: verticalScale(15),
    // right: horizontalScale(10),
  },
  eyeIcon: {
    width: moderateScale(20),
    height: moderateScale(20),
  },
});
