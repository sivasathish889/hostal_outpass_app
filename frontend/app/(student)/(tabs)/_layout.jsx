import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Tabs } from "expo-router"
import { useState } from 'react';

import notifiIcon from "@/assets/Notification.png";
import homeIcon from "@/assets/TabBar/HomeIcon.png";
import Previous from "@/assets/TabBar/Previous.png";
import Settings from "@/assets/TabBar/Settings.png";
import themes from "@/constants/themes";
import { hp } from "@/helpers/dimensions";


const Layout = () => {
  const [action, setAction] = useState("Home");

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor={themes.mainColor} />
      <View style={styles.header}>
        <Text style={styles.headerText}>Welcome </Text>
        <TouchableOpacity>
          <Image source={notifiIcon} style={styles.ImageStyle} />
        </TouchableOpacity>
      </View>
      
      <Tabs
        screenOptions={{
          tabBarStyle: {
            backgroundColor: themes.mainColor,
            borderRadius: 30,
            height: hp(8),
          },
          tabBarPosition: "bottom",
          headerShown:false
        }}>
        <Tabs.Screen
          name="home"
          options={{
            headerShown: false,
            tabBarIcon: () => {
              return (
                <View
                  style={
                    action == "home"
                      ? {
                        backgroundColor: "white",
                        marginTop: hp(4),
                        height: hp(5.5),
                        borderRadius: 60,
                        paddingHorizontal: hp(1.6),
                        paddingTop: hp(0.7),
                      }
                      : {
                        marginTop: hp(4),
                        height: hp(5.5),
                        paddingTop: hp(0.7),
                      }
                  }
                >
                  <Image
                    source={homeIcon}
                    style={
                      action == "home"
                        ? { tintColor: themes.mainColor }
                        : { tintColor: "white" }
                    }
                  />
                  <Text
                    style={
                      action == "home"
                        ? { color: themes.mainColor, fontSize: hp(1.1), width: hp(2.6) }
                        : { color: "white", fontSize: hp(1.1), width: hp(2.6) }
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
          listeners={{ tabPress: () => setAction("home") }}
        />
        <Tabs.Screen
          name="prevPass"
          options={{
            headerShown: false,
            tabBarIcon: () => {
              return (
                <View
                  style={
                    action == "previous"
                      ? {
                        backgroundColor: "white",
                        marginTop: hp(4),
                        height: hp(5.5),
                        borderRadius: 60,
                        paddingHorizontal: hp(1),
                        paddingTop: hp(0.7),
                      }
                      : {
                        marginTop: hp(4),
                        height: hp(5.5),
                        paddingTop: hp(0.7),
                      }
                  }
                >
                  <Image
                    source={Previous}
                    style={
                      action == "previous"
                        ? { tintColor: themes.mainColor, marginStart: 7 }
                        : { tintColor: "white", marginStart: 7 }
                    }
                  />
                  <Text
                    style={
                      action == "previous"
                        ? { color: themes.mainColor, fontSize: hp(1.1), width: hp(4) }
                        : { color: "white", fontSize: hp(1.1), width: hp(4) }
                    }
                  >
                    Previous
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
                        marginTop: hp(4),
                        height: hp(5.5),
                        borderRadius: hp(5.5),
                        paddingHorizontal: hp(0.7),
                        paddingTop: hp(0.7),
                      }
                      : {
                        marginTop: hp(4),
                        height: hp(5.5),
                        paddingTop: hp(0.7),
                      }
                  }
                >
                  <Image
                    source={Settings}
                    style={
                      action == "settings"
                        ? { tintColor: themes.mainColor, marginStart: 8 }
                        : { tintColor: "white", marginStart: 8 }
                    }
                  />
                  <Text
                    style={
                      action == "settings"
                        ? {
                          color: themes.mainColor,
                          fontSize: hp(1.1),
                          width: 36,
                          marginStart: 4,
                        }
                        : {
                          color: "white",
                          fontSize: hp(1.1),
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
      </Tabs>
    </SafeAreaView>
  )
}

export default Layout


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