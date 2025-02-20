import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import Color from "../../constant/Color";
import { useRouter } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/Firbaseconfig";
import { setLocalStorage } from "../../service/Storage";

export default function singin() {
  const router = useRouter();
  const [email, SetEmail] = useState();
  const [password, SetPassword] = useState();

  const OnSignInClick = () => {
    if (!email || !password) {
      Alert.alert("Please Enter Email & Password");
      return;
    }
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
        console.log(user);

        //? local storage
        await setLocalStorage("userDetail", user);

        router.replace("(tabs)");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        // Handling errors here
        if (errorCode === "auth/wrong-password") {
          console.error("Incorrect password.");
        } else if (errorCode === "auth/user-not-found") {
          console.error("No user found with this email.");
        } else if (errorCode === "auth/invalid-email") {
          console.error("Invalid email format.");
        } else {
          console.error("Error:", errorMessage);
        }
      });
  };
  return (
    <View
      style={{
        padding: 25,
        backgroundColor: Color.PRIMARY,
        height: "100%",
      }}
    >
      <Text style={styles.textHeader}> Sign In</Text>
      <Text style={styles.text}>
        Access medicines, health essentials, and expert advice—all at your
        fingertips
      </Text>

      <View>
        <Text style={styles.headingText}>Email</Text>
        <TextInput
          placeholder="Email"
          style={styles.textInput}
          onChangeText={(value) => SetEmail(value)}
        ></TextInput>

        <Text style={styles.headingText}>Password</Text>
        <TextInput
          placeholder="Password"
          style={styles.textInput}
          onChangeText={(value) => SetPassword(value)}
        ></TextInput>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={OnSignInClick}
      >
        <Text
          style={{
            fontSize: 17,
            textAlign: "center",
          }}
        >
          Login
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("login/signup")}
      >
        <Text
          style={{
            fontSize: 17,
            textAlign: "center",
          }}
        >
          CreateAccount
        </Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  textHeader: {
    fontSize: 30,
    fontWeight: 900,
  },
  headingText: {
    marginTop: 25,
    marginBottom: 10,
    fontWeight: 700,
    fontSize: 18,
    marginLeft: 3,
  },
  text: {
    fontSize: 18,
    marginTop: 20,
    fontWeight: "700",
    textAlign: "center",
    fontStyle: "italic",
    color: Color.GREY,
  },
  textInput: {
    padding: 10,
    borderWidth: 2,
    borderRadius: 10,
  },
  button: {
    padding: 15,
    backgroundColor: "white",
    borderRadius: 10,
    marginTop: 20,
  },
});
