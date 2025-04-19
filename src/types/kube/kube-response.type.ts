export type KubeResponse<T> = {
	scope: string;
	statusId: number;
	responseData: T;
};
