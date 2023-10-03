import {Alert, Platform, ToastAndroid} from 'react-native';

//To pop up the toast message
export const notifyMessage = msg => {
  if (Platform.OS === 'android') {
    ToastAndroid.show(msg, ToastAndroid.SHORT);
  } else {
    Alert.alert(msg);
  }
};
