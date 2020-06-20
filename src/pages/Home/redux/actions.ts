import { defineAction } from 'redux-typed-actions';

export const GetCities = defineAction<any>('GET_CITIES');
export const GetCitiesSuccess = defineAction<any>('GET_CITIES_SUCCESS');
export const GetCitiesFailed = defineAction<any>('GET_CITIES_FAILED');

export const SearchTrips = defineAction<any>('SEARCH_TRIPS');
export const SearchTripsSuccess = defineAction<any>('SEARCH_TRIPS_SUCCESS');
export const SearchTripsFailed = defineAction<any>('SEARCH_TRIPS_FAILED');

export const LoadMoreTrips = defineAction<any>('LOAD_MORE_TRIPS');
export const LoadMoreTripsSuccess = defineAction<any>('LOAD_MORE_TRIPS_SUCCESS');
export const LoadMoreTripsFailed = defineAction<any>('LOAD_MORE_TRIPS_FAILED');

export const SaveRoundTrip = defineAction<any>('SAVE_ROUND_TRIPS');

export const FilterTrips = defineAction<any>('FILTER_TRIPS');
export const FilterTripsSuccess = defineAction<any>('FILTER_TRIPS_SUCCESS');
export const FilterTripsFailed = defineAction<any>('FILTER_TRIPS_FAILED');