const friendRequestModel = require("../models/Friend");
const userModel = require("../models/User");

class FriendController {

  async getAllFriends(id) {
    const user = await userModel.findById(id);
    const friendIds = user.friends;
    const allFriends = [];
    if (friendIds === null || friendIds.length === 0) {
      return allFriends;
    } else {
      for (let friendId of friendIds) {
        const friend = await userModel.findById(friendId);
        if (friend !== null && !allFriends.includes(friend)) {
          allFriends.push(friend);
        }
      }
      return allFriends;
    }
  }

  // add friend
  async addFriend(id, fid) {
    const user = await userModel.findById(id);
    console.log(id);
    console.log(fid);
    const friendUser = await userModel.findById(fid);
    if (!user.friends.includes(fid)) {
      await userModel.updateOne({ _id: id }, { $push: { friends: fid } });
    }
    if (!friendUser.friends.includes(id)) {
      await userModel.updateOne({ _id: fid }, { $push: { friends: id } });
    }
  }

  // send the friend request
  async sendRequest(id, fid) {
    await friendRequestModel.create({
      sender: id,
      receiver: fid,
      timestamp: Math.floor(Date.now() / 1000),
      status: "pending",
    });
  }

  // get all the user who sent the friend request
  async getAllSendRequestUser(id) {
    const requests = await friendRequestModel.find({ receiver: id });
    const sendRequestUsers = [];
    for (let request of requests) {
      const user = await userModel.findById(request.sender);
      if (user !== null && request.status === "pending") {
        sendRequestUsers.push(user);
      }
    }
    return sendRequestUsers;
  }

  // check whether these two users have one pending request
  async checkExistPendingRequest(id, fid) {
    const requestFromIdToFid = await friendRequestModel.findOne({
      sender: id,
      receiver: fid,
      status: "pending",
    });
    const requestFromFidToId = await friendRequestModel.findOne({
      sender: fid,
      receiver: id,
      status: "pending",
    });

    return requestFromFidToId != null || requestFromIdToFid != null;
  }

  // check whether exist a pending request from fid to id
  async checkExistPendingRequestFromOneSide(id, fid) {
    const request = await friendRequestModel.findOne({
      sender: fid,
      receiver: id,
      status: "pending",
    });

    return request !== null;
  }

  // the user whose id is id approve the request from the user whose id is fid
  async approvedRequest(id, fid) {
    await friendRequestModel.updateOne(
      {
        sender: fid,
        receiver: id,
        status: "pending",
      },
      { status: "approved" }
    );
    await this.addFriend(id, fid);
  }

  // reject the friend request
  async rejectedRequest(id, fid) {
    await friendRequestModel.updateOne(
      {
        sender: fid,
        receiver: id,
        status: "pending",
      },
      {
        status: "rejected",
      }
    );
  }
}

module.exports = FriendController;
