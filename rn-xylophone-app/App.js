import React, { useState, useEffect } from "react";
import { Audio } from "expo-av";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { NoteTwo } from "./constants/Colors";
const xyloSound = require("./assets/note1.wav");

const App = () => {
  const [soundObject, setSoundObject] = useState(null);
  // const [play, setPlay] = useState(true); maybe there's a way i can use state to manage th looping.

  useEffect(() => {
    loadSoundObject();
  }, []);

  const loadSoundObject = async () => {
    try {
      const _soundObject = new Audio.Sound();
      await _soundObject.loadAsync(xyloSound);
      setSoundObject(_soundObject);
    } catch (e) {
      console.log(e);
      setSoundObject(null);
    }
  };

  const handlePlaySound = async () => {
    if (soundObject) {
      try {
        const playbackStatus = await soundObject.playAsync();
        setTimeout(() => {
          console.log("released from memory");
          soundObject.unloadAsync();
        }, playbackStatus.playableDurationMillis);
      } catch (e) {
        console.log("pooped.");
      }
    } else {
      console.log("pooping");

      loadSoundObject();
    }
  };

  handlePlaySound();

  return (
    <View style={styles.container}>
      <View>
        <Text>Push Down</Text>
        <Text>Push Down</Text>
        <Text>Push Down</Text>
        <Text>Push Down</Text>
        <Text>Push Down</Text>
        <Text>Push Down</Text>
        <Text>Push Down</Text>
        <Text>Push Down</Text>
        <Text>Push Down</Text>
        <Text>Push Down</Text>
        <Text>Push Down</Text>
        <Text>Push Down</Text>
        <Text>Push Down</Text>
        <Text>Push Down</Text>
        <Text>Push Down</Text>
        <Text>Push Down</Text>
        <Text>Push Down</Text>
        <Text>Push Down</Text>
        <Text>Push Down</Text>
        <Text>Push Down</Text>
        <Text>Push Down</Text>
        <Text>Push Down</Text>
        <Text>Push Down</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: NoteTwo }]}
          onPress={handlePlaySound}
        >
          <Text style={styles.buttonText}>Note 2</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: 50
  },
  buttonContainer: {
    height: 40,
    margin: 5
  },
  button: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  buttonText: {
    color: "#fff",
    fontSize: 18
  }
});

export default App;
