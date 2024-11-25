import {
  SafeAreaView,
  StyleSheet,
  Text,
  FlatList,
  View,
  TouchableOpacity,
  Platform,
} from "react-native";

import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Destination from "../../components/Destination";

export default function HomePage() {
  const [destinations, setDestinations] = useState([]);
  const [order, setOrder] = useState([]);
  const navigation = useNavigation();

  const getDestinations = async () => {
    try {
      const response = await fetch("http:/172.20.10.2:3000/destinations", {
        method: "GET",
      });

      const data = await response.json();
      console.log("data response all planets: ", data);
      setDestinations(data);
      setOrderDestinations(data);

      if (!response.ok) throw new Error("Error en la respuesta");
      return data;
    } catch (error) {
      console.log("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    getDestinations();
  }, [destinations]);

  function setOrderDestinations() {
    const sortedDestinations = [...destinations].sort(
      (a, b) => (b.favorites || 0) - (a.favorites || 0)
    );
    setOrder(sortedDestinations);
  }

  function gotToCreateDest() {
    navigation.navigate("CreateDestination");
  }

  return (
    <SafeAreaView style={styles.homeContainer}>
      <Text style={styles.title}> Viajes </Text>
      <View style={styles.destinationsList}>
        <FlatList
          data={order}
          renderItem={({ item }) => <Destination props={item} />}
          keyExtractor={(item) => item.id}
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={Platform.select(styles.buttonAdd)}
          // no me gusta con texto negro
          onPress={gotToCreateDest}
        >
          <Text style={styles.buttonText}>
            {" "}
            {Platform.OS === "android" ? "agregar destino" : "crear destino"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    backgroundColor: "#fdf0d5",
    alignItems: "center",
    alignContent: "center",
  },
  title: {
    fontSize: 50,
    fontWeight: "bold",
    marginTop: 50,
  },
  destinationsList: {
    width: "85%",
    marginTop: 20,
    height: "70%",
  },
  buttonAdd: {
    ios: {
      width: "58%",
      height: "25%",
      backgroundColor: "#588157",
      borderRadius: 20,
      display: "flex",
      alignContent: "center",
      alignItems: "center",
      justifyContent: "center",
      alignSelf: "flex-end",
    },
    android: {
      width: "58%",
      height: "25%",
      backgroundColor: "#1d3557",
      borderRadius: 20,
      display: "flex",
      alignContent: "center",
      alignItems: "center",
      justifyContent: "center",
      alignSelf: "flex-start",
    },
  },
  buttonContainer: {
    width: "80%",
    display: "flex",
    alignContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    fontSize: 16,
    color: "white",
    fontWeight: "600",
  },
});
