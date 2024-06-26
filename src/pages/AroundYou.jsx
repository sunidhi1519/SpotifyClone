import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

import { Error, Loader, SongCard } from '../components';
import { useGetSongsByCountryQuery } from '../redux/services/shazam';
import { useGetTopChartsQuery } from '../redux/services/shazam';


const AroundYou = () => {
    const [country, setCountry] = useState('');
    const [loading, setLoading] = useState(true);
    const { activeSong, isPlaying } = useSelector((state) => state.player);
    const { data, isFetching, error } = useGetSongsByCountryQuery(country);

    console.log(country);

    console.log(data); // See what this outputs right before the error occurs

    // runs ones the user visits a page , re call when country changes
    useEffect(() => {
        axios.get(`https://geo.ipify.org/api/v1?apiKey=at_f0LhElzDq7tZfDCNr3RCPNGFc4cGe`)
            .then((res) => setCountry(res?.data?.location?.country))
            .catch((err) => console.log(err))
            .finally(() => setLoading(false));
    }, [country]);

    if (isFetching && loading) return <Loader title="Loading songs around you" />;

    const { data1, isFetching1 , error1} = useGetTopChartsQuery();
    
    if(error && country) return <Error/>

    return (
        <div className='flex flex-col'>
            <h2 className='font-bold text-3xl text-white text-left mt-4 mb-10'>Around You
            <span className='font-black'>{country}</span>
            </h2>
            <div className='flex flex-wrap sm:justify-start justify-center gap-8'>
                {data.tracks?.map((song, i) => (
                    <SongCard
                        key={song.key}
                        song={song}
                        isPlaying={isPlaying}
                        activeSong={activeSong}
                        data={data}
                        i={i}
                    />
                ))}
            </div>
        </div>
    
    )
    
}
    

export default AroundYou;
