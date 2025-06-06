import { KubeMatrix } from './kube-matrix.type';

export type KubeMatrixSupportFields = {
  ChargingCategory: 'Non-Chargeable' | 'Grouped' | 'Chargeable';
  TicketType: string;
};

export type KubeMatrixSupport = KubeMatrix<KubeMatrixSupportFields>;
