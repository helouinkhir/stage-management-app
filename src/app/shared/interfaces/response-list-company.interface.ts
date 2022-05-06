import { IResponse } from './response.interface';
import { ICompany } from './company.interface';

export interface IResponseListCompany extends IResponse {
  data: ICompany[];
}
