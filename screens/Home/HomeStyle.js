import { StyleSheet } from "react-native";

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "grey",
  },
  backgroundShape: {
    flex: 1,
    backgroundColor: "#673147",
    transform: [{ rotate: "30deg" }],
    position: "fixed",
    borderRadius: 60,
    width: "100%",
  },
  hiContainer: {
    position: "absolute",
    width: "100%",
    paddingVertical: 50,
    paddingHorizontal: 20,
    height: "100%",
  },
  hiText: {
    color: "#fff",
    fontSize: 20,
    fontStyle: "italic",
  },
  hiText2: {
    fontSize: 23,
    color: "#fff",
    fontWeight: "900",
  },
  flightListContainer: {
    marginTop: 15,
    flex: 1,
    backgroundColor: "#fff",
  },
  filterComponent: {
    flex: 0.12,
    marginTop: 15,
  },
  noDataFoundText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "purple",
    letterSpacing: 4,
    lineHeight: 40,
  },
  noDataFoundBox: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
});
