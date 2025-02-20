import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
  StyleSheet,
} from "react-native";
import Color from "../../constant/Color";
import { useRouter } from "expo-router";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import app from "../../config/Firbaseconfig";
import { setLocalStorage } from "../../service/Storage";

export default function Signup() {
  const router = useRouter();
  const auth = getAuth(app);

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");

  const OnCreateAccount = () => {
    if (!email || !password || !userName) {
      ToastAndroid.show("Please Fill All Details", ToastAndroid.BOTTOM);
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        // console.log("User created successfully:", user);
        ToastAndroid.show("Account Created Successfully", ToastAndroid.BOTTOM);

        //? user Name
        await updateProfile(user, { displayName: userName });

        //? local storage
        await setLocalStorage("userDetail", user);
        router.push("(tabs)");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("Error:", errorCode, errorMessage);

        if (errorCode === "auth/email-already-in-use") {
          ToastAndroid.show("Email already exists", ToastAndroid.BOTTOM);
        } else if (errorCode === "auth/weak-password") {
          ToastAndroid.show("Password is too weak", ToastAndroid.BOTTOM);
        } else {
          ToastAndroid.show("An error occurred", ToastAndroid.BOTTOM);
        }
      });
  };

  return (
    <View
      style={{ padding: 25, backgroundColor: Color.PRIMARY, height: "100%" }}
    >
      <Text style={styles.textHeader}>Sign Up</Text>
      <Text style={styles.text}>
        Access medicines, health essentials, and expert advice—all at your
        fingertips
      </Text>

      <View>
        <Text style={styles.headingText}>Full Name</Text>
        <TextInput
          placeholder="Full Name"
          style={styles.textInput}
          value={userName}
          onChangeText={(value) => setUserName(value)}
        ></TextInput>

        <Text style={styles.headingText}>Email</Text>
        <TextInput
          placeholder="Email"
          style={styles.textInput}
          onChangeText={(value) => setEmail(value)}
        ></TextInput>

        <Text style={styles.headingText}>Password</Text>
        <TextInput
          placeholder="Password"
          style={styles.textInput}
          secureTextEntry={true}
          onChangeText={(value) => setPassword(value)}
        ></TextInput>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={OnCreateAccount}
      >
        <Text style={{ fontSize: 17, textAlign: "center" }}>
          Create Account
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("login/signin")}
      >
        <Text style={{ fontSize: 17, textAlign: "center" }}>
          Already have an account? Sign In
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  textHeader: {
    fontSize: 30,
    fontWeight: "900",
  },
  headingText: {
    marginTop: 25,
    marginBottom: 10,
    fontWeight: "700",
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
