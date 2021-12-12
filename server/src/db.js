import { connect as _connect } from "mongoose";

async function connect(mongoUri) {
  try {
    await _connect(mongoUri, {
      useNewUrlParser: true,

      useUnifiedTopology: true,
    });
    console.log("> DB is connected :D");
  } catch (error) {
    console.error(error);
  }
}

export default connect;
