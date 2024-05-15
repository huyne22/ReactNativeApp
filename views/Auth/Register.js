import { Alert, Button, TextInput, TouchableOpacity } from "react-native";
import { View, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import * as Yup from "yup";
import { useState } from "react";


export default function RegisterScreen({ navigation }) {
  const [textInputValues, setTextInputValues] = useState({
    username: "",
    email: "",
    password: "",
    retypePassword: "",
  });

  const handleInputChange = (inputName, text) => {
    setTextInputValues({
      ...textInputValues,
      [inputName]: text,
    });
  };

  const handleSubmit = () => {
    
    fetch("https://luonghuy2k2.pythonanywhere.com/register/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(textInputValues),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.id != null) {
          Alert.alert(
            "Đăng ký thành công",
            "Mời bạn đăng nhập",
            [{ text: "OK", onPress: () => navigation.replace("Login") }],
            { cancelable: false }
          );
        } else {
          throw new Error("Đăng ký thất bại");
        }
      })
      .catch((error) => {
        Alert.alert(
          "Đăng ký tài khoản thất bại!",
          "Mời bạn đăng ký lại",
          [{ text: "OK" }],
          { cancelable: false }
        );
      });
  };
  return (
   
    <View style={styles.container}>
      <View>
        <Text style={[styles.text, { textAlign: "left", marginBottom: 0 }]}>
          Hi!
        </Text>
        <Text style={[{ marginBottom: 30 }, styles.content]}>
          Create a new account
        </Text>
      </View>

      <View style={styles.row}>
        <View style={styles.icon}>
          <Icon name="user" size={25} color={"white"}></Icon>
        </View>
        <TextInput
          style={styles.input}
          placeholder="User Name"
          onChangeText={(text) => handleInputChange("username", text)}
        ></TextInput>
      </View>

      <View style={styles.row}>
        <View style={styles.icon}>
          <Icon name="user" size={25} color={"white"}></Icon>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={(text) => handleInputChange("email", text)}
        
        ></TextInput>
      </View>
    

      <View style={styles.row}>
        <View style={styles.icon}>
          <Icon name="lock" size={25} color={"white"}></Icon>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Password"
          onChangeText={(text) => handleInputChange("password", text)}
          secureTextEntry={true}
      
        ></TextInput>
      </View>
    

      <View style={styles.row}>
        <View style={styles.icon}>
          <Icon name="lock" size={25} color={"white"}></Icon>
        </View>
        <TextInput
          style={styles.input}
          secureTextEntry={true}
          placeholder="Confirm Password"
          onChangeText={(text) => handleInputChange("retypePassword", text)}
          
        ></TextInput>
      </View>
      

      <View style={styles.row}>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={handleSubmit}
        >
          <Text style={{ fontSize: 16, color: "white" }}>Sign up</Text>
        </TouchableOpacity>
      </View>

      <View style={{ margin: 20, flexDirection: "row" }}>
        <Text style={{ paddingRight: 5, fontSize: 14 }}>
          Already have an account?
        </Text>
        <TouchableOpacity
          style={{ paddingTop: 0 }}
          onPress={() => {
            navigation.replace("Login");
          }}
        >
          <Text style={{ fontSize: 14, color: "#005FFF" }}>Login here</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#005FFF",
  },
  content: {
    fontSize: 16,
    color: "#005FFF",
  },
  icon: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1.5,
    backgroundColor: "#005FFF",
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  input: {
    backgroundColor: "#dadce0",
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    flex: 8,
    paddingLeft: 10,
  },
  row: {
    margin: 10,
    width: "90%",
    height: 50,
    flexDirection: "row",
  },
  buttonContainer: {
    backgroundColor: "#005FFF",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
  errorTxt: {
    fontSize: 12,
    color: "#FF0D10",
  },
});