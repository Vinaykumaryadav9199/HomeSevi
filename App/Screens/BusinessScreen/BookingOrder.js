import React , {useEffect, useState} from 'react'
import auth from "@react-native-firebase/auth"
import firestore from '@react-native-firebase/firestore';


export async function BookingOrder(BusinessDetails, Bookinginfo) {

  return new Promise(async (resolve, reject) => {
    try {
      const user = await auth().currentUser;

      if (user) {
        const collectionRef = firestore().collection('Booking');
        

        await collectionRef.add({
          Bookby: user.uid,
          BusinessDetails: BusinessDetails,
          BookingInfo: Bookinginfo,
          PaymentStatus: false,
          createdAt: firestore.FieldValue.serverTimestamp(),
        });

        console.log('Document added successfully!');
        resolve(true);
      } else {
        console.log('User not authenticated.');
        resolve(false);
      }
    } catch (error) {
      console.error('Error in booking:', error);
      reject(false);
    }
  });
}