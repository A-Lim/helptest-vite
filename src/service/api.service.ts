import { KubeMatrixRequest } from '@/types/kube/kube-matrix-request.type';
import { KubeMatrix } from '@/types/kube/kube-matrix.type';
import type { KubePagination } from '@/types/kube/kube-pagination.type';
import { KubeSubmissionRequest } from '@/types/kube/kube-submission-request.type';
import type { KubeSubmission } from '@/types/kube/kube-submission.type';
import { httpPost } from '@/lib/http-request';

// #region SUBMISSIONS
export function getSubmissionList(
  formDesignID: number,
  params: KubeSubmissionRequest,
) {
  return httpPost<KubePagination<KubeSubmission[]>>(
    `Submission/(${formDesignID})/getsubmissionlist`,
    params,
  );
}
// #endregion

// #region MATRICES
export function getMatrix<T>(code: string, params?: KubeMatrixRequest) {
  return httpPost<KubePagination<KubeMatrix<T>[]>>(
    `Matrix/${code}/list`,
    params,
  );
}
// #endregion

// #region MASTERLIST
export function getMasterlist<T>(code: string) {
  return httpPost<T[]>(`masterlist/item`, {
    MasterListCode: code,
  });
}
// #endregion
