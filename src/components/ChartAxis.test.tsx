import '@testing-library/jest-dom/extend-expect';
import { max } from 'd3-array';
import { scaleLinear, ScaleLinear } from 'd3-scale';
import { mount } from 'enzyme';
import React from 'react';
import { DataEntry } from '../models/DataEntry';
import { loadMockMappedData } from '../tests/testutils';
import { ChartAxis } from './ChartAxis';

describe('ChartAxis', () => {
    let mappedData: DataEntry[];
    let clicksScale: ScaleLinear<number, number>;

    beforeAll(async () => {
        mappedData = await loadMockMappedData('./mocks/fake.csv');
        clicksScale = scaleLinear()
            .domain([0, max(mappedData, d => d.clicks) as number])
            .range([100, 0])
            .nice();
    });

    it('renders left', () => {
        const wrapper = mount(
            <svg>
                <ChartAxis title="Clicks" orientation="left" scale={clicksScale} ticks={5} />
            </svg>
        );
        expect(wrapper.render().find('path.domain')).toHaveLength(1);
        expect(wrapper.render().find('text#label-left')).toHaveLength(1);
        expect(
            wrapper
                .render()
                .find('text#label-left')
                .text()
        ).toEqual('Clicks');
    });

    it('renders right', () => {
        const wrapper = mount(
            <svg>
                <ChartAxis title="ABC" orientation="right" scale={clicksScale} ticks={5} />
            </svg>
        );
        expect(wrapper.render().find('path.domain')).toHaveLength(1);
        expect(wrapper.render().find('text#label-right')).toHaveLength(1);
        expect(
            wrapper
                .render()
                .find('text#label-right')
                .text()
        ).toEqual('ABC');
    });
});
