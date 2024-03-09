const chatModel = require("../models/Chat");

class ChatController {
  // get the chat from the two users
  async getChat(myId, customerId) {
    const chatFromUserToCustomer = await chatModel.find({
      sender: myId,
      receiver: customerId,
      message: { $ne: null },
    });
    const chatFromCustomerToUser = await chatModel.find({
      sender: customerId,
      receiver: myId,
      message: { $ne: null },
    });
    if (chatFromCustomerToUser !== null && chatFromUserToCustomer !== null) {
      return [...chatFromCustomerToUser, ...chatFromUserToCustomer];
    } else {
      if (chatFromCustomerToUser !== null) {
        return chatFromCustomerToUser;
      } else if (chatFromUserToCustomer !== null) {
        return chatFromUserToCustomer;
      } else {
        return [];
      }
    }
  }

  // get the latest chat
  async getLatestChat(myId, customerId) {
    const messageFromUserToCustomer = await chatModel
      .find({
        sender: myId,
        receiver: customerId,
        message: { $ne: null },
      })
      .sort("-timestamp")
      .limit(1);
    const messageFromCustomerToUser = await chatModel
      .find({
        sender: customerId,
        receiver: myId,
        message: { $ne: null },
      })
      .sort("-timestamp")
      .limit(1);
    const latestChat = [];
    for (let message1 of messageFromUserToCustomer) {
      for (let message2 of messageFromCustomerToUser) {
        if (message1?.timestamp < message2?.timestamp) {
          latestChat.push(messageFromCustomerToUser);
        } else {
          latestChat.push(messageFromUserToCustomer);
        }
      }
    }
    return latestChat;
  }

  // create the chat
  async createChat(myId, customerId, messages, timestamp) {
    await chatModel.create({
      sender: myId,
      receiver: customerId,
      timestamp,
      message: messages,
    });
  }
}

module.exports = ChatController;
