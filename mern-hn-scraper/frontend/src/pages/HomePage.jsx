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

  const { user, logout } = useContext(AuthContext);

  useEffect(() => {

    const fetchStories = async () => {

      try {

        const res = await API.get("/stories");

        setStories(res.data);

      } catch (error) {
        console.log(error);
      }
    };

    fetchStories();

  }, []);

  const handleBookmark = async (storyId) => {

    try {

      const res = await API.post(
        `/stories/${storyId}/bookmark`,
        {},
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
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
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0f172a, #1e3a8a)",
        fontFamily: "Arial",
        padding: "25px 15px",
      }}
    >

      {/* GLASS NAVBAR */}
      <div
        style={{
          maxWidth: "950px",
          margin: "0 auto",
          padding: "14px 18px",
          borderRadius: "16px",
          background: "rgba(255,255,255,0.85)",
          backdropFilter: "blur(10px)",
          boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >

        <h2
          style={{
            margin: 0,
            color: "#1e3a8a",
            fontSize: "18px",
            letterSpacing: "0.5px",
          }}
        >
          ⚡ Hacker News
        </h2>

        <div
          style={{
            display: "flex",
            gap: "14px",
            alignItems: "center",
          }}
        >

          <Link style={navLink} to="/">Home</Link>
          <Link style={navLink} to="/bookmarks">Bookmarks</Link>

          {!user ? (
            <>
              <Link style={navLink} to="/login">Login</Link>
              <Link style={navLink} to="/register">Register</Link>
            </>
          ) : (
            <button onClick={logout} style={logoutBtn}>
              Logout
            </button>
          )}

        </div>

      </div>

      {/* USER STATUS */}
      <div
        style={{
          maxWidth: "950px",
          margin: "18px auto",
          color: "#fff",
          fontSize: "14px",
        }}
      >
        {user ? (
          <p>👋 Welcome, <b>{user.name}</b></p>
        ) : (
          <p>🔒 Please login to bookmark stories</p>
        )}
      </div>

      {/* FEED */}
      <div
        style={{
          maxWidth: "950px",
          margin: "0 auto",
          display: "grid",
          gap: "14px",
        }}
      >

        {stories.map((story) => (

          <div
            key={story._id}
            style={cardStyle}
            onMouseEnter={(e) =>
              e.currentTarget.style.transform = "translateY(-3px)"
            }
            onMouseLeave={(e) =>
              e.currentTarget.style.transform = "translateY(0px)"
            }
          >

            <h3
              style={{
                margin: "0 0 8px 0",
                color: "#0f172a",
                fontSize: "17px",
              }}
            >
              {story.title}
            </h3>

            <div
              style={{
                display: "flex",
                gap: "12px",
                fontSize: "13px",
                color: "#475569",
                marginBottom: "8px",
              }}
            >
              <span>⭐ {story.points}</span>
              <span>👤 {story.author}</span>
              <span>🕒 {story.postedAt}</span>
            </div>

            <a
              href={story.url}
              target="_blank"
              rel="noreferrer"
              style={{
                color: "#2563eb",
                fontWeight: "bold",
                fontSize: "13px",
              }}
            >
              Read full story →
            </a>

            {user && (
              <div style={{ marginTop: "12px" }}>
                <button
                  onClick={() => handleBookmark(story._id)}
                  style={bookmarkBtn}
                >
                  🔖 Bookmark
                </button>
              </div>
            )}

          </div>

        ))}

      </div>

      {/* FOOTER */}
      <div
        style={{
          maxWidth: "950px",
          margin: "40px auto 0 auto",
          padding: "18px",
          borderRadius: "16px",
          background: "rgba(255,255,255,0.85)",
          backdropFilter: "blur(10px)",
          boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
          textAlign: "center",
          color: "#1e3a8a",
          fontSize: "13px",
        }}
      >

        <p style={{ margin: "0 0 6px 0", fontWeight: "600" }}>
          ⚡ Hacker News Scraper
        </p>

        <p style={{ margin: "0 0 10px 0", color: "#475569" }}>
          Built with React • Node.js • MongoDB
        </p>

        

        <p style={{ marginTop: "10px", color: "#94a3b8", fontSize: "11px" }}>
          © {new Date().getFullYear()} All rights reserved
        </p>

      </div>

    </div>
  );
}

export default HomePage;

/* ---------- STYLES ---------- */

const navLink = {
  textDecoration: "none",
  color: "#1e3a8a",
  fontWeight: "600",
  fontSize: "14px",
};

const logoutBtn = {
  background: "#1e3a8a",
  color: "#fff",
  border: "none",
  padding: "6px 10px",
  borderRadius: "8px",
  cursor: "pointer",
  fontSize: "13px",
};

const cardStyle = {
  background: "rgba(255,255,255,0.95)",
  padding: "18px",
  borderRadius: "16px",
  boxShadow: "0 10px 20px rgba(0,0,0,0.15)",
  transition: "0.25s ease",
};

const bookmarkBtn = {
  background: "#2563eb",
  color: "#fff",
  border: "none",
  padding: "8px 12px",
  borderRadius: "10px",
  cursor: "pointer",
  fontSize: "12px",
};