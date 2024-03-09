const { Router } = require("express");
const PublicRoomController = require("../controller/publicRoomController");

const publicRoomController = new PublicRoomController();

const router = Router({ mergeParams: true });

//localhost:4000/api/publicRooms
//return an array which contain list of public rooms
router.get("/", async (req, res) => {
  res.json(await publicRoomController.getAllPublicRooms());
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  res.json(await publicRoomController.getPublicRoom(id));
});

router.post(
  "/",
  async (req, res) => {
    res.json(
      await publicRoomController.createPublicRoom(
        req.body.name,
        req.body.users,
        req.body.playList,
        req.body.backgroundUrl,
        req.body.categories
      )
    );
  }
);

module.exports = router;
