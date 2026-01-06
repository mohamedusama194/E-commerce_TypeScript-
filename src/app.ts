import express from "express";
import userRoutes from "./modules/user/user.route";
import globalError from "./middlewares/error.middleware";

const app = express();

app.use(express.json());

/* ================= Routes ================= */
app.use("/api/users", userRoutes);

/* ================= Error Handling ================= */
app.use(globalError);

export default app;
