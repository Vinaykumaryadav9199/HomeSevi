import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import { useEffect ,useState } from 'react';

GoogleSignin.configure({
  // Mandatory method to call before calling signIn()
  scopes: ['https://www.googleapis.com/auth/drive.readonly'],
  // Repleace with your webClientId
  // Generated from Firebase console
  webClientId: '439938353015-3ele63ehd95smq565fblvf4u2vn986ir.apps.googleusercontent.com',
})

async function onGoogleButtonPress() {
  const [userData ,setuserData] =useState(null)

  try {
    await GoogleSignin.hasPlayServices({
      // Check if device has Google Play Services installed
      // Always resolves to true on iOS
      showPlayServicesUpdateDialog: true,
    });
    const userInfo = await GoogleSignin.signIn();
    console.log('User Info --> ', userInfo);
    setuserData(userInfo);
  } catch (error) {
    console.log('Message', JSON.stringify(error));
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      alert('User Cancelled the Login Flow');
    } else if (error.code === statusCodes.IN_PROGRESS) {
      alert('Signing In');
    } else if (
        error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE
      ) {
      alert('Play Services Not Available or Outdated');
    } else {
      alert(error.message);
    }
  }
}

export default onGoogleButtonPress;
