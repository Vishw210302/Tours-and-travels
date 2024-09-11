import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const myApi = createApi({
    reducerPath:"api",
    baseQuery: fetchBaseQuery({
        baseUrl:"http://192.168.1.45:7781/api/"
    }),
    endpoints: (builder) => ({
       
        getSlider : builder.query({
            query: () => "get-slider"
        }),

        getBrandLogo : builder.query({
            query : () => "get-brands"
        }),

        getPackages : builder.query({
            query : () => 'get-packages'
        })

    })
})

export const {useGetSliderQuery, useGetBrandLogoQuery, useGetPackagesQuery} = myApi