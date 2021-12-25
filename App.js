import "react-native-gesture-handler";
import * as React from "react";
import { View, Text, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WorldScreen from "./WorldScreen";
import Countries from "./Countries";
import { createDrawerNavigator } from "@react-navigation/drawer";
import CountryStats from "./CountryStats";
const Drawer = createDrawerNavigator();

const Stack = createNativeStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Countries" component={Countries} />
      <Stack.Screen name="WorldScreen" component={WorldScreen} />
      <Stack.Screen name="Country Stats" component={CountryStats} />
    </Stack.Navigator>
  );
}

function Screen2() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>2 Screen</Text>
    </View>
  );
}

// function WorldScreen({ navigation }) {
//   return (
//     <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
//       <Button title="Clck" onPress={() => navigation.navigate("2")} />
//       <Text>World Screen</Text>
//     </View>
//   );
// }
function App() {
  return (
    <NavigationContainer>
      {/* <Drawer.Navigator>
        <Drawer.Screen name="Home" component={MyStack} />
        <Drawer.Screen name="Countries" component={Countries} /> */}
      <MyStack />
      {/* </Drawer.Navigator> */}
    </NavigationContainer>
  );
}

export default App;
