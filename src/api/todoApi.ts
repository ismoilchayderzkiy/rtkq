import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { Pokemon } from './todoApi'

// Define a service using a base URL and expected endpoints
export const pokemonApi = createApi({
	reducerPath: 'pokemonApi',
	baseQuery: fetchBaseQuery({ baseUrl: 'http://37.27.29.18:8001/' }),
	tagTypes: ['Todo', 'TodoById'],
	endpoints: build => ({
		getPokemonByName: build.query({
			query: () => `api/to-dos`,
			providesTags: ['Todo'],
		}),
		InfoTodo: build.query({
			query: id => `api/to-dos/${id}`,
			providesTags: ['TodoById'],
		}),
		addTodo: build.mutation({
			query: obj => ({
				url: `api/to-dos`,
				method: 'POST',
				body: obj,
			}),
			invalidatesTags: ['Todo'],
		}),
		deleteTodo: build.mutation({
			query: id => ({
				url: `api/to-dos?id=${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['Todo'],
		}),
		deleteImage: build.mutation({
			query: id => ({
				url: `/api/to-dos/images/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['Todo'],
		}),
		editStatus: build.mutation({
			query: id => ({
				url: `/completed?id=${id}`,
				method: 'PUT',
			}),
			invalidatesTags: ['Todo'],
		}),
		editTodo: build.mutation({
			query: obj => ({
				url: `api/to-dos?id=${obj.id}`,
				method: 'PUT',
				body: obj,
			}),
			invalidatesTags: ['Todo'],
		}),
		addImage: build.mutation({
			query: ({ formData, id }) => ({
				url: `api/to-dos/${id}/images`,
				method: 'POST',
				body: formData,
			}),
			invalidatesTags: ['Todo'],
		}),
	}),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
	useGetPokemonByNameQuery,
	useAddTodoMutation,
	useDeleteTodoMutation,
	useEditStatusMutation,
	useDeleteImageMutation,
	useEditTodoMutation,
	useAddImageMutation,
	useInfoTodoQuery,
} = pokemonApi
