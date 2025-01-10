import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: InitialStateInterface = {
	userData: {},
	isAuthenticated: false,
	loading: false,
	theme: "dark",
};
export const userSlice = createSlice({
	name: "Users",
	initialState,
	reducers: {
		changeLoadingState: (state, action: PayloadAction<boolean>) => {
			state.loading = action.payload;
		},
		storeUserDataInState: (
			state,
			action: PayloadAction<UserObjectInterface>
		) => {
			state.userData = action.payload;
		},
		storeLinkDataInState: (
			state,
			action: PayloadAction<LinkObjectInterface>
		) => {
			state.userData.links?.push(action.payload);
		},
		updateLinkInState: (state, action: PayloadAction<LinkObjectInterface>) => {
			const matchedLinkObjIndex = Number(
				state.userData.links?.findIndex((link) => link.id === action.payload.id)
			);
			state.userData.links?.splice(matchedLinkObjIndex, 1, action.payload);
		},
		deleteLinkInState: (state, action: PayloadAction<string>) => {
			const matchedLinkObjIndex = Number(
				state.userData.links?.findIndex((link) => link.id === action.payload)
			);
			state.userData.links?.splice(matchedLinkObjIndex, 1);
		},
		undoLinkDeletionInState: (
			state,
			action: PayloadAction<UserObjectInterface>
		) => {
			state.userData = action.payload;
		},
		handleAuthentication: (state, action: PayloadAction<boolean>) => {
			state.isAuthenticated = action.payload;
		},
		handleToggleTheme: (state) => {
			state.theme = state.theme === "dark" ? "light" : "dark";
		},
	},
});

export const {
	storeUserDataInState,
	changeLoadingState,
	storeLinkDataInState,
	updateLinkInState,
	deleteLinkInState,
	undoLinkDeletionInState,
	handleAuthentication,
	handleToggleTheme,
} = userSlice.actions;
