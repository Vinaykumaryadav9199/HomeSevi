import {  Image, StyleSheet, Text,  TouchableOpacity, View} from 'react-native'
import React from 'react'
import Colors from '../Utils/Colors'

const Welcome = ({navigation}) => {
  return (
    <View style ={styles.Container}>
      
        <Image source={require('../Assets/Image/home-service-banner.png')} style ={styles.Image}/>
        
        <View style ={styles.Subcontainer}>
           <View>
             <Text style={styles.heading}>Let's Find <Text style={{fontWeight:'bold'}}> Professional Cleaning and repair </Text>
             Services
             </Text>
           </View>
           <View>
             <Text style={styles.heading2}> Best App to find services near which deliver you a professional service</Text>
           </View>
           <TouchableOpacity style ={styles.button } onPress={()=>{navigation.navigate('Login')}}>
             <Text style ={{textAlign:'center' , fontSize:16,color:Colors.PRIMARY , fontWeight:'bold'}} >Let's Get Started</Text>
           </TouchableOpacity >
        </View>
    </View>
  )
}

export default Welcome

const styles = StyleSheet.create({
    Container:{
      flex:1,
      
    },
  Image:{
    flex:5,
   width:'100%',
   resizeMode:'contain'
    
  }
  ,
  Subcontainer:{
    flex:4,
    backgroundColor:Colors.PRIMARY,
    borderTopLeftRadius:20,
    borderTopRightRadius:20,
    marginTop:-20,
    padding:20,
    justifyContent:'center',
    alignItems:"center"
    
   
  },
  heading:{
    fontSize:20,
    textAlign:'center',
    color:Colors.WHITE
  
  },
  heading2:{
     fontSize:18,
     margin:20,
     color:Colors.WHITE,
     textAlign:'center'
  },
  button:{
     padding:12,
     backgroundColor:Colors.WHITE,
     borderRadius:99,
     marginTop:40,
     width:200
  }
  
  })