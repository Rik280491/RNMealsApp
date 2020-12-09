import { Platform } from "react-native";
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import CategoriesScreen from "../screens/CategoriesScreen";
import CategoryMealsScreen from "../screens/CategoryMealsScreen";
import MealDetailScreen from "../screens/MealDetailScreen";
import Colours from "../constants/Colours";

const MealsNavigator = createStackNavigator(
	{
		Categories: {
			screen: CategoriesScreen,
			navigationOptions: {
				headerTitle: "Meal Categories",
			},
		},
		CategoryMeals: CategoryMealsScreen,
		MealDetail: MealDetailScreen,
	},
	{
		defaultNavigationOptions: {
			headerStyle: {
				backgroundColor: Platform.OS === "android" ? Colours.primaryColour : "",
			},
			headerTintColor:
				Platform.OS === "android" ? "white" : Colours.primaryColour,
		},
	}
);

export default createAppContainer(MealsNavigator);
