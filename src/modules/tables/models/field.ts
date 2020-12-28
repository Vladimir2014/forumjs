export interface Field {
    key: string | number;
    name: string;
    type: any;
    value?: any;
    isHtml?: boolean;
    formatter?: any,
}