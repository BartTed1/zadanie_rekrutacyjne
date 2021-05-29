import { createStore } from 'redux';
import { seatsNumber } from '../reducers/seatsNumber';
import { isAlongside } from '../reducers/isAlongside';
import { seatsSelected } from '../reducers/seatsSelected';

export const seatsNumberStore = createStore(seatsNumber);

export const isAlongsideStore = createStore(isAlongside);

export const seatsSelectedStore = createStore(seatsSelected);