import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import axios from "axios";
import urls from "../../../constants/urls";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import Spinner from 'react-native-loading-spinner-overlay';

const SettingScreen = () => {
  const navigation = useNavigation();
  const [spinnerVisible, setSpinnerVisible] = useState(false)
  const [fetchingData, setFetchingData] = useState([
    {
      Department: "",
      District: "",
      Email: "",
      RegisterNumber: "",
      name: "",
    },
  ]);

  const fetchDate = async () => {
    let id = await AsyncStorage.getItem("user");
    if (id != null) {
      await axios
        .get(`${urls.CLIENT_URL}${urls.studentData}${id}`)
        .then((data) => {
          setSpinnerVisible(true)
          setFetchingData(data?.data?.data);
          setSpinnerVisible(false)
        });
    } else {
      navigation.navigate("/StudentLogin");
    }
  };
  
  useEffect(() => {
    fetchDate();
  }, []);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("user").then(() =>
        navigation.navigate("/StudentLogin")
      );
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <View style={styles.container}>
      <Spinner
        visible={spinnerVisible}
        textContent={"Loading..."}
        textStyle={{color: '#FFF'}}
      />
      <View style={styles.profile}>
        <AntDesign name="user" size={120} color="black" />
        <Text>{fetchingData[0]?.name}</Text>
        <Text>{fetchingData[0]?.RegisterNumber}</Text>
      </View>
      <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.btnOutline} onPress={handleLogout}>
          <Text style={styles.logoutBtn}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SettingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 30,
  },
  profile: {
    justifyContent: "center",
    alignItems: "center",
  },
  btnContainer: {
    width: "80%",
  },
  btnOutline: {
    backgroundColor: "red",
    height: 45,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  logoutBtn: {
    color: "white",
    fontSize: 20,
  },
});
