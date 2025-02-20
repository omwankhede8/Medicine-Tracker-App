import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import Color from "../constant/Color";
import AntDesign from "@expo/vector-icons/AntDesign";

const MedicationCartItem = ({ medicine }) => {
  return (
    <View style={styles.container}>
      <View style={styles.subConatainer}>
        <View style={styles.imagecontainer}>
          <Image
            source={{ uri: medicine.type.icon }}
            style={styles.image}
          />
        </View>
        <View>
          <Text style={{ fontSize: 22, fontWeight: "bold" }}>
            {medicine?.name}
          </Text>
          <Text style={{ fontSize: 17 }}>{medicine?.when}</Text>
          <Text style={{ color: "white" }}>
            {medicine?.dose} {medicine?.type.name}
          </Text>
        </View>
      </View>
      <View style={styles.reminder}>
        <Text style={{ fontWeight: "bold", fontSize: 16 }}>
          {medicine?.reminder}{" "}
        </Text>
        <AntDesign
          name="clockcircleo"
          size={24}
          color="black"
        />
      </View>
    </View>
  );
};

export default MedicationCartItem;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    // backgroundColor: Color.PRIMARY,
    marginTop: 10,
    borderRadius: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
    borderColor: Color.LIGHT_GRAY_BORDER,
    borderWidth: 2,
  },
  imagecontainer: {
    backgroundColor: "white",
    borderRadius: 10,
    marginHorizontal: 10,
    borderColor: Color.LIGHT_GRAY_BORDER,
    borderWidth: 2,
  },
  image: {
    height: 60,
    width: 60,
    borderRadius: 10,
    margin: 5,
  },
  subConatainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  reminder: {
    padding: 10,
    backgroundColor: "white",
    borderRadius: 15,
    alignItems: "center",
    borderColor: Color.LIGHT_GRAY_BORDER,
    borderWidth: 2,
  },
});
