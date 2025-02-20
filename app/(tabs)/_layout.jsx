import React, { useEffect, useState } from "react";
import { Tabs, useRouter } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import { getLocalStorage } from "../../service/Storage";

export default function TabLayout() {
  const router = useRouter();

  //? local storage auth
  useEffect(() => {
    GetUserDetails();
  }, []);

  const GetUserDetails = async () => {
    const userInfo = await getLocalStorage("userDetail");

    if (!userInfo) {
      router.replace("/login");
    }
  };
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: (
            { color, size }, // color is default systum color & size is default screen font size
          ) => (
            <AntDesign
              name="home"
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="AddNew"
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign
              name="pluscircleo"
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Profile"
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign
              name="profile"
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
