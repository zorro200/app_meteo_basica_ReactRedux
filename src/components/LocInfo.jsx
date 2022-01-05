import React, { useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { handleLocInfoAll } from '../reducers/weatherReducer';

function LocInfo(props) {
  // WARNING --> If we use useState, we'll be able only to use its information in the return statement. I think that with re-renders the state goes again to its initial state and we can use it for, for example: sending it to dispatch actions and then to store and use it in other components.

  const currentW = useSelector((state) => state.currentW);
  // Once the component is mounted, this will be executed
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(handleLocInfoAll());
    // navigator.geolocation.getCurrentPosition(
    //   (success) => {
    //     const lat = success.coords.latitude;
    //     const lon = success.coords.longitude;
    //     fetch(
    //       `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&units=metric&appid=${props.API_key}`
    //     )
    //       .then((res) => res.json())
    //       .then((data) => {
    //         loadWeatherAll(data);
    //       });
    //   },
    //   (err) => {
    //     alert('Ubicación no activada');
    //     console.log('Ubicación no activada ' + err);
    //   }
    // );
  }, [dispatch]);

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
    props.handleLocInfoAll(locInfo);
  }

  return (
    <>
      <table className="otros" id="elementos-tiempo-actual">
        <tbody>
          <tr className="elem-tiempo">
            <th> Temperatura </th>
            <td id="elem-tiempo-valor">{currentW.temp} ºC</td>
          </tr>
          <tr className="elem-tiempo">
            <th> Humedad </th>
            <td id="elem-tiempo-valor"> {currentW.humidity} % </td>
          </tr>
          <tr className="elem-tiempo">
            <th> Presión </th>
            <td id="elem-tiempo-valor"> {currentW.pressure} hPa </td>
          </tr>
          <tr className="elem-tiempo">
            <th> Vel. viento </th>
            <td id="elem-tiempo-valor"> {currentW.windSpeed} m/s </td>
          </tr>
          <tr className="elem-tiempo">
            <th>Amanacer</th>
            <td id="elem-tiempo-valor">
              {moment(currentW.sunrise * 1000).format('HH:mm a')}
            </td>
          </tr>
          <tr className="elem-tiempo">
            <th>Anochecer</th>
            <td id="elem-tiempo-valor">
              {moment(currentW.sunset * 1000).format('HH:mm a')}
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default LocInfo;
