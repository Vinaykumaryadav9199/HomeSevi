import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ChatlogScreen from '../Screens/ChatsScreen/ChatlogScreen'
import ChatScreen from '../Screens/ChatsScreen/ChatScreen'


const ChatScreenNavigation = () => {
    
    const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
    <Stack.Screen name='Chatlog' component={ChatlogScreen} options={{ headerShown: false }} />
    <Stack.Screen name='chats' component={ChatScreen} options={{ headerShown: false }} />
  </Stack.Navigator>
  )
}

export default ChatScreenNavigation

const styles = StyleSheet.create({})