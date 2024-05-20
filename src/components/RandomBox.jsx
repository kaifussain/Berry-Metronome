import React, { useEffect, useState, useRef } from "react";
import "./RandomBox.css";

const RandomBox = ({ playing, tempo, beatspb, stopPlaying }) => {
  const [list, setList] = useState([]);
  const [currentItem, setCurrentItem] = useState(null);
  const [selectedPreSet, setSelectedPreSet] = useState("c");
  const [timingMode, setTimingMode] = useState(0);
  const [isPracticeOn, setIsPracticeOn] = useState(false);
  const intervalRef = useRef(null);

  const clearExistingInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  useEffect(() => {
    if (playing && isPracticeOn) {
      setCurrentItem(getNextEnabledItem());
      const intervalDuration =
        (timingMode === 0 ? 1 : beatspb) * (60 / tempo) * 1000;
      intervalRef.current = setInterval(() => {
        setCurrentItem(getNextEnabledItem());
      }, intervalDuration);
    } else {
      clearExistingInterval();
    }

    return () => clearExistingInterval();
  }, [playing, tempo, timingMode, list]);

  useEffect(() => {
    if (playing) {
      stopPlaying();
      clearInterval(intervalRef.current);
    }
  }, [timingMode, list]);

  useEffect(() => {
    const getPresetList = (preset) => {
      switch (preset) {
        case "c":
          return [
            { name: "A", enabled: true },
            { name: "Am", enabled: true },
            { name: "B", enabled: true },
            { name: "Bm", enabled: true },
            { name: "C", enabled: true },
            { name: "Cm", enabled: true },
            { name: "D", enabled: true },
            { name: "Dm", enabled: true },
            { name: "E", enabled: true },
            { name: "Em", enabled: true },
            { name: "F", enabled: true },
            { name: "Fm", enabled: true },
            { name: "G", enabled: true },
            { name: "Gm", enabled: true },
          ];
        case "n":
          return [
            { name: "sa", enabled: true },
            { name: "r", enabled: true },
            { name: "re", enabled: true },
            { name: "g", enabled: true },
            { name: "ga", enabled: true },
            { name: "ma", enabled: true },
            { name: "M", enabled: true },
            { name: "pa", enabled: true },
            { name: "d", enabled: true },
            { name: "da", enabled: true },
            { name: "n", enabled: true },
            { name: "ni", enabled: true },
          ];
        case "s":
          return [
            { name: "A7", enabled: true },
            { name: "Am7", enabled: true },
            { name: "B7", enabled: true },
            { name: "Bm7", enabled: true },
            { name: "C7", enabled: true },
            { name: "Cm7", enabled: true },
            { name: "D7", enabled: true },
            { name: "Dm7", enabled: true },
            { name: "E7", enabled: true },
            { name: "Em7", enabled: true },
            { name: "F7", enabled: true },
            { name: "Fm7", enabled: true },
            { name: "G7", enabled: true },
            { name: "Gm7", enabled: true },
          ];
        default:
          return [];
      }
    };

    const newList = getPresetList(selectedPreSet);
    setList(newList);
    setCurrentItem(null);

    if (playing && isPracticeOn) {
      setCurrentItem(getNextEnabledItem());
    }
  }, [selectedPreSet, isPracticeOn]);

  const handlePreSetChange = (event) => {
    const option = event.target.value;
    setSelectedPreSet(option);
  };

  const toggleItemEnabled = (index) => {
    setList((prevList) => {
      const updatedList = [...prevList];
      updatedList[index] = {
        ...updatedList[index],
        enabled: !updatedList[index].enabled,
      };
      return updatedList;
    });
  };

  const getNextEnabledItem = () => {
    const enabledItems = list.filter((item) => item.enabled);
    if (enabledItems.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * enabledItems.length);
    return enabledItems[randomIndex].name;
  };

  return (
    <>
      <div id="practiceBox">
        <span>Practice</span>
        <label className="PracticeSwitch">
          <input
            type="checkbox"
            className="pracCheckBox"
            checked={isPracticeOn}
            onChange={() => setIsPracticeOn((x) => !x)}
          />
          <span className="slider"></span>
        </label>
      </div>
        <div className={`displayRandItemsBox ${!isPracticeOn ? 'hide' : ''}`}>
          <div
            id="currentItem"
            style={
              playing
                ? {
                    animation: `currentItemAni ${
                      (timingMode === 0 ? 1 : beatspb) * (60 / tempo)
                    }s linear infinite`,
                  }
                : { animation: "" }
            }
          >
            {currentItem}
          </div>
        </div>
        <div className={`itemPreSetBox ${!isPracticeOn ? 'hide' : ''}`}>
          <select value={selectedPreSet} onChange={handlePreSetChange}>
            <option value="c">Basic Chords</option>
            <option value="s">Seventh Chords</option>
            <option value="n">Music Notes</option>
          </select>
          <select
            value={timingMode}
            onChange={(e) => setTimingMode(Number(e.target.value))}
          >
            <option value={0}>In Each Beat</option>
            <option value={1}>In Each Bar</option>
          </select>
        </div>
        <div className={`selectEachItemsBox ${!isPracticeOn ? 'hide' : ''}`}>
          {list.map((item, index) => (
            <div
              key={index}
              onClick={() => toggleItemEnabled(index)}
              className={item.enabled ? "" : "disabledItem"}
            >
              {item.name}
            </div>
          ))}
        </div>
    </>
  );
};

export default RandomBox;
