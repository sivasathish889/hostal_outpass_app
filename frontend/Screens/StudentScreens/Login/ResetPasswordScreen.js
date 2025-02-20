import {
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import annaUniversity from "../../../assets/annaUniversity.jpeg";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { useToast } from "react-native-toast-notifications";
import env from "../../../constants/urls";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import axios from "axios";

let mainColor = "rgb(11,117,131)";
let placeholderTextColor = "#AFAFAF";

const ResetPasswordScreen = ({ route }) => {
  let navigation = useNavigation();
  let toast = useToast();

  const [newPassword, setNewPassword] = useState(null);
  const [confirmNewPassword, setConfirmNewPassword] = useState(null);
  const [newPasswordVisible, setNewPasswordVisible] = useState(null);
  const [confrimPasswordVisible, setConfirmPasswordVisible] = useState(null);
  const [showPassword, setShowPassword] = useState(false)

  const [newPasswordError, setNewPasswordError] = useState(null);
  const [confirmNewPasswordError, setConfirmNewPasswordError] = useState(null);

  let registerNumber = route.params.registerNumber;

  const toggleNewPasswordVisible = () => {
    setShowPassword(!showPassword)
    setNewPasswordVisible(!newPasswordVisible);
  };
  const toggleConfirmPasswordVisible = () => {
    setShowPassword(!showPassword)
    setConfirmPasswordVisible(!confrimPasswordVisible);
  };

  const handleSubmit =async () => {
    let payload = {
      registerNumber,
      newPassword,
      confirmNewPassword,
    };
    if (newPassword === null || newPassword.length == 0) {
      return setNewPasswordError("Please Enter New Password");
    } else if (confirmNewPassword === null || confirmNewPassword.length == 0) {
      return setConfirmNewPasswordError("Please Enter Confirm Password");
    }
    await axios.post(`${env.CLIENT_URL}${env.studentChangePassword}`,JSON.stringify(payload) )
      .then((data) => {
        if (data.data.success) {
          toast.show(data.data.message, {
            type: "success",
            placement: "bottom",
            duration: 4000,
            offset: 30,
            animationType: "slide-in",
          });
          navigation.navigate("/StudentLogin", {
            otp: data.data.Token,
            registerNumber: registerNumber,
          });
        } else {
          toast.show(data.data.message, {
            type: "danger",
            placement: "bottom",
            duration: 4000,
            offset: 30,
            animationType: "slide-in",
          });
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <ImageBackground source={annaUniversity} style={styles.backgroundImage}>
      <SafeAreaView style={styles.container}>
        <View style={styles.form}>
          <Text style={styles.heading}>Student</Text>
          <Text style={styles.subHead}>Reset Password</Text>

          <View style={styles.inputgroup}>
            <Text style={styles.lable}>New Password :</Text>
            <TextInput
              placeholder="Enter Your New Password"
              style={styles.input}
              placeholderTextColor={placeholderTextColor}
              secureTextEntry={!newPasswordVisible}
              onChangeText={(text) => {
                setNewPassword(text);
                setNewPasswordError(null);
              }}
              inputMode="text"
              />
             <MaterialCommunityIcons
              name={showPassword ? "eye" : "eye-off"}
              size={18}
              color="black"
              style={styles.hideIcon1}
              onPress={toggleNewPasswordVisible}
            />
            {newPasswordError != null ? (
              <Text style={{ color: "red" }}>{newPasswordError}</Text>
            ) : (
              ""
            )}
            <Text style={styles.lable}>Password :</Text>
            <TextInput
              placeholder="Enter Confirm Password"
              style={styles.input}
              placeholderTextColor={placeholderTextColor}
              secureTextEntry={!confrimPasswordVisible}
              onChangeText={(text) => {
                setConfirmNewPassword(text);
                setConfirmNewPasswordError(null);
              }}
              keyboardType="visible-password"
              inputMode="text"
              />
            <MaterialCommunityIcons
              name={showPassword ? "eye" : "eye-off"}
              size={18}
              color="black"
              style={styles.hideIcon2}
              onPress={toggleConfirmPasswordVisible}
            />
            {confirmNewPasswordError != null ? (
              <Text style={{ color: "red" }}>{confirmNewPasswordError}</Text>
            ) : (
              ""
            )}
          </View>

          <View style={{ alignItems: "center" }}>
            <TouchableOpacity
              style={styles.buttonOutline}
              onPress={handleSubmit}
            >
              <Text style={styles.btn}>Reset Password</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default ResetPasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  backgroundImage: {
    flex: 1,
  },
  form: {
    backgroundColor: "white",
    borderRadius: 20,
    paddingHorizontal: 30,
    width: "80%",
    backgroundColor: "rgb(171,171,171)",
  },
  heading: {
    textAlign: "center",
    fontSize: 35,
    color: mainColor,
    marginTop: 15,
    fontWeight: "700",
  },
  subHead: {
    textAlign: "center",
    fontSize: 20,
  },
  buttonOutline: {
    backgroundColor: mainColor,
    borderRadius: 5,
    padding: 10,
    paddingHorizontal: 40,
    borderBlockColor: "black",
    marginVertical: 20,
  },
  btn: {
    color: "white",
    fontSize: 15,
  },
  lable: {
    fontWeight: "400",
    fontSize: 16,
  },
  inputgroup: {
    marginTop: 25,
    rowGap: 15,
  },
  input: {
    backgroundColor: "#D9D9D9",
    paddingStart: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "rgb(115,115,115)",
  },
  hideIcon1: {
    position: "absolute",
    bottom: 100,
    right: 10,
  },
  hideIcon2: {
    position: "absolute",
    bottom: 10,
    right: 10,
  },
});
