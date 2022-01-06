import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { handleLocInfoAll } from '../reducers/weatherReducer';

function LocInfo() {
  // WARNING --> If we use useState, we'll be able only to use its information in the return statement. I think that with re-renders the state goes again to its initial state and we can use it for, for example: sending it to dispatch actions and then to store and use it in other components.
  const dispatch = useDispatch();

  const currentW = useSelector((state) => state.currentW);
  const API_key = useSelector((state) => state.API_key);
  // Once the component is mounted, this will be executed
  useEffect(() => {
    dispatch(handleLocInfoAll(API_key));
  }, [dispatch]);

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
              {moment(currentW.sunrise * 1000).format('LT')}
            </td>
          </tr>
          <tr className="elem-tiempo">
            <th>Anochecer</th>
            <td id="elem-tiempo-valor">
              {moment(currentW.sunset * 1000).format('LT')}
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default LocInfo;
