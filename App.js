import "react-native-gesture-handler";
import * as React from "react";
import { View, Text, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WorldScreen from "./WorldScreen";
import Countries from "./Countries";
import { createDrawerNavigator } from "@react-navigation/drawer";
import CountryStats from "./CountryStats";
import FavScreen from "./FavScreen";
const Drawer = createDrawerNavigator();

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="WorldScreen"
          component={MyStack}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Countries"
          component={Countries}
          // options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Country Stats"
          component={CountryStats}
          // options={{ headerShown: false }}
        />
        <Stack.Screen
          name="FavScreen"
          component={FavScreen}
          // options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function MyStack() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="World Stats" component={WorldScreen} />
      <Drawer.Screen name="All Countries" component={Countries} />
      <Drawer.Screen name="Favourties" component={FavScreen} />
    </Drawer.Navigator>
  );
}

export default App;
