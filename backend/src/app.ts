import express from "express";
import { AppDataSource } from "./database";
import patientRoutes from "./routes/patientRoutes";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

AppDataSource.initialize()
  .then(() => {
    console.log("Database connected!");
  })
  .catch((error) => console.log(error));

app.use("/api/patients", patientRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
