import { Card } from "react-native-elements";
import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import axios from "axios";

const CountryStats = ({ route, navigation }) => {
  const [statsObj, setStatsObj] = React.useState({});
  const [totalPop, setTotalPop] = React.useState("");
  const { name } = route.params;

  const options = {
    method: "GET",
    url: "https://world-population.p.rapidapi.com/population",
    params: { country_name: name },
    headers: {
      "x-rapidapi-host": "world-population.p.rapidapi.com",
      "x-rapidapi-key": "f2fdedfd95msh151232a4268def5p1b5e94jsn35e3f7db2908",
    },
  };

  const covidOptions = {
    method: "GET",
    url: "https://covid-19-data.p.rapidapi.com/country",
    params: { name: name },
    headers: {
      "x-rapidapi-host": "covid-19-data.p.rapidapi.com",
      "x-rapidapi-key": "f2fdedfd95msh151232a4268def5p1b5e94jsn35e3f7db2908",
    },
  };

  const getPopFromApi = () => {
    axios
      .request(options)
      .then(function (response) {
        setTotalPop(response.data.body.population);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  const getCovidFromApi = () => {
    axios
      .request(covidOptions)
      .then(function (response) {
        setStatsObj(response.data[0]);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  React.useEffect(() => {
    getCovidFromApi();
    getPopFromApi();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <View style={{ marginLeft: 30, marginTop: 35 }}>
          <Text style={styles.topText}>Covid-19 Statistics</Text>
          <Text style={styles.topText}>{name} Stats</Text>
          <Text style={styles.dateText}>
            Last Updated: {statsObj.lastUpdate}
          </Text>
        </View>
      </View>
      <View style={styles.bottom}>
        <View style={styles.cardsWrapper}>
          <View style={{ flexDirection: "row" }}>
            <StatsCard
              title="Recovered"
              noOfCases={statsObj.recovered}
              percent={
                ((statsObj.recovered / statsObj.confirmed) * 100).toFixed(1) +
                "%"
              }
            />
            <StatsCard
              title="Deaths"
              noOfCases={statsObj.deaths}
              percent={
                ((statsObj.deaths / statsObj.confirmed) * 100).toFixed(1) + "%"
              }
            />
          </View>
          <View style={{ flexDirection: "row" }}>
            <StatsCard
              title="Confirmed"
              noOfCases={statsObj.confirmed}
              percent={((statsObj.confirmed / totalPop) * 100).toFixed(1) + "%"}
            />
            <StatsCard
              title="Critical"
              noOfCases={statsObj.critical}
              percent={
                ((statsObj.critical / statsObj.confirmed) * 100).toFixed(3) +
                "%"
              }
            />
          </View>
        </View>
        <View style={styles.bottomTextWrapper}>
          <Text style={styles.bottomText}>Total Population : {totalPop}</Text>
          <Text style={styles.bottomText}>
            Total cases : {statsObj.confirmed}
          </Text>
          <Text style={styles.bottomText}>
            Percentage effected :
            {((statsObj.confirmed / totalPop) * 100).toFixed(1)} %
          </Text>
        </View>
      </View>
    </View>
  );
};

const StatsCard = (props) => {
  return (
    <Card
      containerStyle={{
        marginTop: 15,
        borderWidth: 0,
        width: "40%",
        alignItems: "center",
      }}
    >
      <Card.Title>{props.title}</Card.Title>
      <Card.Divider />

      <Text
        style={
          props.title == "Recovered"
            ? styles.recoveredText
            : props.title == "Deaths"
            ? styles.deathText
            : props.title == "Confirmed"
            ? styles.confirmedText
            : styles.criticalText
        }
      >
        {props.noOfCases}
      </Text>
      <Text>{props.percent}</Text>
    </Card>
  );
};
const styles = StyleSheet.create({
  container: {
    display: "flex",
    height: "100%",
  },
  top: {
    flex: 1.8,
    backgroundColor: "#222b45",
  },
  bottom: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    //  margin: 10,
    backgroundColor: "#F8F8F9",
  },

  //---colors for cases
  recoveredText: {
    fontSize: 20,
    color: "#309a49",
    fontWeight: "bold",
  },
  criticalText: {
    color: "#676f76",
    fontSize: 20,
    fontWeight: "bold",
  },

  confirmedText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#bb4a62",
  },
  deathText: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#e1385d",
  },
  //-------

  topText: {
    color: "#fbfbfd",
    fontSize: 30,
    fontWeight: "bold",
  },
  bottomText: {
    color: "#222b45",
    fontSize: 20,
    fontWeight: "bold",
  },
  dateText: {
    color: "#fbfbfd",
    fontSize: 15,
  },
  cardsWrapper: {
    position: "absolute",
    bottom: 250,
    alignItems: "center",
  },
  bottomTextWrapper: { marginTop: 100 },
});
export default CountryStats;
