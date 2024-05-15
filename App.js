

import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import 'react-native-gesture-handler'
// Import các màn hình
import Home from "./components/home/Home";
import OrderScreen from './screens/Order/OrderScreen';
import ListOrderScreen from './screens/Order/ListOrderScreen';
import ReviewScreen from './screens/Review/ReviewScreen'; 
import AuctionScreen from './screens/Auction/AuctionScreen'; 
import DrawerContainer from './components/home/DrawerContainer'; 
import ShipperScreen from './screens/Shipper/ShipperScreen'; 
import CustomerScreen from './screens/Customer/CustomerScreen'; 
import AdminScreen from './screens/Admin/AdminScreen';
import LoginScreen from './views/Auth/Login'; 
import RegisterScreen from './views/Auth/Register'; 
import HomeScreen from './views/Auth/HomeScreen';
import RegisterShipperScreen from './screens/Shipper/RegisterShipperScreen'; 

const Stack = createStackNavigator();

function MainNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleStyle: {
          fontWeight: 'bold',
          textAlign: 'center',
          alignSelf: 'center',
          flex: 1,
        },
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Order" component={OrderScreen} />
      <Stack.Screen name="ListOrderScreen" component={ListOrderScreen} />
      <Stack.Screen name="Review" component={ReviewScreen} />
      <Stack.Screen name="Auction" component={AuctionScreen} />
      <Stack.Screen name="Shipper" component={ShipperScreen} />
      <Stack.Screen name="Customer" component={CustomerScreen} />
      <Stack.Screen name="Admin" component={AdminScreen} /> 
      <Stack.Screen name="RegisterShipperScreen" component={RegisterShipperScreen} /> 
    </Stack.Navigator>
  );
}

const Drawer = createDrawerNavigator();

function DrawerStack() {
  return (
    <Drawer.Navigator
      drawerPosition="left"
      initialRouteName="Main"
      drawerStyle={{
        width: 250,
      }}
      screenOptions={{ headerShown: false }}
      drawerContent={({ navigation }) => <DrawerContainer navigation={navigation} />}
    >
      <Drawer.Screen name="Main" component={MainNavigator} />
      <Drawer.Screen name="Admin" component={AdminScreen} /> 
      <Drawer.Screen name="Customer" component={CustomerScreen} /> 
      <Drawer.Screen name="Shipper" component={ShipperScreen} /> 
    </Drawer.Navigator>
  );
}

export default function AppContainer() {
  return (
    <NavigationContainer>
      <DrawerStack />
    </NavigationContainer>
  );
}