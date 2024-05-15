import React from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';

const DrawerContainer = ({ navigation }) => {
  const menuData = [
    { id: 1, title: 'Home', route: 'Home' },
    { id: 2, title: 'Orders', route: 'Order' },
    { id: 3, title: 'Reviews', route: 'Review' },
    { id: 4, title: 'Auctions', route: 'Auction' },
    { id: 5, title: 'Shippers', route: 'Shipper' },
    { id: 6, title: 'Customers', route: 'Customer' },
    { id: 7, title: 'Admin', route: 'Admin' },
  ];

  const renderMenuItem = ({ item }) => (
    <TouchableOpacity
      style={{ padding: 10 }}
      onPress={() => navigation.navigate(item.route)}
    >
      <Text>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View>
      <View style={{ padding: 20, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
        <Text>Drawer Header</Text>
      </View>
      
      <FlatList
        data={menuData}
        renderItem={renderMenuItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default DrawerContainer;
