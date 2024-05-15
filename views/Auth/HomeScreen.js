

import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import OrderScreen from '../../screens/Order/OrderScreen';
import ListOrderScreen from '../../screens/Order/ListOrderScreen';
import ReviewScreen from '../../screens/Review/ReviewScreen';
import AuctionScreen from '../../screens/Auction/AuctionScreen';
import ShipperScreen from '../../screens/Shipper/ShipperScreen';
import ConfirmShipperScreen from '../../screens/Shipper/ConfirmShipperScreen '; 
import ProfileScreen from './ProfileScreen';
import RegisterShipperScreen from '../../screens/Shipper/RegisterShipperScreen';
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const OrdersStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Orders" component={OrderScreen} />
      <Stack.Screen name="ListOrder" component={ListOrderScreen} />
    </Stack.Navigator>
  );
};

const ShippersStack = () => {
  return (
    <Stack.Navigator>
      {/* <Stack.Screen name="Shippers" component={ShipperScreen} /> */}
      <Stack.Screen name="ConfirmShipperScreen" component={ConfirmShipperScreen} />
    </Stack.Navigator>
  );
};
const ProfileStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="RegisterShipperScreen" component={RegisterShipperScreen} />
    </Stack.Navigator>
  );
};

const HomeScreen = ({ route  }) => {
  const { userData } = route.params;
  return (
   <Tab.Navigator>
      <Tab.Screen name="HomeProfile" component={ProfileStack} initialParams={{ userData }} />
      <Tab.Screen name="HomeOrders" component={OrdersStack} initialParams={{ userData }} />
      <Tab.Screen name="HomeReviews" component={ReviewScreen} initialParams={{ userData }} />
      <Tab.Screen name="HomeShippers" component={ShippersStack} initialParams={{ userData }} />
      <Tab.Screen name="HomeAuctions" component={AuctionScreen} initialParams={{ userData }} />
    </Tab.Navigator>
  );
};

export default HomeScreen;

