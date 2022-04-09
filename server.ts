import express from "express";
import next from "next";
import compression from "compression";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import config from "./server_config.json";
import { NextServer, RequestHandler } from "next/dist/server/next";

class Server {
  public next!: NextServer;
  public app!: express.Application;
  public handle: RequestHandler;

  constructor() {
    if (
      process.env.NODE_ENV === "production" ||
      process.env.NODE_ENV === "test"
    ) {
      this.next = next({ dev: false });
    } else if (process.env.NODE_ENV === "development") {
      this.next = next({ dev: true });
    }
    this.handle = this.next.getRequestHandler();
  }

  private setRoute() {
    this.app.set("trust proxy", true);
    this.app.all("*", (req: express.Request, res: express.Response) => {
      return this.handle(req, res);
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
    this.next.prepare().then(async () => {
      this.setMiddleware();
      this.setRoute();
      this.app.listen(config.port, () => {
        console.log(`next+expresss running on port ${config.port}`);
      });
    });
  }
}

async function bootstrap() {
  const server = new Server();
  server.listen();
}

bootstrap();
