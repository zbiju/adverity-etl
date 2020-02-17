import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
import { extractDatasourcesAndCampaigns } from '../api/ApiClient';
import { DataEntry } from '../models/DataEntry';
import { Filter } from '../models/Filter';
import { DoubleLineChart } from './DoubleLineChart';
import { FiltersMenu } from './FiltersMenu';

const Container = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

interface FilterableChartProps {
    data: DataEntry[];
}

const FilterableChart: React.FC<FilterableChartProps> = ({ data }) => {
    const [datasources, setDatasources] = useState<string[]>([]);
    const [campaigns, setCampaigns] = useState<string[]>([]);
    const [selectedDatasources, setSelectedDatasources] = useState<string[]>([]);
    const [selectedCampaigns, setSelectedCampaigns] = useState<string[]>([]);
    const [visibleData, setVisibleData] = useState(data);
    const [chartTitle, setChartTitle] = useState('All Datasources; All Campaigns');
    const filters = [
        {
            name: 'Datasources',
            values: datasources
        },
        {
            name: 'Campaigns',
            values: campaigns
        }
    ];

    const updateSelectedFilters = (filters: Filter[]) => {
        const datasources = filters.find(filter => filter.name === 'Datasources');
        const campaigns = filters.find(filter => filter.name === 'Campaigns');

        if (datasources) {
            setSelectedDatasources(datasources.values);
        } else {
            setSelectedDatasources([]);
        }

        if (campaigns) {
            setSelectedCampaigns(campaigns.values);
        } else {
            setSelectedCampaigns([]);
        }
    };

    const aggregateByDate = (data: DataEntry[]): DataEntry[] => {
        type AggregatedByDate = { [key: string]: DataEntry };
        const aggregatedData = data.reduce((prev, entry) => {
            const key = entry.date.toISOString();
            let aggregatedEntry = prev[key];
            if (aggregatedEntry) {
                aggregatedEntry.clicks += entry.clicks;
                aggregatedEntry.impressions += entry.impressions;
            } else {
                aggregatedEntry = { ...entry };
            }
            prev[key] = aggregatedEntry;
            return prev;
        }, {} as AggregatedByDate);

        return Object.values(aggregatedData);
    };

    const updateVisibleData = () => {
        const filteredData = data.filter(entry => {
            let result = true;
            if (selectedDatasources.length > 0) {
                result = result && selectedDatasources.includes(entry.datasource);
            }
            if (result && selectedCampaigns.length > 0) {
                result = result && selectedCampaigns.includes(entry.campaign);
            }
            return result;
        });

        setVisibleData(aggregateByDate(filteredData));
    };

    useEffect(() => {
        const filters = extractDatasourcesAndCampaigns(data);
        setDatasources(filters.datasources);
        setCampaigns(filters.campaigns);
    }, [data]);

    useEffect(() => {
        updateVisibleData();
        let campaignsTitle = 'All Campaigns';
        let datasourcesTitle = 'All Datasources';
        if (selectedCampaigns.length > 0) {
            campaignsTitle = `Campaign "${selectedCampaigns.join('", "')}"`;
        }
        if (selectedDatasources.length > 0) {
            datasourcesTitle = `Datasource "${selectedDatasources.join('", "')}"`;
        }
        setChartTitle(`${datasourcesTitle}; ${campaignsTitle}`);
    }, [selectedCampaigns, selectedDatasources]);

    return (
        <Container>
            <FiltersMenu filters={filters} onApply={updateSelectedFilters} />
            {visibleData.length === 0 && <p>No data available for this filters combination</p>}
            {visibleData.length > 0 && (
                <DoubleLineChart leftAxisTitle="Clicks" rightAxisTitle="Impressions" title={chartTitle} data={visibleData} />
            )}
        </Container>
    );
};

export { FilterableChart };
