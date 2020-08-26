import { getApiRoutes } from "./api.js";
import express from "express";
import cors from "cors";
import { setBackgroundTasks } from "./tasks/backgroundTasks.js";

export const app = express();
export const port = 4200;

setBackgroundTasks();

app.use(cors());

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

app.use("/", getApiRoutes());
