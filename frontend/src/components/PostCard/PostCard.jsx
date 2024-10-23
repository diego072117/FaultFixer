import { format } from "date-fns";
import { Link } from "react-router-dom";
const { VITE_URL_API_IMG } = import.meta.env;
import "./Module.scss";

export const PostCard = ({ post }) => {
  const formattedDate = format(
    new Date(post.created_at),
    "MMM d, yyyy 'at' hh:mm a"
  );
  return (
    <Link to={`/`} className="card-post">
      <div className="user-post-info">
        <img
          className="user-creator-avatar"
          src={
            post.usuario_creador.avatar
              ? `${VITE_URL_API_IMG}/${post.usuario_creador.avatar}`
              : "/assets/images/profile-placeholder.svg"
          }
          alt=""
        />
        <div className="info-creator-post">
          <p>{post.usuario_creador.name}</p>
          <p>@{post.usuario_creador.username}</p>
          <p>{formattedDate}</p>
        </div>
      </div>
      <div className="post-description">
        <p>{post.descripcion}</p>
      </div>
    </Link>
  );
};
