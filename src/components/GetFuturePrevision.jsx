import React, { useState } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { handleFutPrev } from '../actions';

function GetFuturePrevision(props) {
  const [futPrev, setFutPrev] = useState({});

  // getFutPrev();

  function getFutPrev() {
    navigator.geolocation.getCurrentPosition(
      (success) => {
        const lat = success.coords.latitude;
        const lon = success.coords.longitude;
        console.log(lat);
        setInterval(() => {
          fetch(
            `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`
          )
            .then((res) => res.json())
            .then((data) => {
              console.log(data);
              data.daily.forEach((day, i) => {
                setFutPrev({
                  temp: {
                    day: data.daily.temp.day,
                    night: data.daily.temp.night,
                    min: data.daily.temp.min,
                    max: data.daily.temp.max,
                  },
                  pressure: data.daily.pressure,
                  humidity: data.daily.humidity,
                  weather: {
                    main: data.daily.weather[0].main,
                    description: data.daily.weather[0].description,
                    icon: data.daily.weather[0].icon,
                  },
                  alerts: [data.daily.alerts],
                });
              });
              props.handleFutPrev(futPrev);
            });
        }, 10000);
      },
      (err) => {
        alert('Ubicación no activada');
        console.log('Ubicación no activada ' + err);
      }
    );
  }

  function calCelsius(temp) {
    return Math.floor(temp);
  }
}

const mapDispatchToProps = {
  handleFutPrev,
};

export default connect(null, mapDispatchToProps)(GetFuturePrevision);
