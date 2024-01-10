import { StyleSheet } from "react-native";
export default styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 0.6,
    width: "100%",
  },
  containerBoxToEnter: {
    flex: 0.4,
    backgroundColor: "#CCCCFF",
    borderRadius: 25,
  },
  entryBox: {
    margin: 20,
    borderRadius: 25,
    flex: 0.9,
    backgroundColor: "#673147",
    justifyContent: "center",
    alignItems: "center",
  },
  entryText: {
    fontSize: 30,
    fontWeight: "900",
    fontStyle: "italic",
    color: "#fff",
  },
  smallTExt: {
    color: "white",
    textAlign: "center",
    margin: 10,
  },
  nextButton: {
    backgroundColor: "white",
    width: "70%",
    flex: 0.3,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginVertical: 10,
  },
  nextText: {
    fontWeight: "400",
    fontSize: 20,
  },
});
