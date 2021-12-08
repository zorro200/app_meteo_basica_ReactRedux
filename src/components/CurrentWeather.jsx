import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { handleLocInfo, handleLocInfoAll } from '../actions';

function CurrentWeather(props) {
  // WARNING --> If we use useState, we'll be able only to use its information in the return statement. I think that with re-renders the state goes again to its initial state and we can use it for, for example: sending it to dispatch actions and then to store and use it in other components.

  // CONSEGUIR TODA LA INFO SIN REDUNDANCIA DE CÓDIGO (si uso otro archivo repito funciones)
  // function getWDAll() {
  //   navigator.geolocation.getCurrentPosition(
  //     (success) => {
  //       const lat = success.coords.latitude;
  //       const lon = success.coords.longitude;
  //       console.log(lat);
  //       setTimeout(() => {
  //         fetch(
  //           `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`
  //         )
  //           .then((res) => res.json())
  //           .then((data) => {
  //             loadWeatherAll(data);
  //           });
  //       }, 10000);
  //     },
  //     (err) => {
  //       alert('Ubicación no activada');
  //       console.log('Ubicación no activada ' + err);
  //     }
  //   );
  // }

  // function loadWeatherAll(data) {
  //   let current = data.current;
  //   setCurrAndFutWeather({
  //     currentW: {
  //       loc: `${current.name}, ${current.sys.country}`,
  //       icon: current.weather[0].icon,
  //       temp: calCelsius(current.temp),
  //       feelsLike: calCelsius(current.feels_like),
  //       minTemp: calCelsius(data.main.temp_min),
  //       maxTemp: calCelsius(data.main.temp_max),
  //       humidity: current.humidity,
  //       pressure: current.pressure,
  //       main: current.weather[0].main,
  //       description: current.weather[0].description,
  //       windSpeed: current.wind_speed,
  //       sunrise: current.sunrise,
  //       sunset: current.sunset,
  //       error: false,
  //     },
  //     futPrev: {},
  //   });

  //   props.handleLocInfoAll(currAndFutWeather);
  // }

  // Once the component is mounted, this will be executed
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (success) => {
        const lat = success.coords.latitude;
        const lon = success.coords.longitude;
        fetch(
          `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&unit=metric&appid=${props.API_key}`
        )
          .then((res) => res.json())
          .then((data) => {
            let locInfo = {
              loc: `${data.name}, ${data.sys.country}`,
              icon: data.weather[0].icon,
              temp: calCelsius(data.main.temp),
              feelsLike: calCelsius(data.main.feels_like),
              minTemp: calCelsius(data.main.temp_min),
              maxTemp: calCelsius(data.main.temp_max),
              humidity: data.main.humidity,
              pressure: data.main.pressure,
              main: data.weather[0].main,
              description: data.weather[0].description,
              windSpeed: data.wind.speed,
              sunrise: data.sys.sunrise,
              sunset: data.sys.sunset,
              error: false,
            };
            props.handleLocInfo(locInfo);
          });
      },
      (err) => {
        alert('Ubicación no activada');
        console.log('Ubicación no activada ' + err);
      }
    );
  }, []);

  function calCelsius(temp) {
    return Math.floor(temp - 274.15);
  }

  return (
    <>
      <table className="otros" id="elementos-tiempo-actual">
        <tbody>
          <tr className="elem-tiempo">
            <th> Temperatura </th>
            <td id="elem-tiempo-valor">{props.locInfo.temp} ºC</td>
          </tr>
          <tr className="elem-tiempo">
            <th> Humedad </th>
            <td id="elem-tiempo-valor"> {props.locInfo.humidity} % </td>
          </tr>
          <tr className="elem-tiempo">
            <th> Presión </th>
            <td id="elem-tiempo-valor"> {props.locInfo.pressure} hPa </td>
          </tr>
          <tr className="elem-tiempo">
            <th> Vel. viento </th>
            <td id="elem-tiempo-valor"> {props.locInfo.windSpeed} m/s </td>
          </tr>
          <tr className="elem-tiempo">
            <th>Amanacer</th>
            <td id="elem-tiempo-valor">
              {moment(props.locInfo.sunrise * 1000).format('HH:mm a')}
            </td>
          </tr>
          <tr className="elem-tiempo">
            <th>Anochecer</th>
            <td id="elem-tiempo-valor">
              {moment(props.locInfo.sunset * 1000).format('HH:mm a')}
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
    locInfo: state.locInfo,
  };
}

const mapDispatchToProps = {
  handleLocInfo,
  handleLocInfoAll,
};

export default connect(mapStateToProps, mapDispatchToProps)(CurrentWeather);
