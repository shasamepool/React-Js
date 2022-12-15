export const ADD_FAVORI = "ADD_FAVORI";
export const DELETE_FAVORI = "DELETE_FAVORI";

export function favoriReducer(state = [], action) {
    switch (action.type) {
        case ADD_FAVORI:
            return [...state, action.payload];
        case DELETE_FAVORI:
            return state.filter((favori) => favori.id !== action.payload.id);
        default:
            return state;
    }
}