import type { MediaItem, MediaItemWithOwner } from "hybrid-types/DBTypes";
import {useUserContext} from '../hooks/contextHooks';

const MediaRow = (props: {
  item: MediaItemWithOwner;
  setSelectedItem: (item: MediaItem | undefined) => void;
}) => {
  const { item, setSelectedItem } = props;
  const {user} = useUserContext();

  return (
        <article>
      <img
        src={item.thumbnail}
        alt={item.title}
      />
      <div>
        <h3>{item.title}</h3>
        <p>
          {item.description}
        </p>
        <div>
          <p>
            Created at: <br />{' '}
            {new Date(item.created_at).toLocaleString('fi-FI')}
          </p>
          <p>Filesize: {(item.filesize / 1024 / 1024).toFixed(2)} MB</p>
          <p>Mime-type: {item.media_type}</p>
          <p>Owner: {item.username}</p>
        </div>
        <p>
          <button
            onClick={() => {
              setSelectedItem(item);
            }}
          >
            View
          </button>
          {/* User exists and owns the media item or is an admin */}
          {user && (user.user_id === item.user_id || user?.level_name === 'Admin') && (
            <>
              <button
                onClick={() => {
                  console.log('edit media item', item, 'current user', user);
                }}
              >
                Edit
              </button>
              <button
                onClick={() => {
                  console.log('delete media item');
                }}
              >
                Delete
              </button>
            </>
          )}
        </p>
      </div>
    </article>
  );
};

export default MediaRow;
