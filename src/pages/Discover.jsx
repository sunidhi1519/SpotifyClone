// // all of the components are divs that say the component name
import { Error, Loader, SongCard } from "../components";
import { genres } from "../assets/constants";
import { useGetTopChartsQuery } from "../redux/services/shazam";
import { useGetSongsByGenreQuery } from "../redux/services/shazam";

import { useDispatch, useSelector } from "react-redux";
import { selectGenreListId } from "../redux/features/playerSlice";


// dispatch -> dispatches an action to the store -> genre
// selector -> state
//  redux saves genres in cache

const Discover = () => {

  const dispatch = useDispatch();
  const { activeSong , isPlaying , genreListId} = useSelector((state) => state.player)   ;
  const { data, isFetching , error} = useGetTopChartsQuery();

  console.log(data);
  const genreTitle = genres.find(({value}) => value === genreListId)?.title ;

  if (isFetching) return <Loader title="Loading Songs..." />;
  if (error) return <Error />;

  return (
    <div className=" flex flex-col">
          <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
              <h2 className="font-boldt text-3xl text-white text-left">Discover {genreTitle} </h2>
             <select
                onChange={(e) => dispatch(selectGenreListId(e.target.value))}
                value={genreListId || 'Pop'}
                className="w-3/6 text-center text-xl bg-black text-gray-200 p-3 text-m rounded-lg outline-none sm:mt-0 mt-5"
              >
                {genres.map((genre) => (
                  <option key={genre.value} value={genre.value}>
                    {genre.title}
                  </option>
                ))}
            </select>
              </div> 
          
           <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {data.tracks?.map((song, i) => (
          <SongCard
            key={song.key}
            song={song}
            i={i}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data = {data}
          />
        ))}
      </div>
    </div>
  );
};

// this 2nd div  map the songs we're going to fetch from the API 
                    //   each number is a song
                    //   for each song we return a songcard component

export default Discover;






