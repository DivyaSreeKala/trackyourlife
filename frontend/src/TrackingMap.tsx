// import React, { useEffect, useRef, useState } from 'react'
// import * as d3 from "d3";

// const TrackingMap = ({  width = 640,
//     height = 400,
//     marginTop = 20,
//     marginRight = 20,
//     marginBottom = 30,
//     marginLeft = 40
//   }) => {
//     const gx = useRef();
//     const gy = useRef();

//     const [data, setData] = useState(() => d3.ticks(-2, 20, 200).map(Math.sin));
//     const x = d3.scaleLinear(
//       [0, data.length - 1],
//       [marginLeft, width - marginRight]
//     );
//     const y = d3.scaleLinear(d3.extent(data), [height - marginBottom, marginTop]);
//     const line = d3.pie((d, i) => x(i), y);
//     useEffect(() => void d3.select(gx.current).call(d3.axisBottom(x)), [gx, x]);
//     useEffect(() => void d3.select(gy.current).call(d3.axisLeft(y)), [gy, y]);  
//   return (
//     <div>TrackingMap
//         <svg width={width} height={height}>
//       <g ref={gx} transform={`translate(0,${height - marginBottom})`} />
//       <g ref={gy} transform={`translate(${marginLeft},0)`} />
//       <path
//         fill="none"
//         stroke="currentColor"
//         stroke-width="1.5"
//         d={line(data)}
//       />
//       <g fill="white" stroke="currentColor" stroke-width="1.5">
//         {data.map((d, i) => (
//           <circle key={i} cx={x(i)} cy={y(d)} r="0.1" />
//         ))}
//       </g>
//     </svg>
//     </div>
//   )
// }

// export default TrackingMap


import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';

const TrackingMap = ({ width = 1200, height = 400, marginTop = 20, marginRight = 20, marginBottom = 30, marginLeft = 40 }) => {
  // Sample data: An array of arrays where each inner array represents a week
  // and contains weights for each day of the week.
  const [data, setData] = useState(() => {
    const weeks = 52; // Number of weeks in a year
    const months = 12
    const daysInWeek = 7; // Days in a week
    const weights = Array.from({ length: weeks }, () => Array(daysInWeek).fill(0).map(() => Math.random() * 100)); // Random weights for demonstration
    return weights;
  });

  // Scales for x and y axes
  const yScale = d3.scaleBand()
    .domain(d3.range(data[0].length)) // Each day of the week
    .range([marginTop, height - marginBottom])
    .padding(0.2); // Space between squares

  const xScale = d3.scaleBand()
    .domain(d3.range(data.length)) // Each week
    .range([marginLeft, width - marginRight])
    .padding(0.2); // Space between squares

  // Color scale for weights
  const colorScale = d3.scaleSequential()
    .domain([0, 100]) // Range of weights
    .interpolator(d3.interpolateBlues); // Color gradient

  const svgRef = useRef();

  useEffect(() => {
    if (svgRef.current) {
      // Clear previous content
      d3.select(svgRef.current).selectAll('*').remove();

      // Draw heatmap squares
      d3.select(svgRef.current)
        .selectAll('rect')
        .data(data.flat())
        .enter()
        .append('rect')
        .attr('x', (d, i) => {
          const weekIndex = Math.floor(i / data[0].length);
          return xScale(weekIndex);
        })
        .attr('y', (d, i) => {
            const weekIndex = Math.floor(i / data[0].length);
            const dayIndex = i % data[0].length;
            return yScale(dayIndex);
          })
        .attr('width', xScale.bandwidth())
        .attr('height', yScale.bandwidth())
        .attr('fill', d => colorScale(d));

      // Add day labels
      const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      d3.select(svgRef.current)
        .selectAll('text.day')
        .data(daysOfWeek)
        .enter()
        .append('text')
        .attr('class', 'day')
        .attr('y', (d, i) => yScale(i) + yScale.bandwidth() / 2)
        .attr('x', marginLeft - 20)
        .attr('text-anchor', 'middle')
        .text(d => d);

      // Add week labels
      const monthsInYear = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      d3.select(svgRef.current)
        .selectAll('text.week')
        .data(d3.range(data.length))
        .enter()
        .append('text')
        .attr('class', 'week')
        .attr('y', height - marginBottom + 20)
        .attr('x', (d, i) => xScale(i) + xScale.bandwidth() / 2)
        .attr('text-anchor', 'end')
        // .text((d, i) => `Week ${i + 1}`);
    }
  }, [data, xScale, yScale, colorScale, svgRef]);

  return (
    <div>Heatmap
      <svg ref={svgRef} width={width} height={height} />
    </div>
  );
};

export default TrackingMap;
