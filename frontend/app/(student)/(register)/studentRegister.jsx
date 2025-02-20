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
import annaUniversity from "@/assets/annaUniversity.jpeg";
import url from "@/constants/urls";
import { Dropdown } from "react-native-element-dropdown";
import { useToast } from "react-native-toast-notifications";
import axios from "axios";
import { useNavigation } from "expo-router";
import { hp, wp } from "@/helpers/dimensions"
import themes from "@/constants/themes";
import Spinner from "react-native-loading-spinner-overlay";


const StudentRegister = () => {
  const [isFocus, setIsFocus] = useState(false);
  const [spinnerVisible, setSpinnerVisible] = useState(false)

  let [name, setName] = useState(null);
  let [registerNumber, setRegisterNumber] = useState(null);
  let [department, setDepartment] = useState(null);
  let [year, setYear] = useState(null);
  let [phoneNumber, setPhoneNumber] = useState(null);
  let [parentNumber, setParentNumber] = useState(null);
  let [eMail, setEMail] = useState(null);
  let [district, setDistrict] = useState(null);
  let [password, setPassword] = useState(null);
  let [confirmPassword, setConfirmPassword] = useState(null);

  let [nameError, setNameError] = useState(null);
  let [registerNumberError, setRegisterNumberError] = useState(null);
  let [departmentError, setDepartmentError] = useState(null);
  let [yearError, setYearError] = useState(null);
  let [phoneNumberError, setPhoneNumberError] = useState(null);
  let [parentNumberError, setParentNumberError] = useState(null);
  let [eMailError, setEMailError] = useState(null);
  let [districtError, setDistrictError] = useState(null);
  let [passwordError, setPasswordError] = useState(null);
  let [confirmPasswordError, setConfirmPasswordError] = useState(null);

  const toast = useToast();
  let navigation = useNavigation();

  const handleSubmit = async () => {
    // Form Validationn
    if (name === null || name.length == 0) {
      return setNameError("Please Enter Your name");
    } else if (registerNumber === null || registerNumber.length == 0) {
      return setRegisterNumberError("Please Enter RegisterNumber");
    } else if (department === null || department.length == 0) {
      return setDepartmentError("Please Enter Your Department");
    } else if (year === null || year.length == 0) {
      return setYearError("Please Enter Your Year");
    } else if (phoneNumber === null || phoneNumber.length == 0) {
      return setPhoneNumberError("Please Enter Your Phone Number");
    } else if (parentNumber === null || parentNumber.length == 0) {
      return setParentNumberError("Please Enter Your Parent Number");
    } else if (eMail === null || eMail.length == 0) {
      return setEMailError("Please Enter Your e-mail");
    } else if (district === null || district.length == 0) {
      return setDistrictError("Please Enter Your District");
    } else if (password === null || password.length == 0) {
      return setPasswordError("Please Enter Your Password");
    } else if (confirmPassword === null || confirmPassword.length == 0) {
      return setConfirmPasswordError("Please Enter Confirm Password");
    }

    let payload = {
      name,
      registerNumber,
      department,
      year,
      phoneNumber,
      parentNumber,
      eMail,
      district,
      password,
      confirmPassword,
    };
    setSpinnerVisible(true)
    axios.post(`${url.CLIENT_URL}${url.studentRegister}`, payload)
      .then((data) => {
        if (data.data.success) {
          toast.show(data.data.message, {
            type: "success",
            placement: "bottom",
            duration: 4000,
            offset: 30,
            animationType: "slide-in",
          });
          navigation.navigate("(student)/(register)/registerOTP", {
            token: data.data.Token,
          });
          setSpinnerVisible(false)
        } else {
          toast.show(data.data.message, {
            type: "danger",
            placement: "bottom",
            duration: 4000,
            offset: 30,
            animationType: "slide-in",
          });
          setSpinnerVisible(false)

        }
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <ImageBackground source={annaUniversity} style={styles.backgroundImage}>
      <SafeAreaView style={styles.container}>
        <Spinner
          visible={spinnerVisible}
          textContent={"Loading..."}
          textStyle={{ color: "#FFF" }}
        />
        <View style={styles.form}>
          <Text style={styles.mainHead}>Student</Text>
          <Text style={styles.subHead}>Register</Text>

          <View style={styles.inputGroups}>
            <Text style={styles.label}>Name :</Text>
            <TextInput
              placeholder="Enter Your Name"
              style={styles.input}
              placeholderTextColor={themes.placeholderTextColor}
              onChangeText={(text) => {
                setName(text);
                setNameError(null);
              }}
              value={name}
              inputMode="text"
            />
            {nameError != null ? (
              <Text style={styles.errorText}>{nameError}</Text>
            ) : (
              ""
            )}
          </View>

          <View style={styles.inputGroups}>
            <Text style={styles.label}>Register Number :</Text>
            <TextInput
              placeholder="Enter Your Regsiter Number"
              style={styles.input}
              placeholderTextColor={themes.placeholderTextColor}
              keyboardType="number-pad"
              onChangeText={(text) => {
                setRegisterNumber(text);
                setRegisterNumberError(null);
              }}
              value={registerNumber}
              inputMode="numeric"
            />
            {registerNumberError != null ? (
              <Text style={styles.errorText}>{registerNumberError}</Text>
            ) : (
              ""
            )}
          </View>

          <View style={styles.inputRows}>
            <View style={styles.inputGrid}>
              <Text style={styles.label}>Department :</Text>
              <TextInput
                placeholder="Enter Your Department"
                style={styles.input}
                placeholderTextColor={themes.placeholderTextColor}
                onChangeText={(text) => {
                  setDepartment(text);
                  setDepartmentError(null);
                }}
                value={department}
                inputMode="text"
              />
              {departmentError != null ? (
                <Text style={styles.errorText}>{departmentError}</Text>
              ) : (
                ""
              )}
            </View>

            <View style={styles.inputGrid}>
              <Text style={styles.label}>Year :</Text>
              <Dropdown
                style={[styles.dropdown]}
                data={[
                  { label: "I ", value: "1" },
                  { label: "II ", value: "2" },
                  { label: "III ", value: "3" },
                  { label: "IV ", value: "4" },
                ]}
                placeholder="Select Year"
                maxHeight={100}
                labelField="label"
                valueField="value"
                value={year}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={(item) => {
                  setYear(item.value);
                  setIsFocus(false);
                  setYearError(null);
                }}
                placeholderStyle={{
                  color: themes.placeholderTextColor,
                  paddingStart: 10,
                  fontSize: hp(1.6)
                }}
                itemContainerStyle={{ borderRadius: 10 }}
              />
              {yearError != null ? (
                <Text style={styles.errorText}>{yearError}</Text>
              ) : (
                ""
              )}
            </View>
          </View>

          <View style={styles.inputGroups}>
            <Text style={styles.label}>Phone Number :</Text>
            <TextInput
              placeholder="Enter Your Phone Number"
              style={styles.input}
              placeholderTextColor={themes.placeholderTextColor}
              keyboardType="number-pad"
              onChangeText={(text) => { setPhoneNumber(text); setPhoneNumberError(null) }}
              value={phoneNumber}
              inputMode="numeric"
            />
            {phoneNumberError != null ? (
              <Text style={styles.errorText}>{phoneNumberError}</Text>
            ) : (
              ""
            )}
          </View>

          <View style={styles.inputGroups}>
            <Text style={styles.label}>Parent Number :</Text>
            <TextInput
              placeholder="Enter Your Parent Number "
              style={styles.input}
              keyboardType="number-pad"
              placeholderTextColor={themes.placeholderTextColor}
              onChangeText={(text) => { setParentNumber(text); setParentNumberError(null) }}
              value={parentNumber}
              inputMode="numeric"
            />
            {parentNumberError != null ? (
              <Text style={styles.errorText}>{parentNumberError}</Text>
            ) : (
              ""
            )}
          </View>
          <View style={styles.inputGroups}>
            <Text style={styles.label}>E-mail :</Text>
            <TextInput
              placeholder="Enter Your E-mail"
              style={styles.input}
              placeholderTextColor={themes.placeholderTextColor}
              onChangeText={(text) => { setEMail(text); setEMailError(null) }}
              value={eMail}
              keyboardType="email-address"
              inputMode="email"
            />
            {eMailError != null ? (
              <Text style={styles.errorText}>{eMailError}</Text>
            ) : (
              ""
            )}
          </View>

          <View style={styles.inputGroups}>
            <Text style={styles.label}>District :</Text>
            <TextInput
              placeholder="Enter Your District "
              style={styles.input}
              placeholderTextColor={themes.placeholderTextColor}
              onChangeText={(text) => { setDistrict(text); setDistrictError(null) }}
              value={district}
              inputMode="text"
            />
            {districtError != null ? (
              <Text style={styles.errorText}>{districtError}</Text>
            ) : (
              ""
            )}
          </View>
          <View style={styles.inputRows}>
            <View style={styles.inputGrid}>
              <Text style={styles.label}>Password :</Text>
              <TextInput
                placeholder="Enter Your Password"
                style={styles.input}
                placeholderTextColor={themes.placeholderTextColor}
                onChangeText={(text) => { setPassword(text); setPasswordError(null) }}
                secureTextEntry
                value={password}
                inputMode="text"
              />
              {passwordError != null ? (
                <Text style={styles.errorText}>{passwordError}</Text>
              ) : (
                ""
              )}
            </View>

            <View style={styles.inputGrid}>
              <Text style={styles.label}>Confirm Password :</Text>
              <TextInput
                placeholder="Enter Confirm Password"
                style={[styles.input]}
                placeholderTextColor={themes.placeholderTextColor}
                onChangeText={(text) => { setConfirmPassword(text); setConfirmPasswordError(null) }}
                value={confirmPassword}
                secureTextEntry
                inputMode="text"
              />
              {confirmPasswordError != null ? (
                <Text style={styles.errorText}>{confirmPasswordError}</Text>
              ) : (
                ""
              )}
            </View>
          </View>

          <Text style={{ marginStart: 15 }}>
            If You Already Regsiter...
            <Text
              style={{
                color: themes.mainColor,
                textDecorationLine: "underline",
                fontSize: hp(2),
              }}
              onPress={() => navigation.goBack()}
            >
              Login
            </Text>
          </Text>
          <View style={{ alignItems: "center" }}>
            <TouchableOpacity
              style={styles.buttonOutline}
              onPress={handleSubmit}
            >
              <Text style={styles.btn}>Send OTP</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  )
}

export default StudentRegister

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
    backgroundColor: "rgb(171,171,171)",
    borderRadius: 20,
    width: "85%",
  },
  mainHead: {
    textAlign: "center",
    fontSize: hp(4),
    color: themes.mainColor,
    fontWeight: "700",
  },
  subHead: {
    textAlign: "center",
    fontSize: hp(2),
    marginBottom: "5%",
    textDecorationLine: "underline",
  },
  inputRows: {
    display: "flex",
    flexDirection: "row",
  },
  inputGroups: {
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  inputGrid: {
    width: "50%",
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  input: {
    backgroundColor: "#D9D9D9",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "rgb(115,115,115)",
    width: "100%",
    color: "black",
    fontSize: hp(1.3),
    paddingStart: 15,
  },
  label: {
    fontSize: hp(1.6),
  },
  buttonOutline: {
    backgroundColor: themes.mainColor,
    borderRadius: 5,
    padding: 10,
    paddingHorizontal: 40,
    borderBlockColor: "black",
    marginVertical: 20,
  },
  btn: {
    color: "white",
    fontSize: hp(1.6),
  },
  dropdown: {
    backgroundColor: "#D9D9D9",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "rgb(115,115,115)",
    width: "100%",
    color: "black",
    fontSize: hp(1.6),
    height: 42,
    borderRadius: 10,
    paddingStart: 10,
  },
  errorText: {
    color: "red",
    fontSize: hp(1.3),
    marginStart: 10,
    marginTop: 5,
  },
});