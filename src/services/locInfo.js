import { useSelector } from 'react-redux';

const getLocInfoAll = async () => {
  navigator.geolocation.getCurrentPosition(
    (success) => {
      const lat = success.coords.latitude;
      const lon = success.coords.longitude;
      await fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&units=metric&appid=${props.API_key}`
      )
        .then((res) => res.json())
        .then((data) => {
          return (info = loadWeatherAll(data));
        });
    },
    (err) => {
      alert('Ubicación no activada');
      console.log('Ubicación no activada ' + err);
    }
  );
};

export { getLocInfoAll };
