import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useEffect, useState } from "react";

import "./App.css";
import Home from "./Components/Home/Home";
import Region from "./Components/Region/Region";
import Card from "./Components/UI/Card/Card";
import Header from "./Components/UI/Header/Header";

function App() {
  const [latest, setLatest] = useState();
  const [dateUpdate, setDateUpdate] = useState();

  const [toPlot, setToPlot] = useState();
  const [toPositivePie, setToPositivePie] = useState();
  const [regions, setRegions] = useState();

  useEffect(() => {
    fetch(
      `https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/dpc-covid19-ita-andamento-nazionale.json`,
    )
      .then((data) => data.json())
      .then((data) => {
        console.log(data, "dd");

        const el = data[data.length - 1];

        setDateUpdate(data[data.length - 1].data);

        const cards = {
          Deceduti: el.deceduti,
          Guariti: el.dimessi_guariti,
          "T. Intensiva": el.terapia_intensiva,
          "Totale Positivi": el.totale_positivi,
          "Nuovi Positivi": el.nuovi_positivi,
          "Delta Positivi": el.variazione_totale_positivi,
        };

        setLatest(cards);

        const toP = data.map((el) => {
          return {
            data: new Date(el.data),
            "T. Intensiva": el.terapia_intensiva,
            //"Nuovi Positivi": el.nuovi_positivi,
            //"Delta Positivi": el.variazione_totale_positivi,
            //Guariti: el.dimessi_guariti,
            Deceduti: el.deceduti,
            "Totale Positivi": el.totale_positivi,
          };
        });

        setToPlot(toP);

        const pie = [
          {
            label: "Terapia",
            value: el.terapia_intensiva,
          },
          {
            label: "Isolamento",
            value: el.isolamento_domiciliare,
          },
          {
            label: "Ricoverati",
            value: el.ricoverati_con_sintomi,
          },
        ];

        setToPositivePie(pie);
        console.log(el, "PIE");

        /* const dataGenre = [
  {
      "label": "Maschi",
      "value": entries.filter(el => el.genre === "M").length
  },
  {
      "label": "Femine",
      "value": entries.filter(el => el.genre === "F").length
  }        
] */
      });
  }, []);

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/dpc-covid19-ita-regioni.json",
    )
      .then((data) => data.json())
      .then((data) => {
        console.log(data);
        const reg = [
          ...new Set(data.map((el) => el.denominazione_regione)),
        ].sort();
        setRegions(reg);
        console.log(reg);
      });
  }, []);

  return (
    <div className="min-h-screen bg-blue">
      <Router basename={process.env.PUBLIC_URL}>
        <Header dateUpdate={dateUpdate} latest={latest} regions={regions} />

        <div className="w-screen">
          <div className="flex flex-wrap ">
            <Switch>
              <Route exact path="/">
                <Home toPlot={toPlot} toPositivePie={toPositivePie} />
              </Route>
              <Route path="/region/:region">
                <Region />
              </Route>
            </Switch>
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;
