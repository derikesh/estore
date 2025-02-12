import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../config/baseUrl";

// This setup includes credentials for all requests
const baseUrlSetup = fetchBaseQuery({
    baseUrl: baseUrl,
    credentials: 'include', // Include credentials for all requests
    prepareHeaders: (header: Headers) => {
        const cookies = document.cookie;
        const token = cookies.split("; ").find((item) => item.startsWith('e_accessToken='))?.split("=")[1];
// this is s atesting gkggjjjj
        if (token) {
            header.set('Authorization', `Bearer ${token}`);
        }

        return header;
    },
});

export const api = createApi({
    reducerPath: 'api',
    baseQuery: baseUrlSetup,
    tagTypes: ['postUser', 'login', 'FAQ', 'addDetail','refreshToken', 'readSingleProduct', 'uploadImages', 'addProduct', 'updateProduct', 'deleteProduct', 'deleteProducts', 'readProduct', 'uploadImage', 'deleteImage', 'readCategories', 'deleteCategory', 'addCategory', 'updateCategory', 'readSingleCategories'],
    endpoints: (builder) => ({
        // Posting user
        postUser: builder.mutation({
            query: (body) => ({
                method: 'post',
                url: '/users/newUser',
                body,
            }),
            invalidatesTags: ['postUser'],
        }),

        // Login
        login: builder.mutation({
            query: (body) => ({
                method: 'post',
                url: '/login',
                body,
            }),
            invalidatesTags: ['login'],
        }),

        // Refresh token
        refreshToken: builder.mutation({
            query: () => ({
                url: '/refreshToken',
                method: 'POST',
                credentials: "include",
            }),
            invalidatesTags: ['refreshToken'],
        }),

        addProduct: builder.mutation({
            query: (body) => ({
                method: 'POST',
                url: '/product/add',
                body,
            }),
            invalidatesTags: ['addProduct'],
        }),


        deleteProduct: builder.mutation({
            query: (id) => ({
                method: 'DELETE',
                url: '/product/delete/:id',
            }),
            invalidatesTags: ['deleteProduct']
        }),

        addFeatures:builder.mutation({
            query:({newFeatures,id})=>({
                method:'POST',
                url:'/product/detail',
                body:{newFeatures,id}
                }),
                invalidatesTags:['addDetail']
        }),

        readallProduct: builder.query({
            query: () => ({
                method: 'GET',
                url: '/product',
            }),
            providesTags: ['readProduct'],
        }),

        readSingleProduct: builder.query({
            query: (id) => ({
                method: 'GET',
                url: `/product/${id}`
            }),
            providesTags: ['readSingleProduct']
        }),

        updateProduct: builder.mutation({
            query: ({ id, updatedBody }) => ({
                method: 'PATCH',
                url: `/product/${id}`,
                body: updatedBody
            }),
            invalidatesTags: ['updateProduct'],
        }),

        deleteManyProduct: builder.mutation({
            query: (body) => ({
                method: 'DELETE',
                url: '/product/selected',
                body
            }),
            invalidatesTags: ['deleteProducts']
        }),

        uploadImage: builder.mutation({
            query: (file) => ({
                method: 'POST',
                url: '/uploadImage',
                body: file,
            }),
            invalidatesTags: ['uploadImage'],
        }),

        uploadMultiple: builder.mutation({
            query: (files) => ({
                method: 'POST',
                url: '/uploadImages',
                body: files
            }),
            invalidatesTags: ['uploadImages']
        }),

        deleteIMage: builder.mutation({
            query: ({ publicKey }) => ({
                method: 'POST',
                url: '/deleteImage',
                body: { publicKey },
            }),
            invalidatesTags: ['deleteImage'],
        }),

        addCategory: builder.mutation({
            query: (newCategory) => ({
                url: '/category/add',
                method: 'POST',
                body: newCategory,
            }),
            invalidatesTags: ['addCategory'],
        }),

        readCategories: builder.query({
            query: () => ({
                method: 'GET',
                url: '/category',
            }),
            providesTags: ['readCategories'],
        }),

        readSingleCategories: builder.query({
            query: (id) => ({
                method: 'GET',
                url: `/category/${id}`,
            }),
            providesTags: ['readSingleCategories'],
        }),

        updateCategory: builder.mutation({
            query: ({ id, updatedCategory }) => ({
                url: `/category/${id}`,
                method: 'PATCH',
                body: updatedCategory,
            }),
            invalidatesTags: ['updateCategory'],
        }),

        deleteCategory: builder.mutation<void, string>({
            query: (ids) => ({
                url: `/category/delete/`,
                method: 'DELETE',
                body: ids
            }),
            invalidatesTags: ['deleteCategory'],
        }),


        // Fetch all FAQs
        getFAQs: builder.query({
            query: () => '/faq',
            providesTags: ['FAQ'], // Invalidate cache when FAQs change
        }),

        // Add a new FAQ
        addFAQ: builder.mutation({
            query: (body) => ({
                url: '/faq/add',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['FAQ'], // Invalidate cache after adding
        }),

        // Delete an FAQ
        deleteFAQ: builder.mutation<void, string>({
            query: (id) => ({
                url: `/faq/delete/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['FAQ'], // Invalidate cache after deleting
        }),



    }),
});

export const {
    usePostUserMutation,
    useLoginMutation,
    useRefreshTokenMutation,
    useDeleteIMageMutation,
    useAddProductMutation,
    useReadSingleProductQuery,
    useDeleteProductMutation,
    useReadallProductQuery,
    useUpdateProductMutation,
    useUploadImageMutation,
    useReadCategoriesQuery,
    useUpdateCategoryMutation,
    useAddCategoryMutation,
    useDeleteCategoryMutation,
    useDeleteManyProductMutation,
    useUploadMultipleMutation,
    useReadSingleCategoriesQuery,
    useGetFAQsQuery,
    useAddFAQMutation,
    useDeleteFAQMutation,
    useAddFeaturesMutation,
    usePrefetch
} = api;

export const { prefetch } = api.util;