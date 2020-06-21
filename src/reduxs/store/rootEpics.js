import { combineEpics } from 'redux-observable';
import { homeEpics } from 'pages/Home/redux/epic';
import { searchEpics } from 'pages/SearchTrip/redux/epic'
import { searchOrderEpics } from 'pages/SearchOrder/redux/epic'
import { seatEpics } from 'pages/ChooseSeat/redux/epic'
export const rootEpic = combineEpics(
    homeEpics,
    searchEpics,
    searchOrderEpics,
    seatEpics,
);