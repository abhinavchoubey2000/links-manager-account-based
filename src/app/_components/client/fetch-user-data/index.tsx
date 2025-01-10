"use client";
import { useFetchUserDataQuery } from "@/redux/api-slices";
import {
	storeUserDataInState,
	changeLoadingState,
	handleAuthentication,
} from "@/redux/slices";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export function FetchUserData() {
	const { data, isLoading } = useFetchUserDataQuery();
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(changeLoadingState(isLoading));
		if (!isLoading && data?.data) {
			dispatch(storeUserDataInState(data.data));
			dispatch(handleAuthentication(true));
			dispatch(changeLoadingState(isLoading));
		}
	}, [data, isLoading, dispatch]);

	return <></>;
}
