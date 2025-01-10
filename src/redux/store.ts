"use client";

import { configureStore } from "@reduxjs/toolkit";
import {userSlice } from "./slices";
import { usersApi } from "./api-slices";

const store = configureStore({
	reducer: {
		[usersApi.reducerPath]: usersApi.reducer,
		User: userSlice.reducer,
	},
	middleware: (defaultMiddleware) =>
		defaultMiddleware()
			.concat(usersApi.middleware),
});
export type RootState = ReturnType<typeof store.getState>;
export { store };
