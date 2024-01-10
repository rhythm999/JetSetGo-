import { dispatchTypeString } from "./constant";

export function fetchFlightData(data) {
  return {
    type: dispatchTypeString.FLIGHT_DATA,
    payload: data,
  };
}

export function setBackupData(data) {
  return {
    type: dispatchTypeString.FLIGHT_BACKUP_DATA,
    payload: data,
  };
}

export function setFilterData(filteredData) {
  return {
    type: dispatchTypeString.FLIGHT_DATA,
    payload: filteredData,
  };
}
