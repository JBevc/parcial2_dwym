import { Text, Image, View, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function Destination({ props }) {
  const navigation = useNavigation();
  const id = props.id;

  function gotToDestInfo() {
    navigation.navigate("DestinationInfo", { id });
  }

  function difficulty(tag) {
    if (tag === "Fácil") {
      return styles.facil;
    }
    if (tag === "Difícil") {
      return styles.dificil;
    }
    if (tag === "Moderada") {
      return styles.moderada;
    }
  }

  return (
    <TouchableOpacity onPress={gotToDestInfo}>
      <View style={styles.container}>
        <View style={styles.textBox}>
          <Text style={styles.name}> {props.name}</Text>
        </View>
        <View style={difficulty(props.difficulty)}></View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: "black",
    margin: 12,
    borderRadius: 20,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    overflow: "hidden",
  },
  name: {
    fontSize: 18,
    color: "black",
    fontWeight: "600",
  },
  facil: {
    backgroundColor: "#84a98c",
    width: "15%",
    height: "100%",
  },
  dificil: {
    backgroundColor: "#ffba08",
    width: "15%",
    height: "100%",
  },
  moderada: {
    backgroundColor: "#6d597a",
    width: "15%",
    height: "100%",
  },
  textBox: {
    maxWidth: "80%",
    padding: 15,
  },
});
