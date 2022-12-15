import {combineReducers, createStore} from "redux";
import {favoriReducer} from "./FavoriReducer";

export default createStore(
    combineReducers({
        favoris: favoriReducer,
    }),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);