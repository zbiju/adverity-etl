import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
import { getData, mapData } from './api/ApiClient';
import { FilterableChart } from './components/FilterableChart';
import { DataEntry } from './models/DataEntry';

const MainContainer = styled.div`
    border: 1px solid #f0f0f0;
    padding: 40px;
    margin: 40px;
`;

const App = () => {
    const [etlData, setETLData] = useState<DataEntry[]>([]);

    useEffect(() => {
        getData()
            .then(data => setETLData(mapData(data)))
            .catch(error => console.error(error));
    }, []);

    return (
        <MainContainer>
            <h3>Adverity Advertising Data ETL-V Challenge</h3>
            <div>
                <p>
                    Select zero to N <i>Datasources</i>
                    <br />
                    Select zero to N <i>Campaigns</i>
                    <br />
                    where zero means "All"
                </p>
                <p>
                    Hitting "Apply" filters the chart to show a timeseries for both <i>Clicks</i> nad <i>Impressions</i> for given{' '}
                    <i>Datasources</i> and <i>Campaigns</i> - logical AND
                </p>
            </div>
            {etlData.length === 0 && <p>Loading data...</p>}
            {etlData.length > 0 && <FilterableChart data={etlData} />}
        </MainContainer>
    );
};

export default App;
