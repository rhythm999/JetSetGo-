import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import { useDispatch, useSelector } from "react-redux";
import { fetchFlightData } from "../services/redux/action";

export default DateList = () => {
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("");
  const [diffrentAirline, setDiffrentAirline] = useState([]);
  const [diffrentPlaces, setDiffrentPlaces] = useState([]);
  const [saveToggle, setSaveToggle] = useState(false);
  const dispatch = useDispatch();

  const dataList = useSelector((state) => {
    return state.jestSetGoBackup;
  });

  useEffect(() => {
    let airlineNames = dataList.map(
      (list) => list.displayData.airlines[0].airlineName
    );
    setDiffrentAirline([...new Set(airlineNames)]);
    let places = Array.from(
      new Set([
        ...dataList.map((flight) => flight.displayData.source.airport.cityName),
        ...dataList.map(
          (flight) => flight.displayData.destination.airport.cityName
        ),
      ])
    );
    setDiffrentPlaces(places);
  }, [dataList]);

  useEffect(() => {
    if ("") {
      dispatch(fetchFlightData(dataList));
    } else if (selectedFilter == "By Price") {
      let sortedData = [...dataList].sort((a, b) => a.fare - b.fare);
      dispatch(fetchFlightData(sortedData));
    } else if (selectedFilter == "By Travel Time") {
      let sortedData = [...dataList].sort(
        (a, b) =>
          convertToMinutes(a.displayData.totalDuration) -
          convertToMinutes(b.displayData.totalDuration)
      );
      dispatch(fetchFlightData(sortedData));
    } else {
      let sortedData = dataList.filter(
        (flight) =>
          flight.displayData.airlines[0].airlineName === selectedFilter ||
          flight.displayData.source.airport.cityName === selectedFilter ||
          flight.displayData.destination.airport.cityName === selectedFilter
      );
      dispatch(fetchFlightData(sortedData));
    }
  }, [saveToggle]);

  function convertToMinutes(travelTime) {
    const [hours, minutes] = travelTime
      .split("h ")
      .map((value) => parseInt(value) || 0);
    return hours * 60 + minutes;
  }

  return (
    <View style={styles.mainContiner}>
      <View style={styles.dateCardList}>
        <SearchBar />
      </View>
      <View style={styles.filterBox}>
        <MaterialIcons
          name="filter-alt"
          size={30}
          color="#fff"
          onPress={() => {
            setFilterOpen(true);
          }}
        />
      </View>
      {filterOpen && (
        <Modal transparent>
          <View style={{ flex: 1, justifyContent: "flex-end" }}>
            <View style={styles.filterModal}>
              <View style={styles.crossBtnBox}>
                <MaterialIcons
                  name="cancel"
                  size={24}
                  color="black"
                  style={styles.crossBtn}
                  onPress={() => {
                    setFilterOpen(false);
                  }}
                />
              </View>
              <View>
                <Text style={styles.headingName}>Sort</Text>

                <TouchableOpacity
                  onPress={() => {
                    setSelectedFilter(
                      selectedFilter === "By Price" ? "" : "By Price"
                    );
                  }}
                >
                  <Text
                    style={
                      selectedFilter == "By Price"
                        ? styles.subheadingNameSelected
                        : styles.subheadingName
                    }
                  >
                    By Price
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setSelectedFilter(
                      selectedFilter === "By Travel Time"
                        ? ""
                        : "By Travel Time"
                    );
                  }}
                >
                  <Text
                    style={
                      selectedFilter == "By Travel Time"
                        ? styles.subheadingNameSelected
                        : styles.subheadingName
                    }
                  >
                    By Travel Time
                  </Text>
                </TouchableOpacity>
              </View>
              <View>
                <Text style={styles.headingName}>Filter By</Text>
                <Text style={styles.subheadingName}>By Airlines</Text>
                <View style={styles.cardSelector}>
                  {diffrentAirline.map((airline, index) => {
                    return (
                      <TouchableOpacity
                        key={index}
                        style={
                          selectedFilter == airline
                            ? styles.carFilterSelected
                            : styles.carFilter
                        }
                        onPress={() => {
                          setSelectedFilter(
                            selectedFilter === airline ? "" : airline
                          );
                        }}
                      >
                        <Text
                          style={
                            selectedFilter == airline
                              ? { color: "#fff" }
                              : { color: "grey" }
                          }
                        >
                          {airline}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
                <Text style={styles.subheadingName}>By Place</Text>
                <View style={styles.cardSelector}>
                  {diffrentPlaces.map((places, index) => {
                    return (
                      <TouchableOpacity
                        key={index}
                        style={
                          selectedFilter == places
                            ? styles.carFilterSelected
                            : styles.carFilter
                        }
                        onPress={() => {
                          setSelectedFilter(
                            selectedFilter === places ? "" : places
                          );
                        }}
                      >
                        <Text
                          style={
                            selectedFilter == places
                              ? { color: "#fff" }
                              : { color: "grey" }
                          }
                        >
                          {places}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
              <TouchableOpacity
                style={styles.saveBtn}
                onPress={() => {
                  setSaveToggle(!saveToggle);
                  setFilterOpen(false);
                }}
              >
                <Text style={styles.saveText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContiner: {
    flex: 1,
    flexDirection: "row",
  },
  dateCardList: {
    width: "85%",
    justifyContent: "space-around",
    flexDirection: "row",
  },
  filterBox: {
    width: "15%",
    justifyContent: "center",
    alignItems: "center",
  },
  dateBox: {
    height: "95%",
    width: 60,
    borderWidth: 1,
    borderColor: "blue",
    marginLeft: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  filterModal: {
    backgroundColor: "#fff",
    width: "100%",
    height: "65%",
    borderRadius: 20,
    borderTopColor: "grey",
    borderTopWidth: 10,
    padding: 30,
  },
  crossBtnBox: {
    flex: 0.1,
    justifyContent: "center",
  },
  crossBtn: {
    right: 10,
    position: "absolute",
  },
  headingName: {
    fontWeight: "900",
    fontSize: 25,
    marginVertical: 10,
  },
  subheadingName: {
    fontSize: 18,
    fontWeight: "600",
    fontStyle: "italic",
    letterSpacing: 4,
    color: "grey",
    marginVertical: 5,
  },
  saveBtn: {
    width: "80%",
    flex: 0.7,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 20,
    marginTop: 40,
    backgroundColor: "#673147",
  },
  saveText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20,
  },
  subheadingNameSelected: {
    color: "lightblue",
    fontSize: 22,
    fontWeight: "800",
    fontStyle: "italic",
    letterSpacing: 4,
    marginVertical: 5,
  },
  cardSelector: {
    width: "90%",
    flexWrap: "wrap",
    flexDirection: "row",
  },
  carFilter: {
    height: 30,
    width: 60,
    borderWidth: 1,
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "lightblue",
  },
  carFilterSelected: {
    height: 30,
    width: 60,
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "lightblue",
  },
});
