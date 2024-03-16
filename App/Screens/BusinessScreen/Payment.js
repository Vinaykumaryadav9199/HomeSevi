import RazorpayCheckout from 'react-native-razorpay';
import { key_id, key_secret } from '@env';
import Colors from '../../Utils/Colors';
import firestore from '@react-native-firebase/firestore';

export function handalPayment(item) {
  console.log(item.id)
  return new Promise((resolve, reject) => {
    var options = {
      description: 'Help in Home Services',
      image: 'https://firebasestorage.googleapis.com/v0/b/homesevi.appspot.com/o/Logo%2FLogo%20Home%20SEVI.png?alt=media&token=8b070f67-13f0-41a4-88d0-d03203fd92fd',
      currency: 'INR',
      key: key_id,
      amount: 10000, // Change this to item.amount or any dynamic value if applicable
      name: 'HomeSevi',
      prefill: {
        email: 'Vinay@gmail.com',
        contact: '9191919191',
        name: 'Vinay Kumar Yadav',
      },
      theme: { color: Colors.PRIMARY },
    };

    RazorpayCheckout.open(options)
      .then((data) => {
        // handle success
        const paymentId = data.razorpay_payment_id;

        // Add payment details to Firestore
        const bookingRef = firestore().collection('Booking').doc(item.id); // Assuming you have a bookingId property in the item object
        const paymentDetails = {
          paymentId: paymentId,
          amount: options.amount, // You can change this to item.amount if applicable
          timestamp: firestore.FieldValue.serverTimestamp(), // Timestamp of payment
          status: 'success', // Assuming success status for now
        };

        return bookingRef.collection('Payment').add(paymentDetails); // Add payment details to subcollection
      })
      .then(() => {
        // Update payment status in Firestore
        const bookingRef = firestore().collection('Booking').doc(item.id); // Assuming you have a bookingId property in the item object
        return bookingRef.update({ PaymentStatus: true }); // Update payment status field
      })
      .then(() => {
        resolve('Payment successful');
      })
      .catch((error) => {
        // handle failure
        reject(error);
      });
  });
}
