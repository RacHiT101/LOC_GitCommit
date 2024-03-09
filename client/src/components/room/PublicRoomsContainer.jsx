import { Box } from "@mui/material";
import RoomCard from "./RoomCard.jsx";
import { useFetch } from "../../hooks/useFetch.js";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../providers/AuthProvider.jsx";

const PublicRoomsContainer = () => {
  const { isLoading, data: publicRooms } = useFetch("publicRooms");
  const navigate = useNavigate();
  const { getCustomUser } = useAuth();
  const [selectedRoom, setSelectedRoom] = useState("AllRooms");

  const compareCategories = (roomCategories, userCategories) => {
    const matchingCategories = roomCategories.filter(category =>
      userCategories.includes(category)
    );
    return matchingCategories.length >= 2;
  };

  const handleOpenRoom = (id) => {
    navigate(`/rooms/${id}`);
  };

  // const handleClick = () => {
  //   // Handle click logic for creating a study room
  // };

  if (isLoading) return null;

  return (
    <>
      <div className="justify-between flex">
        <div className="flex gap-4">
          <div
            className={`bg-purple-700 p-3 rounded-lg ${selectedRoom === "AllRooms" ? 'bg-opacity-50' : ''}`}
            onClick={() => setSelectedRoom("AllRooms")}
          >
            All Rooms
          </div>
          <div
            className={`bg-purple-700 p-3 rounded-lg ${selectedRoom === "MatchedRooms" ? 'bg-opacity-50' : ''}`}
            onClick={() => setSelectedRoom("MatchedRooms")}
          >
            Matched Rooms
          </div>
        </div>
        {/* <div className="bg-purple-700 p-3 rounded-lg" onClick={handleClick}>Create Study Room</div> */}
      </div>
      <Box className="flex flex-row flex-wrap h-full">
        {(selectedRoom === "MatchedRooms"
          ? publicRooms.filter(room => compareCategories(room.categories, getCustomUser().categories))
          : publicRooms
        ).map(({ _id, name, users, backgroundUrl }) => (
          <Box
            key={_id}
            sx={{
              minWidth: 250,
              minHeight: 200,
              maxHeight: 250,
              maxWidth: 500,
              marginX: 3,
            }}
            className="w-5/12 m-4"
          >
            <RoomCard
              title={name}
              showLockIcon={false}
              showPeopleAmount={false}
              image={`/src/assets/backgrounds/${backgroundUrl}`}
              amount={users?.length}
              showVagueBackground={true}
              onClick={() => handleOpenRoom(_id)}
              public={true}
            />
          </Box>
        ))}
      </Box>
    </>
  );
};

export default PublicRoomsContainer;
