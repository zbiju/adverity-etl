export interface DataEntry {
    date: Date;
    datasource: string;
    campaign: string;
    clicks: number;
    impressions: number;
}

export interface DataEntryAPI {
    date: string;
    datasource: string;
    campaign: string;
    clicks: number;
    impressions: number;
}
