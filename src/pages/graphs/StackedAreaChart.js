import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const StackedAreaChart = ({ data, keys, width = 800, height = 400 }) => {
  const ref = useRef();

  useEffect(() => {
    const margin = { top: 20, right: 30, bottom: 30, left: 40 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const svg = d3.select(ref.current)
      .attr('width', width)
      .attr('height', height);

    svg.selectAll('*').remove(); // Clear previous content

    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const x = d3.scaleBand()
      .domain(data.map(d => d.date))
      .range([0, innerWidth])
      .padding(0.1);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.total)])
      .nice()
      .range([innerHeight, 0]);

    const color = d3.scaleOrdinal(d3.schemeCategory10)
      .domain(keys);

    const area = d3.area()
      .curve(d3.curveStepAfter)
      .x(d => x(d.data.date) + x.bandwidth() / 2)
      .y0(d => y(d[0]))
      .y1(d => y(d[1]));

    const stack = d3.stack().keys(keys)(data);

    // Draw stacked areas
    g.selectAll('path')
      .data(stack)
      .enter().append('path')
      .attr('d', area)
      .attr('fill', ({ key }) => color(key))
      .style('opacity', 0.7)
      .style('stroke', ({ key }) => d3.rgb(color(key)).darker(1))
      .style('stroke-width', '1px')
      .on('mouseover', function (event, d) {
        d3.select(this)
          .style('opacity', 1) // Increase opacity on hover
          .style('cursor', 'pointer');

        // Show tooltip with value
        tooltip.transition()
          .duration(200)
          .style('opacity', .9);
        tooltip.html(`<strong>${d.key}:</strong> ${d[d.length - 1][1] - d[d.length - 1][0]}`)
          .style('left', `${event.pageX}px`)
          .style('top', `${event.pageY - 28}px`);
      })
      .on('mouseout', function () {
        d3.select(this)
          .style('opacity', 0.7); // Restore opacity on mouseout

        // Hide tooltip
        tooltip.transition()
          .duration(500)
          .style('opacity', 0);
      });

    // Add y-axis
    g.append('g')
      .call(d3.axisLeft(y));

    // Add x-axis
    g.append('g')
      .attr('transform', `translate(0,${innerHeight})`)
      .call(d3.axisBottom(x));

    // Add legend
    const legend = svg.append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top / 2})`);

    keys.forEach((key, i) => {
      const legendRow = legend.append('g')
        .attr('transform', `translate(${i * 150}, 0)`);

      legendRow.append('rect')
        .attr('width', 20)
        .attr('height', 20)
        .attr('fill', color(key))
        .attr('stroke', d3.rgb(color(key)).darker(1))
        .attr('stroke-width', '1px');

      legendRow.append('text')
        .attr('x', 25)
        .attr('y', 15)
        .attr('text-anchor', 'start')
        .style('alignment-baseline', 'middle')
        .text(key);
    });

    // Tooltip element
    const tooltip = d3.select(ref.current)
      .append('div')
      .attr('class', 'tooltip')
      .style('opacity', 0)
      .style('position', 'absolute')
      .style('background-color', 'white')
      .style('padding', '5px')
      .style('border', '1px solid #ddd')
      .style('border-radius', '5px')
      .style('box-shadow', '0 0 10px rgba(0, 0, 0, 0.1)')
      .style('pointer-events', 'none');

  }, [data, keys, width, height]);

  return <svg ref={ref}></svg>;
};

export { StackedAreaChart };