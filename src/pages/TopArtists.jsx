// // all of the components are divs that say the component name
import { ArtistCard,Error, Loader, SongCard } from "../components";
import { genres } from "../assets/constants";
import { useGetTopChartsQuery } from "../redux/services/shazam";

import { useDispatch, useSelector } from "react-redux";


const TopArtists = () => {


  const { data, isFetching , error} = useGetTopChartsQuery();


  if (isFetching) return <Loader title="Loading Songs..." />;
  if (error) return <Error />;

  return (
    <div className=" flex flex-col">
          <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
              <h2 className="font-boldt text-3xl text-white text-left">Discover top Artists</h2>
          </div> 
          
           <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {data.tracks?.map((track) => (
          <ArtistCard
            key={track.key}
            track={track}
          />
        ))}
      </div>
    </div>
  );
};

// this 2nd div  map the songs we're going to fetch from the API 
                    //   each number is a song
                    //   for each song we return a songcard component

export default TopArtists;






