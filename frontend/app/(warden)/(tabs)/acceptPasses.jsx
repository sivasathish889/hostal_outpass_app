import { StyleSheet, Text, View, FlatList, RefreshControl } from "react-native";
import React, { useEffect, useState } from "react";

import env from "@/constants/urls";
import axios from "axios";
import { hp } from "@/helpers/dimensions";
import Spinner from "react-native-loading-spinner-overlay";
import AntDesign from "@expo/vector-icons/AntDesign";
import themes from "@/constants/themes";


const AcceptPass = () => {
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
      axios.get(`${env.CLIENT_URL}${env.wardenAllAcceptPass}`)
        .then((data) => {
          setFetchPassData(data.data.pass)
          setSpinnerVisible(false);
          setRefreshing(false);
        })
    } catch (error) {
      console.log(error);
      
    }
  };
  return (
    <View style={{ flex: 1 }}>
      <Spinner
        visible={spinnerVisible}
        textContent={"Loading..."}
        textStyle={{ color: "#FFF" }}
      />
      {fetchPassData.length > 0 ? (
        <FlatList
          data={fetchPassData}
          renderItem={({ item }) => {
            return (
              <View style={styles.container}>
                <View style={styles.title}>
                  <Text style={styles.roomNoStyle}>
                    {item.RoomNo.toUpperCase()}.
                  </Text>
                </View>

                <View style={styles.detailsContainer}>
                  <View style={{ display: "flex", paddingVertical: 15 }}>
                    <View style={styles.titleStyle}>
                      <Text style={styles.nameStyle}>{item.name.toUpperCase()}</Text>
                      <View style={{ flexDirection: "row" }}>
                        <Text style={styles.department}>
                          {item.year} year -{" "}
                        </Text>
                        <Text style={styles.department}>
                          {item.Department.toUpperCase()}{" "}
                        </Text>
                      </View>
                    </View>
                  </View>

                  <View>
                    <Text style={styles.placeStyle}>{item.Distination}</Text>
                    <View style={styles.times}>
                      <Text style={styles.outDateTimeStyle}>
                        {item.OutDateTime}
                      </Text>
                      <Text>-</Text>
                      <Text style={styles.inDateTimeStyle}>
                        {item.InDateTime}
                      </Text>
                    </View>
                  </View>

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
              </View>
            );
          }}
          keyExtractor={(item) => item._id}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => setRefreshing(true)}
            />
          }
        />
      ) : (
        <View style={styles.emptyPassContainer}>
          <AntDesign name="exception1" size={40} color="black" />
          <Text style={styles.emptyPass}>No Passes</Text>
        </View>
      )}
    </View>
  );
};

export default AcceptPass;

const styles = StyleSheet.create({
  container: {
    backgroundColor: themes.acceptColor,
    margin: 10,
    boxShadow: "2 2 5 1",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  detailsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    flex: 1,
  },
  title: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  roomNoStyle: {
    fontSize: hp(1.8),
    backgroundColor: "#D9D9D9",
    width: 60,
    height: 78,
    alignSelf: "center",
    textAlign: "center",
    paddingTop: 25,
  },
  titleStyle: {
    marginTop: -5,
  },
  department: {
    fontSize: hp(2),
  },
  nameStyle: {
    fontSize: hp(2),
  },
  times: {
    flexDirection: "row",
  },
  inDateTimeStyle: {
    width: 60,
    marginStart: 5,
    fontSize: hp(1.2),
    textAlign: "center",
  },
  outDateTimeStyle: {
    maxWidth: 60,
    fontSize: hp(1.2),
    textAlign: "center",
  },
  placeStyle: {
    textAlign: "center",
    fontSize: hp(2),
  },
  createdStyle: {
    position: "absolute",
    right: 3,
    top: 1,
    fontSize: hp(1),
    opacity: 0.5,
  },
  btnGroup: {
    columnGap: 8,
    flexDirection: "row",
    marginEnd: "5%",
  },

  editBtn: {
    color: "white",
    fontSize: 10,
    textAlign: "center",
  },
  deleteBtnOutline: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    backgroundColor: "red",
    borderRadius: 5,
  },
  deleteBtn: {
    color: "white",
    fontSize: 10,
  },
  emptyPassContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyPass: {
    fontSize: hp(4),
  },
});
