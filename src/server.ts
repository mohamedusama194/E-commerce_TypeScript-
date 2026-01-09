import "./env";
import app from "./app";
import { AppDataSource } from "./config/database";

const PORT = process.env.PORT || 8000;

AppDataSource.initialize()
  .then(() => {
    console.log("Database connected ✅");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database connection failed ❌", err);
  });
