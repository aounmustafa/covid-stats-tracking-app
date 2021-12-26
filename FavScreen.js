import { ListItem, Icon, SearchBar } from "react-native-elements";
import * as React from "react";
import { View, Text, StyleSheet, FlatList, Button } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TouchableOpacity } from "react-native-gesture-handler";
import { set } from "react-native-reanimated";

const FavScreen = ({ navigation }) => {
  const [countries, setCountries] = React.useState([]);
  // const [fav, setFav] = React.useState(true);
  const [refresh, setRefresh] = React.useState(false);
  React.useEffect(() => {
    getData();
  }, []);

  const EmptyMessage = () => {
    return (
      <View style={styles.emptyContainer}>
        <Text style={{ fontSize: 25 }}>No Favourties!</Text>
      </View>
    );
  };

  const CountryRow = (props) => {
    return (
      <ListItem bottomDivider>
        <ListItem.Content>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Country Stats", { name: props.country })
            }
          >
            <ListItem.Title>{props.country}</ListItem.Title>
          </TouchableOpacity>
        </ListItem.Content>

        <Icon
          name="heart"
          type="font-awesome"
          color="#bb4a62"
          size={30}
          onPress={() => {
            unFav(props.country);
            // setRefresh(true);
          }}
        />
      </ListItem>
    );
  };

  const unFav = async (value) => {
    //setRefresh(true);
    let newArr = [];
    try {
      let oldData = JSON.parse(await AsyncStorage.getItem("@Favs"));
      if (oldData != null) {
        newArr = oldData;
      }
      let i = newArr.indexOf(value);
      newArr.splice(i, 1);

      console.log(newArr);
      //AsyncStorage.clear();
      await AsyncStorage.setItem("@Favs", JSON.stringify(newArr));
      console.log("done saving");
    } catch (e) {
      // saving error
    }
    getData();
  };
  const getData = async () => {
    setRefresh(true);
    try {
      const jsonValue = JSON.parse(await AsyncStorage.getItem("@Favs"));
      if (jsonValue != null) {
        //  console.log("here");
        setCountries(jsonValue);
      } else {
        //   console.log("im emp");
      }
    } catch (e) {
      // error reading value
    }
    setRefresh(false);
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={countries}
        renderItem={({ item }) => <CountryRow country={item} />}
        ListEmptyComponent={<EmptyMessage />}
        onRefresh={() => getData()}
        refreshing={refresh}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    display: "flex",
    height: "100%",
  },
  emptyContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: "10%",
  },
});

export default FavScreen;
