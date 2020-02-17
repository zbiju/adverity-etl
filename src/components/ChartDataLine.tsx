import { AxisScale } from 'd3-axis';
import { select } from 'd3-selection';
import { line } from 'd3-shape';
import React, { useEffect, useRef } from 'react';
import { ValueDataEntry } from '../models/ValueDataEntry';

interface ChartDataLineProps {
    data: ValueDataEntry[];
    xScale: AxisScale<any>;
    yScale: AxisScale<any>;
    color?: string;
    transform?: string;
    title: string;
}

const ChartDataLine: React.FC<ChartDataLineProps> = ({ color, data, xScale, yScale, title }) => {
    const lineRef = useRef<SVGGElement>(null);
    useEffect(() => {
        const node = lineRef.current as SVGGElement;
        const lineGenerator = line<ValueDataEntry>()
            .x((d: ValueDataEntry) => xScale(d.name) as number)
            .y((d: ValueDataEntry) => yScale(d.value) as number);

        const lineId = `line-${title}`;
        select(`#${lineId}`).remove();
        select(node)
            .append('path')
            .datum(data)
            .attr('id', lineId)
            .attr('stroke', color ? color : 'black')
            .attr('stroke-width', 2)
            .attr('fill', 'none')
            .attr('d', lineGenerator);
    }, [data]);
    return <g ref={lineRef} />;
};

export { ChartDataLine };
