import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import homeIcon from "@/assets/TabBar/HomeIcon.png";
import acceptPass from "@/assets/TabBar/acceptPass.png";
import closeIcon from "@/assets/TabBar/close.png";
import Settings from "@/assets/TabBar/Settings.png";
import IonIcons from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router";
import themes from "@/constants/themes";
import { hp } from "@/helpers/dimensions";
const TabRoute = () => {

  const [action, setAction] = useState("Home");

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor={themes.mainColor} />
      <View style={styles.header}>
        <Text style={styles.headerText}>Welcome </Text>
        <TouchableOpacity>
          <IonIcons name="notifications-outline" size={27} color="white"/>
        </TouchableOpacity>
      </View>
      <Tabs
        screenOptions={{
          tabBarStyle: {
            backgroundColor: themes.mainColor,
            borderRadius: 30,
            height: 75,
          },
          tabBarPosition: "bottom",
          headerShown:false
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            headerShown: false,
            tabBarIcon: () => {
              return (
                <View
                  style={
                    action == "Home"
                      ? {
                          backgroundColor: "white",
                          marginTop: "100%",
                          height: 50,
                          borderRadius: 60,
                          paddingHorizontal: "45%",
                          paddingTop: 4,
                          alignItems: "center",
                          justifyContent: "center",
                        }
                      : {
                          marginTop: "100%",
                          height: 50,
                          paddingTop: 4,
                          alignItems: "center",
                          justifyContent: "center",
                        }
                  }
                >
                  <Image
                    source={homeIcon}
                    style={
                      action == "Home"
                        ? { tintColor: themes.mainColor }
                        : { tintColor: "white" }
                    }
                  />
                  
                  <Text
                    style={
                      action == "Home"
                        ? {
                            color: themes.mainColor,
                            fontSize: hp(1.2),
                            width: 25,
                            textAlign: "center",
                          }
                        : {
                            color: "white",
                            fontSize: hp(1.2),
                            width: 25,
                            textAlign: "center",
                          }
                    }
                  >
                    Home
                  </Text>
                </View>
              );
            },
            tabBarLabel: () => {
              return null;
            },
          }}
          listeners={{ tabPress: () => setAction("Home") }}
        />
        <Tabs.Screen
          name="acceptPasses"
          options={{
            headerShown: false,
            tabBarIcon: () => {
              return (
                <View
                  style={
                    action == "accept"
                      ? {
                          backgroundColor: "white",
                          marginTop: "100%",
                          height: 50,
                          borderRadius: 60,
                          paddingHorizontal: 5,
                          paddingTop: 4,
                          alignItems: "center",
                          justifyContent: "center",
                        }
                      : {
                          marginTop: "100%",
                          height: 50,
                          paddingHorizontal: 20,
                          paddingTop: 4,
                          alignItems: "center",
                          justifyContent: "center",
                        }
                  }
                >
                  <Image
                    source={acceptPass}
                    style={
                      action == "accept"
                        ? { tintColor: themes.mainColor }
                        : { tintColor: "white" }
                    }
                  />
                  <Text
                    style={
                      action == "accept"
                        ? {
                            color: themes.mainColor,
                            fontSize: hp(1.2),
                            width: 40,
                            textAlign: "center",
                          }
                        : {
                            color: "white",
                            fontSize: hp(1.2),
                            width: 40,
                            textAlign: "center",
                          }
                    }
                  >
                    Accept
                  </Text>
                </View>
              );
            },
            tabBarLabel: () => {
              return null;
            },
          }}
          listeners={{ tabPress: () => setAction("accept") }}
        />

        <Tabs.Screen
          name="rejectPasses"
          options={{
            headerShown: false,
            tabBarIcon: () => {
              return (
                <View
                  style={
                    action == "reject"
                      ? {
                          backgroundColor: "white",
                          marginTop: "100%",
                          height: 50,
                          borderRadius: 60,
                          paddingHorizontal: 5,
                          paddingTop: 4,
                          alignItems: "center",
                          justifyContent: "center",
                        }
                      : {
                          marginTop: "100%",
                          height: 50,
                          paddingHorizontal: 20,
                          paddingTop: 4,
                          alignItems: "center",
                          justifyContent: "center",
                        }
                  }
                >
                  <Image
                    source={closeIcon}
                    style={
                      action == "reject"
                        ? { tintColor: themes.mainColor }
                        : { tintColor: "white" }
                    }
                  />
                  <Text
                    style={
                      action == "reject"
                        ? {
                            color: themes.mainColor,
                            fontSize: hp(1.2),
                            width: 40,
                            textAlign: "center",
                          }
                        : {
                            color: "white",
                            fontSize: hp(1.2),
                            width: 40,
                            textAlign: "center",
                          }
                    }
                  >
                    Reject
                  </Text>
                </View>
              );
            },
            tabBarLabel: () => {
              return null;
            },
          }}
          listeners={{ tabPress: () => setAction("reject") }}
        />

        <Tabs.Screen
          name="settings"
          options={{
            headerShown: false,
            tabBarIcon: () => {
              return (
                <View
                  style={
                    action == "settings"
                      ? {
                          backgroundColor: "white",
                          marginTop: "100%",
                          height: 50,
                          borderRadius: 50,
                          paddingHorizontal: 7,
                          paddingTop: 4,
                          alignItems: "center",
                          justifyContent: "center",
                        }
                      : {
                          marginTop: "100%",
                          height: 50,
                          paddingHorizontal: 20,
                          paddingTop: 4,
                          alignItems: "center",
                          justifyContent: "center",
                        }
                  }
                >
                  <Image
                    source={Settings}
                    style={
                      action == "settings"
                        ? { tintColor: themes.mainColor }
                        : { tintColor: "white" }
                    }
                  />
                  <Text
                    style={
                      action == "settings"
                        ? {
                            color: themes.mainColor,
                            fontSize: hp(1.2),
                            width: 36,
                            marginStart: 4,
                            textAlign: "center",
                          }
                        : {
                            color: "white",
                            fontSize: hp(1.2),
                            width: 40,
                            marginStart: 4,
                            textAlign: "center",
                          }
                    }
                  >
                    Settings
                  </Text>
                </View>
              );
            },
            tabBarLabel: () => {
              return null;
            },
          }}
          listeners={{ tabPress: () => setAction("settings") }}
        />
      </Tabs>
    </SafeAreaView>
  );
};

export default TabRoute;

const styles = StyleSheet.create({
  header: {
    backgroundColor: themes.mainColor,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    color: "white",
    padding: 20,
  },
  headerText: {
    color: "white",
    fontSize: 20,
  },
  ImageStyle: {
    tintColor: "white",
    marginRight: 10,
  },
});
