import "dotenv/config";
import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";

import authRoutes from "./routes/authRoutes.js";
import goalsRoutes from "./routes/goalsRoutes.js";
import workoutsRoutes from "./routes/workoutsRoutes.js";
import progressRoutes from "./routes/progressRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

const swaggerDoc = YAML.load("docs/openapi.yaml");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.get("/", (_req, res) => res.json({ message: "FitGoal API running" }));

app.use("/api/auth", authRoutes);
app.use("/api/goals", goalsRoutes);
app.use("/api/workouts", workoutsRoutes);
app.use("/api/progress-logs", progressRoutes);

app.use((_req, res) => res.status(404).json({ message: "Not found" }));

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server running on ${process.env.PORT || 3000}`);
});


