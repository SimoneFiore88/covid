import React, { useRef, useLayoutEffect } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);
am4core.options.commercialLicense = true;

const colors = ["#031F4B", "#08396C", "#155B96", "#6497B1", "#B3CDE0"];

export default function Chart(props) {
  console.log(props.data);

  const chart = useRef(null);

  useLayoutEffect(() => {
    let x = am4core.create("chartdiv", am4charts.XYChart);

    x.data = props.data;

    let dateAxis = x.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.grid.template.location = 0;

    let valueAxis = x.yAxes.push(new am4charts.ValueAxis());
    valueAxis.tooltip.disabled = true;
    valueAxis.renderer.minWidth = 35;

    Object.keys(props.data[0])
      .slice(1)
      .forEach((el, i) => {
        let series = x.series.push(new am4charts.LineSeries());
        series.dataFields.dateX = "data";
        series.dataFields.valueY = el;
        series.tooltipText = `${el
          .replace(/_/g, " ")
          .toUpperCase()} {valueY.value}`;
        series.name = el;
        series.stroke = colors[i];
        series.strokeWidth = 2;
      });

    x.cursor = new am4charts.XYCursor();
    x.legend = new am4charts.Legend();

    /* let scrollbarX = new am4charts.XYChartScrollbar();
    scrollbarX.series.push(series);
    x.scrollbarX = scrollbarX; */

    chart.current = x;
    /* 
    return () => {
      x.dispose();
    }; */
  }, []);

  // When the paddingRight prop changes it will update the chart
  /*   useLayoutEffect(() => {
    chart.current.paddingRight = props.paddingRight;
  }, [props.paddingRight]); */

  return <div id="chartdiv" className="h-80" style={{ width: "100%" }}></div>;
}
