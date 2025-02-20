import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import Color from "../constant/Color";
import { GetDateRangeToDisplay } from "../service/ConvertDateTime";
import moment from "moment";
import { getLocalStorage } from "@/service/Storage";
import { collection, query, where, getDocs } from "firebase/firestore";
import MedicationCartItem from "./MedicationCartItem";
import { db } from "../config/Firbaseconfig";
import EmptyState from "./EmptyState";
import { useRouter } from "expo-router";

const { height } = Dimensions.get("window");

const MedicationList = () => {
  const router = useRouter();

  const [medlist, setMedList] = useState([]);

  const [dateRange, setDateRange] = useState([]);

  const [selectedDate, setSelectedDate] = useState(
    moment().format("MM/DD/YYYY"),
  );

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    GetDateRangeList();
    GetMedicationList(selectedDate);
  }, [selectedDate]);

  const GetDateRangeList = () => {
    const dateRange = GetDateRangeToDisplay();
    setDateRange(dateRange);
  };

  const GetMedicationList = async (selectedData) => {
    setLoading(true);
    const user = await getLocalStorage("userDetail");

    if (!user?.email) {
      console.log("User  email is missing");
      return;
    }

    try {
      const q = query(
        collection(db, "medication"),
        where("userEmail", "==", user?.email),
        where("dates", "array-contains", selectedData),
      );

      const querySnapshot = await getDocs(q);
      const medications = querySnapshot.docs.map((doc) => doc.data());
      setMedList(medications);
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/m.png")}
        style={styles.image}
      />
      <FlatList
        data={dateRange}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.dateList}
        contentContainerStyle={styles.dateListContent}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              setSelectedDate(item.formattedDate);
              GetMedicationList(item.formattedDate);
            }}
            style={[
              styles.dateGroup,
              {
                backgroundColor:
                  item.formattedDate === selectedDate
                    ? Color.PRIMARY
                    : Color.LIGHT_GRAY_BORDER,
              },
            ]}
          >
            <Text
              style={[
                styles.day,
                {
                  color:
                    item.formattedDate === selectedDate ? "white" : "black",
                },
              ]}
            >
              {item.day}
            </Text>
            <Text
              style={[
                styles.date,
                {
                  color:
                    item.formattedDate === selectedDate ? "white" : "black",
                },
              ]}
            >
              {item.date}
            </Text>
          </TouchableOpacity>
        )}
      />
      {medlist.length > 0 ? (
        <FlatList
          data={medlist}
          onRefresh={() => GetMedicationList(selectedDate)}
          refreshing={loading}
          contentContainerStyle={styles.medListContainer}
          style={styles.medList}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                router.push({
                  pathname: "/action-modal",
                  params: {
                    ...item,
                    selectedDate: selectedDate,
                  },
                })
              }
            >
              <MedicationCartItem medicine={item} />
            </TouchableOpacity>
          )}
        />
      ) : (
        <EmptyState />
      )}
    </View>
  );
};

export default MedicationList;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f8f9fa",
    marginHorizontal: 10,
  },
  image: {
    height: height * 0.25, // 25% of the screen height
    width: "100%",
    resizeMode: "cover",
    marginHorizontal: 10,
  },
  dateList: {
    marginTop: 15, // Margin between image and date list
  },
  dateListContent: {
    paddingVertical: 5, // Add vertical padding to the FlatList
  },
  dateGroup: {
    display: "flex",
    alignItems: "center",
    padding: 10,
    backgroundColor: Color.LIGHT_GRAY_BORDER,
    marginRight: 10,
    borderRadius: 10,
    height: 65, // Set a fixed height for the date group
  },
  day: {
    fontSize: 18,
  },
  date: {
    fontSize: 15,
    fontWeight: "bold",
  },
  medListContainer: {
    paddingBottom: 10, // Adjust spacing below the list
  },
  medList: {
    marginTop: 15, // Margin between date list and medication list
    flexGrow: 1, // Ensures it takes up only required space
  },
});
