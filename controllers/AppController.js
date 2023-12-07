const dbClient = require('../utils/db');
const redisClient = require('../utils/redis');

module.exports.getStatus = async (req, res) => {
  if (!redisClient.isAlive()) {
    return res.status(500).json({ redis: false });
  }
  if (!dbClient.isAlive()) {
    return res.status(500).json({ db: false });
  }
  return res.status(200).json({ redis: true, db: true });
};

module.exports.getStats = async (req, res) => {
  const users = await dbClient.nbUsers();
  const files = await dbClient.nbFiles();
  return res.status(200).json({ users, files });
};
