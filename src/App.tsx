import { digitMaps } from "./utility/digitMaps";
import { useState, useEffect } from 'react';

function App() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const properTime = time.toLocaleTimeString().replace(/([a-zA-Z])/g, "");
  const formatedTimeArray = properTime
    .split(":")
    .map((time) => time.padStart(2, "0").trim().split(""));
  // formatedTimeArray = [ [ '0', '4' ], [ '2', '4' ], [ '2', '9' ] ] --- IGNORE ---
  function getAngledDigits(digit: string) {
    return digitMaps[Number(digit)].flat().map((ele, idx) => {
      return (
        <div key={`cell-${idx}`} className="box">
          <div
            className="line"
            style={{ transform: `rotate(${ele[0]}deg)` }}
          ></div>
          <div
            className="line"
            style={{ transform: `rotate(${ele[1]}deg)` }}
          ></div>
        </div>
      );
    });
  }

  return (
    <div className="clockContainer">
      {formatedTimeArray.map((timeSegment, segmentIndex) => {
        return (
          <div key={`segment-${segmentIndex}`} className="digitsGroup">
            {timeSegment.map((digit, digitIndex) => {
              return (
                <div
                  key={`digit-${segmentIndex}-${digitIndex}`}
                  className="digitsContainer"
                >
                  {getAngledDigits(digit)}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

export default App;
