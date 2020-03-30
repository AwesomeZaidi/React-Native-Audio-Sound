import React, { useState, useEffect } from "react";
import { Audio } from "expo-av";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { NoteTwo } from "./constants/Colors";
// const xyloSounds = {
//   one: require("./assets/note1.wav"),
//   two: require("./assets/note2.wav"),
//   three: require("./assets/note3.wav"),
//   four: require("./assets/note4.wav"),
//   five: require("./assets/note5.wav"),
//   six: require("./assets/note6.wav"),
//   seven: require("./assets/note7.wav")
// };
const xyloSounds = [
  require("./assets/note1.wav"),
  require("./assets/note2.wav"),
  require("./assets/note3.wav"),
  require("./assets/note4.wav"),
  require("./assets/note5.wav"),
  require("./assets/note6.wav"),
  require("./assets/note7.wav")
];

const App = () => {
  let soundObjects = [];
  // const [soundObjects, setSoundObjects] = useState([]);

  useEffect(() => {
    const doCreateSoundObjects = async () => {
      await createSoundObjects();
    };
    doCreateSoundObjects();
    console.log("soundObjects:", soundObjects);

    // loadSounds();
  }, []);

  const createSoundObjects = () => {
    xyloSounds.map(sound => {
      soundObjects.push(new Audio.Sound());
    });
  };

  const loadSounds = () => {
    console.log("start Promises loop");
    Promise.all(
      xyloSounds.map(async source => {
        const soundObject = new Audio.Sound();
        await soundObject.loadAsync(source);
        soundObjects.push(soundObject);
      })
    );
    console.log("soundObjects:", soundObjects);
    console.log("end Promises loop");
  };

  const playSounds = () => {
    if (soundObjects) {
      Promise.all(
        soundObjects.map(async sound => {
          await sound
            .playAsync()
            .then(async playbackStatus => {
              setTimeout(() => {
                soundObjects[i].unloadAsync();
              }, playbackStatus.playableDurationMillis);
            })
            .catch(error => {
              console.log(error);
            });
        })
      );
    }
  };

  const handlePlaySound = async note => {
    const soundObject = new Audio.Sound();
    try {
      let source = xyloSounds[note];
      // let source = require("./assets/note1.wav");
      await soundObject.loadAsync(source);
      console.log("soundObject:", soundObject);
      await soundObject
        .playAsync()
        .then(async playbackStatus => {
          setTimeout(() => {
            soundObject.unloadAsync();
          }, playbackStatus.playableDurationMillis);
        })
        .catch(error => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
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
          onPress={playSounds}
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
