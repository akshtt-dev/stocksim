import User from "../models/User.js";

const getUserRank = async (userId) => {
  const leaderboard = await User.aggregate([
    { $sort: { balance: -1 } },
    { 
      $project: { 
        userId: 1, 
        balance: 1 
      } 
    },
    { 
      $group: { 
        _id: null, 
        users: { $push: "$$ROOT" }
      } 
    },
    { $unwind: { path: "$users", includeArrayIndex: "rank" } },
    { 
      $project: { 
        _id: 0, 
        userId: "$users.userId", 
        rank: { $add: ["$rank", 1] }
      } 
    },
    { $match: { userId } }
  ]);

  return leaderboard.length > 0 ? leaderboard[0].rank : "Unranked";
};

export default getUserRank;
