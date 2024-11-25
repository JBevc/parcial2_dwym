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

export default function DestinationInfo({ route }) {
  const { id } = route.params;
  const [destination, setDestination] = useState([]);
  const navigation = useNavigation();

  const getDestination = async () => {
    try {
      const response = await fetch(
        `http://172.20.10.2:3000/destinations/${id}`,
        {
          method: "GET",
        }
      );

      const data = await response.json();
      console.log("data response get destination: ", data);
      setDestination(data);

      if (!response.ok) throw new Error("Error en la respuesta");
      return data;
    } catch (error) {
      console.log("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    getDestination();
  }, []);

  const deleteDestination = async () => {
    try {
      const response = await fetch(
        `http://172.20.10.2:3000/destinations/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();
      console.log("data response delete planet: ", data);

      if (!response.ok) throw new Error("Error en la respuesta");
      return data;
    } catch (error) {
      console.log("Error fetching data: ", error);
    }
  };

  function submitDeleteDest() {
    deleteDestination();
    close();
  }

  function close() {
    navigation.navigate("HomePage");
  }

  function edit() {
    navigation.navigate("EditDestination", { id });
  }

  return (
    <SafeAreaView style={styles.homeContainer}>
      <Text style={styles.title}> {destination.name} </Text>
      <View styles={styles.info}>
        <Text style={styles.text}> {destination.description} </Text>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity onPress={submitDeleteDest}>
            <View style={styles.buttonDelete}>
              <Text style={styles.buttonText}> eliminar </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={edit}>
            <View style={styles.buttonCancel}>
              <Text style={styles.buttonText}> editar </Text>
            </View>
          </TouchableOpacity>
        </View>
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
    fontSize: 40,
    fontWeight: "bold",
    marginTop: 50,
  },
  text: {
    fontSize: 18,
    maxWidth: "85%",
    marginTop: 20,
  },
  info: {
    marginTop: 50,
    display: "flex",
    justifyContent: "space-between",
    Height: "100%",
    maxWidth: "85%",
    flexDirection: "column",
  },
  buttonsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "85%",
    marginTop: 30,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "500",
    color: "white",
  },
  buttonDelete: {
    backgroundColor: "#bc4749",
    height: 55,
    width: 150,
    display: "flex",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
  },
  buttonCancel: {
    backgroundColor: "#457b9d",
    // backgroundColor: "#1d2d44",
    height: 55,
    width: 150,
    display: "flex",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
  },
});
