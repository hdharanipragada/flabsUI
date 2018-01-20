import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';


import { ActivatedRoute, Params } from '@angular/router';

import { AppService } from './../app-service.service';


@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private appService: AppService) { }

  ngOnInit() {
    // response id of the uploaded file data
    this.activatedRoute.params.subscribe((params: Params) => {
      this.getGraphData(params['id']);
    });
  }

  getGraphData(id) {
    this.appService.getData(id).subscribe((response) => {
      console.log(response);
      this.processData(response);
    }, (error) => {
      console.log(error);
    });
  }

  // process graph data for displaying the svg

  processData(response) {
    let graphdata = [];
    for (var key in response) {
      if (response.hasOwnProperty(key) && key !== '__v' && key !== '_id') {
        graphdata.push({ 'name': key, 'values': response[key] });
      }
    }
    this.drawGraph(graphdata);
  }

  drawGraph(data) {
    const width = 900;
    const height = 400;
    const margin = 60;


    /* Format Data */
    const parseDate = d3.timeParse('%Y');
    data.forEach(function (d, index) {
      d.values.forEach(function (d) {
        d.date = parseDate(d.date);
        d.value = +d.value;
      });
    });


    /* Scale */
    const xScale = d3.scaleTime()
      .domain(d3.extent(data[0].values, d => d.date))
      .range([0, width - margin]);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data[0].values, d => d.value)])
      .range([height - margin, 0]);

    const color = d3.scaleOrdinal(d3.schemeCategory10);

    /* Add SVG */
    const svg = d3.select('#chart1').append('svg')
      .attr('width', (width + margin) + 'px')
      .attr('height', (height + margin) + 'px')
      .append('g')
      .attr('transform', `translate(${margin}, ${margin})`);


    /* Add line into SVG */
    const line = d3.line()
      .x(d => xScale(d.date))
      .y(d => yScale(d.value));

    let lines = svg.append('g')
      .attr('class', 'lines');

    lines.selectAll('.line-group')
      .data(data).enter()
      .append('g')
      .attr('class', 'line-group')
      .on('mouseover', function (d, i) {
        //  show title on hover
        svg.append('text')
          .attr('class', 'title-text')
          .style('fill', color(i))
          .text(d.name)
          .attr('text-anchor', 'middle')
          .attr('x', (width - margin) / 2)
          .attr('y', 5);
      })
      .on('mouseout', function (d) {
        svg.select('.title-text').remove();
      })
      .append('path')
      .attr('class', 'line')
      .attr('d', d => line(d.values))
      .style('stroke', (d, i) => color(i));


    /* Add Axis into SVG */
    const xAxis = d3.axisBottom(xScale).ticks(5);
    const yAxis = d3.axisLeft(yScale).ticks(5);

    svg.append('g')
      .attr('class', 'x axis')
      .attr('transform', `translate(0, ${height - margin})`)
      .call(xAxis);

    svg.append('g')
      .attr('class', 'y axis')
      .call(yAxis)
      .append('text')
      .attr('y', 15)
      .attr('transform', 'rotate(-90)')
      .attr('fill', '#000')
      .text('Total values');

  }
}
