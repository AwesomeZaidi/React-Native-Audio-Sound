import React, { useState, useEffect } from "react";
import { Audio } from "expo-av";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { NoteTwo } from "./constants/Colors";
import PushDown from "./PushDown";

const xyloSounds = [require("./assets/note1.wav")];

const App = () => {
  Audio.setAudioModeAsync({
    allowsRecordingIOS: false,
    staysActiveInBackground: true,
    interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
    playsInSilentModeIOS: true,
    shouldDuckAndroid: true,
    interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
    playThroughEarpieceAndroid: false
  });
  const [playing, setPlaying] = useState(null);
  const [session, setSession] = useState({
    status: "ok",
    data: null,
    error: null
  });

  useEffect(() => {
    console.log("unmount");

    return () => {
      clearSounds();
      setSession({ status: "ok", data: null, error: null });
      setPlaying(null);
    };
  }, []);

  const createSoundObjects = async () => {
    // Goes through each sound file, creats a Sound Object,
    // loads it and then pushes it to the soundObjects array
    setSession({ ...session, data: null, status: "loading", error: null });
    let soundObjects = [];
    try {
      for (let sound of await Promise.all(xyloSounds)) {
        const soundObject = new Audio.Sound();
        await soundObject.loadAsync(sound);
        soundObjects.push(soundObject);
      }
      setSession({ ...session, data: soundObjects });
    } catch (e) {
      console.log("e:", e);
      setSession({
        ...session,
        data: null,
        error: "Sommething went wrong creating sounds",
        status: "error"
      });
    }
  };

  const clearSounds = () => {
    setPlaying(false);
    try {
      for (let soundObject of session.data) {
        soundObject.unloadAsync();
      }
      setSession({ ...session, data: null, error: null, status: "ok" });
    } catch (e) {
      console.log("e:", e);
      setSession({
        ...session,
        data: null,
        error: "Something went wrong clearing sounds",
        status: "error"
      });
    }
  };

  const repeat = async () => {
    window.setInterval(() => {
      playSounds();
    }, 3750);
  };

  const playSounds = async () => {
    // Go through each sound object file if the array is nonempty and play each sound.
    if (session.data) {
      try {
        for (let soundObject of await Promise.all(session.data)) {
          await soundObject.replayAsync().then(playbackStatus => {
            return new Promise(r => {
              setTimeout(() => {
                r();
              }, playbackStatus.playableDurationMillis);
            });
          });
        }
        console.log("finished playSoudns");
      } catch (e) {
        console.log("e:", e);
        setSession({
          ...session,
          data: null,
          error: "Sommething went wrong playing sounds",
          status: "error"
        });
      }
    }
  };

  if (session.status === "error" && session.error) {
    return (
      <>
        <PushDown />
        <View style={styles.container}>
          <TouchableOpacity style={[styles.button, { backgroundColor: "red" }]}>
            <Text style={styles.buttonText}>{session.error}</Text>
          </TouchableOpacity>
        </View>
      </>
    );
  }

  return (
    <>
      <PushDown />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.button,
            { backgroundColor: session.data || playing ? "lightgray" : NoteTwo }
          ]}
          onPress={createSoundObjects}
          disabled={session.data || playing}
        >
          <Text style={styles.buttonText}>
            {session.status === "loading"
              ? "Loading"
              : !session.data && session.status === "ok"
              ? "Load Session"
              : session.data
              ? "Loaded"
              : null}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.button,
            {
              backgroundColor:
                playing || (!playing && session.data) ? NoteTwo : "lightgray"
            }
          ]}
          onPress={repeat}
          disabled={playing === true || (!playing && !session.data)}
        >
          <Text style={styles.buttonText}>
            {playing ? "Playing" : "Start Session"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            {
              backgroundColor: playing === null ? "lightgray" : NoteTwo
            }
          ]}
          onPress={clearSounds}
          disabled={!playing}
        >
          <Text style={styles.buttonText}>End Session</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff"
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    margin: 8
  },
  buttonText: {
    color: "#fff",
    fontSize: 18
  }
});

export default App;
