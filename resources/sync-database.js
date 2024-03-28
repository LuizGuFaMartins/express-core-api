const database = require("./database");

const syncModels = async () => {
  try {
    await database.sync();
    console.log("Default models successfully synchronized");
  } catch (error) {
    console.error("Error synchronizing defalt models:", error);
  }
};

module.exports = syncModels;
