import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import annaUniversity from "../../assets/annaUniversity.jpeg";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import env from "../../constants/urls";
import { useToast } from "react-native-toast-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { RFPercentage } from "react-native-responsive-fontsize";

let mainColor = "rgb(11,117,131)";
let placeholderTextColor = "#AFAFAF";

const LoginScreen = () => {
  let navigation = useNavigation();
  let toast = useToast();

  const [showPassword, setShowPassword] = useState(false);
  const [userName, setUserName] = useState(null);
  const [password, setPassword] = useState(null);

  const [userNameError, setUserNameError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async () => {
    if (userName === null || userName.length == 0) {
      return setUserNameError("Please Enter Register Number");
    } else if (password === null || password.length == 0) {
      return setPasswordError("Please Enter Password");
    }
    let payload = {
      userName,
      password,
    };
    await axios
      .post(`${env.CLIENT_URL}${env.wardenLogin}`, payload)
      .then((data) => {
        if (data.data.success) {
          toast.show(data.data.message, {
            type: "success",
            placement: "bottom",
            duration: 4000,
            offset: 30,
            animationType: "slide-in",
          });
          console.log(data.data.user)
          AsyncStorage.setItem("warden", data.data.user);
          navigation.navigate("/WardenHome");
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
          <Text style={styles.heading}>Warden</Text>
          <Text style={styles.subHead}>Login</Text>

          <View style={styles.inputgroup}>
            <Text style={styles.lable}>User Name :</Text>
            <TextInput
              placeholder="Enter Your User Name"
              style={styles.input}
              placeholderTextColor={placeholderTextColor}
              onChangeText={(text) => {
                setUserName(text);
                setUserNameError(null);
              }}
              value={userName}
              key={"warden"}
            />
            {userNameError != null ? (
              <Text style={{ color: "red" }}>{userNameError}</Text>
            ) : (
              ""
            )}
            <View>
              <Text style={styles.lable}>Password :</Text>
              <TextInput
                placeholder="Enter Your Password"
                style={styles.input}
                placeholderTextColor={placeholderTextColor}
                secureTextEntry={!showPassword}
                onChangeText={(text) => {
                  setPassword(text);
                  setPasswordError(null);
                }}
                value={password}
                inputMode="text"
              />
              {passwordError != null ? (
                <Text style={{ color: "red" }}>{passwordError}</Text>
              ) : (
                ""
              )}
              <MaterialCommunityIcons
                name={showPassword ? "eye" : "eye-off"}
                size={18}
                color="black"
                style={styles.icon}
                onPress={toggleShowPassword}
              />
            </View>
            <Text
              style={styles.forgetPass}
              onPress={() => navigation.navigate("/StudentLoginForget")}
            >
              Forget/Change Password
            </Text>
          </View>

          <View style={{ alignItems: "center" }}>
            <TouchableOpacity
              style={styles.buttonOutline}
              onPress={handleSubmit}
            >
              <Text style={styles.btn}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default LoginScreen;

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
    fontSize: RFPercentage(5),
    color: mainColor,
    marginTop: 15,
    fontWeight: "700",
  },
  subHead: {
    textAlign: "center",
    fontSize: RFPercentage(3),
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
    fontSize: RFPercentage(2),
  },
  inputgroup: {
    marginTop: 25,
    rowGap: 10,
  },
  lable: {
    fontWeight: "400",
  },
  input: {
    backgroundColor: "#D9D9D9",
    paddingStart: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "rgb(115,115,115)",
  },
  forgetPass: {
    textAlign: "right",
    marginVertical: 10,
    textDecorationLine: "underline",
  },
  icon: {
    position: "absolute",
    bottom: "22%",
    right: "4%",
  },
});
