import React from "react";
import { Platform } from "react-native";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createAppContainer } from "react-navigation";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import { createDrawerNavigator } from "react-navigation-drawer";
import { Ionicons } from "@expo/vector-icons";
import CategoriesScreen from "../screens/CategoriesScreen";
import CategoryMealsScreen from "../screens/CategoryMealsScreen";
import MealDetailScreen from "../screens/MealDetailScreen";
import FavouritesScreen from "../screens/FavouritesScreen";
import FiltersScreen from "../screens/FiltersScreen";
import Colours from "../constants/Colours";

const defaultStackNavOptions = {
	headerStyle: {
		backgroundColor: Platform.OS === "android" ? Colours.primaryColour : "",
	},
	headerTintColor: Platform.OS === "android" ? "white" : Colours.primaryColour,
};

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
		defaultNavigationOptions: defaultStackNavOptions,
	}
);

const FavNavigator = createStackNavigator(
	{
		Favourites: FavouritesScreen,
		MealDetail: MealDetailScreen,
	},
	{
		defaultNavigationOptions: defaultStackNavOptions,
	}
);

const tabScreenConfig = {
	Meals: {
		screen: MealsNavigator,
		navigationOptions: {
			tabBarIcon: (tabInfo) => {
				return (
					<Ionicons name="ios-restaurant" size={25} color={tabInfo.tintColor} />
				);
			},
			tabBarColor: Colours.primaryColour,
		},
	},
	Favourites: {
		screen: FavNavigator,
		navigationOptions: {
			tabBarIcon: (tabInfo) => {
				return <Ionicons name="ios-star" size={25} color={tabInfo.tintColor} />;
			},
			tabBarColor: Colours.accentColour,
		},
	},
};

const MealsFavTabNavigator =
	Platform.OS === "android"
		? createMaterialBottomTabNavigator(tabScreenConfig, {
				activeColor: "white",
				shifting: true,
		  })
		: createBottomTabNavigator(tabScreenConfig, {
				tabBarOptions: {
					activeTintColor: Colours.accentColour,
				},
		  });

const FiltersNavigator = createStackNavigator({
	Filters: FiltersScreen,
});

const MainNavigator = createDrawerNavigator({
	MealsFav: MealsFavTabNavigator,
	Filters: FiltersNavigator,
});

export default createAppContainer(MainNavigator);
