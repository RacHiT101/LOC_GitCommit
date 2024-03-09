const { Router } = require("express");
const PrivateRoomController = require("../controller/privateRoomController");


const privateRoomController = new PrivateRoomController();

const router = Router({ mergeParams: true });

//localhost:4000/api/privateRooms?owner=
//return an array which contain list of private rooms of an user

router.get("/", async (req, res) => {
  res.json(await privateRoomController.getPrivateRooms(req.query.owner));
});

router.post("/", async (req, res) => {
    const { ownerId, name, users, backgroundUrl, isVisibleToFriends } = req.body;
    res.json(
        await privateRoomController.createPrivateRoom(ownerId, name, users, backgroundUrl, isVisibleToFriends)
    )
})

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  res.json(await privateRoomController.findById(id));
});

router.put(
  "/updatePrivateRoomSetting",
  async (req, res) => {
    const { privateRoomId, isVisibleToFriend, imageUri } = req.query;
    await privateRoomController.updatePrivateRoomSetting(
      privateRoomId,
      imageUri,
      JSON.parse(isVisibleToFriend)
    );
    res.status(204).json();
  }
);

module.exports = router;
