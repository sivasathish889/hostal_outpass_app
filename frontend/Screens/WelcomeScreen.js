import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
const logo = require('../assets/logo.png')

const WelcomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={logo} alt="AU Logo" style={styles.Image}/>
        <View style={styles.CenterizedContainer}>
          <Text style={{fontSize:25, marginTop:20}}>Hostal Outpass</Text>
        </View>
      </View>
      <View style={{flex:0.4, justifyContent:"center"}}>
        <View style={styles.CenterizedContainer}>
          <Text style={{fontSize:10}}> From </Text>
        </View>
        <Text style={{fontSize:15}}> Anna University </Text>
      </View>

    </SafeAreaView>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  CenterizedContainer :{
    display :"flex",
    justifyContent :"center",
    alignItems :"center"
  },
  container: {
    flex: 1,
    justifyContent : 'center',
    alignItems : "center",
    backgroundColor: "rgb(11,117,131)",
  },
  imageContainer : {
      flex : 1,
      justifyContent:"center"
  },
  Image : {
    height : 200,
    
  },
});
