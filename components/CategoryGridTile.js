import React from "react";
import {
	View,
	Text,
	TouchableOpacity,
	TouchableNativeFeedback,
	StyleSheet,
	Platform,
} from "react-native";

const CategoryGridTile = (props) => {
	let TouchableComponent = TouchableOpacity;

	if (Platform.OS === "android" && Platform.Version >= 21) {
		TouchableComponent = TouchableNativeFeedback;
	}
	return (
		<View style={styles.gridItem}>
			<TouchableComponent style={{ flex: 1 }} onPress={props.onSelect}>
				<View
					style={{ ...styles.container, ...{ backgroundColor: props.colour } }}
				>
					<Text style={styles.title} numberOfLines={2}>
						{props.title}
					</Text>
				</View>
			</TouchableComponent>
		</View>
	);
};

const styles = StyleSheet.create({
	gridItem: {
		flex: 1,
		margin: 15,
		height: 150,
		overflow:
			Platform.OS === "android" && Platform.Version >= 21
				? "hidden"
				: "visible",
		borderRadius: 10,
	},
	container: {
		flex: 1,
		shadowColor: "black",
		shadowOpacity: 0.26,
		shadowOffset: { width: 0, height: 2 },
		shadowRadius: 10,
		borderRadius: 10,
		// elevation: 5,
		padding: 15,
		justifyContent: "flex-end",
		alignItems: "flex-end",
	},
	title: {
		fontFamily: "open-sans-bold",
		fontSize: 17,
		textAlign: "right",
	},
});

export default CategoryGridTile;
