import express from "express";
import path from "path";
import { Router } from "express";
import { title } from "process";

interface Options {
    port: number;
    publicPath?: string;
    routes?: Router;
}

export class Server {
  private app = express();
  private readonly port: number;
  private readonly publicPath?: string;
  private readonly routes?: Router;

  constructor(options: Options) {
    this.port = options.port;
    this.publicPath = options.publicPath;
    this.routes = options.routes;
  }

  async start() {
    //*Middleware
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    //*Public Folder
    this.app.use(express.static(this.publicPath || "public"));

    //*API Routes
    this.app.use(this.routes || Router());
    
    //*Index Route - Catch all routes and serve index.html
    this.app.get(/.*/, (req, res) => {
      const indexPath = path.join(this.publicPath || "public", "index.html");
      res.sendFile(indexPath);
    });
    this.app.listen(this.port, () => {
      console.log(`Server running at http://localhost:${this.port}/`);
    });
  }
}
    
