import { StyleSheet, Text, View,FlatList,Image } from 'react-native'
import React from 'react'
import Colors from '../../Utils/Colors'

const BusinessPhoto = (props) => {
    console.log(props.Bussines)
  return (
    <View style={{paddingHorizontal:20,paddingVertical:10}}>
       <Text style={{fontFamily:"outfit-Regular",fontSize:20,fontWeight:"700" ,color:Colors.BLACK,padding:3}}>Photos</Text> 
       <FlatList
        data={props.Business.Image}
        numColumns={2}
        renderItem={({item})=>(
            <Image source={{uri:item}} style={{width:"100%",flex:1,height:120}} />
        )}
       />
    </View>
  )
}

export default BusinessPhoto

const styles = StyleSheet.create({})