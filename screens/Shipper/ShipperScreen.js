import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, FlatList, Alert,StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ShipperScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [shipperList, setShipperList] = useState([]);

  useEffect(() => {
    fetchShippers();
  }, []);

  const fetchShippers = async () => {
    try {
      const token = await AsyncStorage.getItem('@token');
      if (!token) {
        console.log('Token không tồn tại');
        // Xử lý khi không có token
        return;
      }
      const response = await fetch('https://luonghuy2k2.pythonanywhere.com/shippers/', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Không thể lấy danh sách Shipper');
      }

      const data = await response.json();
      setShipperList(data);
      setIsLoading(false);
    } catch (error) {
      console.error('Lỗi khi lấy danh sách Shipper:', error);
      Alert.alert('Lỗi', error.message || 'Không thể lấy danh sách Shipper');
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.shipperContainer}>
      <Text style={styles.shipperId}>Shipper ID: {item.id}</Text>
    <Text style={styles.userInfo}>User ID: <Text style={styles.userInfoValue}>{item.user}</Text></Text>
    <Text style={styles.userInfo}>Avatar: <Text style={styles.userInfoValue}>{item.avatar}</Text></Text>
    <Text style={styles.userInfo}>CCCD: <Text style={styles.userInfoValue}>{item.cccd}</Text></Text>
    <Text style={styles.userInfo}>Confirmed: <Text style={[styles.userInfoValue, { color: item.is_confirmed ? 'green' : 'red' }]}>{item.is_confirmed ? 'Yes' : 'No'}</Text></Text>
  </View>
  );

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={shipperList}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.flatListContainer}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flatListContainer: {
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  shipperContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    elevation: 3,
  },
  shipperId: {
    fontWeight: 'bold',
  },
  userInfo: {
    marginBottom: 5,
    color: 'blue', 
  },
  userInfoValue: {
    fontWeight: 'bold',
    color: 'black', 
  },
});

export default ShipperScreen;