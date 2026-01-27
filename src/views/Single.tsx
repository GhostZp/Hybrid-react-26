import type {MediaItem} from 'hybrid-types/DBTypes';
import { useLocation, useNavigate } from 'react-router';

const Single = () => {
  const {state} = useLocation();
  const navigate = useNavigate();
  const item: MediaItem = state.item;
  return (

    <dialog open>
      {item && (
        <>
          <h2>{item.title}</h2>
          {item.media_type.split('/')[0] === 'image' && (
            <img src={item.filename} alt={item.description || item.title} />
          )}
          {item.media_type.split('/')[0] === 'video' && (
            <video src={item.filename} controls/>
          )}
          <p>{item.description}</p>
          <p>
            Uploaded at {new Date(item.created_at).toLocaleString('en-fi')} by
            user id {item.user_id}
          </p>
           <button onClick={() => navigate(-1)}>Go back</button>
        </>
      )}
    </dialog>
  );
};
export default Single;
