import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import PreviousPassScreen from "./PreviousPassScreen";
import HomeScreen from "./HomeScreen";
import SettingScreen from "./SettingScreen";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import notifiIcon from "../../../assets/Notification.png";
import homeIcon from "../../../assets/TabBar/HomeIcon.png";
import Previous from "../../../assets/TabBar/Previous.png";
import Settings from "../../../assets/TabBar/Settings.png";
const Tab = createBottomTabNavigator();

let mainColor = "rgb(11,117,131)";

const BottomTab = () => {
  const [action, setAction] = useState("Home");
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor={mainColor} />
      <View style={styles.header}>
        <Text style={styles.headerText}>Welcome </Text>
        <TouchableOpacity>
          <Image source={notifiIcon} style={styles.ImageStyle} />
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
            tabBarPosition:"bottom"
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
                        }
                      : {
                          marginTop: 30,
                          height: 50,
                          paddingTop: 6,
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
                        ? { color: mainColor, fontSize: 10, width: 25 }
                        : { color: "white", fontSize: 10, width: 25 }
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
          component={PreviousPassScreen}
          name="previous"
          options={{
            headerShown: false,
            tabBarIcon: () => {
              return (
                <View
                  style={
                    action == "previous"
                      ? {
                          backgroundColor: "white",
                          marginTop: 30,
                          height: 50,
                          borderRadius: 60,
                          paddingHorizontal: 10,
                          paddingTop: 6,
                        }
                      : {
                          marginTop: 30,
                          height: 50,
                          paddingHorizontal: 20,
                          paddingTop: 6,
                        }
                  }
                >
                  <Image
                    source={Previous}
                    style={
                      action == "previous"
                        ? { tintColor: mainColor, marginStart: 7 }
                        : { tintColor: "white", marginStart: 7 }
                    }
                  />
                  <Text
                    style={
                      action == "previous"
                        ? { color: mainColor, fontSize: 10, width: 40 }
                        : { color: "white", fontSize: 10, width: 40 }
                    }
                  >
                    previous
                  </Text>
                </View>
              );
            },
            tabBarLabel: () => {
              return null;
            },
          }}
          listeners={{ tabPress: () => setAction("previous") }}
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
                        }
                      : {
                          marginTop: 30,
                          height: 50,
                          paddingHorizontal: 20,
                          paddingTop: 6,
                        }
                  }
                >
                  <Image
                    source={Settings}
                    style={
                      action == "settings"
                        ? { tintColor: mainColor, marginStart: 8 }
                        : { tintColor: "white", marginStart: 8 }
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
                          }
                        : {
                            color: "white",
                            fontSize: 10,
                            width: 40,
                            marginStart: 4,
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

export default BottomTab;

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
