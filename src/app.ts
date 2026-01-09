import express from "express";
import morgan from "morgan";
import userRoutes from "./modules/user/user.route";
import authRoutes from "./modules/auth/auth.route";
import categoryRoutes from "./modules/category/category.route";
import notFound from "./middlewares/notFound.middlware";
import globalError from "./middlewares/error.middleware";

const app = express();

/* ================= Middlewares ================= */
app.use(express.json());

if (process.env.NODE_ENV === "development") {
    console.log("mode is :development");
  app.use(morgan("dev"));
}

/* ================= Routes ================= */
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);
/* ================= Error Handling ================= */
app.use(notFound);
app.use(globalError);

export default app;
