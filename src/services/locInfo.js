import axios from 'axios';
/**
 * Get user coordenates from the browser
 * @returns a Promise with the coordenates
 */
function getCoordinates() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (postition) => {
        resolve(postition);
      },
      (err) => {
        reject(err);
        alert('Ubicación no activada');
        console.log('Ubicación no activada ' + reject);
      }
    );
  });
}

/**
 * Will return the weather information to the frontend
 * @param {string} API_key
 * @constant meteo future and actual weather info
 * @constant loc location
 * @return {json} @constant info
 * WARNING: If you try to do the fetch call inside the Promise, you won't be able to
 * do an await instance; because it detects that the fetch call is not in an async function.
 */
const getLocInfoAll = async (API_key) => {
  const postition = await getCoordinates();
  let { latitude, longitude } = postition.coords;

  const meteo = axios.get(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${API_key}`
  );
  const loc = axios.get(
    `http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${API_key}`
  );

  const info = await axios
    .all([meteo, loc])
    .then(
      axios.spread((...res) => {
        const meteo = res[0].data;
        const loc = res[1].data[0];
        // Axios' return
        return loadWeatherAll(meteo, loc);
      })
    )
    .catch((err) => {
      console.log(err);
    });

  // Function's return
  return info;
};

/**
 * Will create an object with the data that we need from the fetch call and return it
 * @constant current current weather data
 * @constant daily daily weather prevision data
 * @constant locInfo object with the weather data needed
 */
function loadWeatherAll(meteo, loc) {
  const current = meteo.current;
  const daily = meteo.daily;
  const locInfo = {
    currentW: {
      /**
       * TODO: "loc" was obtained with "weather" API call, but now I'm using "onecall". I need to search another method for obtein it again
       */
      loc: `${loc.name}, ${loc.country}`,
      icon: current.weather[0].icon,
      temp: Math.floor(current.temp),
      feelsLike: Math.floor(current.feels_like),
      minTemp: Math.floor(daily[0].temp.min),
      maxTemp: Math.floor(daily[0].temp.max),
      humidity: current.humidity,
      pressure: current.pressure,
      main: current.weather[0].main,
      description: current.weather[0].description,
      windSpeed: current.wind_speed,
      sunrise: current.sunrise,
      sunset: current.sunset,
      error: false,
    },
    futPrev: { daily },
  };
  return locInfo;
}

export { getLocInfoAll };
