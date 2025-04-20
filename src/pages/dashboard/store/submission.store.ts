import { create } from 'zustand';

import { KubeSubmission } from '@/types/kube/kube-submission.type';

type SubmissionStoreState = {
  submissions?: KubeSubmission[];
  setSubmissions: (submissions: KubeSubmission[]) => void;
};

export const useSubmissionStore = create<SubmissionStoreState>((set, get) => ({
  submissions: undefined,
  setSubmissions: (submissions: KubeSubmission[]) =>
    set(() => ({ submissions })),
}));
