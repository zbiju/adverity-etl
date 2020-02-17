import '@testing-library/jest-dom/extend-expect';
import { mount } from 'enzyme';
import React from 'react';
import { ChartLegend } from './ChartLegend';

describe('ChartLegend', () => {
    it('renders correctly', () => {
        const wrapper = mount(
            <svg>
                <ChartLegend
                    width={200}
                    legendItems={[
                        { color: '#00d8d6', label: 'Impressions' },
                        { color: '#0be881', label: 'Clicks' }
                    ]}
                />
            </svg>
        );
        expect(wrapper.render().find('text')).toHaveLength(2);
    });
});
