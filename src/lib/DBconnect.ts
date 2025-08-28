import mongoose from "mongoose";
if (!process.env.DB_URI) {
  console.log("DB_URI is not defined");
  process.exit(1);
}

type ConnectionType = {
  isConnected?: number;
};
const connection: ConnectionType = {};

const DBconnect = async () => {
  if (connection.isConnected) {
    console.log("Already Connected");
    return;
  }

  //if not then connect
  try {
    const dbInstance = await mongoose.connect(process.env.DB_URI!);
    connection.isConnected = dbInstance.connections[0].readyState;
  } catch (error) {
    console.log("Error connecting to database:", error);
    process.exit(1);
  }
};

export { DBconnect };
