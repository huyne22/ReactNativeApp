import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RegisterShipperScreen from '../../screens/Shipper/RegisterShipperScreen'; 
const ProfileScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [userInfo, setUserInfo] = useState(null);
  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const token = await AsyncStorage.getItem('@token');
        if (token) {
          const response = await fetch('https://luonghuy2k2.pythonanywhere.com/users/current/', {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const data = await response.json();
          setUserInfo(data);
          setIsLoading(false);
        } else {
          console.log('Token không tồn tại');
          navigation.replace('Login');
        }
      } catch (error) {
        console.error('Lỗi khi lấy thông tin người dùng:', error);
        navigation.replace('Login');
      }
    };

    getUserInfo();
  }, []);



  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('@token');
      await AsyncStorage.removeItem('@user_type');
      console.log('Token và user type đã được xóa');
      navigation.replace('Login');
    } catch (error) {
      console.error('Lỗi khi đăng xuất:', error);
    }
  };

  const handleUploadAvatar = async () => {
    try {
      const token = await AsyncStorage.getItem('@token');
      if (!token) {
        console.log('Token không tồn tại');
        navigation.replace('Login');
        return;
      }
      const userType = await AsyncStorage.getItem('@user_type');
        if (userType !== 'customer') {
        Alert.alert('User không phải là customer, không thể sử dụng chức năng này');
        return;
        }

  
      // Sử dụng thư viện react-native-document-picker để chọn tệp ảnh từ thiết bị
      const image = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
  
      const formData = new FormData();
      formData.append('avatar', {
        uri: image.uri,
        type: image.type,
        name: image.name,
      });
  
      const response = await fetch('https://luonghuy2k2.pythonanywhere.com/users/update/', {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error('Không thể tải lên avatar');
      }
  
      console.log('Avatar đã được tải lên thành công');
    } catch (error) {
      console.error('Lỗi khi tải lên avatar:', error);
      Alert.alert('Lỗi', error.message || 'Không thể tải lên avatar');
    }
  };
  
  const handleRegisterShipper = async () => {
    try {
      const token = await AsyncStorage.getItem('@token');
      if (!token) {
        console.log('Token không tồn tại');
        navigation.replace('Login');
        return;
      }
      const userType = await AsyncStorage.getItem('@user_type');
      if (userType !== 'customer') {
        Alert.alert('User không phải là customer, không thể sử dụng chức năng này');
        return;
      }
      
        navigation.navigate('RegisterShipperScreen'); 
      
    } catch (error) {
      console.error('Lỗi khi đăng ký thành Shipper:', error);
      Alert.alert('Lỗi', error.message || 'Không thể đăng ký thành Shipper');
    }
  };
  

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <View style={styles.profileContainer}>
          <Text style={styles.header}>User Info:</Text>
          <View style={styles.userInfoContainer}>
            <Text style={styles.userInfoLabel}>Username:</Text>
            <Text style={styles.userInfoText}>{userInfo.username}</Text>
          </View>
          <View style={styles.userInfoContainer}>
            <Text style={styles.userInfoLabel}>Email:</Text>
            <Text style={styles.userInfoText}>{userInfo.email}</Text>
          </View>
          <View style={styles.userInfoContainer}>
            <Text style={styles.userInfoLabel}>User Type:</Text>
            <Text style={styles.userInfoText}>{userInfo.user_type}</Text>
          </View>
          <TouchableOpacity style={styles.uploadButton} onPress={handleUploadAvatar}>
            <Text style={styles.buttonText}>Upload Avatar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.registerButton} onPress={handleRegisterShipper}>
            <Text style={styles.buttonText}>Register as Shipper</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
          {/* {avatarUrl && <Image source={{ uri: avatarUrl }} style={styles.avatar} />} */}
        </View>
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
    profileContainer: {
      backgroundColor: '#ffffff',
      padding: 20,
      borderRadius: 10,
      elevation: 5,
      width: '80%',
      alignItems: 'center',
    },
    header: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    userInfoContainer: {
      flexDirection: 'row',
      marginBottom: 10,
    },
    userInfoLabel: {
      fontWeight: 'bold',
      marginRight: 5,
    },
    userInfoText: {
      flex: 1,
    },
    uploadButton: {
      marginTop: 10,
      padding: 10,
      backgroundColor: 'blue',
      borderRadius: 5,
      alignItems: 'center',
    },
    registerButton: {
      marginTop: 10,
      padding: 10,
      backgroundColor: 'green',
      borderRadius: 5,
      alignItems: 'center',
    },
    logoutButton: {
      marginTop: 10,
      padding: 10,
      backgroundColor: 'red',
      borderRadius: 5,
      alignItems: 'center',
    },
    buttonText: {
      color: 'white',
      fontSize: 16,
    },
    avatar: {
      marginTop: 20,
      width: 100,
      height: 100,
      borderRadius: 50,
    },
  });
  
  export default ProfileScreen;