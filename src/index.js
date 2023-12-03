const app = require("./app.js");
const db = require("./models");
const dotenv = require("dotenv");

dotenv.config();

const PORT = process.env.PORT || 3000;

db.sequelize
  .authenticate()
  .then(() => {
    console.log("Conectado a la base de datos");
    app.listen(PORT, (err) => {
      if (err) {
        return console.error("Failed", err);
      }
      console.log(`Listening on port ${PORT}`);
    });
  })
  .catch((err) => console.error("Unable to connect to the database:", err));