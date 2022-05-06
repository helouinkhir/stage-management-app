import { IResponse } from './response.interface';
import { IStage } from './stage.interface';

export interface IResponseStage extends IResponse {
  data: IStage;
}
