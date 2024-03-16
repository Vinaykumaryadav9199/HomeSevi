import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import BookingScreen from '../Screens/BookingScreen/BookingScreen'
import BusinessDetails from '../Screens/BusinessScreen/BusinessDetails'

const BookingNavigation = () => {
    const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
    <Stack.Screen name='Booking' component={BookingScreen} options={{ headerShown: false }} />
    <Stack.Screen name='BusinessDetails' component={BusinessDetails} options={{ headerShown: false }} />
  </Stack.Navigator>
  )
}

export default BookingNavigation