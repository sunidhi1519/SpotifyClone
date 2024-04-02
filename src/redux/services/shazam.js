import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


// const options = {
//     method: 'GET',
//     headers: {
//         'X-RapidAPI-Key': '12c6c362e8msh6a96f3cb5a02b5ep1fd922jsn95794310da4e',
//         'X-RapidAPI-Host': 'shazam.p.rapidapi.com'
//     }
// };

// fetch('https://shazam.p.rapidapi.com/charts/list', options)
//     .then(response => response.json())
//     .then(response => console.log(response))
//     .catch(err => console.error(err));


// async function fetchCountryListIdMapping() {
//     const response = await fetch('https://shazam.p.rapidapi.com/charts/list', {
//         method: 'GET',
//         headers: {
//             'X-RapidAPI-Key': '12c6c362e8msh6a96f3cb5a02b5ep1fd922jsn95794310da4e',
//             'X-RapidAPI-Host': 'shazam.p.rapidapi.com'
//         }
//     });
//     const data = await response.json();
//     const mapping = data.countries.reduce((acc, country) => {
//         acc[country.id] = country.listid;
//         return acc;
//     }, {});
//     return mapping;
// }


export const shazamApi = createApi({
    reducerPath: 'shazamApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://shazam.p.rapidapi.com',
        prepareHeaders: (headers) => {
            headers.set('X-RapidAPI-Key', '12c6c362e8msh6a96f3cb5a02b5ep1fd922jsn95794310da4e')
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getTopCharts: builder.query({ query: () => '/charts/track' }),
        getSongDetails: builder.query({
            query: ({ songid }) => `/songs/v2/get-details?id=${songid}`
        }),
        getSongsByGenre: builder.query({ query: (genre) => `/charts/genre-world?genre-code=${genre}`}),
        getSongRelated: builder.query({ query: ({ songid }) => `/songs/get-related-artist?id=${songid}` }),
        getArtistDetails: builder.query({ query: (artistId) => `/artists/get-details?artist_id=${artistId}` }),
        getSongsByCountry: builder.query({
            query: (countryCode) => `/charts/list?listId=ip-country-chart-${countryCode}`
        }),
        getSongsBySearch: builder.query({ query: (searchTerm) => `/search?term=${searchTerm}`}),
    }),
});
// just having recuder path(that is the name pf our API , its enough to call it within store.js)

// => we pass in an object ^up
//  building all of the endpoints of the APIs we want to call

// getSongsByCountry: builder.query({ query: (countryCode) => `/charts/country?country_code=${country_code}` }),

export const {
    useGetTopChartsQuery,
    useGetSongsByGenreQuery,
    useGetSongDetailsQuery,
    useGetSongRelatedQuery,
    useGetArtistDetailsQuery,
    useGetSongsByCountryQuery,
    useGetSongsBySearchQuery,
} = shazamApi;

