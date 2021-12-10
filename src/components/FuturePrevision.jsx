import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

function FuturePrevision(props) {
  const [futPrev, setFutPrev] = useState();

  moment().locale('es');

  useEffect(() => {
    console.log(props.futPrev);
    if (Object.keys(props.futPrev).length > 0) {
      setFutPrev(
        props.futPrev.daily.map((day, i) =>
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
    }
  }, [props.futPrev]);

  return (
    <div className="prevision-futura">
      <div className="prevision-tiempo">{futPrev}</div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    API_key: state.API_key,
    futPrev: state.futPrev,
  };
}

export default connect(mapStateToProps)(FuturePrevision);
