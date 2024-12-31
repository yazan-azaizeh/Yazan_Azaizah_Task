import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar';
const AuthLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen
          name="signin"
          options={{headerShown: false}}
        />
         <Stack.Screen
          name="signup"
          options={{headerShown: false}}
        />
      </Stack>
      <StatusBar backgroundColor={'#f6f4f0'} style='dark'></StatusBar>
    </>

  )
}

export default AuthLayout
