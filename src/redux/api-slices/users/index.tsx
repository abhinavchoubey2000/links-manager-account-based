import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const usersApi = createApi({
	reducerPath: "usersApi",
	baseQuery: fetchBaseQuery({
		baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
	}),
	endpoints: (builder) => ({
		login: builder.mutation({
			query: (credentials) => ({
				url: "api/login",
				method: "POST",
				body: { email: credentials.email, password: credentials.password },
			}),
		}),

		signup: builder.mutation({
			query: (credentials) => ({
				url: "/api/signup",
				method: "POST",
				body: {
					email: credentials.email,
					password: credentials.password,
					name: credentials.name,
				},
			}),
		}),

		logout: builder.mutation<void, void>({
			query: () => ({
				url: "api/logout",
				method: "DELETE",
			}),
		}),

		addLink: builder.mutation({
			query: (linkObj: {
				url: string;
				fullname: string;
				linkColor: string;
			}) => ({
				url: "api/add-link",
				method: "POST",
				body: {
					url: linkObj.url,
					fullname: linkObj.fullname,
					linkColor: linkObj.linkColor,
				},
			}),
		}),
		updateLink: builder.mutation({
			query: (updatedLinkObj: {
				url: string;
				fullname: string;
				id: string;
				linkColor: string;
			}) => ({
				url: "api/update-link",
				method: "PUT",
				body: {
					url: updatedLinkObj.url,
					fullname: updatedLinkObj.fullname,
					id: updatedLinkObj.id,
					linkColor: updatedLinkObj.linkColor,
				},
			}),
		}),
		fetchUserData: builder.query<ResponseDataObjectInterface, void>({
			query: () => "api/fetch-user-data",
		}),
		deleteLink: builder.mutation({
			query: (linkId) => ({
				url: `api/delete-link/${linkId}`,
				method: "DELETE",
			}),
		}),
	}),
});

export const {
	useLoginMutation,
	useSignupMutation,
	useLogoutMutation,
	useAddLinkMutation,
	useFetchUserDataQuery,
	useUpdateLinkMutation,
	useDeleteLinkMutation,
} = usersApi;
