"use client";
import {userSlice } from "./slices";
import { usersApi } from "./api-slices";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
	reducer: {
		User: userSlice.reducer,
		[usersApi.reducerPath]: usersApi.reducer,
	},
	middleware: (defaultMiddleware) =>
		defaultMiddleware()
			.concat(usersApi.middleware),
});
export { store };
export type RootState = ReturnType<typeof store.getState>;
