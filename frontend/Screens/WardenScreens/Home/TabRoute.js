import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import homeIcon from "../../../assets/TabBar/HomeIcon.png";
import acceptPass from "../../../assets/TabBar/acceptPass.png";
import closeIcon from "../../../assets/TabBar/close.png";
import Settings from "../../../assets/TabBar/Settings.png";
import HomeScreen from "./HomeRoute";
import AcceptPass from "./AcceptPass";
import RejectPass from "./RejectPass";
import SettingScreen from "./SettingScreen";
import IonIcons from "@expo/vector-icons/Ionicons";

let mainColor = "rgb(11,117,131)";

const TabRoute = () => {
  const Tab = createBottomTabNavigator();

  const [action, setAction] = useState("Home");

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor={mainColor} />
      <View style={styles.header}>
        <Text style={styles.headerText}>Welcome </Text>
        <TouchableOpacity>
          <IonIcons name="notifications-outline" size={27} color="white"/>
        </TouchableOpacity>
      </View>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          tabBarStyle: {
            backgroundColor: mainColor,
            borderRadius: 30,
            height: 75,
          },
          tabBarPosition: "bottom",
        }}
      >
        <Tab.Screen
          component={HomeScreen}
          name="Home"
          options={{
            headerShown: false,
            tabBarIcon: () => {
              return (
                <View
                  style={
                    action == "Home"
                      ? {
                          backgroundColor: "white",
                          marginTop: 30,
                          height: 50,
                          borderRadius: 60,
                          paddingHorizontal: 15,
                          paddingTop: 6,
                          alignItems: "center",
                          justifyContent: "center",
                        }
                      : {
                          marginTop: 30,
                          height: 50,
                          paddingTop: 6,
                          alignItems: "center",
                          justifyContent: "center",
                        }
                  }
                >
                  <Image
                    source={homeIcon}
                    style={
                      action == "Home"
                        ? { tintColor: mainColor }
                        : { tintColor: "white" }
                    }
                  />
                  
                  <Text
                    style={
                      action == "Home"
                        ? {
                            color: mainColor,
                            fontSize: 10,
                            width: 25,
                            textAlign: "center",
                          }
                        : {
                            color: "white",
                            fontSize: 10,
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
        <Tab.Screen
          component={AcceptPass}
          name="Accept"
          options={{
            headerShown: false,
            tabBarIcon: () => {
              return (
                <View
                  style={
                    action == "accept"
                      ? {
                          backgroundColor: "white",
                          marginTop: 30,
                          height: 50,
                          borderRadius: 60,
                          paddingHorizontal: 5,
                          paddingTop: 6,
                          alignItems: "center",
                          justifyContent: "center",
                        }
                      : {
                          marginTop: 30,
                          height: 50,
                          paddingHorizontal: 20,
                          paddingTop: 6,
                          alignItems: "center",
                          justifyContent: "center",
                        }
                  }
                >
                  <Image
                    source={acceptPass}
                    style={
                      action == "accept"
                        ? { tintColor: mainColor }
                        : { tintColor: "white" }
                    }
                  />
                  <Text
                    style={
                      action == "accept"
                        ? {
                            color: mainColor,
                            fontSize: 10,
                            width: 40,
                            textAlign: "center",
                          }
                        : {
                            color: "white",
                            fontSize: 10,
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

        <Tab.Screen
          component={RejectPass}
          name="reject"
          options={{
            headerShown: false,
            tabBarIcon: () => {
              return (
                <View
                  style={
                    action == "reject"
                      ? {
                          backgroundColor: "white",
                          marginTop: 30,
                          height: 50,
                          borderRadius: 60,
                          paddingHorizontal: 5,
                          paddingTop: 6,
                          alignItems: "center",
                          justifyContent: "center",
                        }
                      : {
                          marginTop: 30,
                          height: 50,
                          paddingHorizontal: 20,
                          paddingTop: 6,
                          alignItems: "center",
                          justifyContent: "center",
                        }
                  }
                >
                  <Image
                    source={closeIcon}
                    style={
                      action == "reject"
                        ? { tintColor: mainColor }
                        : { tintColor: "white" }
                    }
                  />
                  <Text
                    style={
                      action == "reject"
                        ? {
                            color: mainColor,
                            fontSize: 10,
                            width: 40,
                            textAlign: "center",
                          }
                        : {
                            color: "white",
                            fontSize: 10,
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

        <Tab.Screen
          component={SettingScreen}
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
                          marginTop: 30,
                          height: 50,
                          borderRadius: 50,
                          paddingHorizontal: 7,
                          paddingTop: 6,
                          alignItems: "center",
                          justifyContent: "center",
                        }
                      : {
                          marginTop: 30,
                          height: 50,
                          paddingHorizontal: 20,
                          paddingTop: 6,
                          alignItems: "center",
                          justifyContent: "center",
                        }
                  }
                >
                  <Image
                    source={Settings}
                    style={
                      action == "settings"
                        ? { tintColor: mainColor }
                        : { tintColor: "white" }
                    }
                  />
                  <Text
                    style={
                      action == "settings"
                        ? {
                            color: mainColor,
                            fontSize: 10,
                            width: 36,
                            marginStart: 4,
                            textAlign: "center",
                          }
                        : {
                            color: "white",
                            fontSize: 10,
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
      </Tab.Navigator>
    </SafeAreaView>
  );
};

export default TabRoute;

const styles = StyleSheet.create({
  header: {
    backgroundColor: mainColor,
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
