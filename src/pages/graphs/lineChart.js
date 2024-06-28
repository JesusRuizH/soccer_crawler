import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const LineChart = ({ data1, data2, width = 800, height = 400 }) => {
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
  
      const x = d3.scaleTime()
        .domain(d3.extent([...data1, ...data2], d => d.date))
        .range([0, innerWidth]);
  
      const y = d3.scaleLinear()
        .domain([0, d3.max([...data1, ...data2], d => d.value)])
        .nice()
        .range([innerHeight, 0]);
  
      const line = d3.line()
        .x(d => x(d.date))
        .y(d => y(d.value))
        .curve(d3.curveMonotoneX);
  
      const addLine = (data, color) => {
        g.append('path')
          .datum(data)
          .attr('fill', 'none')
          .attr('stroke', color)
          .attr('stroke-width', 2)
          .attr('d', line);
  
        g.selectAll(`.dot-${color}`)
          .data(data)
          .enter().append('circle')
          .attr('class', `dot-${color}`)
          .attr('cx', d => x(d.date))
          .attr('cy', d => y(d.value))
          .attr('r', 4)
          .attr('fill', color)
          .attr('stroke', 'white')
          .attr('stroke-width', 2)
          .on('mouseover', function (event, d) {
            d3.select(this).attr('r', 6);
            g.append('text')
              .attr('id', 'tooltip')
              .attr('x', x(d.date) + 10)
              .attr('y', y(d.value) - 10)
              .attr('fill', 'black')
              .text(`(${d3.timeFormat('%Y-%m-%d')(d.date)}, ${d.value})`);
          })
          .on('mouseout', function () {
            d3.select(this).attr('r', 4);
            g.select('#tooltip').remove();
          });
      };
  
      addLine(data1, 'steelblue');
      addLine(data2, 'orange');
  
      g.append('g')
        .attr('transform', `translate(0,${innerHeight})`)
        .call(d3.axisBottom(x).ticks(d3.timeMonth.every(1)).tickFormat(d3.timeFormat('%b')));
  
      g.append('g')
        .call(d3.axisLeft(y));
  
    }, [data1, data2, width, height]);
  
    return <svg ref={ref}></svg>;
  };

export {LineChart}