import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Modal,
  StatusBar,
  TextInput,
  Alert,
  RefreshControl,
} from "react-native";

import React, { useEffect, useState } from "react";
import plusIcon from "../../../assets/Plus.png";

import AsyncStorage from "@react-native-async-storage/async-storage";
import env from "../../../constants/urls";
import NewPassModel from "./ModelScreen/NewPassModel";
import { useNavigation } from "@react-navigation/native";
import { useToast } from "react-native-toast-notifications";
import XIcon from "../../../assets/XIcon.png";
import calendarIcon from "../../../assets/Calendar.png";
import DateTimePicker from "react-native-modal-datetime-picker";
import axios from "axios";
import Spinner from "react-native-loading-spinner-overlay";
// import Entypo from "@react-native-vector-icons/Entypo"
let mainColor = "rgb(11,117,131)";
let secondaryColor = "#F5BC00";

const HomeScreen = () => {
  const [passModelVisible, setPassModelVisible] = useState(false);
  const [editModelVisible, setEditModelVisible] = useState(false);
  const [dataRefresh, setDataRefresh] = useState(true);
  const [userId, setUserId] = useState(null);
  const [fetchPassData, setFetchPassData] = useState({});

  const [isInDatePickerVisible, setInDatePickerVisible] = useState(false);
  const [isOutDatePickerVisible, setOutDatePickerVisible] = useState(false);
  const [roomNo, setRoomNo] = useState(null);
  const [destination, setDestination] = useState(null);
  const [purpose, setPurpose] = useState(null);
  const [inDateTime, setinDateTime] = useState(null);
  const [outDateTime, setoutDateTime] = useState(null);
  const [passId, setPassId] = useState(null);
  const [spinnerVisible, setSpinnerVisible] = useState(false);

  const [refreshing, setRefreshing] = useState(false);

  let navigation = useNavigation();
  let toast = useToast();
  let now = new Date();

  const handleInDateTimePicker = (e) => {
    setinDateTime(e.toLocaleString());
    setInDatePickerVisible(false);
  };

  const handleOutDateTimePicker = (e) => {
    setoutDateTime(e.toLocaleString());
    setOutDatePickerVisible(false);
  };

  const DeleteAlerting = (deletePassId) => {
    Alert.alert("Delete Outpass", "Are you deleting your Outpass", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Sure",
        onPress: () => handlePassDelete(deletePassId),
        style: "default",
      },
    ]);
  };

  useEffect(() => {
    fetchData();
  }, [dataRefresh, refreshing]);

  const fetchData = async () => {
    await AsyncStorage.getItem("user").then((userId) => {
      setUserId(userId);
      axios
        .get(`${env.CLIENT_URL}${env.studentPendingPasses}/${userId}`)
        .then((data) => {
          setSpinnerVisible(true)
          setFetchPassData(data.data);
          setRefreshing(false);
          setSpinnerVisible(false)

        });
    });
  };

  const handelPassUpdate = async () => {
    const payload = {
      roomNo,
      destination,
      purpose,
      inDateTime,
      outDateTime,
      passId,
    };
    await axios
      .put(
        `${env.CLIENT_URL}${env.studentEditingPass}`,
        JSON.stringify(payload)
      )
      .then((data) => {
        if (data.data.success) {
          toast.show(data.data.message, {
            type: "success",
            placement: "bottom",
            duration: 4000,
            offset: 30,
            animationType: "slide-in",
          });
          navigation.navigate("/");
          setEditModelVisible(false);
          setDataRefresh(!dataRefresh);
        } else {
          toast.show(data.data.message, {
            type: "danger",
            placement: "bottom",
            duration: 4000,
            offset: 30,
            animationType: "slide-in",
          });
        }
      })
      .catch((error) => console.log(error));
  };
  const handlePassDelete = async (deletePassId) => {
    await axios
      .delete(`${env.CLIENT_URL}${env.studentDeletePass}/${deletePassId}`)
      .then((data) => {
        if (data.data.success) {
          toast.show(data.data.message, {
            type: "success",
            placement: "bottom",
            duration: 4000,
            offset: 30,
            animationType: "slide-in",
          });
          navigation.navigate("/");
          setEditModelVisible(false);
          setDataRefresh(!dataRefresh);
        } else {
          toast.show(data.data.message, {
            type: "danger",
            placement: "bottom",
            duration: 4000,
            offset: 30,
            animationType: "slide-in",
          });
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <View style={{ flex: 1 }}>
      <Spinner
        visible={spinnerVisible}
        textContent={"Loading..."}
        textStyle={{ color: "#FFF" }}
      />
      <FlatList
        data={fetchPassData.pass}
        renderItem={({ item }) => {
          return (
            <View style={styles.container}>
              <View style={styles.titleContainer}>
                <Text style={styles.roomNoStyle}>
                  {item.RoomNo.toUpperCase()}.
                </Text>
              </View>

              <View style={{ display: "flex", paddingVertical: 10 }}>
                <Text style={styles.titleStyle}>{item.Purpose}</Text>
                <View style={styles.times}>
                  <Text style={styles.outDateTimeStyle}>
                    {item.OutDateTime}
                  </Text>
                  <Text style={{ marginEnd: 10 }}>-</Text>
                  <Text style={styles.inDateTimeStyle}>{item.InDateTime}</Text>
                </View>
              </View>
              <Text style={styles.placeStyle}>{item.Distination}</Text>
              <View style={styles.btnGroup}>
                <TouchableOpacity
                  style={styles.editBtnOutline}
                  onPress={() => {
                    setEditModelVisible(!editModelVisible);
                    setinDateTime(item.InDateTime);
                    setoutDateTime(item.OutDateTime);
                    setRoomNo(item.RoomNo);
                    setPurpose(item.Purpose);
                    setDestination(item.Distination);
                    setPassId(item._id);
                  }}
                >
                  <Text style={styles.editBtn}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.deleteBtnOutline}
                  onPress={() => DeleteAlerting(item._id)}
                >
                  <Text style={styles.deleteBtn}>Delete</Text>
                </TouchableOpacity>
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

      <TouchableOpacity
        style={styles.plusIconStyle}
        onPress={() => setPassModelVisible(!passModelVisible)}
      >
        <Image source={plusIcon} />
        {/* <Entypo /> */}
      </TouchableOpacity>

      {/* New Pass Model */}
      <NewPassModel
        setDataRefresh={setDataRefresh}
        userId={userId}
        passModelVisible={passModelVisible}
        setPassModelVisible={setPassModelVisible}
        dataRefresh={dataRefresh}
      />
      {/* Edit Pass Model */}
      <View style={styles.modelContainer}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={editModelVisible}
        >
          <View style={styles.modelContainer}>
            <StatusBar backgroundColor={"rgba(0,0,0,0.5)"} />
            <View style={styles.ModelContent}>
              <TouchableOpacity
                onPress={() => setEditModelVisible(!editModelVisible)}
                style={styles.closeBtn}
              >
                <Image source={XIcon} />
              </TouchableOpacity>

              <Text style={styles.modelHeading}>Edit OutPass</Text>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Room No :</Text>
                <TextInput
                  style={styles.input}
                  placeholder={roomNo}
                  placeholderTextColor={"#AFAFAF"}
                  onChangeText={(text) => {
                    setRoomNo(text);
                  }}
                  inputMode=""
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Destination :</Text>
                <TextInput
                  style={styles.input}
                  placeholder={destination}
                  placeholderTextColor={"#AFAFAF"}
                  onChangeText={(text) => {
                    setDestination(text);
                  }}
                  inputMode="text"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Purpose :</Text>
                <TextInput
                  style={styles.input}
                  placeholder={purpose}
                  placeholderTextColor={"#AFAFAF"}
                  onChangeText={(text) => {
                    setPurpose(text);
                  }}
                  inputMode="text"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Out Date & Time:</Text>
                <TextInput
                  style={styles.input}
                  placeholderTextColor={"#AFAFAF"}
                  placeholder={outDateTime}
                  editable={false}
                  inputMode="text"
                />

                <DateTimePicker
                  onCancel={() => setOutDatePickerVisible(false)}
                  onConfirm={(e) => {
                    handleOutDateTimePicker(e);
                  }}
                  isVisible={isOutDatePickerVisible}
                />
                <TouchableOpacity
                  style={styles.calendarIconStyle}
                  onPress={() =>
                    setOutDatePickerVisible(!isInDatePickerVisible)
                  }
                >
                  <Image source={calendarIcon} />
                </TouchableOpacity>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>In Date & Time :</Text>
                <TextInput
                  style={styles.input}
                  placeholder={inDateTime}
                  placeholderTextColor={"#AFAFAF"}
                />

                <DateTimePicker
                  onCancel={() => setInDatePickerVisible(false)}
                  onConfirm={(e) => {
                    handleInDateTimePicker(e);
                  }}
                  isVisible={isInDatePickerVisible}
                />
                <TouchableOpacity
                  style={styles.calendarIconStyle}
                  onPress={() => setInDatePickerVisible(!isInDatePickerVisible)}
                >
                  <Image source={calendarIcon} />
                </TouchableOpacity>
              </View>

              <View style={{ alignItems: "center" }}>
                <TouchableOpacity
                  style={styles.buttonOutline}
                  onPress={handelPassUpdate}
                >
                  <Text style={styles.btn}>Update</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: secondaryColor,
    margin: 10,
    boxShadow: "2 2 5 1",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
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
    paddingTop: 25,
  },
  titleStyle: {
    marginStart: 10,
    fontSize: 20,
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
    fontSize: 8,
    opacity: 0.5,
  },
  btnGroup: {
    position: "absolute",
    right: 5,
    rowGap: 5,
  },
  editBtnOutline: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    backgroundColor: mainColor,
    borderRadius: 5,
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
  plusIconStyle: {
    position: "absolute",
    bottom: 50,
    right: 50,
    backgroundColor: "#AFAFAF",
    padding: 12,
    borderRadius: 25,
  },
  modelContainer: {
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  ModelContent: {
    padding: 20,
    margin: "10%",
    marginVertical: "50%",
    backgroundColor: "#D9D9D9",
    borderRadius: 10,
  },
  modelHeading: {
    textAlign: "center",
    fontSize: 20,
    color: mainColor,
    textDecorationLine: "underline",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "white",
    paddingStart: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "rgb(115,115,115)",
  },
  inputLabel: {
    fontSize: 18,
  },
  inputGroup: {
    marginTop: 10,
  },
  buttonOutline: {
    backgroundColor: mainColor,
    borderRadius: 5,
    padding: 10,
    borderBlockColor: "black",
    marginVertical: 20,
    paddingHorizontal: 40,
  },
  btn: {
    color: "white",
    fontSize: 15,
    textAlign: "center",
  },
  calendarIconStyle: {
    position: "absolute",
    right: 10,
    top: 30,
  },
  closeBtn: {
    alignSelf: "flex-end",
  },
});
