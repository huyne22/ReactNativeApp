import React from 'react';
import { View, Text, TouchableOpacity,StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';


export default function Home() {
  const navigation = useNavigation();


  return (
    <View style={styles.wrapper}>
      <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.header}>
        <Text style={styles.logoText}>Kaz Shipping Company</Text>
      </TouchableOpacity>


      <View style={styles.navigation}>
        <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.btn}>
          <Text style={styles.btnText}> Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Register')} style={[styles.btn, styles.register]}>
          <Text style={styles.btnText}> Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    minHeight: 50,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  header: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  logo: {
    maxHeight: 50,
  },
  logoText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#1190cb',
  },
  navigation: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  btn: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#1190cb',
    borderRadius: 20,
    marginRight: 10,
  },
  btnText: {
    color: '#fff',
    fontSize: 16,
  },
  register: {
    backgroundColor: 'orange',
  },
});
