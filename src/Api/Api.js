import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const myApi = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://192.168.1.45:7781/api/"
    }),
    endpoints: (builder) => ({

        getSlider: builder.query({
            query: () => "get-slider"
        }),

        getBrandLogo: builder.query({
            query: () => "get-brands"
        }),

        getPackages: builder.query({
            query: () => 'get-packages'
        }),

        getTestimonial: builder.query({
            query: () => "get-testimonial"
        }),

        getItenries: builder.query({
            query: (id) => `get-particular-itenary/${id}`,
        }),

        getItenariesDetails: builder.query({
            query: (id) => `get-all-details-itenary/${id}`
        })

    })
})

export const { useGetSliderQuery, useGetBrandLogoQuery, useGetPackagesQuery, useGetTestimonialQuery, useGetItenriesQuery, useGetItenariesDetailsQuery } = myApi