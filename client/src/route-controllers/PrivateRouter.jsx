import { Navigate, Route, Routes } from "react-router-dom";
// import TokenPage from "../pages/TokenPage";
// import PublicRoomPage from "../pages/PublicRoomPage.jsx";
// import PrivateRoomPage from "../pages/PrivateRoomPage.jsx";
// import LeaderboardPage from "../pages/LeaderBoardPage";
// import MarketplacePage from "../pages/MarketplacePage.jsx";
// import ProfilePage from "../pages/ProfilePage.jsx";
// import StudyingRoomPage from "../pages/StudyingRoomPage.jsx";
// import FriendsPage from "../pages/FriendsPage.jsx";

/**
 * The private router can route to the "private pages", such as PublicRoomPage, PrivateRoomPage,
 * LeaderboardPage, MarketplacePage, ProfilePage, StudyingRoomPage, FriendsPage, and TokenPage.
 */

const PrivateRouter = () => {
  return (
    <>
      <Routes>
        {/* <Route path={"/public-rooms"} element={<PublicRoomPage />} />
        <Route path={"/private-rooms"} element={<PrivateRoomPage />} />
        <Route path={"/leaderboard"} element={<LeaderboardPage />} />
        <Route path={"/marketplace"} element={<MarketplacePage />} />
        <Route path={"/profile"} element={<ProfilePage />} />
        <Route path={"/rooms/:roomId"} element={<StudyingRoomPage />} />
        <Route path={"/friends/:friendId"} element={<FriendsPage />} />
        <Route path={"/token"} element={<TokenPage />} /> */}
        <Route path={"*"} element={<Navigate to={"/public-rooms"} />} />
      </Routes>
    </>
  );
};

export default PrivateRouter;
