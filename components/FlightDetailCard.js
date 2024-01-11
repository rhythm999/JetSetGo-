import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

function FlightDetailCard({ flightDetails }) {
  const navigation = useNavigation();

  let displayData = flightDetails.displayData;
  let flightSource = displayData.source;
  let flightDestination = displayData.destination;
  return (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={() => {
        navigation.navigate("BookTicket");
      }}
    >
      <View style={styles.airlineNameandFareContainer}>
        <Text style={styles.airlineName}>
          {displayData.airlines[0].airlineName}
        </Text>
        <Text style={styles.farePrice}>
          {"\u20B9"}
          {flightDetails.fare}
        </Text>
      </View>
      <View style={styles.flightDetailContainer}>
        <View>
          <Text style={styles.timeAndDurationText}>
            {flightSource.depTime.split("T")[1]}
          </Text>
          <Text style={[styles.flightCodeText, styles.boldBigCode]}>
            {flightSource.airport.cityCode}
          </Text>
          <Text style={styles.flightCodeText}>
            {flightSource.airport.cityName}
          </Text>
        </View>
        <View style={styles.positionFixture}>
          <Text style={styles.timeAndDurationText}>
            {displayData.totalDuration}
          </Text>
          <View style={styles.planeholder}>
            <View style={styles.dashedLine}></View>
            <FontAwesome5
              name="plane"
              size={24}
              color="black"
              style={styles.plane}
            />
          </View>
        </View>
        <View>
          <Text style={styles.timeAndDurationText}>
            {flightDestination.arrTime.split("T")[1]}
          </Text>
          <Text style={[styles.flightCodeText, styles.boldBigCode]}>
            {flightDestination.airport.cityCode}
          </Text>
          <Text style={styles.flightCodeText}>
            {flightDestination.airport.cityName}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    margin: 10,
    height: 150,
    shadowColor: "grey",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 5,
    borderWidth: 0.01,
  },
  airlineNameandFareContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 10,
  },
  flightDetailContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  airlineName: {
    fontWeight: "900",
    fontSize: 20,
  },
  farePrice: {
    fontSize: 15,
    fontWeight: "500",
    color: "purple",
    letterSpacing: 1,
  },
  timeAndDurationText: {
    color: "grey",
    fontSize: 14,
    fontStyle: "italic",
    marginTop: 15,
    textAlign: "center",
  },
  flightCodeText: {
    fontSize: 15,
    fontWeight: "500",
    textAlign: "center",
  },
  boldBigCode: {
    fontSize: 30,
    fontWeight: "800",
    textAlign: "center",
  },
  dashedLine: {
    borderWidth: 1,
    borderStyle: "dashed",
    position: "absolute",
    width: "100%",
    top: "50%",
  },
  positionFixture: {
    width: "40%",
  },
  planeholder: {
    position: "relative",
    width: "100%",
    height: "50%",
  },
  plane: {
    position: "absolute",
    top: "25%",
    left: "40%",
  },
});

export default FlightDetailCard;
