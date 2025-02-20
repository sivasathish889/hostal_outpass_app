import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import axios from "axios";
import urls from "@/constants/urls";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Spinner from 'react-native-loading-spinner-overlay';
import { hp } from "@/helpers/dimensions"
import { useRouter } from "expo-router";


const SettingScreen = () => {
  const router = useRouter();
  const [spinnerVisible, setSpinnerVisible] = useState(false)
  const [fetchingData, setFetchingData] = useState([
    {
      name: "",
    },
  ]);

  const fetchDate = async () => {
    let id = await AsyncStorage.getItem("warden");
    if (id != null) {
      await axios
        .get(`${urls.CLIENT_URL}${urls.wardenData}${id}`)
        .then((data) => {
          setFetchingData(data?.data?.data);
          setSpinnerVisible(false)
        });
    } else {
      router.dismissTo("(warden)/(login)/wardenLogin");
    }
  };

  useEffect(() => {
    setSpinnerVisible(true)
    fetchDate();
  }, []);


  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("warden").then(() =>
        router.dismissTo("(warden)/(login)/wardenLogin")
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
        textStyle={{ color: '#FFF' }}
      />
      <View style={styles.profile}>
        <AntDesign name="user" size={120} color="black" />
        <Text style={styles.nameStyle}>{fetchingData[0]?.userName}</Text>
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
    fontSize: hp(2),
  },
  nameStyle: {
    fontSize: hp(2)
  }
})