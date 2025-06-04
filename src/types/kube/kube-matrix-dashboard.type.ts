import { KubeMatrix } from './kube-matrix.type';

export type KubeMatrixDashboardFields = {
  FormDesignID: number;
  CompanyName: string;
  ContractStartDate: string;
  ContractEndDate: string;
  SubscribedManDays: string;
  RolloverManDays: string;
};

export type KubeMatrixDashboard = KubeMatrix<KubeMatrixDashboardFields>;
