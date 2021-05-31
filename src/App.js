import './App.css';
import { useEffect, useState } from 'react';
import Waveform from './Waveform';
import defaultNoteInfo from './Constants';

const getFreq = (root, constant, steps) => constant * root ** steps;

function App() {
  const [initialized, setInitialized] = useState(false);
  const [initializing, setInitializing] = useState(false);
  const [audioContext, setAudioContext] = useState();
  const [oscillators, setOscillators] = useState({});
  const [analyser, setAnalyser] = useState();
  const [gain, setGain] = useState(); // uh.. should these be oscialltor gain pairs instead?
  const [noteInfo, setNoteInfo] = useState(defaultNoteInfo);

  const mapKeys = (keys, root, constant) => {
    let map = {};
    for (let i = 0; i < keys.length; i++) {
      map[keys[i]] = getFreq(root, constant, -i);
    }
    return map;
  }

  function initializeNoise() {
    if (initialized || initializing) {
      return;
    } else {
      setInitializing(true);
    }
    let audioContext = new (window.AudioContext || window.webkitAudioContext)();
    setAudioContext(audioContext);

    const analyser = audioContext.createAnalyser();
    analyser.fftSize = 2048;
    analyser.connect(audioContext.destination);
    setAnalyser(analyser);

    const gain = audioContext.createGain();
    gain.gain.value = 0.2;
    gain.connect(analyser);
    setGain(gain);

    //uuuuuuh crap how do I map these. lets just. not. i guess.

    setInitializing(false);
    setInitialized(true);
  }

  function playNotes(event) {
    if (oscillators[event.key] !== undefined) {
      return;
    }

    if (!initialized) {
      return;
    }

    let time = audioContext.currentTime;

    let frequency = noteInfo.keys[event.key];
    if (frequency === undefined) {
      return;
    }

    let osc = audioContext.createOscillator();
    osc.frequency.value = frequency;
    osc.type = 'sine';
    osc.connect(gain);
    osc.start(time);

    oscillators[event.key] = osc;
    setOscillators(oscillators);
  }

  function stopNote(event) {
    let osc = oscillators[event.key];
    if (osc === undefined) {
      return;
    }
    let time = audioContext.currentTime;
    osc.stop(time);
    osc.disconnect();
    oscillators[event.key] = undefined;
    setOscillators(oscillators);
  }

  useEffect(() => {
    initializeNoise();
  }, [])

  useEffect(() => {
    const exponent = noteInfo.exponent;
    const keyNum = noteInfo.keyNum;
    const constant = noteInfo.constant;
    const keys = noteInfo.characters; //this naming is getting confusing fast.

    const root = exponent ** (1/ keyNum);

    noteInfo.map = mapKeys(root, constant, keys);
  }, [noteInfo])
  return (
    <div className="App" onKeyDown={playNotes} onKeyUp={stopNote} tabIndex={0}>
      <div>
        these don't do anything.
        <br/>
        <label>exponent</label>
        <input type='number' value='3' max='5' min='2'></input>
        <label>number of notes in octave</label>
        <input type='number' value='12' max='16' min='12'></input>
        <label>constant note frequency</label>
        <input type='number' value='729' max='1000' min='100'></input>
      </div>
      <br/>
      and this is very broken
      <br/>
      <Waveform props={{
        analyser,
        // height: canvasHeight,
        // width: canvasWidth,
      }}></Waveform>
    </div>
  );
}

export default App;
