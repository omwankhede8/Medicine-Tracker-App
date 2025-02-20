import { ScrollView, View } from "react-native";
import React from "react";
import AddMedicationHeader from "../../components/AddMedicationHeader";
import AddMedicineForm from "../../components/AddMedicineForm";
import { useLocalSearchParams } from "expo-router";

const AddNewMedication = () => {
  return (
    <ScrollView>
      <AddMedicationHeader />
      <AddMedicineForm />
    </ScrollView>
  );
};

export default AddNewMedication;
