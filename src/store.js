import { createStore } from 'redux';
import { weatherReducer } from './reducers/weatherReducer.js';

export const store = createStore(weatherReducer);
