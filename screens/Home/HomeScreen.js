import { FlatList, Text, View } from "react-native";
import styles from "./HomeStyle";
import { useDispatch } from "react-redux";
import { fetchFlightData, setBackupData } from "../../services/redux/action";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import FlightDetailCard from "../../components/FlightDetailCard";
import DateList from "../../components/DateList";
function HomeScreen() {
  const dispatch = useDispatch();

  useEffect(() => {
    getFlightDataFromAPI();
  }, []);

  const FlightDataFromApi = useSelector((state) => {
    return state.jetsetGoFlightData;
  });

  let getFlightDataFromAPI = async () => {
    try {
      await fetch("https://api.npoint.io/4829d4ab0e96bfab50e7")
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          dispatch(fetchFlightData(data.data.result));
          dispatch(setBackupData(data.data.result));
        });
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.backgroundShape}></View>
      <View style={styles.hiContainer}>
        <Text style={styles.hiText}> Hi Tim!</Text>
        <Text style={styles.hiText2}> Find Your Flights Here</Text>
        <View style={styles.filterComponent}>
          <DateList />
        </View>
        <View style={styles.flightListContainer}>
          <FlatList
            data={FlightDataFromApi}
            renderItem={({ item }) => <FlightDetailCard flightDetails={item} />}
            keyExtractor={(item) => item.id}
          />
        </View>
      </View>
    </View>
  );
}

export default HomeScreen;
