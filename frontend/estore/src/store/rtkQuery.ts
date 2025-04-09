import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../config/baseUrl";

// This setup includes credentials for all requests
const baseUrlSetup = fetchBaseQuery({
    baseUrl: baseUrl,
    credentials: 'include', // Include credentials for all requests
    // prepareHeaders:(headers)=>{
    //     headers.set('Content-Type','application/json');
    //     return headers;
    // }
});

export const api = createApi({
    reducerPath: 'api',
    baseQuery: baseUrlSetup,
    tagTypes: ['postUser', 'login', 'FAQ', 'addDetail','logout','searchQuery','refreshToken', 'readSingleProduct', 'uploadImages', 'addProduct', 'updateProduct', 'deleteProduct', 'deleteProducts', 'readProduct', 'uploadImage', 'deleteImage', 'readCategories', 'deleteCategory', 'addCategory', 'updateCategory', 'readSingleCategories'],
    endpoints: (builder) => ({
        // Posting user

        checkAuth : builder.query({
            query:()=>'/admin'
        }),

        postUser: builder.mutation({
            query: (body) => ({
                method: 'post',
                url: '/admin/users/newUser',
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

        logout : builder.mutation({
            query:()=>({
                method:'POST',
                url:'/logout'
            }),
            invalidatesTags:['logout']
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
                url: '/admin/product/add',
                body,
            }),
            invalidatesTags: ['addProduct'],
        }),


        deleteProduct: builder.mutation({
            query: (id) => ({
                method: 'DELETE',
                url: '/admin/product/delete/:id',
            }),
            invalidatesTags: ['deleteProduct']
        }),

        addFeatures:builder.mutation({
            query:({newFeatures,id,remove})=>({
                method:'POST',
                url:`/admin/product/detail${remove ? '?remove=true' : ''}`,
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
                url: `/admin/product/${id}`,
                body: updatedBody
            }),
            invalidatesTags: ['updateProduct'],
        }),

        deleteManyProduct: builder.mutation({
            query: (body) => ({
                method: 'DELETE',
                url: '/admin/product/selected',
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
                url: '/admin/category/add',
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
                url: `/admin/category/${id}`,
                method: 'PATCH',
                body: updatedCategory,
            }),
            invalidatesTags: ['updateCategory'],
        }),

        deleteCategory: builder.mutation<void, string>({
            query: (ids) => ({
                url: `/admin/category/delete/`,
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
                url: '/admin/faq/add',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['FAQ'], // Invalidate cache after adding
        }),

        // Delete an FAQ
        deleteFAQ: builder.mutation<void, string>({
            query: (id) => ({
                url: `/admin/faq/delete/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['FAQ'], // Invalidate cache after deleting
        }),

        searchProduct : builder.mutation({
            query:({keyword})=>({
                method:'POST',
                url:'/search/all',
                body:{keyword}
            }),
            invalidatesTags:['searchQuery']
        })



    }),
});

export const {
    useLogoutMutation,
    useCheckAuthQuery,
    usePostUserMutation,
    useLoginMutation,
    useSearchProductMutation,
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