import NavBar from "../components/NavBar";

import Home from "../pages/Home.jsx";
import TVShows from "../pages/TVShows";
import Movies from "../pages/Movies";
import { Route, Routes } from "react-router-dom";
import SocialAccounts from "../components/SocialAccounts.jsx";

import classes from "./MainLayout.module.css";
import MyList from "../pages/MyList.jsx";
import History from "../pages/History.jsx";
import MediaPage from "../pages/MediaPage.jsx";
export default function MainLayout() {
  return (
    <div>
      <header className={classes.header}>
        <NavBar />
      </header>
      <main className={classes.mainSection}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/shows" element={<TVShows />} />
          <Route path="/watch/:type/:id" element={<MediaPage />} />
          <Route path="/mylist" element={<MyList />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </main>
      <footer>
        <div className={classes.socialIcons}>
          <SocialAccounts />
        </div>

        <div className={classes.footerLinks}>
          <a href="#">Audio and Subtitles</a>
          <a href="#">Media Center</a>
          <a href="#">Privacy</a>
          <a href="#">Contact Us</a>
          <a href="#">Help Center</a>
          <a href="#">Jobs</a>
          <a href="#">Cookie Preferences</a>
          <a href="#">Gift Cards</a>
          <a href="#">Terms of Use</a>
          <a href="#">Corporate Information</a>
        </div>

        <div className={classes.footerBottom}>&copy; 2026 Netflix, Inc.</div>
      </footer>
    </div>
  );
}
