export type ProfileInfo = {
	username: string,
	id?: string,
	language?: string,
	name?: string,
	area_unit?: string,
	volume_unit?: string
	time_zone?: string
}

export type ContactMethod = {
	id: number;
	contact_type: string;
	contact_value: string;
	verified: number;
};

export type Language = {
	id?: string;
	language: string;
	code: string;
};

export type Region = {
	time_zone: string;
	offset: string;
	abbr: string;
};

export type Regions = {
	region: string;
	time_zones: [];
};
