import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const BoxPlot = ({ data, id }) => {
  const ref = useRef();

  useEffect(() => {
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const width = 350 - margin.left - margin.right;
    const height = 250 - margin.top - margin.bottom;

    const svg = d3.select(ref.current)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const x = d3.scaleBand()
      .range([0, width])
      .domain([id])
      .paddingInner(1)
      .paddingOuter(0.5);

    const y = d3.scaleLinear()
      .domain([d3.min(data), d3.max(data)])
      .range([height, 0]);

    svg.append('g')
      .call(d3.axisLeft(y));

    svg.append('g')
      .attr('transform', `translate(0, ${height})`)
      .call(d3.axisBottom(x));

    const boxWidth = 100;

    const sortedData = data.sort(d3.ascending);
    const q1 = d3.quantileSorted(sortedData, 0.25);
    const median = d3.quantileSorted(sortedData, 0.5);
    const q3 = d3.quantileSorted(sortedData, 0.75);
    const min = d3.min(sortedData);
    const max = d3.max(sortedData);

    // Añadir líneas y textos para los cuartiles
    svg.selectAll('.quartile-line')
      .data([q1, median, q3])
      .enter().append('line')
      .attr('class', 'quartile-line')
      .attr('x1', x(id) - boxWidth / 2)
      .attr('x2', x(id) + boxWidth / 2)
      .attr('y1', d => y(d))
      .attr('y2', d => y(d))
      .attr('stroke', 'black');

    svg.selectAll('.quartile-text')
      .data([{ label: 'Q1', value: q1 }, { label: 'Median', value: median }, { label: 'Q3', value: q3 }])
      .enter().append('text')
      .attr('class', 'quartile-text')
      .attr('x', x(id) + boxWidth / 2 + 10)
      .attr('y', d => y(d.value))
      .attr('dy', '0.35em')
      .attr('text-anchor', 'start')
      .text(d => `${d.label}: ${d.value.toFixed(2)}`);

    // Caja (rectángulo)
    svg.append('rect')
      .attr('x', x(id) - boxWidth / 2)
      .attr('y', y(q3))
      .attr('height', y(q1) - y(q3))
      .attr('width', boxWidth)
      .attr('stroke', 'black')
      .attr('fill', '#69b3a2');

    // Líneas para los mínimos y máximos
    svg.selectAll('.min-max-line')
      .data([min, max])
      .enter().append('line')
      .attr('class', 'min-max-line')
      .attr('x1', x(id) - boxWidth / 2)
      .attr('x2', x(id) + boxWidth / 2)
      .attr('y1', d => y(d))
      .attr('y2', d => y(d))
      .attr('stroke', 'black');

    // Líneas para los extremos
    svg.append('line')
      .attr('x1', x(id))
      .attr('x2', x(id))
      .attr('y1', y(min))
      .attr('y2', y(q1))
      .attr('stroke', 'black');

    svg.append('line')
      .attr('x1', x(id))
      .attr('x2', x(id))
      .attr('y1', y(q3))
      .attr('y2', y(max))
      .attr('stroke', 'black');

  }, [data, id]);

  return <svg ref={ref}></svg>;
};

export { BoxPlot };
