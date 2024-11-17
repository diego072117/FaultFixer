import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Loader } from "../../shared/Loader";
import { usePostActions } from "../../hooks/usePostActions";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { CommentsPost } from "../../components/CommentsPost/CommentsPost";
const { VITE_URL_API_IMG } = import.meta.env;
import "./Module.scss";
import { useValidators } from "../../hooks/useValidators";

export const PostDetails = () => {
  const { id } = useParams();
  const { isUserAuthenticated } = useValidators();
  const navigate = useNavigate();
  const { postsById, commetPost, saveComment } = usePostActions();
  const {
    postById: post,
    commentsPost,
    status,
  } = useSelector((state) => state.posts);
  const user = useSelector((state) => state.users.auth.user);
  const [comment, setComment] = useState("");

  useEffect(() => {
    postsById(id);
    commetPost(id);
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (comment.trim()) {
      await saveComment({
        id_user: user.id,
        id_post: post.id,
        coment: comment,
      });
      setComment("");
      commetPost(id);
    }
  };

  if (!post || status === "loading")
    return (
      <div className="loader">
        <Loader />
      </div>
    );

  const formattedDate = post.created_at
    ? format(new Date(post.created_at), "d MMM, yyyy")
    : "";

  return (
    <div className="post-details-container">
      <button
        onClick={() => navigate(-1)}
        variant="ghost"
        className="button-back"
      >
        <img src={"/assets/icons/back.svg"} alt="back" width={24} height={24} />
        <p>Back</p>
      </button>

      <div className="info-details">
        <div className="info-pot-user-details">
          <div className="header-info">
            <Link
              to={`/profile/${post.usuario_creador.id}`}
              className="info-user-creator"
            >
              <img
                src={
                  post.usuario_creador.avatar
                    ? `${VITE_URL_API_IMG}/${post.usuario_creador.avatar}`
                    : "/assets/images/profile-placeholder.svg"
                }
                alt="profile"
              />
              <div className="user-creator-details">
                <p className="creator-name">{post.usuario_creador.name}</p>
                <p className="date-post">{formattedDate}</p>
              </div>
            </Link>
            {user?.id === post.usuario_creador.id ? (
              <div className="actions-post">
                <Link to={`/update-post/${post.id}`} className="icon">
                  <img
                    src={"/assets/icons/edit.svg"}
                    alt="edit"
                    width={24}
                    height={24}
                  />
                </Link>

                {/* <button variant="ghost" className="icon">
                  <img
                    src={"/assets/icons/delete.svg"}
                    alt="delete"
                    width={24}
                    height={24}
                  />
                </button> */}
              </div>
            ) : (
              ""
            )}
          </div>
          <p className="description-details">{post.descripcion}</p>
          <img
            src={`${VITE_URL_API_IMG}/${post.publicacion}`}
            alt="publicacion"
            className="publicacion-post"
          />
        </div>
        <div className="comments-posts">
          {post.state === "activo" && isUserAuthenticated() &&(
            <div className="add-comment">
              <img
                src={
                  user?.avatar
                    ? `${VITE_URL_API_IMG}/${user?.avatar}`
                    : "/assets/images/profile-placeholder.svg"
                }
                alt="profile"
                className="img-input-detail"
              />
              <form onSubmit={handleCommentSubmit} className="form-comment">
                <input
                  type="text"
                  value={comment}
                  className="input-comment"
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Add a comment"
                  required
                />
                <button type="submit" className="button-comment">
                  <img src="/assets/icons/chat.svg" alt="profile" />
                </button>
              </form>
            </div>
          )}
          {commentsPost.length != 0 ? (
            <CommentsPost comments={commentsPost} post={post} />
          ) : (
            ""
          )}
        </div>
        {/* <div className="post-creator">
          <div className="container-info-creator">
            <Link
              to={`/profile/${post.usuario_creador.id}`}
              className="info-user-creator"
            >
              <img
                src={
                  post.usuario_creador.avatar
                    ? `${VITE_URL_API_IMG}/${post.usuario_creador.avatar}`
                    : "/assets/icons/profile-placeholder.svg"
                }
                alt="profile"
              />
              <div className="user-creator">
                <p className="creator-name">{post.usuario_creador.name}</p>
                <p className="date-post">{formattedDate} - Bogota</p>
              </div>
            </Link>
           
          </div>
          <div className="info-post">
            <p>{post.descripcion}</p>
          </div>
        </div> */}
      </div>
    </div>
  );
};
