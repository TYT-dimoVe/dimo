import { combineEpics } from 'redux-observable';
import { homeEpics } from 'pages/Home/redux/epic';

export const rootEpic = combineEpics(
    homeEpics
);