import '@testing-library/jest-dom/extend-expect';
import { extent, max } from 'd3-array';
import { scaleLinear, ScaleLinear, scaleTime, ScaleTime } from 'd3-scale';
import { mount } from 'enzyme';
import React from 'react';
import { ValueDataEntry } from '../models/ValueDataEntry';
import { loadMockMappedData } from '../tests/testutils';
import { ChartDataLine } from './ChartDataLine';

describe('ChartDataLine', () => {
    let lineData: ValueDataEntry[];
    let yScale: ScaleLinear<number, number>;
    let xScale: ScaleTime<number, number>;

    beforeAll(async () => {
        const mappedData = await loadMockMappedData('./mocks/fake.csv');
        lineData = mappedData.map(entry => ({ name: entry.date, value: entry.clicks }));
        yScale = scaleLinear()
            .domain([0, max(mappedData, d => d.clicks) as number])
            .range([100, 0])
            .nice();
        xScale = scaleTime()
            .domain(extent(mappedData, d => d.date) as Date[])
            .rangeRound([0, 300]);
    });

    it('renders correctly', () => {
        const wrapper = mount(
            <svg>
                <ChartDataLine title="ABC" data={lineData} xScale={xScale} yScale={yScale} color="#0be881" />
            </svg>
        );
        expect(wrapper.render().find('path#line-ABC')).toHaveLength(1);
    });
});
