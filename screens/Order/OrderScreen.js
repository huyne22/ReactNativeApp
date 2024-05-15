import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert,TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createStackNavigator } from '@react-navigation/stack';
import ListOrderScreen from './ListOrderScreen';
const Stack = createStackNavigator();

const OrderScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const goToOrderList = () => {
    navigation.navigate('ListOrderScreen');
  };
  const handleCreateOrder = async () => {
    try {
      const token = await AsyncStorage.getItem('@token');
      if (!token) {
        console.log('Token không tồn tại');
        navigation.replace('Login');
        return;
      }
  
      const response = await fetch('https://luonghuy2k2.pythonanywhere.com/orders/', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          description,
        }),
      });
  
      if (!response.ok) {
        throw new Error('Không thể tạo đơn hàng');
      }
  
      const data = await response.json();
      console.log('New order created:', data);
      setOrders([...orders, data]);
      setOrderCreated(true);
    } catch (error) {
      Alert.alert('Success',  'Tạo đơn hàng thành công');
    }
  };

  

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nhập tiêu đề đơn hàng"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Nhập mô tả đơn hàng"
        value={description}
        onChangeText={setDescription}
      />
      <TouchableOpacity style={styles.button} onPress={handleCreateOrder}>
        <Text style={styles.buttonText}>Tạo đơn hàng mới</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={goToOrderList}>
        <Text style={styles.buttonText}>Xem danh sách đơn hàng</Text>
      </TouchableOpacity>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          data={orders}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
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
});

export default OrderScreen;