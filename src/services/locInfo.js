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
const getLocInfoAll = async (API_key) => {
  const postition = await getCoordinates();
  const lat = postition.coords.latitude;
  const lon = postition.coords.longitude;
  await fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&units=metric&appid=${API_key}`
  )
    .then((res) => res.json())
    .then((data) => {
      const info = loadWeatherAll(data);
      return info;
    });
};

function loadWeatherAll(data) {
  let current = data.current;
  let daily = data.daily;
  let locInfo = {
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
