import app from "./app";
import db from "./db";
import dotenv from "dotenv";

let port = process.env.PORT ? process.env.PORT : 3000;

dotenv.config();
db(process.env.DB_HOST);

app.listen(port, () => {
  console.log(`server on port ${port}`);
});
