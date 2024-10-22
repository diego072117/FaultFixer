import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import { Loader } from "../../shared/Loader";
import { useUserActions } from "../../hooks/useUserActions";
const { VITE_URL_API_IMG } = import.meta.env;
// import { RiUserFollowFill } from "react-icons/ri";
// import { RiUserUnfollowFill } from "react-icons/ri";
import "./Module.scss";

export const Profile = () => {
  const { id } = useParams();
  const { userbyId } = useUserActions();
  const userAuth = useSelector((state) => state.users.auth.user);
  const { userById: user, status } = useSelector((state) => state.users);

  useEffect(() => {
    userbyId(id);
    // getFollowings(userAuth.id);
  }, [id]);

  // const isFollowing = () => {
  //   return followings.some((follow) => follow.id == id);
  // };

  if (!user || status === "loading")
    return (
      <div className="loader">
        <Loader />
      </div>
    );

  return (
    <div className="profile-content">
      <div className="container-profile">
        <div className="info-profile">
          <div className="user-profile">
            <img
              src={
                user.avatar
                  ? `${VITE_URL_API_IMG}/${user.avatar}`
                  : "/assets/images/profile-placeholder.svg"
              }
              alt="profile"
              className="img-avatar"
            />
            <div className="info-user-profile">
              <p className="user-name">{user.name}</p>
              <p className="tag-name">@{user.username}</p>
              <div className="info-acount">
                <p className="posts">
                  <span>5</span> Posts
                </p>
              </div>
            </div>
          </div>
          <div className="edit-profile">
            <Link
              to={`/update-profile/${userAuth.id}`}
              className={`edit-follow-button`}
            >
              <img
                src={"/assets/icons/edit.svg"}
                alt="edit"
                width={20}
                height={20}
              />
              <p>Edit Profile</p>
            </Link>
            {/* {userAuth.id == user.id ? (
              <Link
                to={`/update-profile/${userAuth.id}`}
                className={`edit-follow-button`}
              >
                <img
                  src={"/assets/icons/edit.svg"}
                  alt="edit"
                  width={20}
                  height={20}
                />
                <p>Edit Profile</p>
              </Link>
            ) : (
              <button
                onClick={handleFolliwing}
                className={`edit-follow-button ${
                  statusFollow === "loading" ? "disabled" : "Active"
                }`}
                disabled={statusFollow === "loading"}
              >
                {statusFollow === "loading" ? (
                  <Loader /> // Mostrar Loader cuando está cargando
                ) : (
                  <>
                    {isFollowing ? (
                      <RiUserUnfollowFill className="unfollow-icon" />
                    ) : (
                      <RiUserFollowFill className="follow-icon" />
                    )}
                    <p>{isFollowing ? "UnFollow" : "Follow"}</p>
                  </>
                )}
              </button>
            )} */}
          </div>
        </div>
      </div>
      <div className="options-profile">
        <div className="buttons-actions-profile">
          <button
            className={`button-post-profile`}
            //   onClick={handlePostProfile}
          >
            <img
              src={"/assets/icons/posts.svg"}
              alt="posts"
              width={20}
              height={20}
            />
            Posts
          </button>
          {/* <button
            className={`button-like-profile`}
            // onClick={handleLikeProfile}
          >
            <img
              src={"/assets/icons/like.svg"}
              alt="like"
              width={20}
              height={20}
            />
            Liked Posts
          </button> */}
        </div>
      </div>
      <div className="post-likes">{/* <PostByUser userId={user.id} />  */}</div>
    </div>
  );
};
