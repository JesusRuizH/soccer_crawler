import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

const PieChart = ({ data, width = 400, height = 400 }) => {
    const ref = useRef();
    const [selected, setSelected] = useState(null);
  
    useEffect(() => {
      const radius = Math.min(width, height) / 2;
      const color = d3.scaleOrdinal(d3.schemeCategory10);
      
      const arc = d3.arc()
        .innerRadius(0)
        .outerRadius(radius);
  
      const pie = d3.pie()
        .value(d => d.value)
        .sort(null);
  
      const svg = d3.select(ref.current)
        .attr('width', width)
        .attr('height', height)
        .append('g')
        .attr('transform', `translate(${width / 2},${height / 2})`);
  
      const arcs = svg.selectAll('.arc')
        .data(pie(data))
        .enter().append('g')
        .attr('class', 'arc')
        .on('click', function(event, d) {
          setSelected(d.index);
        });
  
      arcs.append('path')
        .attr('d', arc)
        .attr('fill', d => color(d.data.label))
        .style('opacity', d => selected === d.index ? 0.5 : 1)
        .style('stroke', d => selected === d.index ? 'black' : 'none');
  
      arcs.append('text')
        .attr('transform', d => `translate(${arc.centroid(d)})`)
        .attr('dy', '.35em')
        .style('text-anchor', 'middle')
        .text(d => d.data.label);
  
      if (selected !== null) {
        const selectedData = data[selected];
        const percentage = selectedData.value;
  
        svg.append('text')
          .attr('id', 'tooltip')
          .attr('x', 0)
          .attr('y', 0)
          .attr('text-anchor', 'middle')
          .attr('dy', '.35em')
          .attr('fill', 'black')
          .text(`${percentage}`);
      } else {
        svg.select('#tooltip').remove();
      }
    }, [data, selected, width, height]);
  
    return <svg ref={ref}></svg>;
  };

export {PieChart};
