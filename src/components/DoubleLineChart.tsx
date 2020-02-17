import styled from '@emotion/styled';
import { extent, max } from 'd3-array';
import { scaleLinear, scaleTime } from 'd3-scale';
import React, { useEffect, useState } from 'react';
import { DataEntry } from '../models/DataEntry';
import { ValueDataEntry } from '../models/ValueDataEntry';
import { ChartAxis } from './ChartAxis';
import { ChartDataLine } from './ChartDataLine';
import { ChartLegend } from './ChartLegend';

const Container = styled.div`
    flex: 1 1 70%;
    padding: 0 10px;
    text-align: center;
`;

interface DoubleLineChartProps {
    title?: string;
    leftAxisTitle: string;
    rightAxisTitle: string;
    data: DataEntry[];
}

const DoubleLineChart: React.FC<DoubleLineChartProps> = ({ title, data }) => {
    const margins = {
        top: 20,
        right: 40,
        bottom: 20,
        left: 40
    };

    const width = 600 - margins.left - margins.right;
    const height = 300 - margins.top - margins.bottom;

    const clicksScale = scaleLinear()
        .domain([0, max(data, d => d.clicks) as number])
        .range([height, 0])
        .nice();
    const impressionsScale = scaleLinear()
        .domain([0, max(data, d => d.impressions) as number])
        .range([height, 0])
        .nice();
    const bottomScale = scaleTime()
        .domain(extent(data, d => d.date) as Date[])
        .rangeRound([0, width]);

    const [clicksData, setClicksData] = useState<ValueDataEntry[]>([]);
    const [impressionsData, setImpressionsData] = useState<ValueDataEntry[]>([]);

    useEffect(() => {
        setClicksData(data.map(entry => ({ name: entry.date, value: entry.clicks })));
        setImpressionsData(data.map(entry => ({ name: entry.date, value: entry.impressions })));
    }, [data]);

    return (
        <Container>
            <p>{title}</p>
            <svg width={width + margins.left + margins.right} height={height + margins.top + margins.bottom}>
                <g transform={`translate(${margins.left}, ${margins.top})`}>
                    <ChartAxis title="Clicks" orientation="left" scale={clicksScale} ticks={5} />
                    <ChartAxis
                        title="Impressions"
                        orientation="right"
                        scale={impressionsScale}
                        ticks={5}
                        transform={`translate(${width}, 0)`}
                    />
                    <ChartAxis orientation="bottom" scale={bottomScale} ticks={12} transform={`translate(0, ${height})`} />
                    <ChartDataLine title="Clicks" data={clicksData} xScale={bottomScale} yScale={clicksScale} color="#0be881" />
                    <ChartDataLine
                        title="Impressions"
                        data={impressionsData}
                        xScale={bottomScale}
                        yScale={impressionsScale}
                        color="#00d8d6"
                    />
                    <ChartLegend
                        width={width}
                        legendItems={[
                            { color: '#00d8d6', label: 'Impressions' },
                            { color: '#0be881', label: 'Clicks' }
                        ]}
                    />
                </g>
            </svg>
        </Container>
    );
};

export { DoubleLineChart };
