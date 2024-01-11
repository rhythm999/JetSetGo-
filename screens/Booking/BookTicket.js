import {
  Alert,
  Image,
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import styles from "./BookingStyle";
import { useState } from "react";
import myImage from "../../assets/success.png";
import { useNavigation } from "@react-navigation/native";

let BookTicket = () => {
  const navigation = useNavigation();

  let [passengerCount, setPassengerCount] = useState(2);
  let [bookedTicketModal, setBookedTicketModal] = useState(false);
  let [passengerDetail, setPassengerDetail] = useState([
    {
      id: 1,
      name: "",
      age: 0,
    },
    {
      id: 2,
      name: "",
      age: 0,
    },
  ]);

  let updatePassengerList = () => {
    if (passengerCount > passengerDetail.length) {
      let allData = [...passengerDetail];
      for (let i = passengerDetail.length; i < passengerCount; i++) {
        let newPassenger = {
          id: i + 1,
          name: "",
          age: 0,
        };
        allData.push(newPassenger);
      }
      setPassengerDetail(allData);
    } else if (passengerCount == 0) {
      Alert.alert("Passengers can't be 0", [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
    } else {
      Alert.alert(
        "Are you sure you want to update ?",
        "Updating the current passenger list with less passengers. All the data for extra passengers will be lost.",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          {
            text: "YES",
            onPress: () => {
              let allData = passengerDetail.slice(0, passengerCount);
              setPassengerDetail(allData);
            },
          },
        ]
      );
    }
  };

  let bookTheTickets = async () => {
    let detailsFilled = true;
    await passengerDetail.map((passenger) => {
      if (passenger.name == "" || passenger.age == 0) {
        detailsFilled = false;
      }
    });
    if (detailsFilled) {
      setBookedTicketModal(true);
    } else {
      Alert.alert(
        "Data Missing",
        "Your one or more propert is missing. Please fill all the details to book your ticket",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ]
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.backgroundShape}></View>
      <View style={styles.passengerCounter}>
        <View style={styles.passengerCounterBox}>
          <Text>
            Specify the number of passengers for whom you'd like to book
            tickets.
          </Text>
          <TextInput
            keyboardType="numeric"
            style={styles.passengerInputBox}
            value={passengerCount.toString()}
            onChangeText={setPassengerCount}
            placeholder="Enter passenger count"
          ></TextInput>
          <TouchableOpacity
            style={styles.updateBtn}
            onPress={() => {
              updatePassengerList();
            }}
          >
            <Text>Update Passengers</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.passengerDetails}>
          <ScrollView style={{ flex: 0.7 }}>
            {passengerDetail.map((passenger) => {
              return (
                <View style={styles.passenrDetailBox} key={passenger.id}>
                  <Text style={styles.passengerNumber}>
                    Passenger {passenger.id}
                  </Text>
                  <Text style={styles.inputHeading}>Enter Name</Text>
                  <TextInput
                    placeholder={`Enter name of passenger ${passenger.id}`}
                    style={styles.passengerDEtailInputBox}
                    value={passenger.name}
                    onChangeText={(value) => {
                      setPassengerDetail((prevPassengers) =>
                        prevPassengers.map((currentPassenger) =>
                          currentPassenger.id === passenger.id
                            ? { ...currentPassenger, name: value }
                            : currentPassenger
                        )
                      );
                    }}
                  ></TextInput>
                  <Text style={styles.inputHeading}>Enter Age</Text>
                  <TextInput
                    placeholder={`Enter age of passenger ${passenger.id}`}
                    style={styles.passengerDEtailInputBox}
                    keyboardType="numeric"
                    value={passenger.age.toString()}
                    onChangeText={(value) => {
                      setPassengerDetail((prevPassengers) =>
                        prevPassengers.map((currentPassenger) =>
                          currentPassenger.id === passenger.id
                            ? { ...currentPassenger, age: value }
                            : currentPassenger
                        )
                      );
                    }}
                  ></TextInput>
                </View>
              );
            })}
          </ScrollView>
          <TouchableOpacity
            style={[styles.updateBtn, styles.bookBtn]}
            onPress={() => {
              bookTheTickets();
            }}
          >
            <Text style={styles.bookText}>Book Tickets</Text>
          </TouchableOpacity>
        </View>
      </View>
      {bookedTicketModal && (
        <Modal transparent>
          <View style={styles.modalContainer}>
            <View style={styles.bookedBox}>
              <Image source={myImage} style={styles.image} />
              <Text style={styles.successfulText}>
                BOOKING SUCCESSFUL COMPLETED
              </Text>
              <Text style={styles.thankYouText}>
                Thank you for choosing our service!
              </Text>
              <TouchableOpacity style={styles.homeBtn} onPress={() => {navigation.navigate("HomeScreen")}}>
                <Text style={styles.backHomeText}>Go to Home</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

export default BookTicket;
