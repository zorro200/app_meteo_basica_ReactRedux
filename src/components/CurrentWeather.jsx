import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { handleLocInfoAll } from '../actions';

function CurrentWeather(props) {
  // WARNING --> If we use useState, we'll be able only to use its information in the return statement. I think that with re-renders the state goes again to its initial state and we can use it for, for example: sending it to dispatch actions and then to store and use it in other components.

  // Once the component is mounted, this will be executed
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (success) => {
        const lat = success.coords.latitude;
        const lon = success.coords.longitude;
        fetch(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&units=metric&appid=${props.API_key}`
        )
          .then((res) => res.json())
          .then((data) => {
            loadWeatherAll(data);
          });
      },
      (err) => {
        alert('Ubicación no activada');
        console.log('Ubicación no activada ' + err);
      }
    );
  }, []);

  function loadWeatherAll(data) {
    let current = data.current;
    let daily = data.daily;
    let locInfo = {
      currentW: {
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

  // useEffect(() => {
  //   navigator.geolocation.getCurrentPosition(
  //     (success) => {
  //       const lat = success.coords.latitude;
  //       const lon = success.coords.longitude;
  //       fetch(
  //         `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${props.API_key}`
  //       )
  //         .then((res) => res.json())
  //         .then((data) => {
  //           let currentW = {
  //             loc: `${data.name}, ${data.sys.country}`,
  //             icon: data.weather[0].icon,
  //             temp: Math.floor(data.main.temp),
  //             feelsLike: Math.floor(data.main.feels_like),
  //             minTemp: Math.floor(data.main.temp_min),
  //             maxTemp: Math.floor(data.main.temp_max),
  //             humidity: data.main.humidity,
  //             pressure: data.main.pressure,
  //             main: data.weather[0].main,
  //             description: data.weather[0].description,
  //             windSpeed: data.wind.speed,
  //             sunrise: data.sys.sunrise,
  //             sunset: data.sys.sunset,
  //             error: false,
  //           };
  //           props.handleCurrentW(currentW);
  //         });
  //     },
  //     (err) => {
  //       alert('Ubicación no activada');
  //       console.log('Ubicación no activada ' + err);
  //     }
  //   );
  // }, []);

  return (
    <>
      <table className="otros" id="elementos-tiempo-actual">
        <tbody>
          <tr className="elem-tiempo">
            <th> Temperatura </th>
            <td id="elem-tiempo-valor">{props.currentW.temp} ºC</td>
          </tr>
          <tr className="elem-tiempo">
            <th> Humedad </th>
            <td id="elem-tiempo-valor"> {props.currentW.humidity} % </td>
          </tr>
          <tr className="elem-tiempo">
            <th> Presión </th>
            <td id="elem-tiempo-valor"> {props.currentW.pressure} hPa </td>
          </tr>
          <tr className="elem-tiempo">
            <th> Vel. viento </th>
            <td id="elem-tiempo-valor"> {props.currentW.windSpeed} m/s </td>
          </tr>
          <tr className="elem-tiempo">
            <th>Amanacer</th>
            <td id="elem-tiempo-valor">
              {moment(props.currentW.sunrise * 1000).format('HH:mm a')}
            </td>
          </tr>
          <tr className="elem-tiempo">
            <th>Anochecer</th>
            <td id="elem-tiempo-valor">
              {moment(props.currentW.sunset * 1000).format('HH:mm a')}
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

function mapStateToProps(state) {
  return {
    API_key: state.API_key,
    currentW: state.currentW,
  };
}

const mapDispatchToProps = {
  // handleCurrentW,
  handleLocInfoAll,
};

export default connect(mapStateToProps, mapDispatchToProps)(CurrentWeather);
