import { KubeMatrix } from './kube-matrix.type';

export type KubeMatrixCompanyFields = {
  FormDesignID: number;
  CompanyName: string;
  ContractStartDate: string;
  ContractEndDate: string;
  SubscribedManDays: string;
  RolloverManDays: string;
};

export type KubeMatrixCompany = KubeMatrix<KubeMatrixCompanyFields>;
