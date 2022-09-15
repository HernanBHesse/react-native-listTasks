import React from "react";
import { View, TextInput, Button } from "react-native";
import {styles} from "./styles"

const AddTask = ({
  item,
  placeholder,
  onHandleChangeText,
  textButton,
  addItem,
}) => {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        value={item}
        placeholder={placeholder}
        onChangeText={onHandleChangeText}
      />
      <Button title={textButton} onPress={addItem} color="#ADD" />
    </View>
  );
};

export default AddTask;
