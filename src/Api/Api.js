import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const myApi = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://192.168.1.45:7781/api/",
    }),
    endpoints: (builder) => ({
        getSlider: builder.query({
            query: () => "get-slider",
        }),

        getBrandLogo: builder.query({
            query: () => "get-brands",
        }),

        getPackages: builder.query({
            query: () => "get-packages",
        }),

        getTestimonial: builder.query({
            query: () => "get-testimonial",
        }),

        getItenries: builder.query({
            query: (id) => `get-particular-itenary/${id}`,
        }),

        getItenariesDetails: builder.query({
            query: (id) => `get-all-details-itenary/${id}`,
        }),

        getCitiesListing: builder.query({
            query: (city) => `get-all-cities?city=${city}`,
        }),

        contactUsPost: builder.mutation({
            query: (contactData) => ({
                url: "contact-us-post",
                method: "POST",
                body: contactData,
            }),
        }),

        getBranches: builder.query({
            query: () => "get-branch-location"
        }),

        getSubBranches: builder.query({
            query: (id) => `get-branch-listing/${id}`
        }),

        getFlightDetails: builder.mutation({
            query: (searchFlight) => ({
                url: "search-flights-details",
                method: "POST",
                body: searchFlight,
            }),
        }),

        getSpecialFlights: builder.query({
            query: () => "get-special-flight-data_V_P_D"
        }),

        getBlogListing: builder.query({
            query: () => "get-blog-listing"
        }),

        getYoutubeVideos: builder.query({
            query: () => "get-youtube-videos"
        }),

        getTeamMemberDetails: builder.query({
            query: () => "get-all-members-details"
        }),

        getAboutUsContent: builder.query({
            query: () => "get-about-us-content"
        }),

        inqueriesPost: builder.mutation({
            query: (inqueriesData) => ({
                url: "inquery-post",
                method: "POST",
                body: inqueriesData,
            }),
        }),

    }),
});

export const { useGetSliderQuery, useGetBrandLogoQuery, useGetPackagesQuery, useGetTestimonialQuery, useGetItenriesQuery, useGetItenariesDetailsQuery, useLazyGetCitiesListingQuery, useContactUsPostMutation, useGetBranchesQuery, useLazyGetSubBranchesQuery, useGetFlightDetailsMutation, useGetBlogListingQuery, useGetSpecialFlightsQuery, useGetYoutubeVideosQuery, useGetTeamMemberDetailsQuery, useGetAboutUsContentQuery, useInqueriesPostMutation } = myApi;
