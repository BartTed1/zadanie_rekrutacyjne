import { configureStore } from '@reduxjs/toolkit';
import { seatsNumber } from '../features/reducers/seatsNumber';
import { isAlongside } from '../features/reducers/isAlongside';
import { seatsSelected } from '../features/reducers/seatsSelected';

export const store = configureStore({
  reducer: {
    seatsNumberStore: seatsNumber,
    isAlongsideStore: isAlongside,
    seatsSelectedStore: seatsSelected
  }
});
