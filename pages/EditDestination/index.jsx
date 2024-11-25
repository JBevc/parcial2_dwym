import {
  SafeAreaView,
  StyleSheet,
  Text,
  FlatList,
  View,
  TouchableOpacity,
  Platform,
  TextInput,
} from "react-native";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { Dropdown } from "react-native-element-dropdown";

export default function EditDestination({ route }) {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [dificultad, setDificultad] = useState("");

  const navigation = useNavigation();
  const { id } = route.params;

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
      setNombre(data.name);
      setDescripcion(data.description);
      setDificultad(data.difficulty);

      if (!response.ok) throw new Error("Error en la respuesta");
      return data;
    } catch (error) {
      console.log("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    getDestination();
  }, [id]);

  const changeDestination = async (destination) => {
    try {
      const response = await fetch(
        `http://172.20.10.2:3000/destinations/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(destination),
        }
      );
      if (!response.ok) throw new Error("Error en la respuesta");
      const updatedDestination = await response.json();
      console.log("Planet successfully updated:", updatedDestination);
      return planet;
    } catch (error) {
      console.log("Error fetching data: ", error);
    }
  };

  const opciones = [
    { label: "Fácil", value: "1" },
    { label: "Moderada", value: "2" },
    { label: "Difícil", value: "3" },
  ];

  const DropdownComponent = () => {
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);

    return (
      <View style={styles.container}>
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={opciones}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? dificultad : "..."}
          value={dificultad}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={(item) => {
            setValue(item.value);
            setIsFocus(false);
            setDificultad(item.label);
          }}
        />
      </View>
    );
  };

  function submit() {
    const destination = {
      name: nombre,
      description: descripcion,
      difficulty: dificultad,
      favorites: 0,
    };
    changeDestination(destination);
    close();
  }

  function close() {
    navigation.navigate("HomePage");
  }

  return (
    <SafeAreaView style={styles.homeContainer}>
      <Text style={styles.title}> Edit destination </Text>
      <View style={styles.formContainer}>
        <View style={styles.form}>
          <Text style={styles.text}> Nombre</Text>
          <TextInput
            value={nombre}
            style={styles.input}
            onChangeText={(text) => setNombre(text)}
          ></TextInput>
        </View>
        <View style={styles.form}>
          <Text style={styles.text}> Descripción</Text>
          <TextInput
            style={styles.input}
            value={descripcion}
            onChangeText={(text) => setDescripcion(text)}
          ></TextInput>
        </View>
        <View style={styles.form}>
          <Text style={styles.text}> Dificultad</Text>
          <DropdownComponent />
        </View>
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity onPress={submit}>
          <View style={styles.buttonAdd}>
            <Text style={styles.buttonText}> aceptar </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={close}>
          <View style={styles.buttonCancel}>
            <Text style={styles.buttonText}> cancelar </Text>
          </View>
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
    fontSize: 40,
    fontWeight: "bold",
    marginTop: 50,
    textAlign: "center",
  },
  text: {
    color: "black",
    fontSize: 20,
    margin: 10,
    marginLeft: 0,
    marginRight: 0,
  },
  input: {
    width: "100%",
    height: 40,
    backgroundColor: "#fffcf2",
    borderRadius: 20,
    color: "#669bbc",
    padding: 10,
    paddingLeft: 15,
    fontWeight: "400",
    borderWidth: 1,
    borderColor: "black",
  },
  form: {
    margin: 10,
    marginLeft: 0,
    marginRight: 0,
  },
  formContainer: {
    width: "85%",
    textAlign: "left",
    marginTop: 20,
  },
  container: {
    padding: 0,
  },
  dropdown: {
    height: 50,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 8,
    backgroundColor: "white",
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 10,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
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
  buttonAdd: {
    backgroundColor: "#f6aa1c",
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
