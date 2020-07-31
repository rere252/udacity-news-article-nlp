import * as express from 'express';
import * as bodyParser from 'body-parser';
import { Injectable } from 'injection-js';
import { ApiRouter } from './route/api.router';
import { Endpoints } from '../common/api/endpoints';

@Injectable()
export class Server {
  private readonly port = 8081;
  private readonly app = express();

  constructor(private apiRouter: ApiRouter) {}

  init(): void {
    this.app.use(bodyParser.json());
    // Serve static site.
    this.app.use(express.static('dist/client'));
    // API's
    this.app.use(Endpoints.Prefix, this.apiRouter.init());
    // Start the server.
    this.app.listen(this.port, () => console.log(`Server started on ${this.port}.`));
  }
}
