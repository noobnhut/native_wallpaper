import React from "react";
import { Stack } from "expo-router";
import { View, Text, StyleSheet, Button } from "react-native";
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
const Layout = () => {
  return (
    <GestureHandlerRootView style={{flex:1}}>
    <BottomSheetModalProvider>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="home/index"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

export default Layout;
