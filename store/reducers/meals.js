import { MEALS } from "../../data/dummy-data"
import { TOGGLE_FAVOURITE, SET_FILTERS } from "../actions/meals";
import { ActivityIndicatorComponent } from "react-native";
import FiltersScreen from "../../screens/FiltersScreen";

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
        case SET_FILTERS:
            const updatedFilteredMeals = state.meals.filter(meal => {
                if (action.filters.glutenFree && !meal.isGlutenFree) {
                    return false;
                }
                if (action.filters.lactoseFree && !meal.isLactoseFree) {
                    return false
                }
                if (action.filters.vegetarian && !meal.isVegetarian) {
                    return false
                }
                if (action.filters.vegan && !meal.isVegan) {
                    return false
                }
                return true
            })
            return {...state, filteredMeals: updatedFilteredMeals}
        default:
            return state;
    }
}

export default mealsReducer