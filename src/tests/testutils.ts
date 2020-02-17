import { getData, mapData } from '../api/ApiClient';
import { DataEntry } from '../models/DataEntry';
const fs = require('fs');

const loadMockMappedData = async (path: string): Promise<DataEntry[]> => {
    const file = fs.createReadStream(path);
    const loadedData = await getData(file);
    return mapData(loadedData);
};

export { loadMockMappedData };
