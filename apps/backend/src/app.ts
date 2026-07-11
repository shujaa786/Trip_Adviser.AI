import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import tripRouter from "./routes/trip.route";
import healthRouter from "./routes/health.route";

import { requestLogger } from "./middleware/request-logger";
import { notFoundMiddleware } from "./middleware/not-found.middleware";
import { errorMiddleware } from "./middleware/error.middleware";

const app = express();

app.use(helmet());

app.use(cors());

app.use(express.json());

app.use(requestLogger);

app.use(morgan("dev"));

app.use("/api/v1/health", healthRouter);
app.use("/api/v1/trips", tripRouter);
app.use(notFoundMiddleware);

app.use(errorMiddleware);

export default app;
