//@ts-nocheck
import * as d3 from 'd3'

export default (data, width, options?) => {
  const withTitle = options?.withTitle ?? true
  const height = Math.min(width, 500)
  const radius = Math.min(width, height) / 2

  const arc = d3
    .arc()
    .innerRadius(radius * (options?.thickness || 0.68))
    .outerRadius(radius - 1)

  const pie = d3
    .pie()
    .padAngle(1 / radius)
    .sort(null)
    .value((d) => d.value)

  const color = d3
    .scaleOrdinal(options?.colors ?? [])
    .domain(data.map((d, i) => `${d.name}:${i}`))

  if (!options?.colors) {
    color.range(
      d3
        .quantize((t) => d3.interpolateSpectral(t * 0.8 + 0.1), data.length)
        .reverse()
    )
  }

  const svg = d3
    .create('svg')
    .attr('width', width)
    .attr('height', height)
    .attr('viewBox', [-width / 2, -height / 2, width, height])
    .attr('style', 'max-width: 100%; height: auto;')

  svg
    .append('g')
    .selectAll()
    .data(pie(data))
    .join('path')
    .attr('fill', (d, i) => color(`${d.name}:${i}`))
    .attr('d', arc)
    .append('title')
    .text((d) =>
      withTitle ? `${d.data.name}: ${d.data.value.toLocaleString()}` : ''
    )

  svg
    .append('g')
    .attr('font-family', 'sans-serif')
    .attr('font-size', 12)
    .attr('text-anchor', 'middle')
    .selectAll()
    .data(pie(data))
    .join('text')
    .attr('transform', (d) => `translate(${arc.centroid(d)})`)
    .call((text) =>
      text
        .append('tspan')
        .attr('y', '-0.4em')
        .attr('font-weight', 'bold')
        .text((d) => (withTitle ? d.data.name : ''))
    )
    .call((text) =>
      text
        .filter((d) => d.endAngle - d.startAngle > 0.25)
        .append('tspan')
        .attr('x', 0)
        .attr('y', '0.7em')
        .attr('fill-opacity', 0.7)
        .text((d) => (withTitle ? d.data.value.toLocaleString('en-US') : ''))
    )

  return svg.node()
}
