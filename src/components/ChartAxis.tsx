import { Axis, axisBottom, AxisDomain, axisLeft, axisRight, AxisScale } from 'd3-axis';
import { format } from 'd3-format';
import { select } from 'd3-selection';
import React, { useEffect, useRef } from 'react';

interface ChartAxisProps {
    orientation: 'left' | 'right' | 'bottom';
    ticks: number;
    scale: AxisScale<any>;
    transform?: string;
    title?: string;
}

const ChartAxis: React.FC<ChartAxisProps> = ({ orientation, ticks, scale, transform, title }) => {
    const axisRef = useRef<SVGGElement>(null);
    useEffect(() => {
        const node = axisRef.current as SVGGElement;
        let axis: Axis<AxisDomain>;
        switch (orientation) {
            case 'left':
                axis = axisLeft(scale)
                    .ticks(ticks)
                    .tickFormat(format('.0s'));
                break;
            case 'right':
                axis = axisRight(scale)
                    .ticks(ticks)
                    .tickFormat(format('.0s'));
                break;
            case 'bottom':
                axis = axisBottom(scale).ticks(ticks);
                break;
        }

        select(node).call(axis);
        if (title) {
            const labelId = `label-${orientation}`;
            select(`#${labelId}`).remove();
            switch (orientation) {
                case 'left':
                    select(node)
                        .append('text')
                        .attr('id', labelId)
                        .attr('transform', 'rotate(-90)')
                        .attr('y', -30)
                        .attr('x', -120)
                        .attr('fill', 'currentColor')
                        .style('text-anchor', 'middle')
                        .text(title);
                    break;
                case 'right':
                    select(node)
                        .append('text')
                        .attr('id', labelId)
                        .attr('transform', 'rotate(90)')
                        .attr('y', -30)
                        .attr('x', 120)
                        .attr('fill', 'currentColor')
                        .style('text-anchor', 'middle')
                        .text(title);
                    break;
            }
        }
    });

    return <g ref={axisRef} transform={transform} />;
};

export { ChartAxis };
