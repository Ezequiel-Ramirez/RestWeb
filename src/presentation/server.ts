import express from "express";
import path from "path";

interface Options {
    port: number;
    publicPath: string;
}

export class Server {
  private app = express();
  private readonly port: number;
  private readonly publicPath: string;

  constructor(options: Options) {
    this.port = options.port;
    this.publicPath = options.publicPath;
  }

  async start() {
    //*Middleware

    //*Public Folder
    this.app.use(express.static(this.publicPath));

    //*Index Route - Catch all routes and serve index.html
    this.app.get(/.*/, (req, res) => {
      const indexPath = path.join(this.publicPath, "index.html");
      res.sendFile(indexPath);
    });
    this.app.listen(this.port, () => {
      console.log(`Server running at http://localhost:${this.port}/`);
    });
  }
}
