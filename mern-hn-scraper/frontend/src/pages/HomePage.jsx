import {
  useEffect,
  useState,
  useContext,
} from "react";

import {
  Link,
} from "react-router-dom";

import API from "../api/axios";

import {
  AuthContext,
} from "../context/AuthContext";

function HomePage() {

  const [stories, setStories] = useState([]);

  const {
    user,
    logout,
  } = useContext(AuthContext);

  useEffect(() => {

    fetchStories();

  }, []);

  const fetchStories = async () => {

    try {

      const res = await API.get(
        "/stories"
      );

      setStories(res.data);

    } catch (error) {

      console.log(error);
    }
  };

  const handleBookmark = async (
    storyId
  ) => {

    try {

      const res = await API.post(
        `/stories/${storyId}/bookmark`,
        {},
        {
          headers: {
            Authorization:
              `Bearer ${user.token}`,
          },
        }
      );

      alert(res.data.message);

    } catch (error) {

      console.log(error);

      alert("Login required");
    }
  };

  return (
    <div
      style={{
        padding: "20px",
      }}
    >

      <h1>
        Hacker News Stories
      </h1>

      <div
        style={{
          marginBottom: "20px",
        }}
      >

        <Link to="/">
          Home
        </Link>

        {" | "}

        <Link to="/bookmarks">
          Bookmarks
        </Link>

        {" | "}

        {!user && (
          <>
            <Link to="/login">
              Login
            </Link>

            {" | "}

            <Link to="/register">
              Register
            </Link>
          </>
        )}

      </div>

      {user ? (
        <div>

          <p>
            Welcome {user.name}
          </p>

          <button onClick={logout}>
            Logout
          </button>

        </div>
      ) : (
        <p>
          Please login to bookmark stories
        </p>
      )}

      <hr />

      {stories.map((story) => (

        <div
          key={story._id}
          style={{
            border: "1px solid gray",
            padding: "15px",
            marginBottom: "15px",
            borderRadius: "8px",
          }}
        >

          <h3>
            {story.title}
          </h3>

          <p>
            <strong>
              Points:
            </strong>{" "}
            {story.points}
          </p>

          <p>
            <strong>
              Author:
            </strong>{" "}
            {story.author}
          </p>

          <p>
            <strong>
              Posted:
            </strong>{" "}
            {story.postedAt}
          </p>

          <a
            href={story.url}
            target="_blank"
          >
            Read Story
          </a>

          <br />
          <br />

          {user && (
            <button
              onClick={() =>
                handleBookmark(
                  story._id
                )
              }
            >
              Toggle Bookmark
            </button>
          )}

        </div>
      ))}

    </div>
  );
}

export default HomePage;