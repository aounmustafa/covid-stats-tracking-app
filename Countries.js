import { ListItem, Icon, SearchBar } from "react-native-elements";
import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Button,
  Touchable,
} from "react-native";
import axios from "axios";
import { TouchableOpacity } from "react-native-gesture-handler";

const CountriesScreen = ({ navigation }) => {
  const options = {
    method: "GET",
    url: "https://world-population.p.rapidapi.com/allcountriesname",
    headers: {
      "x-rapidapi-host": "world-population.p.rapidapi.com",
      "x-rapidapi-key": "f2fdedfd95msh151232a4268def5p1b5e94jsn35e3f7db2908",
    },
  };

  const [countries, setCountries] = React.useState([]);
  const [search, setSearch] = React.useState("");
  React.useEffect(() => {
    getCountriesFromApi();
  }, []);

  const CountryRow = (props) => {
    return (
      <ListItem bottomDivider>
        <ListItem.Content>
          <ListItem.Title>{props.country}</ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron
          iconStyle={{ color: "#bb4a62" }}
          size={28}
          onPress={() =>
            navigation.navigate("Country Stats", { name: props.country })
          }
        />
      </ListItem>
    );
  };
  const searchResults = () => {
    return countries.filter((element) => {
      return element.toUpperCase().includes(search.toUpperCase());
    });
  };
  const getCountriesFromApi = () => {
    axios
      .request(options)
      .then(function (response) {
        let countriesArr = response.data.body.countries;
        setCountries(countriesArr);
      })
      .catch(function (error) {
        console.error(error);
      });
  };
  return (
    <View style={styles.container}>
      <SearchBar
        placeholder="Type Here..."
        onChangeText={setSearch}
        value={search}
      />
      <FlatList
        data={search.length < 1 ? countries : searchResults()}
        renderItem={({ item }) => <CountryRow country={item} />}
        ListEmptyComponent={<EmptyMessage />}
      />
    </View>
  );
};
const EmptyMessage = () => {
  return (
    <View style={styles.emptyContainer}>
      <Text style={{ fontSize: 25 }}>No Results Found!</Text>
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
export default CountriesScreen;
