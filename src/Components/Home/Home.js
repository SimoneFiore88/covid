import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Chart from "../UI/Chart/Chart";
import { useEffect, useState } from "react";
import Card from "../UI/Card/Card";

export default function Home({ dateUpdate, latest, toPlot, regions }) {
  return (
    <section className="w-full lg:w-5/6 h-full">
      <div className="backdrop-filter backdrop-blur-xl w-full">
        {toPlot && <Chart data={toPlot} label={"Andamento nazionale"} />}
      </div>
    </section>
  );
}
