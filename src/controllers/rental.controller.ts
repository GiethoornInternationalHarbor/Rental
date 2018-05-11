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
export class TruckController implements interfaces.Controller {
  constructor(
    @inject(TYPES.IRentalService) private rentalService: IRentalService
  ) {}

  @httpPost('/send')
  private async arrive(
    @request() req: express.Request,
    @response() res: express.Response
  ) {
    // tslint:disable-next-line:no-shadowed-variable
    const sendRequest = await this.rentalService.request();
    res.status(201).json(sendRequest);
  }

  @httpPost('/check-request')
  private async checkRequest(
    @request() req: express.Request,
    @response() res: express.Response
  ) {
    const acceptedRequest = await this.rentalService.accept();
    const declinedRequest = await this.rentalService.decline();
    if (acceptedRequest === true) {
        res.status(201).json(acceptedRequest);
    } else {
        res.status(201).json(declinedRequest);
    }
  }
}
