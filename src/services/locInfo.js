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
 * @constant {json} info weather object
 * @return {json} @constant info
 * WARNING: If you try to do the fetch call inside the Promise, you won't be able to
 * do an await instance; because it detects that the fetch call is not in an async function.
 */
const getLocInfoAll = async (API_key) => {
  const postition = await getCoordinates();
  const lat = postition.coords.latitude;
  const lon = postition.coords.longitude;
  const info = await axios
    .get(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&units=metric&appid=${API_key}`
    )
    .then((res) => {
      console.log(res.data);
      // Axios' return
      return loadWeatherAll(res.data);
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
function loadWeatherAll(data) {
  const current = data.current;
  const daily = data.daily;
  const locInfo = {
    currentW: {
      /**
       * TODO: "loc" was obtained with "weather" API call, but now I'm using "onecall". I need to search another method for obtein it again
       */
      // loc: `${current.name}, ${current.sys.country}`,
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
