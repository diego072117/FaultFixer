import React from "react";
import { Link } from "react-router-dom";
import "./Module.scss";
const { VITE_URL_API_IMG } = import.meta.env;

export const CommentsPost = ({ comments }) => {
  return (
    <div className="container-commets">
      {comments.length > 0 ? (
        comments.map((comment) => (
          <div key={comment.id} className="comment">
            <Link
              className="comment-user"
              to={`/profile/${comment.usuario.id}`}
            >
              <img
                src={
                  comment.usuario.avatar
                    ? `${VITE_URL_API_IMG}/${comment.usuario.avatar}`
                    : "/assets/images/profile-placeholder.svg"
                }
                alt="profile"
              />
            </Link>
            <div className="comment-content">
              <div className="info-user-comment">
                <div className="user-comment">
                  {/* <p className="name-comment">{comment.usuario.name}</p> */}
                  <p className="username-comment">
                    @{comment.usuario.username}
                  </p>
                </div>
              </div>

              <p>{comment.coment}</p>
            </div>
          </div>
        ))
      ) : (
        <p>No hay comentarios</p>
      )}
    </div>
  );
};
