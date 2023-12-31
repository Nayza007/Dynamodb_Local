import "dotenv/config";
import express, { Request, Response, Application } from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import notFoundMiddleware from "./middlewares/not-found";
import errorMiddleware from "./middlewares/error";
import UserRouter from "./routes/user-routes";

const app: Application = express();

app.use(helmet());
app.use(cors());
app.use(morgan("combined"));

app.use(
  rateLimit({
    windowMs: 10, // minutes
    max: 100, // limit
  })
);

app.use(express.json());

// app.post("/", UserRouter);
app.use("/", UserRouter);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});
