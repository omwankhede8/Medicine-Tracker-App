import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useRouter } from "expo-router";

const { width, height } = Dimensions.get("window");

const EmptyState = () => {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Image
        source={require("./../assets/images/medicine.png")}
        style={styles.image}
      />
      <Text style={styles.title}>No Data Available</Text>
      <Text style={styles.subtitle}>Check back later for updates!</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/add-new-medication")}
      >
        <Text style={styles.buttonText}>Add Medicine</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EmptyState;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  image: {
    width: width * 0.9, // 90% of the screen width
    height: height * 0.3, // 30% of the screen height
    resizeMode: "contain",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#777",
    textAlign: "center",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});
