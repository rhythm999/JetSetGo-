import { dispatchTypeString } from "./constant";

const initialState = { jetsetGoFlightData: [], jestSetGoBackup: [] };
export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case dispatchTypeString.FLIGHT_DATA: {
      return { ...state, jetsetGoFlightData: action.payload };
    }
    case dispatchTypeString.FLIGHT_BACKUP_DATA: {
      return { ...state, jestSetGoBackup: action.payload };
    }
    default:
      return state;
  }
};
