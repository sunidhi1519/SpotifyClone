// // all of the components are divs that say the component name
import { Error, Loader, SongCard } from "../components";
import { genres } from "../assets/constants";

import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useGetSongsBySearchQuery } from "../redux/services/shazam";



const Search = () => {
  const { searchTerm } = useParams();
  const dispatch = useDispatch();
  const { activeSong , isPlaying} = useSelector((state) => state.player)   ;
  const { data, isFetching , error} = useGetSongsBySearchQuery(searchTerm);

  const songs = data?.tracks?.hit?.map((song) => song.track);

  if (isFetching) return <Loader title="Loading Songs..." />;
  if (error) return <Error />;

  return (
    <div className=" flex flex-col">
          <h2 className="font-boldt text-3xl text-white text-left">Showing results forr <span className="font-black"></span>{searchTerm} </h2>            
          
           <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {songs.tracks?.map((song, i) => (
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



export default Search;






