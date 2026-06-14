import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../components/layout/RootLayout";
import HomePage from "../pages/HomePage";
import MovieDetailsPage from "../pages/MovieDetailsPage";
import TopRatedPage from "../pages/TopRatedPage";
import UpcomingPage from "../pages/UpcomingPage";
import PopularPage from "../pages/PopularPage";
import NowPlayingPage from "../pages/NowPlayingPage";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "movie/:id", element: <MovieDetailsPage /> },
      { path: "top-rated", element: <TopRatedPage /> },
      { path: "upcoming", element: <UpcomingPage /> },
      { path: "popular", element: <PopularPage /> },
      { path: "now-playing", element: <NowPlayingPage /> },
      
    ],
  },
]);