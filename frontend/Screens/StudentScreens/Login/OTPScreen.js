import {
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import annaUniversity from "../../../assets/annaUniversity.jpeg";
import { useNavigation } from "@react-navigation/native";
import { useToast } from "react-native-toast-notifications";
import env from "../../../constants/urls";
import axios from "axios";

let mainColor = "rgb(11,117,131)";
let placeholderTextColor = "#AFAFAF";

const OTPScreen = ({ route }) => {
  let [otp, setOtp] = useState(null);
  let toast = useToast()
  let backendOtp = route.params.otp;
  let registerNumber = route.params.registerNumber;
  let navigation = useNavigation();

    let payload = {
      backendOtp,
      otp
    }
  const handleSubmit = async () => {
    await axios.post(`${env.CLIENT_URL}${env.studentLoginVerify}`, JSON.stringify(payload))
    .then((data) => {
      if (data.data.success) {
        toast.show(data.data.message, {
          type: "success",
          placement: "bottom",
          duration: 4000,
          offset: 30,
          animationType: "slide-in",
        });
        navigation.navigate("/StudentResetPassword",{
          registerNumber : registerNumber
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
          <Text style={styles.subHead}>Forget Password</Text>

          <View style={styles.inputgroup}>
            <Text style={styles.lable}>OTP</Text>
            <TextInput
              placeholder="Enter Your OTP"
              style={styles.input}
              placeholderTextColor={placeholderTextColor}
              keyboardType="number-pad"
              onChangeText={(text) => setOtp(text)}
              inputMode="numeric"
              />
          </View>
          <View style={{ alignItems: "center", marginVertical: 10 }}>
            <TouchableOpacity
              style={styles.buttonOutline}
              onPress={handleSubmit}
            >
              <Text style={styles.btn}>Verify OTP</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default OTPScreen;

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  form: {
    backgroundColor: "white",
    borderRadius: 20,
    paddingHorizontal: 20,
    minWidth: "80%",
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
    marginBottom: 30,
  },
  input: {
    backgroundColor: "#D9D9D9",
    paddingStart: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "rgb(115,115,115)",
    width: "80%",
    alignSelf: "center",
  },
  lable: {
    textAlign: "center",
    marginBottom: 10,
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
});
