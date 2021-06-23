import { useEffect, useState } from "react";
import styles from "./App.module.css";
import { Current } from "./components/Current";
import { WeatherBlock } from "./components/WeatherBlock";
import axios from "axios";
import { BackArrow } from "./components/BackArrow";
import { Fader } from "./components/Fader";

const API_KEY = "X";

function App() {
  const [inputUrl, setInputUrl] = useState<string>("");
  const [submitUrl, setSubmitUrl] = useState<string>("");
  const [weatherData, setWeatherData] = useState<any>();
  const [loading, setLoading] = useState(true);
  const [locationName, setLocationName] = useState<any>(null);
  const [inputShowing, setInputShowing] = useState(true);
  const [fetchSuccessful, setFetchSuccessful] = useState(false);

  // first fetch gets the coordinates of entered location, second fetch uses those coordinates to fetch weather data
  useEffect(() => {
    setLoading(true);
    setFetchSuccessful(false);
    axios
      .get(
        `http://api.openweathermap.org/geo/1.0/direct?q=${submitUrl}&limit=1&appid=${API_KEY}`
      )
      .then((response) => {
        if (response.data.length === 0) {
          setLoading(false);
          return;
        } else {
          setFetchSuccessful(true);
          setLocationName(response.data[0].name);
          axios
            .get(
              `https://api.openweathermap.org/data/2.5/onecall?lat=${response.data[0].lat}&lon=${response.data[0].lon}&units=metric&exclude=hourly,alerts,minutely&appid=d1f2a96127c5cec6d9f09936530a7fac`
            )
            .then((response) => {
              setWeatherData(response.data);
              setLoading(false);
            });
        }
      });
  }, [submitUrl]);

  // simple unix to day index conversion
  const unixToDay = (unix: number) => {
    return new Date(unix * 1000).getDay();
  };

  const renderWeatherBlocks = (numOfBlocks: number) => {
    let weatherBlockTable = [];
    //skipping 0, represents current day
    for (let i = 1; i < numOfBlocks; i++) {
      weatherBlockTable.push(
        <WeatherBlock
          key={unixToDay(weatherData.daily[i].dt)}
          day={unixToDay(weatherData.daily[i].dt)}
          temp={Math.floor(weatherData.daily[i].temp.day)}
          weatherId={weatherData.daily[i].weather[0].id}
        />
      );
    }
    return weatherBlockTable;
  };

  return (
    <div>
      <div>
        {inputShowing && (
          <Fader>
            <div className={styles.inputBlock}>
              <h1>Weather API</h1>
              <input
                className={styles.inputField}
                name="locationName"
                placeholder="Enter location name: "
                value={inputUrl}
                onChange={(e) => setInputUrl(e.target.value)}
              />
              <button
                type="submit"
                className={styles.confirmBtn}
                onClick={() => {
                  setSubmitUrl(inputUrl);
                  setInputShowing(false);
                  setLoading(true);
                }}
              >
                Confirm
              </button>
            </div>
          </Fader>
        )}
        {!inputShowing && !loading && (
          <div>
            {fetchSuccessful ? (
              <Fader>
                <>
                  <div className={styles.backArrow}>
                    <BackArrow
                      handleClick={() => {
                        setInputShowing(true);
                        setInputUrl("");
                      }}
                    />
                  </div>
                  <div className={styles.backArrow}></div>
                  <div className={styles.currentContainer}>
                    <Current
                      location={locationName}
                      weatherId={weatherData.current.weather[0].id}
                      currTemp={Math.floor(weatherData.current.temp)}
                    />
                  </div>
                  <div className={styles.centerContainer}>
                    <div className={styles.weatherBlockContainer}>
                      {renderWeatherBlocks(7)}
                    </div>
                  </div>
                </>
              </Fader>
            ) : (
              <Fader>
                <div>
                  <div className={styles.backArrow}>
                    <BackArrow
                      handleClick={() => {
                        setInputShowing(true);
                        setInputUrl("");
                      }}
                    />
                  </div>
                  <h1>Invalid location.</h1>
                </div>
              </Fader>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
