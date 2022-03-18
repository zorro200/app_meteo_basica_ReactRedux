import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';
/**
 * @constant lsFutPrev --> local state future prevision
 * @constant futPrev --> actual state future prevision
 */
function FuturePrevision() {
  const [lsFutPrev, setFutPrev] = useState();
  const futPrev = useSelector((state) => state.futPrev);

  useEffect(() => {
    console.log(futPrev);
    if (Object.keys(futPrev).length > 0) {
      setFutPrev(
        futPrev.daily.map((day, i) =>
          i != 0 ? (
            // Daily prev HTML
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
  }, [futPrev]);

  return (
    <div className="prevision-futura">
      <div className="prevision-tiempo">{lsFutPrev}</div>
    </div>
  );
}

export default FuturePrevision;
