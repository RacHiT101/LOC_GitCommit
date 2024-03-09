import { Box } from "@mui/material";
import RoomCard from "./RoomCard.jsx";
import React from "react";
import { useFetch } from "../../hooks/useFetch.js";
import { useNavigate } from "react-router-dom";

const PublicRoomsContainer = () => {
  const { isLoading, data: publicRooms } = useFetch("publicRooms");
  const navigate = useNavigate();

  const handleOpenRoom = (id) => {
    navigate(`/rooms/${id}`);
  };

  if (isLoading) return null;

  return (
    <Box className="flex flex-row flex-wrap h-full">
      {publicRooms?.map(({ _id, name, users, backgroundUrl }) => (
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
          />
        </Box>
      ))}
    </Box>
  );
};

export default PublicRoomsContainer;
