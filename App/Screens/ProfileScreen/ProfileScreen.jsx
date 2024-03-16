import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React , {useEffect ,useState}from 'react'
import Colors from '../../Utils/Colors'
import auth from '@react-native-firebase/auth'
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import Iconm from "react-native-vector-icons/MaterialIcons"
import { useNavigation } from '@react-navigation/native'
import Mailer from 'react-native-mail';



const ProfileScreen = () => {
  const navigation = useNavigation()
  const [User , setUser] =  useState({})
useEffect(() => {
  const user = auth().currentUser 
  setUser(user)  
 
}, [User])

const handalLogout = async()=>{
  try {
    await auth().signOut();
    // The user has been signed out successfully
    console.log('User signed out');
    
    setTimeout(() => {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Welcome' }],
      });
    },5);
   
  } catch (error) {
    // Handle errors during sign out
    console.error('Error signing out:', error.message);
    Alert.alert('Error', 'An error occurred while signing out. Please try again.');
  }
}
const openEmailApp = () => {
  Mailer.mail({
    subject: 'Contact Us',
    recipients: ['homesevi@xyz.com'],
    body: 'Hello, we would like to get in touch with you!',
    isHTML: true, // Set to true if the body is in HTML format
  }, (error, event) => {
    if (error) {
      console.error('Error:', error);
    }

  });
};

  return User && (
    <View style ={styles.mainContainer}>
          <View style ={{backgroundColor :Colors.PRIMARY ,padding:20,flex:2 , borderBottomLeftRadius:20 ,borderBottomRightRadius:20}}>
            <Text style ={{fontSize :25 , fontWeight :"700" ,color :Colors.WHITE , fontFamily:"outfit-Regular"}}>Profile</Text>
            <View style ={styles.Container}>
                  <View style ={styles.profilePic}>
                    <Text  style={{ fontSize: 50, fontWeight: "bold", color: Colors.WHITE }} >{User .displayName ?.charAt(0)}</Text>
                  </View>
                  <Text style ={{fontSize:22 , fontWeight:"700" ,  color :Colors.WHITE , fontFamily :"outfit-Regular"}}>{User?.displayName}</Text>
                  <Text style ={{fontSize:16 , fontWeight:"700" ,  color :Colors.WHITE , fontFamily :"outfit-Regular"}}>{User.email}</Text>
            </View>
          </View>
          <View style={{flex:3, paddingTop :60, paddingLeft:"33%"}}>
              <TouchableOpacity style ={styles.menu} onPress={()=>{navigation.navigate("Home")}}>
              <Icon name="home" size={35} color= {Colors.PRIMARY}/>
              <Text style={styles.menuText}>Home</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.menu}  onPress ={()=>{navigation.navigate("BookingNavigation")}}>
              <Icon name="bookmark" size={33} color= {Colors.PRIMARY}/>
              <Text style={styles.menuText}>My Booking</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.menu} onPress ={()=>{navigation.navigate("Chatlog")}}>
              <Icon name="chat-processing" size={33} color= {Colors.PRIMARY}/>
              <Text style={styles.menuText}>Chat</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.menu} onPress={openEmailApp}>
              <Iconm name="contact-support" size={35} color= {Colors.PRIMARY}/>
              <Text style={styles.menuText}>Contact Us</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.menu} onPress={handalLogout} >
              <Icon name="logout" size={33} color= {Colors.PRIMARY}/>
              <Text style={styles.menuText}>Logout</Text>
              </TouchableOpacity>
          </View>
    </View>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  mainContainer:{
    flex:1
  },
  Container:{
     flex:1,
      justifyContent:"center",
      alignItems:"center",
      gap:10
  },
  profilePic: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 70,
    width: 70,
    backgroundColor: "#043927",
    borderRadius: 99
  },
  menu:{
     display:"flex",
     flexDirection:"row",
     alignItems:"center",
     gap:8,
     paddingTop:15
  },menuText:{
    fontSize:18,
    fontWeight:"700",
    fontFamily:"outfit-Regular"
  }

}) 