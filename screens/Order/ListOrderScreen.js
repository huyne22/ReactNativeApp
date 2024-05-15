import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList,Button,Alert,Modal,TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ListOrderScreen = () => {
    const [orders, setOrders] = useState([]);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [bidPrice, setBidPrice] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = await AsyncStorage.getItem('@token');
      if (!token) {
        console.log('Token không tồn tại');
        return;
      }

      const response = await fetch('https://luonghuy2k2.pythonanywhere.com/orders/order_not_auction/', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Không thể lấy danh sách đơn hàng đã tạo');
      }

      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error('Lỗi khi lấy danh sách đơn hàng:', error);
    }
  };

  const handleAuction = async () => {
    try {
      const token = await AsyncStorage.getItem('@token');
      if (!token) {
        console.log('Token không tồn tại');
        return;
      }
      const userType = await AsyncStorage.getItem('@user_type');
      if (userType !== 'shipper') {
        Alert.alert('User không phải là shipper, không thể sử dụng chức năng này');
        return;
      }
  
      const formData = new FormData();
      formData.append('order', selectedOrderId);
      formData.append('bid_price', bidPrice);
  
      const response = await fetch('https://luonghuy2k2.pythonanywhere.com/auctions/', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error('Không thể đấu giá cho đơn hàng này');
      }
  
      console.log('Đấu giá thành công');
      Alert.alert('Thông báo', 'Tạo đấu giá thành công');

      // Cập nhật lại danh sách đơn hàng sau khi đấu giá
      fetchOrders();
      setModalVisible(false);
      setBidPrice('');
    } catch (error) {
      console.error('Lỗi khi đấu giá:', error);
      Alert.alert('Lỗi', error.message || 'Không thể đấu giá cho đơn hàng này');
    }
  };
  

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <Text style={styles.shipper}>Shipper: {item.shipper ? item.shipper : 'Chưa có'}</Text>
      <Text style={styles.completed}>Completed: {item.is_completed ? 'Yes' : 'No'}</Text>
      <Button title="Đấu giá" onPress={() => { setSelectedOrderId(item.id); setModalVisible(true); }} />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={orders}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
          setBidPrice('');
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Nhập giá đấu giá:</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              placeholder="Nhập giá đấu giá"
              value={bidPrice}
              onChangeText={(text) => setBidPrice(text)}
              />
              <View style={styles.buttonContainer}>
                <Button title="Xác nhận" onPress={handleAuction} />
                <Button title="Hủy" onPress={() => { setModalVisible(false); setBidPrice(''); }} />
              </View>
            </View>
          </View>
        </Modal>
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
    title: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 5,
    },
    description: {
      fontSize: 14,
    },
    shipper: {
      fontSize: 14,
      color: 'blue',
    },
    completed: {
      fontSize: 14,
      color: 'green',
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      backgroundColor: '#fff',
      borderRadius: 10,
      padding: 20,
      width: '80%',
    },
    modalTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    input: {
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 5,
      padding: 10,
      marginBottom: 10,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
  });
  
  export default ListOrderScreen;
