import { timeParse } from 'd3-time-format';
import Papa from 'papaparse';
import { DataEntry, DataEntryAPI } from '../models/DataEntry';

const dataUrl = 'http://adverity-challenge.s3-website-eu-west-1.amazonaws.com/DAMKBAoDBwoDBAkOBAYFCw.csv';

const mapData = (data: DataEntryAPI[]): DataEntry[] => {
    return data.map(entry => {
        const formatter = timeParse('%d.%m.%Y');
        const result: DataEntry = {
            clicks: entry.clicks,
            impressions: entry.impressions,
            datasource: entry.datasource,
            campaign: entry.campaign,
            date: formatter(entry.date) as Date
        };

        return result;
    });
};

const getData = (url?: string): Promise<DataEntryAPI[]> => {
    const urlToDownload = url ? url : dataUrl;
    return new Promise((resolve, reject) => {
        Papa.parse(urlToDownload, {
            download: true,
            header: true,
            skipEmptyLines: true,
            dynamicTyping: true,
            complete: data => {
                resolve(data.data);
            },
            error: error => {
                reject(error);
            },
            transformHeader: header => header.toLowerCase()
        });
    });
};

const extractDatasourcesAndCampaigns = (data: DataEntry[]) => {
    const datasources: { [key: string]: number } = {};
    const campaigns: { [key: string]: number } = {};
    data.forEach(entry => {
        datasources[entry.datasource] = 1;
        campaigns[entry.campaign] = 1;
    });

    return { datasources: Object.keys(datasources), campaigns: Object.keys(campaigns) };
};

export { getData, extractDatasourcesAndCampaigns, mapData };
