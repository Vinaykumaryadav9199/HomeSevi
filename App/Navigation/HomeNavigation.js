import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../Screens/HomeScreen/HomeScreen';
import ChatlogScreen from '../Screens/ChatsScreen/ChatlogScreen';
import BookingScreen from '../Screens/BookingScreen/BookingScreen';
import ProfileScreen from '../Screens/ProfileScreen/ProfileScreen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Iconf from 'react-native-vector-icons/FontAwesome'
import BookingNavigation from './BookingNavigation';

import Colors from '../Utils/Colors';
import HomeStackNavigation from './HomeStackNavigation';
import ChatScreenNavigation from './ChatScreenNavigation';

const Tab = createBottomTabNavigator();

const HomeNavigation = () => {
    return (

        <Tab.Navigator screenOptions={{ headerShown: false, tabBarActiveTintColor: Colors.PRIMARY }}>
            <Tab.Screen name="Home" component={HomeStackNavigation} options={{
                tabBarIcon: ({focused ,color}) => (<Icon name="home" size={28} color={focused ? Colors.PRIMARY :color}/>
                )
               ,
               tabBarLabel:({color ,focused })=>(<Text style={{color:focused ?Colors.PRIMARY:color , fontSize:12}}>Home</Text>) 
            }} />
            <Tab.Screen name="BookingNavigation" component={BookingNavigation} 
            options={{
                tabBarIcon: ({focused ,color}) => (<Icon name="bookmark" size={28} color={focused ? Colors.PRIMARY :color}/>
                )
               ,
               tabBarLabel:({color ,focused })=>(<Text style={{color:focused ?Colors.PRIMARY:color , fontSize:12}}>Booking</Text>) 
            }}/>
             <Tab.Screen name="ChatScreenNavigation" component={ChatScreenNavigation} 
            options={{
                tabBarIcon: ({focused ,color}) => (<Icon name="chat-processing" size={28} color={focused ? Colors.PRIMARY :color}/>
                )
               ,
               tabBarLabel:({color ,focused })=>(<Text style={{color:focused ?Colors.PRIMARY:color , fontSize:12}}>Chat</Text>) 
            }}/>
            <Tab.Screen name="Profile" component={ProfileScreen}
            options={{
                tabBarIcon: ({focused ,color}) => (<Iconf name="user-circle-o" size={26} color={focused ? Colors.PRIMARY :color}/>
                )
               ,
               tabBarLabel:({color ,focused })=>(<Text style={{color:focused ?Colors.PRIMARY:color , fontSize:12}}>Profile</Text>) 
            }} />
        </Tab.Navigator>
    )
}

export default HomeNavigation

const styles = StyleSheet.create({})