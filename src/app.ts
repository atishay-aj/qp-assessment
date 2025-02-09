import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import adminRoutes from "./routes/admin.routes";
import { GroceryAppDataSource } from "./config/db.config";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/admin", adminRoutes);

GroceryAppDataSource.initialize()
  .then(() => console.log("Database Connected"))
  .catch((err) => console.error("DB Connection Error:", err));

const PORT = process.env.PORT ?? 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
