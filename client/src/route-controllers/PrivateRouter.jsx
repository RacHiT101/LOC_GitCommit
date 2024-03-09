import { Route, Routes } from "react-router-dom";
import PublicRoomPage from "../pages/PublicRoomPage";
import PrivateRoomPage from "../pages/PrivateRoomPage";
import Studystats from "../pages/studystats/Studystats";
import LeaderboardPage from "../pages/LeaderBoardPage";
import LeaderBoardPage from "../pages/LeaderBoardPage";
import ProfilePage from "../pages/ProfilePage";
import Homepage from "../pages/HomePage";
import LoginForm from "../components/entry/LoginForm";

const PrivateRouter = () => {
  return (
    <>
      <Routes>
        <Route path={"/public-rooms"} element={<PublicRoomPage />} />
        <Route path={"/studystats"} element={<Studystats />} />
        <Route path={"/"} element={<Homepage />} />
        <Route path={"/login"} element={<LoginForm />} />
        <Route path={"/leaderboard"} element={<LeaderBoardPage />} />
        <Route path={"/private-rooms"} element={<PrivateRoomPage />} />
        <Route path={"/leaderboard"} element={<LeaderboardPage />} />
        <Route path={"/private-rooms"} element={<PrivateRoomPage />} />


        
        {/* <Route path={"/private-rooms"} element={<PrivateRoomPage />} />
        <Route path={"/leaderboard"} element={<LeaderboardPage />} />
        <Route path={"/marketplace"} element={<MarketplacePage />} /> */}
        <Route path={"/profile"} element={<ProfilePage />} />
        {/* <Route path={"/rooms/:roomId"} element={<StudyingRoomPage />} />
        <Route path={"/friends/:friendId"} element={<FriendsPage />} />
        <Route path={"/token"} element={<TokenPage />} />
        <Route path={"*"} element={<Navigate to={"/public-rooms"} />} /> */}
      </Routes>
    </>
  );
};

export default PrivateRouter;
