import { Injectable } from 'injection-js';
import { Response, Request } from 'express';

@Injectable()
export abstract class BaseController {
  abstract handle(req: Request, resp: Response): void;
}
