import { Navigate, Route, Routes } from "react-router-dom";
import PublicRoomPage from "../pages/PublicRoomPage";
import Studystats from "../pages/studystats/Studystats";
import LeaderboardPage from "../pages/LeaderBoardPage";




const PrivateRouter = () => {
  return (
    <>
      <Routes>
        <Route path={"/public-rooms"} element={<PublicRoomPage />} />
        <Route path={"/studystats"} element={<Studystats />} />
        <Route path={"/leaderboard"} element={<LeaderboardPage />} />

        {/*
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
