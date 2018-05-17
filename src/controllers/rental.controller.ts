import express from 'express';
import { inject, injectable } from 'inversify';
import {
  controller,
  httpPost,
  interfaces,
  next,
  request,
  response
} from 'inversify-express-utils';
import { IRentalService } from '../application/services/irental.service';
import { TYPES } from '../di/types';

@controller('/api/rental')
export class RentalController implements interfaces.Controller {
  constructor(
    @inject(TYPES.IRentalService) private rentalService: IRentalService
  ) {}

  @httpPost('/request')
  private async arrive(@request() req: express.Request, @response() res: express.Response) {
    // tslint:disable-next-line:no-shadowed-variable
    const sendRequest = await this.rentalService.request();
    res.status(201).json(req.body);
  }

  @httpPost('/accept')
  private async accept(@request() req: express.Request, @response() res: express.Response) {
    const acceptedRequest = await this.rentalService.accept();
    res.status(201).json(req.body);
  }

  @httpPost('/decline')
  private async decline(@request() req: express.Request, @response() res: express.Response) {
    const declinedRequest = await this.rentalService.decline();
    res.status(201).json(req.body);
  }
}
