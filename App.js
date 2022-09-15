// React
import React, { useState } from "react";
// ReactNative
import {
  StyleSheet,
  View,
  Button,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";
// Components
import { AddTask, CustomModal } from "./components/index";

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemsList: {
    flex: 1,
    marginVertical: 20,
    marginHorizontal: 20,
  },
  itemContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
    padding: 10,
    backgroundColor: "#11242D",
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  item: {
    width: "80%",
    fontSize: 30,
    color: "white",
    textAlign: "center",
  },
  removeTask: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
  },
  modalContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
    paddingVertical: 20,
  },
  modalTitle: {
    fontSize: 26,
    fontWeight: "bold",
  },
  modalText: {
    marginVertical: 30,
    fontSize: 30,
  },
  modalSelectionTask: {
    justifyContent: "center",
    alignItems: "center",
  },

  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: "80%",
  },
});

// App
export default function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectionTask, setSelectionTask] = useState(null);

  const onHandleChangeText = (text) => {
    setTask(text);
  };

  const newTask = () => {
    setTasks([
      ...tasks,
      {
        id: new Date().getTime(),
        value: task,
      },
    ]);
    setTask("");
  };

  const itemModal = (id) => {
    setShowModal(!showModal);
    setSelectionTask(tasks.find((item) => item.id === id));
  };

  const clearTask = (id) => {
    setTasks(tasks.filter((item) => item.id !== id));
    setSelectionTask(null);
    setShowModal(!showModal);
  };

  const renderTasks = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.item}>{item.value}</Text>
      <TouchableOpacity onPress={() => itemModal(item.id)}>
        <Text style={styles.removeTask}>X</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <AddTask
        item={task}
        placeholder="Nueva tarea"
        onHandleChangeText={onHandleChangeText}
        textButton="➕"
        addItem={newTask}
      />
      <FlatList
        style={styles.itemsList}
        data={tasks}
        renderItem={renderTasks}
        keyExtractor={(item) => item.id.toString()}
      />
      <CustomModal animationType="slide" visible={showModal}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Desea eliminar la tarea:</Text>
        </View>
        <View style={styles.modalSelectionTask}>
          <Text style={styles.modalText}>{selectionTask?.value}</Text>
        </View>
        <View style={styles.modalButtonContainer}>
          <Button
            title="ACEPTAR"
            color={"red"}
            onPress={() => clearTask(selectionTask?.id)}
          />
          <Button
            title="RECHAZAR"
            color={"green"}
            onPress={() => setShowModal(!showModal)}
          />
        </View>
      </CustomModal>
    </View>
  );
}
