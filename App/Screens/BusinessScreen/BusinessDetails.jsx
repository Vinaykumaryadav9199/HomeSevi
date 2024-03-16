import { StyleSheet, Text, View,Image,TouchableOpacity ,ScrollView,Modal} from 'react-native'
import React , {useEffect, useState} from 'react'
import auth from "@react-native-firebase/auth"
import { useRoute } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/FontAwesome6'
import Colors from '../../Utils/Colors'
import { useNavigation } from '@react-navigation/native'
import Aboutme from './Aboutme'
import BusinessPhoto from './BusinessPhoto'
import Booking from './Booking'

const BusinessDetails = () => {
  const {Details} = useRoute().params
  console.log(Details)
  const navigation = useNavigation();
  const [IsBooking ,setIsBooking] = useState(false)


  const handalChat =()=>{
    const user1 = auth().currentUser
    const user2 = Details
    
    const conversationId = [user1.uid, user2.key].sort().join('_');
    const participantIds = [user1.uid, user2.id];
    navigation.navigate('Chat', { conversationId, participantIds ,Details});

  }

  return Details && (
    <View>
          <ScrollView style={{height:"91%"}}>
          <TouchableOpacity style={styles.Arrow} onPress={()=>{navigation.goBack()}}>
            <Icon name="arrow-left-long" size={30} color ={Colors.WHITE}/>
          </TouchableOpacity>
          <View>
              <Image source={{uri:Details.Image[0]}} style ={styles.Image}/>
          </View>
          <View style={styles.Infocontainer}>
                <View style={{display:"flex",flexDirection:"row" ,gap:10, alignItems:"flex-end", marginLeft:3}}>
                   <Text style={{fontSize:25,fontFamily:"outfit-Regular", color:Colors.BLACK,fontWeight:"700"}}>{Details.Name}</Text>
                   <Text
                   style={{fontSize:10 ,fontFamily:"outfit-Regular",paddingHorizontal:10, paddingVertical:3,borderRadius:3, marginTop:3, color:Colors.PRIMARY,backgroundColor:"#E6E6FA",marginBottom:5 }}
                   >{Details.Category}</Text>
                </View>
                <Text style={{fontFamily:"outfit-Regular" ,fontSize:18,marginLeft:3}}>Rating {Details.Rating}</Text>
                  <View style={{display:"flex" ,flexDirection:"row", alignItems:"center" ,gap:5}}>
                     <Icon name="location-dot" size={20} color ={Colors.PRIMARY}/>
                     <Text style={{fontSize:18}}>{Details.Address}</Text>
                  </View>
                  
          </View>
          <View style={styles.Line}></View>
          <Aboutme Business ={Details}/>
          <BusinessPhoto Business ={Details}/>
          
          </ScrollView>
         <View style={styles.btnContainer}>
            <TouchableOpacity style={styles.Messagebtn} onPress={handalChat}>
                <Text style ={{textAlign:"center",fontFamily:"Outfit-medium",color:Colors.PRIMARY,fontSize:18,paddingVertical:14}}>Message</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.booknowbtn} onPress={()=>{setIsBooking(true)}}>
                <Text style ={{textAlign:"center",fontFamily:"Outfit-medium",color:Colors.WHITE,fontSize:18,paddingVertical:14}}>Book Now</Text>
            </TouchableOpacity>
         </View>

          <Modal visible={IsBooking} animationType="slide">
              <View style={{padding:20}}>
                <TouchableOpacity onPress={()=>{setIsBooking(false)}}style={{display:'flex' ,flexDirection:"row", gap:10 ,alignItems:'center'}}>
                <Icon name="arrow-left-long" size={30}  color={Colors.BLACK}  />
                <Text style={{fontSize:23 , fontFamily:"outfit-Regular" , fontWeight:"700" ,color:Colors.BLACK}}>Booking Now</Text>
                </TouchableOpacity>

              </View>
             <Booking BusinessDetails={Details}  setIsBooking ={setIsBooking}/>
          </Modal>
    </View>
  )
}

export default BusinessDetails

const styles = StyleSheet.create({

  Image:{
    width:"100%",
    height:300

  },
  Infocontainer:{
      padding:20
  },
  Arrow:{
    display:"flex",
    position:'absolute',
    padding:12,
    zIndex:10
  },
  Line:{
      borderWidth:1,
     marginHorizontal:15,
     borderColor:Colors.LIGHT_GRAY
  },
  btnContainer:{
     display:"flex",
     flexDirection:"row",
     height:"9%",
     justifyContent:"center",
     alignItems:'center',
     gap:10,
    
     
  },
  Messagebtn:{
      flex:1,
      borderWidth:1,
      borderColor:Colors.PRIMARY,
      borderRadius:99,
      marginLeft:5
  },
  booknowbtn:{
      flex:1,
      borderWidth:1,
      borderColor:Colors.WHITE ,
      borderRadius:99,
      marginRight:5,
      backgroundColor:Colors.PRIMARY
  }, btnContainer1:{
    display:"flex",
    flexDirection:"row",
    justifyContent:"center",
    alignItems:"center",
    gap:10,
    marginTop:50
  },btnbook:{
    flex:1,
    justifyContent:"center",
    alignItems:"center",
    borderRadius:1,
    borderColor:Colors.PRIMARY,
    borderWidth:1,
    height:50,
    borderRadius:99,
   
  },
  btnbookandpay:{
    flex:1,
    justifyContent:"center",
    alignItems:"center",
    borderRadius:1,
    borderColor:Colors.PRIMARY,
    borderWidth:1,
    height:50,
    borderRadius:99,
    backgroundColor:Colors.PRIMARY
  }

})