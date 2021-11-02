import express from 'express';
import cors from 'cors';
import routes from './routes';

class Server {
  public app: express.Application;
  public port: number;

  constructor() {
    this.app = express();
    this.port = 5001;
    this.initializeMiddlewares();
    this.initializeRoutes();
  }

  private initializeMiddlewares() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cors());
  }

  private initializeRoutes() {
    //const router: Express = express();
    this.app.use('/api', routes);
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`=================================`);
      console.log(`Server listening on the port ${this.port}`);
      console.log(`=================================`);
    });
  }
}

const server = new Server();
server.listen();
