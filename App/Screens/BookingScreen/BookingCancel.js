import React , {useEffect, useState} from 'react'
import auth from "@react-native-firebase/auth"
import firestore from '@react-native-firebase/firestore';

export async function BookingCancel(BookingDetails) {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(BookingDetails.id)
      const docRef = firestore().collection('Booking').doc(BookingDetails.id);
      docRef.update({
        "BookingInfo.BookingStatus": 'Cancelled'
      })
      console.log("updated sucessfully")
      resolve(true)
    } catch (error) {
      console.error('Error in booking:', error);
      reject(false);
    }
  });
}