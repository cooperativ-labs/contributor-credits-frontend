import { initializeApp } from 'firebase/app';
import { getAuth, signInWithCustomToken } from 'firebase/auth';
import { getFunctions, httpsCallable } from 'firebase/functions';
// import {
//   NEXT_PUBLIC_FIREBASE_API_KEY,
//   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
//   NEXT_PUBLIC_FIREBASE_DATABASE_URL,
//   NEXT_PUBLIC_FIREBASE_PROJECT_ID,
//   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
//   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
//   NEXT_PUBLIC_FIREBASE_APP_ID,
//   NEXT_PUBLIC_FIREBASE_MEASURMENT_ID,
// } from 'FirebaseSettingsLocal';

// const firebaseConfig = {
//   apiKey: NEXT_PUBLIC_FIREBASE_API_KEY,
//   authDomain: NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
//   databaseURL: NEXT_PUBLIC_FIREBASE_DATABASE_URL,
//   projectId: NEXT_PUBLIC_FIREBASE_PROJECT_ID,
//   storageBucket: NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
//   appId: NEXT_PUBLIC_FIREBASE_APP_ID,
//   measurementId: NEXT_PUBLIC_FIREBASE_MEASURMENT_ID,
// };

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASURMENT_ID,
};

const fireApp = initializeApp(firebaseConfig);
export const auth = getAuth();

export const CustomTokenService = async (signer, walletAddress) => {
  const functions = getFunctions(fireApp);
  const getWalletNonce = httpsCallable(functions, 'getWalletNonce');
  const verifySignedMessage = httpsCallable(functions, 'verifySignedMessage');

  const walletUserDataResponse = async () => {
    try {
      const result = await getWalletNonce({
        address: walletAddress,
      });
      //@ts-ignore
      return result.data.nonce;
    } catch (err) {
      console.log(err);
    }
  };
  try {
    const walletUserData = await walletUserDataResponse();
    const sig = await signer.signMessage(walletUserData);
    //@ts-ignore
    const getCustomToken = await (await verifySignedMessage({ address: walletAddress, signature: sig })).data.token;
    try {
      const response = await signInWithCustomToken(auth, getCustomToken);
      return response.user;
    } catch (err) {}
  } catch (err) {
    console.log(err);
  }
};

export default fireApp;
