import express from 'express';
import { inject, injectable } from 'inversify';
import {
  controller,
  httpPost,
  interfaces,
  next,
  request,
  response,
  httpPut
} from 'inversify-express-utils';
import { IRentalService } from '../application/services/irental.service';
import { TYPES } from '../di/types';
import { Request } from '../domain/Request';
import { Ship } from '../domain/Ship';
import { Customer } from '../domain/Customer';

@controller('/api/rental')
export class RentalController implements interfaces.Controller {
  constructor(
    @inject(TYPES.IRentalService) private rentalService: IRentalService
  ) {}

  @httpPost('/request')
  private async request(@request() req: express.Request, @response() res: express.Response) {
    const sendRequest = await this.rentalService.request(req.body);
    res.status(201).json(req.body);
  }

  @httpPut('/accept/:id')
  private async accept(@request() req: express.Request, @response() res: express.Response) {
    const acceptedRequest = await this.rentalService.accept(req.params.id, req.body);
    res.status(200).json(acceptedRequest);
  }

  @httpPut('/decline/:id')
  private async decline(@request() req: express.Request, @response() res: express.Response) {
    const declinedRequest = await this.rentalService.decline(req.params.id, req.body);
    res.status(200).json(declinedRequest);
  }
}
