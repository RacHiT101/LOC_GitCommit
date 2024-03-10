import { Navigate, Route, Routes } from "react-router-dom";
import PublicRoomPage from "../pages/PublicRoomPage";
import PrivateRoomPage from "../pages/PrivateRoomPage";
import Studystats from "../pages/studystats/Studystats";
import LeaderBoardPage from "../pages/LeaderBoardPage";
import MarketplacePage from "../pages/MarketplacePage";
import ProfilePage from "../pages/ProfilePage";
import StudyingRoomPage from "../pages/StudyingRoomPage";
import FriendsPage from "../pages/FriendsPage";
import TokenPage from "../pages/TokenPage";
// import Homepage from "../pages/HomePage";
import VideoApp from "../VideoApp";

const PrivateRouter = () => {
  return (
    <>
      <Routes>
        <Route path={"/public-rooms"} element={<PublicRoomPage />} />
        <Route path={"/studystats"} element={<Studystats />} />
        <Route path={"/leaderboard"} element={<LeaderBoardPage/>} />
        <Route path={"/private-rooms"} element={<PrivateRoomPage />} />
        <Route path={"/marketplace"} element={<MarketplacePage />} />
        <Route path={"/profile"} element={<ProfilePage />} />
        <Route path={"/rooms/:roomId"} element={<StudyingRoomPage />} />
        <Route path={"/friends/:friendId"} element={<FriendsPage />} />
        <Route path={"/token"} element={<TokenPage />} />
        <Route path={"*"} element={<Navigate to={"/public-rooms"} />} />
      </Routes>
    </>
  );
};

export default PrivateRouter;
