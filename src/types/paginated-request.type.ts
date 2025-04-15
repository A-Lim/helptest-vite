export type PaginatedRequest = {
	Page?: number;
	PageSize?: number;
	Sort?: Sort[];
	DisplayFields: string[];
	FilterFields?: FilterField[];
};

type Sort = {
	Column: string;
	Direction: 'desc' | 'asc';
};

type FilterField = {
	FieldCode: string;
	SearchValue?: string;
	DateRange?: DateRange;
	Options?: string;
};

type DateRange = {
	From?: string;
	To?: string;
};
