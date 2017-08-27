import { Component, Input, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

import * as d3 from 'd3-selection';
import * as d3Scale from "d3-scale";
import * as d3Shape from "d3-shape";
import * as d3Array from "d3-array";
import * as d3Axis from "d3-axis";


@Component({
  selector: 'line-diagram',
  templateUrl: 'line-diagram.component.html'
  
})

export class LineDiagram {
  @Input() stats: any;
  margin = {top: 20, right: 20, bottom: 30, left: 50};
  width: number;
  height: number;
  x: any;
  y: any;
  svg: any;
  line: d3Shape.Line<[number, number]>;
  forecastArr: any;

  constructor(public navCtrl: NavController) {
    this.width = 900 - this.margin.left - this.margin.right ;
    this.height = 500 - this.margin.top - this.margin.bottom;     
  }

  ngOnInit() {
    this.forecastArr = this.stats.forecast.forecastday[0].hour;
    this.initSvg()
    this.initAxis();
    this.drawAxis();
    this.drawLine(); 
  }
  ionViewDidLoad() {}

  initSvg() {
    this.svg = d3.select("#lineChart")
        .append("svg")
        .attr("width", '100%')
        .attr("height", '100%')
        .attr('viewBox','0 0 900 500')
        .append("g")
        .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");
  }

  initAxis() {
    this.x = d3Scale.scaleTime().range([0, this.width]);
    this.y = d3Scale.scaleLinear().range([this.height, 0]);
    this.x.domain(d3Array.extent(this.forecastArr, (hourForecast: any) => this.getTimeInMS(hourForecast)));
    this.y.domain(d3Array.extent(this.forecastArr, (d: any) => d.temp_c ));    
  }

  drawAxis() {
    this.svg.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + this.height + ")")
        .call(d3Axis.axisBottom(this.x));

    this.svg.append("g")
        .attr("class", "axis axis--y")
        .call(d3Axis.axisLeft(this.y))
        .append("text")
        .attr("class", "axis-title")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Temp");
  }

  drawLine() {
    this.line = d3Shape.line()
        .x( (hourForecast: any) => this.x(this.getTimeInMS(hourForecast)))
        .y( (d: any) => this.y(d.temp_c) );
         
    this.svg.append("path")
        .datum(this.forecastArr)
        .attr("class", "line")
        .attr('stroke', 'green')
        .attr('stroke-width', 4)
        .attr('fill', 'none')
        .attr("d", this.line(this.forecastArr));
  }

  getTimeInMS(hourForecast) {
    return hourForecast.time_epoch * 1000;
  }
}


