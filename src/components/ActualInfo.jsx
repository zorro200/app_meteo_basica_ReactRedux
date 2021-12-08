import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import CurrentWeather from './CurrentWeather.jsx';

function ActualInfo(props) {
  moment().locale('es'); // NO FUNCIONA
  return (
    <div className="info-actual">
      <div className="fecha-container">
        <div className="tiempo" id="tiempo">
          {moment().format('h:mm a')}
        </div>

        <div className="fecha" id="fecha">
          {moment().format('dddd, MMMM D')}
        </div>

        <CurrentWeather />
      </div>

      <div className="lugar-container">
        <div className="lugar-ubicacion" id="lugar-ubicacion">
          {props.locInfo.loc}
        </div>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    locInfo: state.locInfo,
  };
}

export default connect(mapStateToProps)(ActualInfo);
