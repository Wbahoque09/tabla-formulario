export namespace TableComponent {
	export type TableColumns = Array<{
		field: string;
		name: string;
		visible: boolean;
	}>;
	export type DataToLoad = Array<{
		[string]: string | number | boolean;
	}>;
}
