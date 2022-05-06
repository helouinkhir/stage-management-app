import { IResponse } from './response.interface';
import { IStage } from './stage.interface';

export interface IResponseListStage extends IResponse {
  data: IStage[];
}
