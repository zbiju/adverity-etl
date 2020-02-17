import { select } from 'd3-selection';
import React, { useEffect, useRef } from 'react';

interface ChartLegendProps {
    legendItems: { color: string; label: string }[];
    transform?: string;
    width: number;
}

const ChartLegend: React.FC<ChartLegendProps> = ({ legendItems, transform, width }) => {
    const legendRef = useRef<SVGGElement>(null);
    useEffect(() => {
        const node = legendRef.current as SVGGElement;
        legendItems.forEach((item, index) => {
            select(node)
                .append('text')
                .attr('id', `legend-${index}`)
                .attr('x', width / 2 - index * 50)
                .attr('fill', 'currentColor')
                .attr('font-size', '10')
                .attr('font-family', 'sans-serif')
                .attr('stroke', item.color)
                .style('text-anchor', 'middle')
                .text(item.label);
        });
    }, []);
    return <g ref={legendRef} transform={transform} />;
};

export { ChartLegend };
