import { DataEntry, DataEntryAPI } from '../models/DataEntry';
import { extractDatasourcesAndCampaigns, getData, mapData } from './ApiClient';
const fs = require('fs');

describe('API', () => {
    let loadedData: DataEntryAPI[];
    let mappedData: DataEntry[];

    beforeAll(async () => {
        const file = fs.createReadStream('./mocks/fake.csv');
        loadedData = await getData(file);
        mappedData = mapData(loadedData);
    });

    it('correctly parses data to get filters', () => {
        const filters = extractDatasourcesAndCampaigns(mappedData);
        expect(filters.campaigns).not.toBeNull();
        expect(filters.datasources).not.toBeNull();
        expect(filters.campaigns).toHaveLength(3);
        expect(filters.datasources).toHaveLength(3);
    });
});
