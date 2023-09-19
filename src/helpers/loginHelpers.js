import {
  statusCodes,
  GoogleSignin,
} from '@react-native-google-signin/google-signin';
import {
  LoginManager,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk-next';

GoogleSignin.configure({
  webClientId:
    '27671943337-enbkjg2lov62t7a987c60tf5ogv0d5mo.apps.googleusercontent.com',
  offlineAccess: true,
  forceCodeForRefreshToken: true,
});

export const handleGoogleSignIn = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    await GoogleSignin.signOut();
    const userInfo = await GoogleSignin.signIn();
    console.log('userLog >>>', userInfo);
    if (userInfo) {
      console.log('Successfully signed in');
      console.log(userInfo, '..userInfo');
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
      console.log('Error(googleSignIn): ', JSON.stringify(error));
      // some other error happened
    }
  }
};

export const handleFacebookSignIn = async ({navigation}) => {
  try {
    const result = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
    ]);

    if (result.isCancelled) {
      console.log('Facebook login canceled');
    } else {
      const data = await AccessToken.getCurrentAccessToken();
      if (!data) {
        console.log('Something went wrong obtaining access token');
      } else {
        console.log('Facebook login success');
        console.log('data: ', data);
        console.log('Access Token:', data.accessToken);
      }

      const parameters = {
        fields: 'id,name,email', // Specify the fields you want to retrieve
        access_token: data.accessToken,
      };

      // Create a Graph API request
      const graphRequest = new GraphRequest(
        '/me',
        parameters,
        (error, user) => {
          if (error) {
            console.error('Error fetching user data:', error);
          } else {
            userData = {
              id: user.id,
              name: user.name,
              email: user.email,
            };
            console.log('User data:', user);
            console.log('User ID:', user.id);
            console.log('User Name:', user.name);
            console.log('User Email:', user.email);
            navigation.navigate('SignUpScreen', {data: userData});
            // You can access other user data fields here
          }
        },
      );

      // Send the request
      new GraphRequestManager().addRequest(graphRequest).start();
    }
  } catch (error) {
    console.error('Error during Facebook login:', error);
  }
};
