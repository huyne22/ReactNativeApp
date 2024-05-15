import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList,Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuctionScreen = () => {
  const [auctions, setAuctions] = useState([]);

  useEffect(() => {
    fetchAuctions();
  }, []);

  const fetchAuctions = async () => {
    try {
      const token = await AsyncStorage.getItem('@token');
      if (!token) {
        console.log('Token không tồn tại');
        return;
      }
      const userType = await AsyncStorage.getItem('@user_type');
      if (userType !== 'customer') {
        Alert.alert('User không phải là customer, không thể sử dụng chức năng này');
        return;
      }

     const response = await fetch('https://luonghuy2k2.pythonanywhere.com/auctions/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Không thể lấy danh sách bài đấu giá');
      }
      const data = await response.json();
      setAuctions(data);
    } catch (error) {
      console.error('Lỗi khi lấy danh sách bài đấu giá:', error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.order}>Order: {item.order}</Text>
      <Text style={styles.shipper}>Shipper: {item.shipper}</Text>
      <Text style={styles.price}>Price: {item.bid_price}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={auctions}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  itemContainer: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  shipper: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 14,
    color: 'green',
  },
  order: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AuctionScreen;
