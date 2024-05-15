import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, FlatList, Button, Alert,StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ConfirmShipperScreen = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [shipperList, setShipperList] = useState([]);
    const [selectedShipper, setSelectedShipper] = useState(null);
    useEffect(() => {
        fetchShipperList();
      }, []);
      const fetchShipperList = async () => {
        try {
          const token = await AsyncStorage.getItem('@token');
          if (!token) {
            console.log('Token không tồn tại');
            // Xử lý khi không có token
            return;
          }
          const response = await fetch(`https://luonghuy2k2.pythonanywhere.com/shippers/`, {
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
      const handleConfirmShipper = async () => {
        if (!selectedShipper) {
          Alert.alert('Thông báo', 'Vui lòng chọn một shipper trước khi xác nhận');
          return;
        }
    
        try {
          const token = await AsyncStorage.getItem('@token');
          if (!token) {
            console.log('Token không tồn tại');
            // Xử lý khi không có token
            return;
          }
          const userType = await AsyncStorage.getItem('@user_type');
            if (userType !== 'admin') {
                Alert.alert('User không phải là customer, không thể sử dụng chức năng này');
                return;
            }
    
          const response = await fetch(`https://luonghuy2k2.pythonanywhere.com/shippers/${selectedShipper.id}/confirm_shipper/`, {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ shipperId: selectedShipper.id }),
          });
    
          if (!response.ok) {
            throw new Error('Không thể xác nhận Shipper');
          }
    
          // Xử lý khi xác nhận thành công, có thể cập nhật lại danh sách shipper
          console.log('Xác nhận Shipper thành công');
          Alert.alert("Xác nhận Shipper thành công")
          // Cập nhật lại danh sách shipper sau khi xác nhận
          fetchShipperList();
          setSelectedShipper(null);
        } catch (error) {
          console.error('Lỗi khi xác nhận Shipper1:', error);
          Alert.alert('Lỗi', error.message || 'Không thể xác nhận Shipper');
        }
      };
      const renderItem = ({ item }) => (
        <View style={styles.shipperContainer}>
          <Text style={styles.shipperId}>Shipper ID: {item.id}</Text>
          <Text style={styles.userInfo}>User ID: <Text style={styles.userInfoValue}>{item.user}</Text></Text>
          <Text style={styles.userInfo}>Avatar: <Text style={styles.userInfoValue}>{item.avatar}</Text></Text>
          <Text style={styles.userInfo}>CCCD: <Text style={styles.userInfoValue}>{item.cccd}</Text></Text>
          <Text style={styles.userInfo}>Confirmed: <Text style={[styles.userInfoValue, { color: item.is_confirmed ? 'green' : 'red' }]}>{item.is_confirmed ? 'Yes' : 'No'}</Text></Text>
          <Button title="Chọn" onPress={() => setSelectedShipper(item)} />
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
          {selectedShipper && (
            <Button title="Xác nhận Shipper" onPress={handleConfirmShipper} />
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
  shipperContainer: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  shipperId: {
    fontWeight: 'bold',
  },
  userInfo: {
    marginTop: 5,
  },
  userInfoValue: {
    fontWeight: 'bold',
    color: '#333',
  },
  flatListContainer: {
    paddingHorizontal: 10,
    paddingTop: 10,
  },
});

export default ConfirmShipperScreen;