import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { handleFutPrev } from '../actions';

function FuturePrevision(props) {
  const [futPrev, setFutPrev] = useState();

  moment().locale('es');

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
            loadFutPrev(data);
          });
      },
      (err) => {
        alert('Ubicación no activada');
        console.log('Ubicación no activada ' + err);
      }
    );
  }, []);

  function loadFutPrev(data) {
    setFutPrev(
      data.daily.map((day, i) =>
        i != 0 ? (
          <div key={i} className="elem-prevision-tiempo">
            <div className="dia">{moment(day.dt * 1000).format('ddd')}</div>
            <div className="temp">
              Min:
              {Math.floor(day.temp.min)}
              ºC
            </div>
            <div className="temp">
              Max:
              {Math.floor(day.temp.max)}
              ºC
            </div>
          </div>
        ) : (
          console.log('Hoy -> ' + moment(day.dt * 1000).format('dddd'))
        )
      )
    );
    console.log(futPrev);
    // props.handleFutPrev(data)
  }

  return (
    <div className="prevision-futura">
      <div className="prevision-tiempo">{futPrev}</div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    API_key: state.API_key,
  };
}

const mapDispatchToProps = {
  handleFutPrev,
};

export default connect(mapStateToProps, mapDispatchToProps)(FuturePrevision);
