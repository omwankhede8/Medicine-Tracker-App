import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { getLocalStorage } from "./../service/Storage.jsx";
import Ionicons from "@expo/vector-icons/Ionicons";

function Header() {
  const [user, setUser] = useState();

  useEffect(() => {
    console.log("Header component mounted");
    GetUserDetail();
  }, []);
  const GetUserDetail = async () => {
    const userInfo = await getLocalStorage("userDetail");
    console.log(userInfo);
    setUser(userInfo);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        backgroundColor="#fff"
        barStyle="dark-content"
      />
      <View style={styles.container}>
        <View style={styles.userInfo}>
          <Image
            source={
              user?.photoURL
                ? { uri: user.photoURL }
                : require("./../assets/images/user-account.png")
            }
            style={styles.image}
          />
          <Text style={styles.text}>{user?.displayName} 🙌</Text>
        </View>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons
            name="settings-outline"
            size={24}
            color="#333"
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default Header;

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "#fff",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    width: "100%",
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  iconButton: {
    padding: 6,
    borderRadius: 8,
  },
});
