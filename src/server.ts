import express from "express";
import next from "next";
import compression from "compression";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import config from "./server_config.json";
import { NextServer, RequestHandler } from "next/dist/server/next";
// 환경변수 설정(dotenv 라이브러리 사용)
// import env from "./config/env";

class Server {
  public next!: NextServer;
  public app!: express.Application;

  constructor() {
    if (
      process.env.NODE_ENV === "production" ||
      process.env.NODE_ENV === "test"
    ) {
      this.next = next({ dev: false });
    } else if (process.env.NODE_ENV === "development") {
      this.next = next({ dev: true });
    }
  }

  private setRoute() {
    console.log(this.next);
    const handle: RequestHandler = this.next.getRequestHandler();
    this.app.set("trust proxy", true);
    this.app.all("*", (req: express.Request, res: express.Response) => {
      return handle(req, res);
    });
  }

  private setMiddleware() {
    this.app = express();
    this.app.use(morgan("dev"));
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
    this.app.use(
      cors({
        exposedHeaders: config.corsHeaders,
      })
    );
  }

  public listen() {
    this.next.prepare().then(() => {
      this.setMiddleware();
      this.setRoute();
      const reversePort: number = 3000;
      this.app.listen(reversePort, () => {
        console.log(`next+expresss running on port ${reversePort}`);
      });
    });
  }
}

function init() {
  const server = new Server();
  server.listen();
}

init();
