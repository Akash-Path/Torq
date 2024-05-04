import React, { useState } from "react";
import { View, TextInput, Button, Modal, Text } from "react-native";
import { wp } from "../res/constants";

const ProgressPopup = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [inputText, setInputText] = useState("");

  const handleInputChange = (text) => {
    setInputText(text);
  };

  const handleSubmission = () => {
    // Do something with the user input
    // For now, just log it
    console.log("User input:", inputText);
    setModalVisible(false); // Close the modal
  };

  return (
    <View style={{ width: wp("80") }}>
      <Modal
        style={{ width: "100%" }}
        animationType="slide"
        transparent={true}
        visible={props.visible}
        onRequestClose={() => {
          props.onCancel();
        }}
      >
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <View
            style={{
              backgroundColor: "white",
              padding: 20,
              flexDirection: "column",
              gap: 10,
              width: wp("80"),
              borderRadius: 10,
              elevation: 5,
            }}
          >
            <Text style={{ color: "black" }}>
              {/* Enter your {props.type} username: */}
              {props.type === "Instagram"
                ? "Enter your Instagram username:"
                : `Enter your ${props.type} username:`}
            </Text>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: "gray",
                color: "black",
                padding: 5,
                marginTop: 5,
                borderRadius: 8,
              }}
              onChangeText={props.changeHandler}
            />
            <View style={{ flexDirection: "row", gap: 10 }}>
              <Button title="Cancel" onPress={props.onCancel} />
              <Button title="Submit" onPress={props.onSubmit} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ProgressPopup;
