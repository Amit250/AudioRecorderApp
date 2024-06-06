import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from './screens/HomeScreen'
import SearchScreen from './screens/SearchScreen'
import Realm from './../providers/Realm'
import 'react-native-get-random-values'

const Stack = createNativeStackNavigator()

export default function index() {
  return (
    <Realm>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='Home' component={HomeScreen} />
        <Stack.Screen name='Search' component={SearchScreen} />
      </Stack.Navigator>
    </Realm>
  )
}
