import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import Color from "../../constant/Color";
import { useRouter } from "expo-router";

export default function LoginScreen() {
  const router = useRouter();

  return (
    <>
      <View>
        <View style={styles.container}>
          <Image
            source={{
              uri: "https://media.licdn.com/dms/image/v2/D4D12AQGRsdqOy4FUnw/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1698232816694?e=1741219200&v=beta&t=RO_nDI9YHtqcUXL1ywDXf_ZkZYZKP36gPg76zW2B9hE",
            }}
            style={styles.image}
          />
        </View>

        <View style={styles.container2}>
          <Text style={styles.text}>Stay on Track, Stay Healthy!</Text>
          <Text
            style={{
              ...styles.text,
              fontSize: 22,
              fontStyle: "italic",
            }}
          >
            Your Health, Your Care, Just a Tap Away
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push("login/signin")} 
          >
            <Text
              style={{
                textAlign: "center",
                fontSize: 16,
                fontWeight: "500", 
                color: "black",
              }}
            >
              Continue
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    marginTop: 10,
  },
  image: {
    width: "100%",
    height: 450,
    borderRadius: 20,
  },
  text: {
    padding: 20,
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
  },
  container2: {
    padding: 25,
    height: "100%",
  },
  button: {
    padding: 15,
    borderRadius: 20,
    marginTop: 25,
    backgroundColor: Color.PRIMARY, 
  },
});
