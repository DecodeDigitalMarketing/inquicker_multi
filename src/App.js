import { useEffect, useState } from "react";
import "./App.css";
// import inQuickerLocations from "./data/inQuickerLocationsJoseph.json";
import inQuickerLocations from "./data/inQuickerLocationsLuke.json";
import useScript from "./hooks/useScript";
    
  const App = () => {
  const [selectedIndex, setSelectedIndex] = useState("");
  const status = useScript("https://iqapp.inquicker.com/assets/hold_my_place.js");

  useEffect(() => {
    const ele = document.getElementById("inOut" + selectedIndex)
    if (ele) ele.style.display = "flex"
    
    return () => ele && (ele.style.display = "none")
  }, [selectedIndex]);

  const handleSelect = ({ target }) => setSelectedIndex(target.value);

  const stLukesAvailOverried = [ "0", "1", "7", "12", "16" ]

  return (
    status && (
      <div id="inquicker-block">
        <div className="inquicker" style={{width: "100%"}}>
          <h3 className="block-title" style={{width: "100%"}}>Shorten Your ER Wait Time</h3>
        </div>
        {!selectedIndex.length && <p>Select a Location and time to schedule your ER visit.</p>}
        {selectedIndex && (
          <>
            <a 
              href={inQuickerLocations[selectedIndex].url}
              title={inQuickerLocations[selectedIndex].name}
              alt={inQuickerLocations[selectedIndex].name}
            >
              {inQuickerLocations[selectedIndex].name}
            </a>
            <p>{inQuickerLocations[selectedIndex].address}</p>
          </>
        )}
        {!!stLukesAvailOverried.includes(selectedIndex) && <p>Our ERs are always open and accept walk-ins, even if no online check-in times are available.</p>}
        <div className="flexWrapper">
          <select onChange={handleSelect}>
            <option value="" disabled selected>
              Select Location
            </option>
            {inQuickerLocations.map((loc, index) => (
              <option key={"opt" + index} value={index}>
                {loc.name}
              </option>
            ))}
          </select>
          {inQuickerLocations.map((loc, index) => (
            <div id={"inOut" + index} key={"inOut" + index} style={{display: "none"}}>
              <div
                dangerouslySetInnerHTML={{
                  __html: loc.widget,
                }}
              />
            </div>
          ))}
          {!selectedIndex.length && (
            <>
              <select disabled>
                <option value="" disabled selected>
                  Select Time
                </option>
              </select>
              <input disabled type="submit" value="Check-in Now"/>
            </>
          )}
        </div>
        <p>Our online check-in feature minimizes your wait time at the ER and maximizes your time with our expert care team.</p>
        <p><em><b>If you are experiencing a life-threatening emergency, call 911 for immediate assistance.</b></em></p>
      </div>
    )
  );
};

export default App;
