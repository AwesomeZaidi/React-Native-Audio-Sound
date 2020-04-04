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
