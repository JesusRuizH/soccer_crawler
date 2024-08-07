import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const RadarChartAtack = ({ data, options }) => {
  const ref = useRef();

  useEffect(() => {
    const cfg = {
      w: 450, // Width of the circle
      h: 600, // Height of the circle
      margin: { top: 20, right: 20, bottom: 20, left: 20 }, // The margins of the SVG
      levels: 5, // How many levels or inner circles should there be drawn
      maxValue: 200, // Max value for the scale
      labelFactor: 1.25, // How much farther than the radius of the outer circle should the labels be placed
      wrapWidth: 60, // The number of pixels after which a label needs to be given a new line
      opacityArea: 0.35, // The opacity of the area of the blob
      dotRadius: 4, // The size of the colored circles of each blog
      opacityCircles: 0.1, // The opacity of the circles of each blob
      strokeWidth: 2, // The width of the stroke around each blob
      roundStrokes: false, // If true the area and stroke will follow a round path (cardinal-closed)
      color: d3.scaleOrdinal(d3.schemeCategory10) // Color function
    };

    // If the supplied maxValue is smaller than the actual one, replace by the max in the data
    cfg.maxValue = Math.max(cfg.maxValue, d3.max(data, i => d3.max(i.map(o => o.value))));

    const allAxis = data[0].map((i, j) => i.axis); // Names of each axis
    const total = allAxis.length; // The number of different axes
    const radius = Math.min(cfg.w / 2, cfg.h / 2); // Radius of the outermost circle
    const angleSlice = Math.PI * 2 / total; // The width in radians of each "slice"

    // Scale for the radius
    const rScale = d3.scaleLinear()
      .range([0, radius])
      .domain([0, cfg.maxValue]);

    // Remove any existing SVG
    d3.select(ref.current).select("svg").remove();

    // Initiate the radar chart SVG
    const svg = d3.select(ref.current).append("svg")
      .attr("width", cfg.w + cfg.margin.left + cfg.margin.right)
      .attr("height", cfg.h + cfg.margin.top + cfg.margin.bottom)
      .attr("class", "radar");

    // Append a g element
    const g = svg.append("g")
      .attr("transform", `translate(${cfg.w / 2 + cfg.margin.left},${cfg.h / 2 + cfg.margin.top})`);

    // Filter for the outside glow
    const filter = g.append("defs").append("filter").attr("id", "glow");
    filter.append("feGaussianBlur").attr("stdDeviation", "2.5").attr("result", "coloredBlur");
    const feMerge = filter.append("feMerge");
    feMerge.append("feMergeNode").attr("in", "coloredBlur");
    feMerge.append("feMergeNode").attr("in", "SourceGraphic");

    // Draw the background circles
    const axisGrid = g.append("g").attr("class", "axisWrapper");
    axisGrid.selectAll(".levels")
      .data(d3.range(1, (cfg.levels + 1)).reverse())
      .enter()
      .append("circle")
      .attr("class", "gridCircle")
      .attr("r", d => radius / cfg.levels * d)
      .style("fill", "#CDCDCD")
      .style("stroke", "#CDCDCD")
      .style("fill-opacity", cfg.opacityCircles)
      .style("filter", "url(#glow)");

    // Text indicating at what value each level is
    axisGrid.selectAll(".axisLabel")
      .data(d3.range(1, (cfg.levels + 1)).reverse())
      .enter().append("text")
      .attr("class", "axisLabel")
      .attr("x", 4)
      .attr("y", d => -d * radius / cfg.levels)
      .attr("dy", "0.4em")
      .style("font-size", "10px")
      .attr("fill", "#737373")
      .text(d => Math.round(cfg.maxValue * d / cfg.levels));

    // Draw the axes
    const axis = axisGrid.selectAll(".axis")
      .data(allAxis)
      .enter()
      .append("g")
      .attr("class", "axis");

    // Append the lines
    axis.append("line")
      .attr("x1", 0)
      .attr("y1", 0)
      .attr("x2", (d, i) => rScale(cfg.maxValue * 1.1) * Math.cos(angleSlice * i - Math.PI / 2))
      .attr("y2", (d, i) => rScale(cfg.maxValue * 1.1) * Math.sin(angleSlice * i - Math.PI / 2))
      .attr("class", "line")
      .style("stroke", "white")
      .style("stroke-width", "2px");

    // Append the labels at each axis
    axis.append("text")
      .attr("class", "legend")
      .style("font-size", "11px")
      .attr("text-anchor", "middle")
      .attr("dy", "0.35em")
      .attr("x", (d, i) => rScale(cfg.maxValue * cfg.labelFactor) * Math.cos(angleSlice * i - Math.PI / 2))
      .attr("y", (d, i) => rScale(cfg.maxValue * cfg.labelFactor) * Math.sin(angleSlice * i - Math.PI / 2))
      .text(d => d)
      .call(wrap, cfg.wrapWidth);

    // The radial line function
    const radarLine = d3.lineRadial()
      .curve(d3.curveLinearClosed)
      .radius(d => rScale(d.value))
      .angle((d, i) => i * angleSlice);

    if (cfg.roundStrokes) {
      radarLine.curve(d3.curveCardinalClosed);
    }

    // Create a wrapper for the blobs
    const blobWrapper = g.selectAll(".radarWrapper")
      .data(data)
      .enter().append("g")
      .attr("class", "radarWrapper");

    // Append the backgrounds
    blobWrapper.append("path")
      .attr("class", "radarArea")
      .attr("d", radarLine)
      .style("fill", (d, i) => cfg.color(i))
      .style("fill-opacity", cfg.opacityArea)
      .on('mouseover', function (d, i) {
        // Dim all blobs
        d3.selectAll(".radarArea")
          .transition().duration(200)
          .style("fill-opacity", 0.1);
        // Bring back the hovered over blob
        d3.select(this)
          .transition().duration(200)
          .style("fill-opacity", 0.7);
      })
      .on('mouseout', function () {
        // Bring back all blobs
        d3.selectAll(".radarArea")
          .transition().duration(200)
          .style("fill-opacity", cfg.opacityArea);
      });

    // Create the outlines
    blobWrapper.append("path")
      .attr("class", "radarStroke")
      .attr("d", radarLine)
      .style("stroke-width", cfg.strokeWidth + "px")
      .style("stroke", (d, i) => cfg.color(i))
      .style("fill", "none")
      .style("filter", "url(#glow)");

    // Append the circles
    blobWrapper.selectAll(".radarCircle")
      .data(d => d)
      .enter().append("circle")
      .attr("class", "radarCircle")
      .attr("r", cfg.dotRadius)
      .attr("cx", (d, i) => rScale(d.value) * Math.cos(angleSlice * i - Math.PI / 2))
      .attr("cy", (d, i) => rScale(d.value) * Math.sin(angleSlice * i - Math.PI / 2))
      .style("fill", (d, i, j) => cfg.color(j))
      .style("fill-opacity", 0.8);

    // Helper function to wrap text
    function wrap(text, width) {
      text.each(function () {
        const text = d3.select(this);
        const words = text.text().split(/\s+/).reverse();
        let word;
        let line = [];
        let lineNumber = 0;
        const lineHeight = 1.4; // ems
        const y = text.attr("y");
        const x = text.attr("x");
        const dy = parseFloat(text.attr("dy"));
        let tspan = text.text(null).append("tspan").attr("x", x).attr("y", y).attr("dy", `${dy}em`);

        while (word = words.pop()) {
          line.push(word);
          tspan.text(line.join(" "));
          if (tspan.node().getComputedTextLength() > width) {
            line.pop();
            tspan.text(line.join(" "));
            line = [word];
            tspan = text.append("tspan").attr("x", x).attr("y", y).attr("dy", `${++lineNumber * lineHeight + dy}em`).text(word);
          }
        }
      });
    }
  }, [data]);

  return <div ref={ref}></div>;
};

export { RadarChartAtack }