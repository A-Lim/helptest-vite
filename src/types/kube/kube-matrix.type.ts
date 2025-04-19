export type KubeMatrix<T = void> = {
  Sys_RowNum: number;
  MatrixColumnDataId: number;
} & T;
