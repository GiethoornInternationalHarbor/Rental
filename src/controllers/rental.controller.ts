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

@controller('/api/v1/rental')
export class RentalController implements interfaces.Controller {
  constructor(
    @inject(TYPES.IRentalService) private rentalService: IRentalService
  ) {}

  @httpPost('/request')
  private async arrive(@request() req: express.Request, @response() res: express.Response) {
    const sendRequest = await this.rentalService.request(req.body);
    res.status(201).json(req.body);
  }

  @httpPut('/accept/:id')
  private async accept(@request() req: express.Request, @response() res: express.Response) {
    let acceptedRequest;
    acceptedRequest = await this.rentalService.accept(req.params.id, req.body);
    res.status(200).json(acceptedRequest);
  }

  @httpPut('/decline/:id')
  private async decline(@request() req: express.Request, @response() res: express.Response) {
    let declinedRequest;
    declinedRequest = await this.rentalService.decline(req.params.id, req.body);
    res.status(200).json(declinedRequest);
  }
}
