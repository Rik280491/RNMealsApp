import React from "react";
import { Text, Platform } from "react-native";
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
	headerTitleStyle: {
		fontFamily: "open-sans-bold",
	},
	headerBackTitleStyle: {
		fontFamily: "open-sans",
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
			tabBarLabel:
				Platform.OS === "android" ? (
					<Text style={{ fontFamily: "open-sans-bold" }}>Meals</Text>
				) : (
					"Meals"
				),
		},
	},
	Favourites: {
		screen: FavNavigator,
		navigationOptions: {
			tabBarIcon: (tabInfo) => {
				return <Ionicons name="ios-star" size={25} color={tabInfo.tintColor} />;
			},
			tabBarColor: Colours.accentColour,
			tabBarLabel:
				Platform.OS === "android" ? (
					<Text style={{ fontFamily: "open-sans-bold" }}>Favourites</Text>
				) : (
					"Favourites"
				),
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
					labelStyle: {
						fontFamily: "open-sans-bold",
					},
					activeTintColor: Colours.accentColour,
				},
		  });

const FiltersNavigator = createStackNavigator(
	{
		Filters: FiltersScreen,
	},
	{
		defaultNavigationOptions: defaultStackNavOptions,
	}
);

const MainNavigator = createDrawerNavigator(
	{
		MealsFav: {
			screen: MealsFavTabNavigator,
			navigationOptions: {
				drawerLabel: "Meals",
			},
		},
		Filters: FiltersNavigator,
	},
	{
		contentOptions: {
			activeTintColor: Colours.accentColour,
			labelStyle: {
				fontFamily: "open-sans-bold",
			},
		},
	}
);

export default createAppContainer(MainNavigator);
