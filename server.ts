import express from "express";
import next from "next";
import compression from "compression";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
// 환경변수 설정(dotenv 라이브러리 사용)
// import env from "./config/env";
import config from "./server_config.json";
import { IncomingMessage, ServerResponse } from "http";

//const dev:boolean = process.env.NODE_ENV !== "production";
let nextApp;
if (process.env.NODE_ENV === "production" || process.env.NODE_ENV === "test") {
  nextApp = next({ dev: false });
} else if (process.env.NODE_ENV === "development") {
  nextApp = next({ dev: true });
}

const handle = nextApp.getRequestHandler();
// Node file system을 사용하여 gql schema 가져옴

nextApp.prepare().then(() => {
  const app = express();
  // view engine setup
  app.use(morgan("dev"));
  app.use(compression());

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(
    cors({
      exposedHeaders: config.corsHeaders,
    })
  );
  app.set("trust proxy", true);
  app.all("*", (req: IncomingMessage, res: ServerResponse) => {
    return handle(req, res);
  });

  const reversePort = 3000;
  app.listen(reversePort, () => {
    console.log(`next+expresss running on port ${reversePort}`);
  });
});
