import React from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';
import LocInfo from './LocInfo.jsx';

function ActualInfo() {
  const currentW = useSelector((state) => state.currentW);
  console.log(currentW);
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
