import { View, Text, StyleSheet, ScrollView, FlatList } from "react-native";
import React from "react";
import Header from "../../components/Header.jsx";
import MedicationList from "../../components/MedicationList.jsx";

export default function HomeScreen() {
  return (
    <FlatList
      data={[]}
      ListHeaderComponent={
        <View style={styles.container}>
          <Header />
          <MedicationList />
        </View>
      }
    ></FlatList>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
});
