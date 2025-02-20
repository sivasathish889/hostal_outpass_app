import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

let logo = require("../assets/logo.png");

const InitialScreen = () => {
  const navigate = useNavigation()
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ alignItems: "center" }}>
        <Text style={styles.mainText}>Welcome</Text>
        <Image source={logo} alt="AU Logo" style={styles.Image} />
        <Text style={styles.subText}>
          Anna University Hostal Outpass its simplify Your Outpass
        </Text>
      </View>
      <View style={{ rowGap: 30, marginTop: 60 }}>
        <TouchableOpacity style={styles.buttonOutline} onPress={()=>navigate.navigate('/StudentLogin')}>
          <Text style={styles.buttonsText}>Student</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonOutline} onPress={()=>navigate.navigate('/WardenLogin')}>
          <Text style={styles.buttonsText}>Warden</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default InitialScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(11,117,131)",
    justifyContent: "center",
    alignItems: "center",
  },
  mainText: {
    fontSize: 30,
    textAlign: "center",
    color: "white",
    marginBottom: 20,
  },
  subText: {
    width: 300,
    textAlign: "center",
    color: "white",
    marginVertical: 20,
    fontSize: 20,
  },
  buttonOutline :{
    backgroundColor: "white", 
    borderRadius: 5
  },
  buttonsText: {
    fontSize: 20,
    padding: 10,
    paddingHorizontal: 50,
  },
});
