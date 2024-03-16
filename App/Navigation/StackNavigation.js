import { View, Text } from 'react-native';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Welcome from '../Screens/Welcome';
import Login from '../Screens/Login';
import Signup from '../Screens/Signup';
import CategoryWiseBusiness from '../Screens/BusinessScreen/CategoryWiseBusiness';
import HomeNavigation from './HomeNavigation';
import auth from "@react-native-firebase/auth";
import InternetScreen from '../Screens/InternetScreen/InternetScreen';
import NetInfo from '@react-native-community/netinfo';
const Stack = createNativeStackNavigator();
const StackNavigation = () => {
  const [isuserLogin, setisuserLogin] = useState(false);
  const [connected, setConnected] = useState(false);
  useEffect(() => {
    const checkConnectivity = async () => {
      const netInfoState = await NetInfo.fetch();
      setConnected(netInfoState.isConnected);
    };

    const unsubscribe = NetInfo.addEventListener(state => {
      setConnected(state.isConnected);
    });

    checkConnectivity();

    return () => {
      unsubscribe();
    };
  }, []);


  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((user) => {
      setisuserLogin(!!user); // Set to true if user exists, otherwise false
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!isuserLogin && (
          <>
            <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }} />
            <Stack.Screen name='Login' component={connected ?Login :InternetScreen} options={{ headerShown: false }} />
            <Stack.Screen name='Signup' component={connected ? Signup:InternetScreen} options={{ headerShown: false }} />
          </>
        )}
        <Stack.Screen name='HomeNavigation' component={connected ? HomeNavigation :InternetScreen} options={{ headerShown: false }} />
        <Stack.Screen name='Business' component={CategoryWiseBusiness} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default StackNavigation;
