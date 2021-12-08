import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import ActualInfo from './components/ActualInfo.jsx';
import FuturePrevision from './components/FuturePrevision.jsx';
import './style.css';

/** TODO: 
 * TERMINAR DE OPTIMIZAR CÓDIGO Y VER SI SE HACEN CAMBIOS EN ESTA DOC
 * ESTABLECER OBJETO PARA CADA DATOS DIARIOS(?)
1. Pensar en objetos de información a guardar en el STATE y establecerlos en el "initialState".
  - locInfo --> información meteorológica actual.
  - futPrev --> información meteorológica de los siguientes 7 días.
  - API_key --> KEY de la API meteorológica.

2. Establecer las DISPATCH FUNCTION (actions) en su respectivo archivo y exportarlas.
  - handleLocInfo --> devuelve la información meteorológica actual.
  - handeFutPrev --> devuelve la previsión meteorológica de los días siguientes.

3. Establecer el funcionamiento de las acciones en el método reducer.
  - Devuelven un nuevo objeto state con la información correspondiente actualizada.

4. Establecer los Componentes ya pensados y la estructura que devuelven, utilizando las actions y/o el store.
  - ActualInfo --> Contiene "CurrentWeather" y muestra la hora, fecha y localidad actual.
    - La localidad la recoge de datos del STATE, almacenados tras su cotejo en "CurrentWeather".
    - Usaremos:
      - mapStateToProps --> Acceder a "locInfo".
      - connect --> Exportar y conectar el store con el componente.
  
  - CurrentWeather --> Coteja la localización y recoge y devuelve los datos meteorológicos actuales.
    - Pedimos/Comprobamos permisos de geolocalización y hacemos una llamada a la API con la latitud y longitud.
    - Los datos devueltos los estableceremos como valor de un objeto y este lo pasaremos a la DISPATCH FUNCTION para enviar los datos al STORE.
    - Return: JSX con los datos a mostrar
    - Usaremos:
      - mapStateToProps --> acceder a API_key y "locInfo".
      - mapDispatchToProps --> conectar DISPATCH FUNCTIONS al componente.

  REVISAR UNA VEZ SE HAYA TERMINADO ESTE COMPONENTE
  - FuturePrevision --> Muestra una mini-previsión de los siguientes 7 dias
    - Pedimos/Comprobamos permisos de geolocalización.
    - Llamada a la API, con latitud y longitud, para recibir datos diarios.
    - Establecemos (para constante de "useState") una estructura JSX para cada día recibido excepto hoy.
    - Return: JSX que contiene todos los días.
    - Usaremos:
      - mapStateToProps --> acceder a API_key
      - mapDispatchToProps --> enviar datos diarios a la store
5. 
 */

const initialState = {
  locInfo: {},
  futPrev: {},
  API_key: 'e6715c036f2a31c0ae2045316f6690e8',
};

function reducer(state = initialState, action) {
  switch (action.type) {
    // case 'CURRENT&FUT_W_INFO':
    //   return {
    //     ...state,
    //     locInfo: action.data.currentW
    //     futPrev: action.data.futPrev
    //   };
    case 'CURRENT_W_INFO':
      return {
        ...state.locInfo,
        locInfo: action.data,
      };
    case 'FUTURE_PREVISION':
      return {
        ...state.futPrev,
        futPrev: action.data,
      };
    default:
      return state;
  }
}

const store = createStore(reducer);

ReactDOM.render(
  <Provider store={store}>
    <ActualInfo />
    <FuturePrevision />
  </Provider>,
  document.getElementById('root')
);
