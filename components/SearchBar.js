import React, { useEffect, useState } from "react";
import { StyleSheet, TextInput, View, Keyboard, Button } from "react-native";
import { Feather, Entypo } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { fetchFlightData } from "../services/redux/action";

const SearchBar = () => {
  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);
  const dispatch = useDispatch();

  const FlightDataFromApi = useSelector((state) => {
    return state.jestSetGoBackup;
  });

  useEffect(() => {
    if (searchPhrase.length > 0) {
      let newFilteredData = FlightDataFromApi.filter((flight) => {
        return (
          flight.displayData.airlines[0].airlineName
            .toLowerCase()
            .indexOf(searchPhrase.toLowerCase()) > -1
        );
      });
      dispatch(fetchFlightData(newFilteredData));
    } else {
      setClicked(false);
      dispatch(fetchFlightData(FlightDataFromApi));
    }
  }, [searchPhrase]);

  useEffect(() => {
    if (searchPhrase.length > 0) {
      setClicked(true);
    } else {
      setClicked(false);
    }
  }, [searchPhrase]);

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <Feather
          name="search"
          size={20}
          color="black"
          style={{ marginLeft: 1 }}
        />

        <TextInput
          style={styles.input}
          onChangeText={setSearchPhrase}
          value={searchPhrase}
          placeholder="Search Flights"
        />
        {clicked && (
          <Entypo
            name="cross"
            size={20}
            color="black"
            style={{ padding: 1, marginRight: 10 }}
            onPress={() => {
              setSearchPhrase("");
              setClicked(false);
              Keyboard.dismiss();
            }}
          />
        )}
      </View>
    </View>
  );
};
export default SearchBar;

// styles
const styles = StyleSheet.create({
  container: {
    margin: 8,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
  },

  input: {
    fontSize: 20,
    marginLeft: 10,
    width: "70%",
  },
  searchBar: {
    backgroundColor: "#fff",
    width: "100%",
    borderRadius: 10,
    height: 50,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
  },
});
