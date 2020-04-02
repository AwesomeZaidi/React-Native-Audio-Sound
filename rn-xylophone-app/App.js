import React, { useState, useEffect, useRef } from "react";
import { Audio } from "expo-av";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { NoteTwo } from "./constants/Colors";
const xyloSounds = [
  require("./assets/note1.wav"),
  require("./assets/note2.wav"),
  require("./assets/note3.wav")
];

const App = () => {
  const isPlayingSounds = useRef(false);
  const handlePlaySounds = async () => {
    if (isPlayingSounds.current === false) {
      isPlayingSounds.current = true;
      for (let sound of await Promise.all(xyloSounds)) {
        const soundObject = new Audio.Sound();
        await soundObject.loadAsync(sound);
        await soundObject.playAsync().then(playbackStatus => {
          return new Promise(r => {
            setTimeout(() => {
              soundObject.unloadAsync().then(r);
            }, playbackStatus.playableDurationMillis);
          });
        });
      }
      isPlayingSounds.current = false;
    }
  };

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
          onPress={handlePlaySounds}
        >
          <Text style={styles.buttonText}>Note 2</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// const [soundObject, setSoundObject] = useState(null);
// useEffect(() => {
//   loadSoundObject();
// }, []);
// const loadSoundObject = async () => {
//   try {
//     const _soundObject = new Audio.Sound();
//     await _soundObject.loadAsync(xyloSound);
//     setSoundObject(_soundObject);
//   } catch (e) {
//     console.log(e);
//     setSoundObject(null);
//   }
// };
// const handlePlaySound = async () => {
//   if (soundObject) {
//     try {
//       let playbackStatus = await soundObject.playAsync();
//       let playbackStatus2 = await soundObject.playAsync();
//     } catch (e) {
//       console.log("pooped.");
//     }
//   } else {
//     console.log("pooping");
//     loadSoundObject();
//   }
// };
// handlePlaySound();

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
