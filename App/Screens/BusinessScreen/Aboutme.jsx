import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React,{useState} from 'react'
import Colors from '../../Utils/Colors'

const Aboutme = (props) => {
    const [isReadmore,setisReadmore] =useState(false)
  return (
    <View style={styles.Container}>
     <Text style={{fontFamily:"outfit-Regular",fontSize:20,fontWeight:"700" ,color:Colors.BLACK,padding:3}}>About me</Text>
      <Text style={{fontSize:18,lineHeight:25,fontFamily:"outfit-Regular"}} numberOfLines={isReadmore?20:4}>
            {props.Business.About}
      </Text>
      <TouchableOpacity onPress={()=>{isReadmore ?setisReadmore(false):setisReadmore(true)}} style={{marginTop:3}}>
          <Text style={{fontSize:15 ,fontFamily:"outfit-Regular" , color:Colors.PRIMARY,padding:3}}>{isReadmore? "Read Less" :"Read More"}</Text>
      </TouchableOpacity>
      <View style={styles.Line}></View>
    </View>
  )
}

export default Aboutme

const styles = StyleSheet.create({
    Container:{
        paddingHorizontal:20,
        paddingVertical:10
    },
    Line:{
      borderWidth:1,
      marginTop:15,
     borderColor:Colors.LIGHT_GRAY
  }
})