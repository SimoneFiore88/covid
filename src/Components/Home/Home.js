import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Chart from "../UI/Chart/Chart";
import { useEffect, useState } from "react";
import Card from "../UI/Card/Card";
import Pie from "../UI/Pie/Pie";

export default function Home({ dateUpdate, latest, toPlot, toPositivePie }) {
  return (
    <>
      <section className="w-full px-2 pt-4">
        <div className="rounded-md backdrop-filter backdrop-blur-sm w-full  border-l-4 border-blue-500 bg-white-50">
          <h2 className="font-bold font-ele text-lg ml-3 py-2">
            Andamento nazionale
          </h2>
          {toPlot && <Chart data={toPlot} label={"Andamento nazionale"} />}
        </div>
      </section>
      <section className="w-full md:w-1/3 px-2 pt-4">
        <div className="rounded-md backdrop-filter backdrop-blur-sm w-full  border-l-4 border-blue-500 bg-white-50">
          <h2 className="font-bold font-ele text-lg ml-3 py-2">
            Distribuzione positivi
          </h2>
          {toPositivePie && (
            <Pie data={toPositivePie} label={"Andamento nazionale"} />
          )}
        </div>
      </section>
    </>
  );
}
