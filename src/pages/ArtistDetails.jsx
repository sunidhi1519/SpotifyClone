import { useParams } from "react-router-dom";
import { useSelector} from "react-redux";
import { DetailsHeader, Error, Loader, RelatedSongs } from "../components";

import { useGetSongDetailsQuery } from "../redux/services/shazam";
import { useGetSongRelatedQuery, useGetArtistDetailsQuery } from "../redux/services/shazam";

const ArtistDetails = () => {
    const { artistId } = useParams();
    const { activeSong, isPlaying } = useSelector((state) => state.player);

    const { data:artistData , isFetching: isFetchingArtistDetails, error } = useGetArtistDetailsQuery(artistId);

    
    if (isFetchingArtistDetails)
        return <Loader title="Loading Artist details" />;
    if (error)
        return <Error />;

    console.log(artistData)

    return (
        <div className="flex flex-col">
        <DetailsHeader
          artistId={artistId}
          artistData={artistData}
        />
            
        <RelatedSongs
            data={Object.values(artistData?.songs ?? {})}
            artistId={artistId}
            isPlaying={isPlaying}
            activeSong={activeSong}
        />

        </div>
    );
}




export default ArtistDetails;






