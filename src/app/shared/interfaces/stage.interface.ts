import { ICompany } from './company.interface';
export interface IStage {
  id: string;
  name: string;
  companies?: ICompany[];
}
