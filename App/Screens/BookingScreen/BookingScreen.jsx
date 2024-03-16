import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, Modal, ScrollView, ActivityIndicator, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Colors from '../../Utils/Colors';
import { BookingCancel } from './BookingCancel';
import { handalPayment } from '../BusinessScreen/Payment';

const BookingScreen = () => {
  const navigation = useNavigation();
  const [userId, setUserId] = useState('');
  const [bookingDetails, setBookingDetails] = useState([]);
  const [cancelModal, setCancelModal] = useState(false);
  const [cancelItem, setCancelItem] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true); // Loading state


  const handalpay =(item)=>{
       handalPayment(item).then((message)=>{
        console.log(message);
       }).catch((error)=>{
        console.error(error);
       })
  }

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const user = auth().currentUser;
        if (!user) {
          console.warn('User not available');
          setLoading(false); // Set loading to false when there's no user
          return;
        }
        setUserId(user.uid);

        const querySnapshot = await firestore()
          .collection('Booking')
          .where('Bookby', '==', user.uid)
          .orderBy('createdAt', 'desc')
          .onSnapshot((snapshot) => {
            if (snapshot && snapshot.docs) {
              const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
              setBookingDetails(data);
              setLoading(false); // Set loading to false when data is fetched
            } else {
              console.warn('Snapshot is null or does not have a "docs" property.');
              setLoading(false); // Set loading to false in case of no data
            }
            setRefreshing(false);
          });
          
        return () => querySnapshot(); // Cleanup
      } catch (error) {
        console.error('Error fetching data:', error);
        setRefreshing(false);
        setLoading(false); // Set loading to false in case of error
      }
    };

    fetchBookingDetails();
  }, [refreshing]);

  const handleRefresh = () => setRefreshing(true);

  const handleCancel = async (item) => {
    try {
      await BookingCancel(item);
      setCancelModal(false);
    } catch (error) {
      console.error('Cancellation error:', error);
    }
  };

  const handleCancelModal = (item) => {
    setCancelModal(true);
    setCancelItem(item);
  };

  const renderBookingItem = ({ item }) => {
    
    const statusColor = item.BookingInfo.BookingStatus === 'Cancelled' ? '#FF0000' : (item.BookingInfo.BookingStatus === 'Booked' ? Colors.PRIMARY : '#008000');
    const isCancelable = new Date(item.BookingInfo.Date) > new Date() && item.BookingInfo.BookingStatus !== 'Cancelled' && !item?.PaymentStatus;
    const isPayable = new Date(item.BookingInfo.Date) != new Date() && item.BookingInfo.BookingStatus !== 'Cancelled'  && !item?.PaymentStatus;

    return (
      <TouchableOpacity style={styles.mainContainer} onPress={() => navigation.push('BusinessDetails', { Details: item.BusinessDetails })}>
        <Image source={{ uri: item.BusinessDetails.Image[0] }} style={styles.image} />
        <View style={styles.infoContainer}>
          <Text style={styles.businessName}>{item.BusinessDetails.Name}</Text>
          <Text style={styles.category}>{item.BusinessDetails.Category}</Text>
          <Text>Date: {item.BookingInfo.Date}</Text>
          <Text>Time: {item.BookingInfo.Time}</Text>
          <Text style={[styles.bookingStatus, { backgroundColor: '#E6E6FA', color: statusColor }]}>{item.BookingInfo.BookingStatus}</Text>
          <View style={styles.buttonContainer}>
            {isCancelable && <TouchableOpacity onPress={() => handleCancelModal(item)} style={[styles.button, { backgroundColor: '#FF0000' }]}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>}
            {isPayable && <TouchableOpacity onPress={()=>{handalpay(item)}} style={[styles.button, { backgroundColor: '#008000' }]}>
              <Text style={styles.buttonText}>Pay</Text>
            </TouchableOpacity>}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>My Booking</Text>
      </View>

      <ScrollView contentContainerStyle={{ flexGrow: 1 }} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}>
        {loading ? ( // Render loading indicator when data is being fetched
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={Colors.PRIMARY} />
          </View>
        ) : bookingDetails.length === 0 ? ( // Render "No booking" when there's no data
          <View style={styles.noBookingContainer}>
            <Text style={styles.noBookingText}>No booking</Text>
          </View>
        ) : (
          <FlatList
            data={bookingDetails}
            renderItem={renderBookingItem}
            keyExtractor={item => item.id}
          />
        )}
      </ScrollView>
      <Modal visible={cancelModal}>
        <View style={styles.modalContainer}>
          <Icon name="free-cancellation" size={60} color={Colors.PRIMARY} />
          <Text style={styles.modalText}>Cancel My Booking ?</Text>
          <View style={styles.modalButtonContainer}>
            <TouchableOpacity onPress={() => { handleCancel(cancelItem) }}>
              <Text style={styles.modalButton}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { setCancelModal(false) }}>
              <Text style={styles.modalButton}>No</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingVertical: 20,
    paddingHorizontal: 30,
    backgroundColor: Colors.PRIMARY,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  heading: {
    fontSize: 25,
    fontFamily: 'outfit-Regular',
    fontWeight: '700',
    textAlign: 'center',
    color: Colors.WHITE,
  },
  mainContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: Colors.WHITE,
    borderRadius: 10,
    marginVertical: 10,
    marginHorizontal: 20,
    alignItems: 'center',
  },
  image: {
    height: 130,
    width: 130,
    borderRadius: 10,
  },
  infoContainer: {
    flex: 1,
    marginLeft: 10,
  },
  businessName: {
    fontSize: 20,
    fontFamily: 'outfit-Regular',
    fontWeight: '700',
  },
  category: {
    fontSize: 12,
    fontFamily: 'outfit-Regular',
    color: Colors.PRIMARY,
    marginBottom: 5,
  },
  bookingStatus: {
    fontSize: 10,
    fontFamily: 'outfit-Regular',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 3,
    marginTop: 3,
    alignSelf: 'flex-start',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 5,
  },
  button: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginRight: 10,
  },
  buttonText: {
    fontSize: 17,
    fontFamily: 'outfit-Regular',
    color: Colors.WHITE,
    fontWeight: '700',
  },
  noBookingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noBookingText: {
    fontSize: 18,
    fontFamily: 'outfit-Regular',
    color: Colors.PRIMARY,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalText: {
    fontSize: 25,
    fontFamily: 'outfit-Regular',
    fontWeight: '700',
    marginVertical: 20,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  modalButton: {
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 8,
    fontSize: 20,
    fontWeight: '700',
    color: Colors.WHITE,
  },
});

export default BookingScreen;
