import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: InitialStateInterface = {
	userData: {},
	theme: "dark",
	loading: false,
	isAuthenticated: false,
};
export const userSlice = createSlice({
	name: "Users",
	initialState,
	reducers: {
		// User
		storeUserDataInState: (
			state,
			action: PayloadAction<UserObjectInterface>
		) => {
			state.userData = action.payload;
		},
		handleAuthentication: (state, action: PayloadAction<boolean>) => {
			state.isAuthenticated = action.payload;
		},
		// Link
		storeLinkDataInState: (
			state,
			action: PayloadAction<LinkObjectInterface>
		) => {
			state.userData.links?.push(action.payload);
		},
		undoLinkDeletionInState: (
			state,
			action: PayloadAction<UserObjectInterface>
		) => {
			state.userData = action.payload;
		},
		deleteLinkInState: (state, action: PayloadAction<string>) => {
			const matchedLinkObjIndex = Number(
				state.userData.links?.findIndex((link) => link.id === action.payload)
			);
			state.userData.links?.splice(matchedLinkObjIndex, 1);
		},
		updateLinkInState: (state, action: PayloadAction<LinkObjectInterface>) => {
			const matchedLinkObjIndex = Number(
				state.userData.links?.findIndex((link) => link.id === action.payload.id)
			);
			state.userData.links?.splice(matchedLinkObjIndex, 1, action.payload);
		},
		// Common
		changeLoadingState: (state, action: PayloadAction<boolean>) => {
			state.loading = action.payload;
		},
	},
});

export const {
	// User Slices
	storeUserDataInState,
	handleAuthentication,
	// Link Slices
	updateLinkInState,
	deleteLinkInState,
	storeLinkDataInState,
	undoLinkDeletionInState,
	// Common Slices
	changeLoadingState,
} = userSlice.actions;
