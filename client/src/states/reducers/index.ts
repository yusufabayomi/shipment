import { combineReducers } from 'redux';
import shipmentReducer from './shipments';

const reducers = combineReducers({
  shipmentReducer,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
