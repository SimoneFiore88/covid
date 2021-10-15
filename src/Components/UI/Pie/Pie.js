import React, { useRef, useLayoutEffect } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);
am4core.options.commercialLicense = true;

const colors = ["#031F4B", "#08396C", "#155B96", "#6497B1", "#B3CDE0"];

export default function Pie(props) {
  console.log(props.data);

  const chart = useRef(null);

  useLayoutEffect(() => {
    let x = am4core.create("piediv", am4charts.PieChart);

    x.data = props.data;

    let pieSeries = x.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = "value";
    pieSeries.dataFields.category = "label";
    pieSeries.innerRadius = am4core.percent(90);
    pieSeries.radius = am4core.percent(100);
    //pieSeries.ticks.template.disabled = true;
    pieSeries.labels.template.disabled = true;

    pieSeries.colors.list = [
      am4core.color("#14284C"),
      //am4core.color("#193565"),
      //am4core.color("#1F427E"),
      am4core.color("#264E97"),
      //am4core.color("#2B5BB1"),
      //am4core.color("#3268CA"),
      am4core.color("#3875E3"),
    ];

    pieSeries.slices.template.stroke = am4core.color("#fff");
    pieSeries.slices.template.strokeWidth = 2;
    pieSeries.slices.template.strokeOpacity = 1;

    let label = pieSeries.createChild(am4core.Label);

    label.horizontalCenter = "middle";
    label.verticalCenter = "middle";
    label.fontSize = 20;

    label.text = "{values.value.sum}";

    x.legend = new am4charts.Legend();

    x.legend.position = "left";
    x.legend.fontSize = 12;
    x.legend.valign = "middle";

    x.legend.itemContainers.template.paddingTop = 0;

    x.legend.valueLabels.template.align = "left";
    x.legend.valueLabels.template.textAlign = "start";
    x.legend.width = 200;

    x.legend.useDefaultMarker = true;

    let marker = x.legend.markers.template.children.getIndex(0);
    marker.cornerRadius(12, 12, 12, 12);
    marker.strokeWidth = 1;
    marker.strokeOpacity = 0.2;
    marker.stroke = am4core.color("#f00");

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

  return <div id="piediv" className="h-40" style={{ width: "100%" }}></div>;
}
