import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as sgMail from '@sendgrid/mail';

admin.initializeApp();
const db = admin.firestore();

const API_KEY = functions.config().sendgrid.key;
sgMail.setApiKey(API_KEY);

// send an email if sendEmail option is true
export const sendEmail = functions.firestore.document('gamekeys/{id}')
  .onWrite(async (change, context) => {
    // read gamekey document
    const gamekeySnap = await db.collection('gamekeys').doc(context.params.id).get();

    const gamekeyDoc = gamekeySnap.data() || {};
    //{ _id: null, name: 'username', email: 'email@gmail.com', timestamp: 1593286885980, gameKey: 'BtJhgEkfM', sendEmail: true}

    const greeting = gamekeyDoc.name? `Hi ${gamekeyDoc.name},` : `Hi,`;

    // send email
    if (gamekeyDoc.email && gamekeyDoc.sendEmail) {
      const msg = {
        to: gamekeyDoc.email,
        from: 'contact@tkusaka.com',
        subject: 'Your Game Key is Ready!',
        html: `${greeting}<br> Your game key is ${gamekeyDoc.gameKey}`
      };

      return sgMail.send(msg)
        .then(res => {
          console.log(res);
          return res;
        })
        .catch(err => {
          console.log('error: ', err);
          return err;
        });
    }

  });

