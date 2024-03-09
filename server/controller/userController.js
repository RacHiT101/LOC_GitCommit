const userModel = require("../models/User");
const productModel = require("../models/Product");
const {
  colors,
  adjectives,
  uniqueNamesGenerator,
  animals,
} = require("unique-names-generator");
const ytdl = require("ytdl-core");

class UserController {
  async findById(id) {
    return userModel.findById(id);
  }

  // create the user identity
  async createUser(email, username) {
    const defaultAssets = await productModel.find({ name: "default" });
    return await userModel.create({
      email,
      username,
      assets: defaultAssets.map(({ _id }) => _id),
      playList: [
        {
          songUrl: "https://www.youtube.com/watch?v=W-ITtmkDoD8",
        },
      ],
    });
  }

  // get user information
  async getUser(queryParam) {
    const filter = {};
    const fields = Object.keys(userModel.schema.obj);
    Object.entries(queryParam).forEach(([key, value]) => {
      if (fields.includes(key) || key === "_id") {
        filter[key] = value;
      }
    });
    return userModel.find(filter);
  }

  async getUserById(id) {
    return userModel.findById(id);
  }

  // get the random name suggestion for the username
  async getNameSuggestion(name) {
    const generateRandomName = name
      ? (base) =>
          base +
          Array.from({ length: 5 }, () => Math.round(Math.random() * 10)).join(
            ""
          )
      : () =>
          uniqueNamesGenerator({
            dictionaries: [adjectives, colors, animals],
            length: 3,
            style: "capital",
            separator: " ",
          });

    let username;
    do {
      username = generateRandomName(name);
    } while (await userModel.exists({ username }));

    return username;
  }

  async findProductById(productId) {
    return productModel.findById(productId);
  }

  // purchase the product
  async purchaseProduct(productId, userId) {
    const user = await this.findById(userId);
    const product = await this.findProductById(productId);

    if (product?.type === "music") {
      // ignore the song if it is not available
      if (!ytdl.validateURL(product?.url)) {
        return null;
      }

      const info = await ytdl.getBasicInfo(product?.url);

      await this.addOrUpdateSong(userId, {
        songUrl: product?.url,
        videoId: info?.videoDetails?.videoId,
        duration: info?.videoDetails?.lengthSeconds,
      });
    }

    await userModel.updateOne(
      {
        _id: userId,
      },
      { $push: { assets: productId }, $inc: { coins: -product?.price } }
    );
  }

  async checkExistProduct(productId, userId) {
    const user = await userModel.findById(userId);
    return user.assets.includes(productId);
  }

  async findUserProductByType(userId, type) {
    const user = await this.findById(userId);
    let assets = [];
    for (let productId of user?.assets) {
      const data = await this.findProductById(productId);
      assets.push(data);
    }
    return assets.filter((it) => it?.type === type);
  }

  // add a new todo in the todo list
  async addTodo(userDoc, content) {
    const newTodo = { content, isCompleted: false };
    userDoc.todoList.push(newTodo);
    userDoc.save();
  }

  // toggle the todo between completed and uncompleted
  async toggleTodo(userDoc, content) {
    const prev = userDoc.todoList.find(
      (t) => t.content === content
    ).isCompleted;
    await userModel.updateOne(
      { _id: userDoc._id, "todoList.content": content },
      {
        $set: {
          "todoList.$.isCompleted": !prev,
        },
      }
    );
  }

  // add the experience and coins to the user if the timer is finished
  async addExperience(userId) {
    const userDoc = await this.findById(userId);
    userDoc.experience = userDoc.experience + 100;
    userDoc.coins = userDoc.coins + 50;
    await userDoc.save();
  }

  // modify the username
  async updateName(userId, name) {
    await userModel.updateOne(
      {
        _id: userId,
      },
      {
        username: name,
      }
    );
  }

  // modify the profile image
  async updateProfileImage(userId, url) {
    await userModel.updateOne(
      {
        _id: userId,
      },
      {
        profile: url,
      }
    );
  }

  // use 400 coins to unlock the private room
  async unlockPrivateRoom(userId) {
    const userDoc = await this.findById(userId);
    userDoc.isPrivateRoomUnlocked = true;
    userDoc.coins = userDoc.coins - 400;
    userDoc.save();
  }

  async addOrUpdateSong(id, song) {
    // get the user
    const user = await this.findById(id);
    // find the song with the same songUrl
    const songIndex = user?.playList?.findIndex(
      (it) => it.songUrl === song.songUrl
    );
    // if the song is not in the playlist, add it
    if (songIndex === -1) {
      user?.playList.push(song);
    }
    // if the song is in the playlist, update it
    else {
      user.playList[songIndex] = song;
    }
    // save the user
    user.save();
  }

  async getPlayList(id) {
    if (!id) {
      return [];
    }

    const user = await this.findById(id);
    // sort playlist in random order
    user.playList.sort(() => Math.random() - 0.5);

    // get the basic info of the songs if it is not already in the playlist with ytdl
    const songsWithInfo = await Promise.all(
      user.playList.map(async ({ songUrl, videoId, duration }) => {
        if (videoId && duration) {
          return {
            id: videoId,
            duration,
          };
        }

        // ignore the song if it is not available
        if (!ytdl.validateURL(songUrl)) {
          return null;
        }

        const info = await ytdl.getBasicInfo(songUrl);

        // save the song's title and duration to the database
        await this.addOrUpdateSong(id, {
          songUrl,
          videoId: info.videoDetails.videoId,
          duration: info.videoDetails.lengthSeconds,
        });

        return {
          id: info.videoDetails.videoId,
          duration: info.videoDetails.lengthSeconds,
        };
      })
    );

    // remove the songs that are not available
    for (let i = songsWithInfo.length - 1; i >= 0; i--) {
      if (!songsWithInfo[i]) {
        songsWithInfo.splice(i, 1);
      }
    }

    return songsWithInfo;
  }
}

module.exports = UserController;
