const { Router } = require("express")
const ChatController = require("../controller/chatController")
const UserController = require("../controller/userController")

const chatController = new ChatController();
const userController = new UserController();

const router = Router({ mergeParams: true });

// return an array which contain list of chat object
router.get("/", async (req, res) => {
    const { myId, customerId } = req.query;
    const user = await userController.findById(myId);
    const customer = await userController.findById(customerId);
    if (user === null || customer === null) {
        res.status(404).json("User or customer is not exist");
    } else {
        res.json(await chatController.getChat(myId, customerId));
    }
})

// return the latest chat
router.get("/latest", async (req, res) => {
    const { myId, customerId } = req.query;
    const user = await userController.findById(myId);
    const customer = await userController.findById(customerId);
    if (user === null || customer === null) {
        res.status(404).json("User or friend is not exist");
    } else {
        res.json(await chatController.getLatestChat(myId, customerId));
    }
})

// create a chat
router.post("/", async (req, res) => {
    const { myId, customerId, messages } = req.query;
    const user = await userController.findById(myId);
    const customer = await userController.findById(customerId);
    if (user === null || customer === null) {
        res.status(404).json("User or friend is not exist");
    } else {
        await chatController.createChat(myId, customerId, messages);
        res.status(201).json();
    }
});

module.exports = router;