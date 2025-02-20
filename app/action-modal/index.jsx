import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import Color from "../../constant/Color";
import MedicationCartItem from "../../components/MedicationCartItem";
import AntDesign from "@expo/vector-icons/AntDesign";

const MedicationActionModel = () => {
  const router = useRouter();

  const medicine = useLocalSearchParams();
  console.log(medicine);
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/bell.png")}
        style={styles.image}
      />
      <Text style={{ fontSize: 18 }}>{medicine?.selectedDate}</Text>
      <Text style={{ fontSize: 30, fontWeight: "bold", color: Color.PRIMARY }}>
        {medicine?.selectedDate}
      </Text>
      <Text style={{ fontSize: 18 }}>Time to Take your medicine</Text>

      <MedicationCartItem medicine={medicine} />

      <View style={styles.buttonsView}>
        <TouchableOpacity style={styles.closeBtn}>
          <AntDesign
            name="closecircleo"
            size={24}
            color="red"
          />
          <Text style={styles.closetext}>Missed</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.successBtn}>
          <AntDesign
            name="checkcircleo"
            size={24}
            color="green"
          />
          <Text style={styles.successtext}>Missed</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.exitbtn}
        onPress={() => router.back()}
      >
        <AntDesign
          name="closecircle"
          size={34}
          color="grey"
        />
      </TouchableOpacity>
    </View>
  );
};

export default MedicationActionModel;

const styles = StyleSheet.create({
  container: {
    padding: 25,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    height: "100%",
  },
  image: {
    width: 150,
    height: 150,
  },
  closeBtn: {
    padding: 10,
    flexDirection: "row",
    gap: 10,
    borderWidth: 1,
    borderColor: "red",
    borderRadius: 10,
  },
  successBtn: {
    padding: 10,
    flexDirection: "row",
    gap: 10,
    borderWidth: 1,
    borderColor: "green",
    borderRadius: 10,
    backgroundColor: "lightgreen",
  },

  closetext: {
    fontSize: 18,
    color: "red",
  },
  successtext: {
    fontSize: 18,
    color: "green",
  },
  buttonsView: {
    marginTop: 20,
    display: "flex",
    flexDirection: "row",
    gap: 20,
  },
  exitbtn: {
    position: "absolute",
    bottom: 25,
  },
});
