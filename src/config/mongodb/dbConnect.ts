import { connect } from "mongoose";

class DbConnect {
  async dbConnect(): Promise<void> {
    const uri = <string>process.env.LOCAL_DATABASE_URI;
    try {
      await connect(uri);
      console.log("CONNECTED DATABASE");
    } catch (error) {
      console.log(error);
    }
  }
}

const dbConnect = new DbConnect();

export default dbConnect;
