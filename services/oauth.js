import { AsyncStorage, Platform } from 'react-native';
import config from '../config';
import * as AppAuth from 'expo-app-auth';

const { GOOGLE_IOS_CLIENT_ID, GOOGLE_ANDROID_CLIENT_ID } = config;
const googleConfig = {
  issuer: 'https://accounts.google.com',
  scopes: ['openid', 'profile', 'email'],
  clientId: Platform.OS === 'ios' ? GOOGLE_IOS_CLIENT_ID : GOOGLE_ANDROID_CLIENT_ID,
};

const StorageKey = '@Premiate:GoogleOAuthKey';

function checkIfTokenExpired({ accessTokenExpirationDate }) {
  return new Date(accessTokenExpirationDate) < new Date();
}

async function getCachedAuthState () {
  const value = await AsyncStorage.getItem(StorageKey);
  const authState = JSON.parse(value);
  return authState || null;
}

export const signIn = async () => {
  const authState = await AppAuth.authAsync(googleConfig);
  await AsyncStorage.setItem(StorageKey, JSON.stringify(authState));
  const googleData = await getGoogleData(authState.idToken);
  await AsyncStorage.setItem('userEmail', googleData.email);
  return googleData;
}


export const isSignedIn = async () => {
  const authState = await getCachedAuthState();
  if (authState) {
    return true;
  }
  return false;
}

/*
 * To sign-out we want to revoke our tokens.
 * This is what high-level auth solutions like FBSDK are doing behind the scenes.
 */
export const signOut = async () => {
  try {
    const authState = await getCachedAuthState();
    if (authState) {
      await AppAuth.revokeAsync(googleConfig, {
        token: authState.accessToken,
        isClientIdProvided: true,
      });
      /*
       * We are removing the cached tokens so we can check on our auth state later.
       * No tokens = Not Signed-In :)
       */
      await AsyncStorage.removeItem(StorageKey);
      await AsyncStorage.removeItem('userEmail');
      return null;
    }
  } catch ({ message }) {
    alert(`Failed to revoke token: ${message}`);
  }
}

export const getGoogleData = async (idToken) => {
  const response = await fetch(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${idToken}`);
  return response.json();
}