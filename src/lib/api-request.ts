import type { KubeResponse } from '@/types/kube-response.type';

const BASE_URL = 'graph.api/v1.0';

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export function post<T>(resource: string, params: Record<string, any>) {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	return (window as any).custom.callPostApi(
		`${BASE_URL}${resource}`,
		params,
	) as Promise<KubeResponse<T>>;
}
