const functions = require('firebase-functions');
const admin = require('firebase-admin');
const { utils } = require('ethers');
// const { v4: uuidv4 } = require('uuid');

admin.initializeApp();

// exports.getUserAccountUuid = functions.https.onCall(async (data) => {
//   try {
//     const walletDoc = await admin.firestore().collection('wallets').doc(data.address).get();
//     if (walletDoc.exists) {
//       const existingWallet = await walletDoc.data();
//       const existingUserAccountUuid = existingWallet.uuid;
//       return existingUserAccountUuid;
//     } else {
//       return 'That user does not exist';
//     }
//   } catch (err) {
//     return err;
//   }
// });

// exports.createWalletUserforExistingUser = functions.https.onCall(async (data) => {
//   try {
//     const createdWalletUser = await admin.auth().createUser({
//       uid: data.address,
//     });
//     const generatedNonce = `Please click sign below to log in - (security number: ${Math.floor(
//       Math.random() * 1000000
//     ).toString()})`;
//     await admin.firestore().collection('wallets').doc(createdWalletUser.uid).set({
//       nonce: generatedNonce,
//       uuid: data.uuid,
//     });
//     return { uuid: uuid };
//   } catch (err) {
//     return err;
//   }
// });

exports.getWalletNonce = functions.https.onCall(async (data) => {
  try {
    const walletDoc = await admin.firestore().collection('wallets').doc(data.address).get();
    if (walletDoc.exists) {
      const existingWallet = await walletDoc.data();
      const existingNonce = existingWallet.nonce;
      return { nonce: existingNonce };
    } else {
      const createdWalletUser = await admin.auth().createUser({
        uid: data.address,
      });
      const generatedNonce = `Please click sign below to log in - (${Math.floor(Math.random() * 1000000).toString()})`;
      await admin.firestore().collection('wallets').doc(createdWalletUser.uid).set({
        nonce: generatedNonce,
      });
      return { nonce: generatedNonce };
    }
  } catch (err) {
    return err;
  }
});

exports.verifySignedMessage = functions.https.onCall(async (data, context) => {
  try {
    const address = data.address;
    const sig = data.signature;
    const walletDocRef = await admin.firestore().collection('wallets').doc(address);
    const walletDoc = await walletDocRef.get();
    if (walletDoc.exists) {
      const existingWallet = await walletDoc.data();
      const existingNonce = existingWallet.nonce;
      const recoveredAddress = utils.verifyMessage(existingNonce, sig);
      if (recoveredAddress === address) {
        await walletDocRef
          .update({
            nonce: `Please click sign below to log in - (${Math.floor(Math.random() * 1000000).toString()})`,
          })
          .then(() => {
            console.log('Document successfully updated!');
          });
        const firebaseToken = await admin.auth().createCustomToken(address, {
          'https://dgraph.io/jwt/claims': {
            UUID: address,
          },
        });
        return { token: firebaseToken };
      } else {
        return 'The sig could not be verified';
      }
    } else {
      return 'wallet does not exist';
    }
  } catch (err) {
    return err;
  }
});
