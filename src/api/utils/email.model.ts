export interface EmailTemplateData {
	[key: string]: string;
}

export enum EmailTemplateType {
	// Auto provided
	REQUEST_TEMPLATE = 'request-template',

	// Collegato
	DYNAMIC = 'dynamic',
}

export interface EmailFrom {
	name: string;
	prefix: string;
}

export interface EmailData {
	fromName?: EmailFrom;
	destination: string;
	subject: string;

	templateType: string;
	template?: string;
	templateData?: EmailTemplateData;
}
