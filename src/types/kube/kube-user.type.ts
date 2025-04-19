export type KubeUser = {
  accountName: string;
  displayName: string;
  email: string;
  userProfileFields: { title: string; code: string; value?: string }[];
};
