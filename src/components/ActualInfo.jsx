import React from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';
import 'moment/locale/es';
import LocInfo from './LocInfo.jsx';

function ActualInfo() {
  const currentW = useSelector((state) => state.currentW);
  console.log(currentW);
  return (
    <div className="info-actual">
      <div className="fecha-container">
        <div className="tiempo" id="tiempo">
          {moment().format('LT')}
        </div>

        <div className="fecha" id="fecha">
          {moment().format('dddd, D [de] MMMM')}
        </div>

        <LocInfo />
      </div>

      <div className="lugar-container">
        <div className="lugar-ubicacion" id="lugar-ubicacion">
          {currentW.loc}
        </div>
      </div>
    </div>
  );
}

export default ActualInfo;
