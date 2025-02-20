import { FlatList, StyleSheet, Text, View, RefreshControl } from "react-native";
import React, { useEffect, useState } from "react";
import env from "@/constants/urls";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScrollView } from "react-native-virtualized-view";
import axios from "axios";
import Spinner from "react-native-loading-spinner-overlay";
import themes from "@/constants/themes";
import { hp } from "@/helpers/dimensions";


const PrevPass = () => {
  let now = new Date();
  const [fetchPassData, setFetchPassData] = useState({});
  const [refreshing, setRefreshing] = useState(false);
  const [spinnerVisible, setSpinnerVisible] = useState(false);

  useEffect(() => {
    setSpinnerVisible(true);
    fetchData();
  }, [refreshing]);

  const fetchData = async () => {
    try {
      await AsyncStorage.getItem("user").then(async (userId) => {
        await axios
          .get(`${env.CLIENT_URL}${env.studentAllPasses}/${userId}`)
          .then((data) => {
            setFetchPassData(data.data.data);
            setSpinnerVisible(false);
            setRefreshing(false);
          })
          .catch((error) => console.log(error));
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={() => setRefreshing(true)}
          style={{ flex: 1 }}
        />
      }
      style={{ flex: 1 }}
    >
      <Spinner
        visible={spinnerVisible}
        textContent={"Loading..."}
        textStyle={{ color: "#FFF" }}
      />
      <View style={styles.header}>
        <Text style={{ color: themes.acceptColor, fontSize: hp(2) }}>Accept </Text>
        <Text style={{ fontSize: hp(2) }}>and </Text>
        <Text style={{ color: themes.rejectColor, fontSize: hp(2) }}>
          Rejecting Passes
        </Text>
      </View>
      <FlatList
        data={fetchPassData}
        renderItem={({ item }) => {
          return (
            <View
              style={[
                styles.container,
                {
                  backgroundColor: `${
                    item.status == 2
                      ? themes.acceptColor
                      : item.status == 3
                      ? themes.rejectColor
                      : ""
                  }`,
                },
              ]}
            >
              <View style={styles.titleContainer}>
                <Text style={styles.roomNoStyle}>
                  {item.RoomNo.toUpperCase()}.
                </Text>
              </View>

              <View style={{ display: "flex" }}>
                <Text style={styles.titleStyle}>{item.Purpose}</Text>
                <View style={styles.times}>
                  <Text style={styles.outDateTimeStyle}>
                    {item.OutDateTime}
                  </Text>
                  <Text style={{ marginEnd: "2%" }}>-</Text>
                  <Text style={styles.inDateTimeStyle}>{item.InDateTime}</Text>
                </View>
              </View>
              <Text style={styles.placeStyle}>{item.Distination}</Text>
              <Text style={styles.createdStyle}>
                {new Date(item.createdAt).getDate() == String(now.getDate())
                  ? "Today"
                  : new Date(item.createdAt).getDate() + 1 ==
                    String(now.getDate())
                  ? "YesterDay"
                  : new Date(item.createdAt)
                      .toLocaleString(undefined, "Asia/Kolkata")
                      .split(",")[0]}
              </Text>
            </View>
          );
        }}
        keyExtractor={(item) => item._id}
      />
    </ScrollView>
  );
};

export default PrevPass;

const styles = StyleSheet.create({
  container: {
    backgroundColor: themes.pendingColor,
    margin: "2%",
    boxShadow: "2 2 5 1",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  header: {
    marginVertical: "2%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  titleContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  roomNoStyle: {
    fontSize: 16,
    backgroundColor: "#D9D9D9",
    width: 60,
    height: 78,
    alignSelf: "center",
    textAlign: "center",
    paddingTop: "7%",
  },
  titleStyle: {
    marginStart: "4%",
    fontSize: hp(2.3),
    marginTop: -5,
  },
  times: {
    display: "flex",
    flexDirection: "row",
    marginTop: 5,
    marginStart: 10,
  },
  inDateTimeStyle: {
    width: 80,
    marginStart: 5,
  },
  outDateTimeStyle: {
    width: 80,
  },
  placeStyle: {
    paddingHorizontal: 20,
  },
  createdStyle: {
    position: "absolute",
    right: 3,
    top: 3,
    fontSize: hp(1),
    opacity: 0.5,
  },
  emptyMsgContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyMsg: {
    fontSize: hp(5),
    opacity: 0.5,
  },
});
