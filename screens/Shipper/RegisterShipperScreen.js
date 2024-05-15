import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const RegisterShipperForm = ({ onSubmit }) => {
  const [cccd, setCccd] = useState('');
  const [avatarUri, setAvatarUri] = useState('');

  const handleUploadAvatar = async () => {
    // Xử lý chức năng tải lên avatar ở đây
  };

  const handleSubmit = () => {
    // Gửi thông tin cần thiết cho việc đăng ký thành Shipper lên hàm cha
    onSubmit({ cccd, avatarUri });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nhập số CCCD"
        value={cccd}
        onChangeText={setCccd}
      />
      <TouchableOpacity style={styles.button} onPress={handleUploadAvatar}>
        <Text style={styles.buttonText}>Tải lên Avatar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Đăng ký thành Shipper</Text>
      </TouchableOpacity>
    </View>
  );
};

const RegisterShipperScreen = () => {
  const handleRegisterShipper = async ({ cccd, avatarUri }) => {
    try {
      const token = await AsyncStorage.getItem('@token');
      if (!token) {
        console.log('Token không tồn tại');
        navigation.replace('Login');
        return;
      }
  
      const response = await fetch('https://luonghuy2k2.pythonanywhere.com/shippers/', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cccd,
          avatar: avatarUri,
        }),
      });
  
      if (!response.ok) {
        throw new Error('Không thể đăng ký thành Shipper');
      }
      console.log('Đăng ký thành Shipper thành công');
      Alert.alert('Đăng ký thành Shipper thành công');
    } catch (error) {
      console.error('Lỗi khi đăng ký thành Shipper:', error);
      Alert.alert('Lỗi', error.message || 'Không thể đăng ký thành Shipper');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Đăng ký thành Shipper</Text>
      <RegisterShipperForm onSubmit={handleRegisterShipper} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: '80%',
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
    width: '80%',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default RegisterShipperScreen;
