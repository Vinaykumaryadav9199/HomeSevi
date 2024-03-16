import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import Colors from '../../Utils/Colors'

const InternetScreen = () => {
  return (
    <View style ={{flex :1 , justifyContent:"center" , alignItems:"center" , gap :20}} >
            <Icon name="access-point-network-off" size={65}  color={Colors.PRIMARY} />
            <Text style ={{fontSize:18 , fontFamily:"outfit-Regular" }}>No Internet Connection</Text>
    </View>
  )
}

export default InternetScreen

const styles = StyleSheet.create({})