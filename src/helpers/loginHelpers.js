import {
  statusCodes,
  GoogleSignin,
} from '@react-native-google-signin/google-signin';

export const handleGoogleSignIn = async () => {
  try {
    await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
    const userInfo = await GoogleSignin.signIn();

    if (userInfo) {
      console.log('Successfully signed in');
    }
  } catch (error) {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      console.log('Error(googleSignIn): ', error);
      // user cancelled the login flow
    } else if (error.code === statusCodes.IN_PROGRESS) {
      // operation (e.g. sign in) is in progress already
      console.log('Error(googleSignIn): ', error);
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      console.log('Error(googleSignIn): ', error);
      // play services not available or outdated
    } else {
      console.log('Error(googleSignIn): ', error);
      // some other error happened
    }
  }
};

export const handleFacebookSignIn = () => {};
