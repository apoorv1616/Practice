import { LightningElement,api,track } from 'lwc';
import { loadScript } from "lightning/platformResourceLoader";
import charts from "@salesforce/resourceUrl/Charts";

export default class CovidCountryInfoCharts extends LightningElement {
    countryCovidInfo;
  scriptLoaded = false;

  @api
  set countryCovidInfo(value) {
    if (value) {
      this.loadChartScript(value);
    }
  }

  get countryCovidInfo() {
    return this.countryCovidInfo;
  }

  loadChartScript(value) {
    // load the script only once
    // Once its loaded, then directly call the methods to draw chart
    if (this.scriptLoaded) {
      this.callDrawPieChart(value);
      this.callDrawBarChart(value);
    } else {
      this.scriptLoaded = true;
      loadScript(this, charts + "/Chart.min.js")
        .then(() => {
          this.callDrawPieChart(value);
          this.callDrawBarChart(value);
        })
        .catch((error) => {
          console.log("Error:", error);
        });
    }
  }

  callDrawPieChart(value) {
    this.drawPieChart(
      value,
      {
        label1: "Total Cases",
        label2: "Total Deaths",
        label3: "TotalRecovered",
        chartLabel: "COVID-19 Data"
      },
      "div.chart1"
    );
  }

  callDrawBarChart(value) {
    this.drawBarChart(
      value,
      {
        label1: "Today's Cases",
        label2: "Today's Deaths",
        chartLabel: "COVID-19 Data"
      },
      "div.chart2"
    );
  }

  drawPieChart(value, labels, className) {
    const config = {
      type: "pie",
      data: {
        datasets: [
          {
            data: [value.cases, value.deaths, value.recovered],
            backgroundColor: [
              "rgb(0,188,212)",
              "rgb(235,69,89)",
              "rgb(0,189,170)"
            ],
            label: labels.chartLabel
          }
        ],
        labels: [labels.label1, labels.label2, labels.label3]
      },
      options: {
        responsive: true,
        legend: {
          position: "right"
        },
        animation: {
          animateScale: true,
          animateRotate: true
        },
        title: {
          display: true,
          text: "Overall Statistics Till Date"
        }
      }
    };
    this.insertChartToDOM(className, config);
  }

  drawBarChart(value, labels, className) {
    const config = {
      type: "bar",
      data: {
        datasets: [
          {
            data: [value.todayCases, value.todayDeaths],
            backgroundColor: ["rgb(0,188,212)", "rgb(235,69,89)"]
          }
        ],
        labels: [labels.label1, labels.label2]
      },
      options: {
        responsive: true,
        legend: {
          display: false
        },
        animation: {
          animateScale: true,
          animateRotate: true
        },
        title: {
          display: true,
          text: "Today's Statistics"
        }
      }
    };
    this.insertChartToDOM(className, config);
  }

  insertChartToDOM(className, config) {
    const canvas = document.createElement("canvas");
    const chartNode = this.template.querySelector(className);
    // clear the old chart from the DOM
    chartNode.innerHTML = "";
    chartNode.appendChild(canvas);
    const ctx = canvas.getContext("2d");
    this.chart = new window.Chart(ctx, config);
  }
}