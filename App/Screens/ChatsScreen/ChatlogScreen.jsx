import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, FlatList, Image, TouchableOpacity } from 'react-native';
import Colors from '../../Utils/Colors';
import firestore from '@react-native-firebase/firestore';
import { useIsFocused } from '@react-navigation/native';
import auth from "@react-native-firebase/auth"
import { useNavigation } from '@react-navigation/native';

const ChatlogScreen = () => {
  const navigation = useNavigation()
  const [loading, setLoading] = useState(true);
  const [businessDetails, setBusinessDetails] = useState([]);
  const [Details ,setDetails] = useState({})
  const isFocused = useIsFocused();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await firestore().collection('BusinessDetails').get();

        if (querySnapshot && querySnapshot.docs) {
          const businessData = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            key: doc.id,
          }));

          setBusinessDetails(businessData);
         
        }
      } catch (error) {
        console.error('Error fetching data from Firestore:', error);
      } finally {
        setLoading(false);
      }
    };

    if (isFocused) {
      fetchData();
    }

    // Cleanup function
    return () => {
      // Any cleanup logic if needed
    };
  }, [isFocused]); // Add isFocused as a dependency

  if (loading) {
    return <ActivityIndicator />;
  }


  const handalChat =(Details)=>{
    const user1 = auth().currentUser
    const user2 = Details 
    const conversationId = [user1.uid, user2.key].sort().join('_');
    console.log(conversationId)
    const participantIds = [user1.uid, user2.id];
    navigation.push('chats', { conversationId, participantIds ,Details});

  }

  return (
    <View>
      <View style={{ backgroundColor: Colors.PRIMARY, paddingVertical: 20, borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }}>
        <Text style={{ fontSize: 25, fontFamily: 'outfit-Regular', fontWeight: '700', textAlign: 'center', color: Colors.WHITE }}>
          Chats
        </Text>
      </View>
      <FlatList
        data={businessDetails}
        renderItem={({ item }) => (
          <TouchableOpacity style={{paddingHorizontal:20,paddingVertical:10 ,display:"flex" ,flexDirection:"row" ,gap:20 , alignItems:"center" ,backgroundColor:Colors.LIGHT_GRAY ,marginTop:15,borderTopLeftRadius:25 ,marginHorizontal:10 ,borderTopRightRadius:10 , borderBottomRightRadius:10}} onPress={()=>{handalChat(item)}}>
            <Image source={{uri:item.Image[0]}} style= {{height:60 , width:60 ,borderRadius:99}}/>
            <Text style ={{fontSize:18 , fontWeight:"600",color:Colors.PRIMARY,}}>{item.Name}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.key}
      />
    </View>
  );
};

export default ChatlogScreen;

const styles = StyleSheet.create({
  // Any additional styles go here
});
