import { View, Text, TouchableOpacity, ImageBackground } from "react-native";
import styles from "./LandingStyle";
import { useNavigation } from "@react-navigation/native";

function LandingScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/planee.jpg")}
        resizeMode="cover"
        style={styles.image}
      ></ImageBackground>
      <View style={styles.containerBoxToEnter}>
        <View style={styles.entryBox}>
          <Text style={styles.entryText}> Discover your</Text>
          <Text style={styles.entryText}> Dream flight easily</Text>
          <Text style={styles.smallTExt}>
            Flight or flying is the process by which an object moves through a
            space without contacting any planetary surface.
          </Text>
          <TouchableOpacity
            style={styles.nextButton}
            onPress={() => {
              navigation.navigate("HomeScreen");
            }}
          >
            <Text style={styles.nextText}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default LandingScreen;
