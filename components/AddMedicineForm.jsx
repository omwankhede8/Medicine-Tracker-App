import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import Color from "../constant/Color";
import { TypeList, whenToTake } from "../constant/Options";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Picker } from "@react-native-picker/picker";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import {
  FormatData,
  formatDateForText,
  formatTime,
  getDatesRange,
} from "../service/ConvertDateTime";
import { doc, setDoc } from "firebase/firestore";
import { Alert } from "react-native";
import { db } from "../config/Firbaseconfig";
import { getLocalStorage } from "../service/Storage.jsx";
import { useRouter } from "expo-router";

const MedicationForm = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({});

  const [showStartDate, setShowStartDate] = useState(false);
  const [showEndDate, setShowEndDate] = useState(false);

  const [showTimePicker, setShowTimePicker] = useState(false);

  const [loading, setLoading] = useState(false);

  const onHandleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    console.log(formData);
  };

  const SaveMedications = async () => {
    const docId = Date.now().toString();
    const user = await getLocalStorage("userDetail");

    if (
      !formData?.name ||
      !formData?.type ||
      !formData?.dose ||
      !formData?.startDate ||
      !formData?.endDate ||
      !formData?.reminder
    ) {
      Alert.alert("Error", "Please fill all the fields");
      return;
    }
    const dates = getDatesRange(formData?.startDate, formData?.endDate);
    console.log(dates);

    setLoading(true);

    try {
      await setDoc(doc(db, "medication", docId), {
        ...formData,
        userEmail: user?.email,
        docId: docId,
        dates: dates,
      });

      console.log("Data Saved");

      setLoading(false);

      Alert.alert("Great!", "New Medication Added Succesfully", [
        {
          text: "OK",
          onPress: () => router.push("(tabs)"),
        },
      ]);
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  };
  return (
    <ScrollView style={{ padding: 25 }}>
      <Text style={styles.header}> ADD New Medication</Text>
      <View style={styles.inputGroup}>
        <AntDesign
          style={styles.icon}
          name="medicinebox"
          size={24}
          color="black"
        />
        <TextInput
          style={styles.textInput}
          placeholder="Medication Name"
          onChangeText={(value) => onHandleInputChange("name", value)}
        />
      </View>
      {/* Type list */}

      <FlatList
        style={{
          marginTop: 15,
        }}
        data={TypeList}
        horizontal={true}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.inputGroup,
              {
                marginRight: 10,
                backgroundColor:
                  item.name === formData?.type?.name
                    ? Color.PRIMARY
                    : Color.WHITE,
              },
            ]}
            onPress={() => onHandleInputChange("type", item)}
          >
            <Text
              style={[
                styles.typeText,
                {
                  color: item.name === formData?.type?.name ? "white" : "black",
                },
              ]}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />

      {/* Dosage input */}
      <View style={styles.inputGroup}>
        <Ionicons
          style={styles.icon}
          name="eyedrop-outline"
          size={24}
          color="black"
        />
        <TextInput
          style={styles.textInput}
          placeholder="Dosage Ex : 1 tablet, 2 times a day"
          onChangeText={(value) => onHandleInputChange("dose", value)}
        />
      </View>

      {/* When to take  Dropdown */}

      <View style={styles.inputGroup}>
        <Ionicons
          style={styles.icon}
          name="time-outline"
          size={24}
          color="black"
        />
        <Picker
          style={{ width: "90%" }}
          selectedValue={formData?.when}
          onValueChange={(itemValue, itemIndex) =>
            onHandleInputChange("when", itemValue)
          }
        >
          {whenToTake.map((item, index) => (
            <Picker.Item
              label={item}
              value={item}
              key={index}
            />
          ))}
        </Picker>
      </View>

      {/* Start and end date */}
      <View style={styles.dateInputGroup}>
        <TouchableOpacity
          style={[styles.inputGroup, { flex: 1 }]}
          onPress={() => setShowStartDate(true)}
        >
          <AntDesign
            style={styles.icon}
            name="calendar"
            size={24}
            color="black"
          />
          <Text style={styles.text}>
            {formatDateForText(formData?.startDate) ?? "Start Date"}
          </Text>
        </TouchableOpacity>
        {showStartDate && (
          <RNDateTimePicker
            minimumDate={new Date()}
            onChange={(event) =>
              onHandleInputChange(
                "startDate",
                FormatData(event.nativeEvent.timestamp),
                setShowStartDate(false),
              )
            }
            value={new Date(formData?.startDate) ?? new Date()}
          />
        )}
        <TouchableOpacity
          style={[styles.inputGroup, { flex: 1 }]}
          onPress={() => setShowEndDate(true)}
        >
          <AntDesign
            style={styles.icon}
            name="calendar"
            size={24}
            color="black"
          />
          <Text style={styles.text}>
            {formatDateForText(formData?.endDate) ?? "End Date"}
          </Text>
        </TouchableOpacity>
        {showEndDate && (
          <RNDateTimePicker
            minimumDate={new Date()}
            onChange={(event) =>
              onHandleInputChange(
                "endDate",
                FormatData(event.nativeEvent.timestamp),
                setShowEndDate(false),
              )
            }
            value={new Date(formData?.endDate) ?? new Date()}
          />
        )}
      </View>

      {/* Set Reminder Input */}
      <View style={styles.dateInputGroup}>
        <TouchableOpacity
          style={[styles.inputGroup, { flex: 1 }]}
          onPress={() => setShowTimePicker(true)} // Fix: Set showTimePicker to true
        >
          <Ionicons
            style={styles.icon}
            name="alarm-outline"
            size={24}
            color="black"
          />
          <Text style={styles.text}>{formData?.reminder ?? "Select time"}</Text>
        </TouchableOpacity>
      </View>

      {showTimePicker && (
        <RNDateTimePicker
          mode="time"
          display="spinner" // Fix: Change display to "spinner" for better UI support
          value={formData?.reminder ? new Date(formData.reminder) : new Date()} // Fix: Ensure a valid Date object
          onChange={(event, selectedTime) => {
            if (selectedTime) {
              // Ensure selectedTime exists
              onHandleInputChange("reminder", formatTime(selectedTime));
            }
            setShowTimePicker(false); // Close picker after selection
          }}
        />
      )}
      <TouchableOpacity
        style={styles.button}
        onPress={() => SaveMedications()}
      >
        {loading ? (
          <ActivityIndicator
            size={"small"}
            color={"white"}
          />
        ) : (
          <Text style={styles.btntext}>Add New Medication</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 20,
    fontWeight: "bold",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Color.LIGHT_GRAY_BORDER,
    marginTop: 15,
    backgroundColor: "white",
  },
  textInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
  icon: {
    color: Color.PRIMARY,
    borderRightWidth: 1,
    paddingRight: 10,
    borderColor: Color.LIGHT_GRAY_BORDER,
  },
  typeText: {
    fontSize: 16,
  },
  text: {
    fontSize: 16,
    padding: 5,
  },
  dateInputGroup: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 5,
  },
  button: {
    padding: 15,
    backgroundColor: Color.PRIMARY,
    borderRadius: 10,
    width: "100%",
    marginTop: 20,
  },
  btntext: {
    fontFamily: "Montserrat",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    color: Color.WHITE,
  },
});

export default MedicationForm;
