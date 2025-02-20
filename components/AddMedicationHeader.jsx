import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const AddMedicationHeader = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => router.back()}
        style={styles.backButton}
      >
        <Ionicons
          name="arrow-back"
          size={24}
          color="#333"
        />
      </TouchableOpacity>
      <Image
        source={require("../assets/images/medical-team.png")} // Temporary local image
        style={styles.image}
      />
      <Text style={styles.title}>Add Medication</Text>
    </View>
  );
};

export default AddMedicationHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,

    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  backButton: {
    padding: 8,
    marginRight: 10,
  },
  image: {
    width: 40,
    height: 40,
    resizeMode: "contain",
    marginRight: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
});
