import { IResponse } from './response.interface';
import { ICompany } from './company.interface';

export interface IResponseCompany extends IResponse {
  data: ICompany;
}
