import { View, Text } from 'react-native'
import React from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function Profile() {
  return (
    <View>
      <View>
      <MaterialIcons name="person" size={24} color="black" />
      </View>
      <Text><AntDesign name="edit" size={24} color="black" /></Text>
    </View>
  )
}