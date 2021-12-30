import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import { store } from './store';
import ActualInfo from './components/ActualInfo.jsx';
import FuturePrevision from './components/FuturePrevision.jsx';
import './style.css';

/** TODO:
 * CAMBIAR "CurrentWeather" por "LocInfo"
 * RECOGER LOCALIDAD CON GOOGLE MAPS API, YA QUE LA NUEVA LLAMADA A LA API NO LA CONTIENE
 * MIRAR FALLO CON "moment.locale"
 * TERMINAR DE OPTIMIZAR CÓDIGO Y VER SI SE HACEN CAMBIOS EN ESTA DOC
 * ESTABLECER OBJETO PARA CADA DATOS DIARIOS(?)
1. Pensar en objetos de información a guardar en el STATE y establecerlos en el "initialState".
  - currentW --> información meteorológica actual.
  - futPrev --> información meteorológica de los siguientes 7 días.
  - API_key --> KEY de la API meteorológica.

2. Establecer las DISPATCH FUNCTION (actions) en su respectivo archivo y exportarlas.
  - handleLocInfAll --> devuelve la información meteorológica actual y la previsión futura diaria
  ANTERIORMENTE EMPLEADO:
  - handleCurrentW --> devuelve la información meteorológica actual.
  - handeFutPrev --> devuelve la previsión meteorológica de los días siguientes.

3. Establecer el funcionamiento de las acciones en el método reducer.
  - Devuelven un nuevo objeto state con la información correspondiente actualizada.

4. Establecer los Componentes ya pensados y la estructura que devuelven, utilizando las actions y/o el store.
  - ActualInfo --> Contiene "LocInfo" y muestra la hora, fecha y localidad actual.
    - La localidad la recoge de datos del STATE, almacenados tras su cotejo en "LocInfo".
    - Usaremos:
      - mapStateToProps --> Acceder a "currentW".
      - connect --> Exportar y conectar el store con el componente.
  
  - LocInfo --> Coteja la localización y recoge y devuelve los datos meteorológicos actuales, previsión futura diaria y alertas.
    - Pedimos/Comprobamos permisos de geolocalización y hacemos una llamada a la API con la latitud y longitud.
    - Los datos devueltos los estableceremos como valor de un objeto y este lo pasaremos a la DISPATCH FUNCTION para enviar los datos al STORE.
    - Return: JSX con los datos a mostrar
    - Usaremos:
      - useEffect en modalidad "ComponentDidMount"
      - mapStateToProps --> acceder a "API_key" y "currentW".
      - mapDispatchToProps --> conectar DISPATCH FUNCTIONS (handleLocInfAll) al componente.

  REVISAR UNA VEZ SE HAYA TERMINADO ESTE COMPONENTE
  - FuturePrevision --> Muestra una mini-previsión de los siguientes 7 dias
    - Si "futPrev" no está vacío, se ejecutará lo que procede
    - Establecemos (para constante de "useState") una estructura JSX para cada día recibido excepto hoy.
    - Return: JSX que contiene todos los días.
    - Usaremos:
      - useEffect en modalidad "ComponentDidUpdate" con "props.futPrev" como parámetro de cambio 
      - mapStateToProps --> acceder a "API_key" y "futPrev"
5. 
 */

ReactDOM.render(
  <Provider store={store}>
    <ActualInfo />
    <FuturePrevision />
  </Provider>,
  document.getElementById('root')
);
