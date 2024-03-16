// ChatScreen.js
import React, { useState, useEffect } from 'react';

import { GiftedChat, Bubble, Time } from 'react-native-gifted-chat';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { View ,StyleSheet ,TouchableOpacity,Image,Text} from 'react-native';
import Colors from '../../Utils/Colors';

// ... (imports remain unchanged)

const ChatScreen = ({ route, navigation }) => {
  const { conversationId,participantIds,Details } = route.params; // Removed unused 'Detail'
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('conversations')
      .doc(conversationId)
      .collection('messages')
      .orderBy('timestamp', 'desc')
      .onSnapshot(snapshot => {
        const newMessages = snapshot.docs.map(doc => {
          const data = doc.data();
          const createdAt = data.timestamp ? data.timestamp.toDate() : new Date();
          return {
            ...data,
            _id: doc.id,
            createdAt,
          };
        });
        setMessages(newMessages);
      });

    return () => unsubscribe();
  }, [conversationId]);

  const handleSend = async newMessages => {
    await firestore()
      .collection('conversations')
      .doc(conversationId)
      .collection('messages')
      .add({
        ...newMessages[0],
        timestamp: firestore.FieldValue.serverTimestamp(),
      });
  };

  

  const renderTime = (props) => (
    <Time {...props} textStyle={{ left: { color: 'green' }, right: { color: 'blue' } }} />
  );

  return (
    <View style ={{flex:1}}>
    
      <View style ={{ backgroundColor:Colors.PRIMARY , display:"flex",flexDirection:"row" ,alignItems:"center"  , gap :20, paddingHorizontal:20 , paddingVertical:5}}>
      <TouchableOpacity  onPress={()=>{navigation.goBack()}}>
            <Icon name="arrow-left-long" size={30} color ={Colors.WHITE}/>
     </TouchableOpacity>
    { Details && <Image source={{uri:Details.Image[0]}} style ={{height :50 , width :50 , borderRadius:99}}/>}
    <Text style={{fontSize:20 , fontFamily:"outfit-Regular" ,color :Colors.WHITE , fontWeight:"700"}}>{Details.Name}</Text>

      </View>
      <View style ={{flex:1}}>
        <GiftedChat
          messages={messages}
          onSend={handleSend}
          user={{
            _id: auth().currentUser.uid,
          }}
          renderAvatar={null}
          placeholder="Type your message here..."
          renderSend={()=>{}}
          renderBubble={props => (
            <Bubble
              {...props}
              wrapperStyle={{
                right: {
                  backgroundColor: '#3498db',
                },
                left: {
                  backgroundColor: '#ecf0f1',
                },
              }}
            />
          )}
          renderTime={renderTime}
          textInputProps={{
            style: {
              minHeight: 40,
              maxHeight: 100,
              width: '80%',
              backgroundColor: '#f1f1f1',
              borderColor: 'transparent',
              borderWidth: 0,
              borderRadius: 8,
              paddingLeft: 16,
            },
          }}
        />
      </View>
   
      </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
 
});
