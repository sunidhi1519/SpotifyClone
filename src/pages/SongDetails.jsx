import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { DetailsHeader, Error, Loader, RelatedSongs } from "../components";
import { setActiveSong, playPause } from "../redux/features/playerSlice";
import { useGetSongDetailsQuery } from "../redux/services/shazam";
import { useGetSongRelatedQuery } from "../redux/services/shazam";

const SongDetails = () => {
    const { songid } = useParams();
    const dispatch = useDispatch();
    const { activeSong, isPlaying } = useSelector((state) => state.player);

    const { data: songData, isFetching: isFetchingSongDetails } = useGetSongDetailsQuery({ songid });
    const { data, isFetching: isFetchingRelatedSongs, error } = useGetSongRelatedQuery({ songid });

      const handlePauseClick = () => {
    dispatch(PlayPause(false));
  };

  const handlePlayClick = (song,i) =>{
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };
    
    if (isFetchingSongDetails || isFetchingRelatedSongs)
        return <Loader title="Searching song details" />;
    if (error)
        return <Error />;


    return (
        <div className="flex flex-col">
            <DetailsHeader artistId="" songData={songData} />
            <div className="mb-10">
                <h2 className="text-white text-3xl font-bold">Lyrics</h2>

                <div className="mt-5">
    {songData && songData.sections && songData.sections.length > 1 && songData.sections[1].type === 'LYRICS' ? (
        songData.sections[1].text.map((Line, i) => (
            <p className="text-gray-400 text-base my-1" key={i}>{Line}</p>
            ))
        ) : (
            <p className="text-gray-400 text-base my-1">Sorry No Lyrics</p>
        )}
        </div>
            </div>
            
            <RelatedSongs
                data={data}
                isPlaying={isPlaying}
                activeSong={activeSong}
                handlePauseClick={handlePauseClick}
                handlePlayClick={handlePlayClick}
            />


        </div>
    );
}




export default SongDetails;






