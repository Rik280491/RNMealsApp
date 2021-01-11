import { MEALS } from "../../data/dummy-data"
import { TOGGLE_FAVOURITE } from "../actions/meals";
import { ActivityIndicatorComponent } from "react-native";

const initialState = {
    meals: MEALS,
    filteredMeals: MEALS,
    favouriteMeals: [] 
}


const mealsReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_FAVOURITE:
            const exisitingIndex = state.favouriteMeals.findIndex(meal => meal.id === action.mealId)
            if (exisitingIndex >= 0) {
                const updatedFavMeals = [...state.favouriteMeals]
                updatedFavMeals.splice(exisitingIndex, 1)
                return {...state, favouriteMeals: updatedFavMeals }
            } else {
                const meal = state.meals.find(meal => meal.id === action.mealId)
                return {...state, favouriteMeals: state.favouriteMeals.concat(meal)}
            }
        default:
            return state;
    }
}

export default mealsReducer