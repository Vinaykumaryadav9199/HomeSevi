import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from '../Screens/HomeScreen/HomeScreen'
import CategoryWiseBusiness from '../Screens/BusinessScreen/CategoryWiseBusiness'
import BusinessDetails from '../Screens/BusinessScreen/BusinessDetails'
import ChatScreen from '../Screens/ChatsScreen/ChatScreen'

const HomeStackNavigation = () => {
    const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator>
    <Stack.Screen name='Homes' component={HomeScreen} options={{ headerShown: false }} />
    <Stack.Screen name='Business' component={CategoryWiseBusiness} options={{ headerShown: false }}/>
    <Stack.Screen name='BusinessDetails' component={BusinessDetails} options={{ headerShown: false }} />
    <Stack.Screen name='Chat' component={ChatScreen} options={{ headerShown: false }}/>

  </Stack.Navigator>
  )
}

export default HomeStackNavigation