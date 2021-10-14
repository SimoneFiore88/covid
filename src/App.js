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
            "Nuovi Positivi": el.nuovi_positivi,
            "Delta Positivi": el.variazione_totale_positivi,
          };
        });

        setToPlot(toP);
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
      <Header dateUpdate={dateUpdate} latest={latest} />

      <Router basename={process.env.PUBLIC_URL}>
        <div className="w-screen px-5 lg:px-20 pt-4">
          <div className="flex flex-wrap ">
            <div className="w-full lg:w-1/6  px-4 py-2 rounded-md shadow-xl backdrop-filter backdrop-blur-xl mb-10">
              <div className="h-36 lg:h-80 overflow-scroll">
                {regions &&
                  regions.map((el) => {
                    return (
                      <p key={el}>
                        <Link to={`/region/${el}`}>{el}</Link>
                      </p>
                    );
                  })}
              </div>
            </div>
            <Switch>
              <Route exact path="/">
                <Home toPlot={toPlot} />
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
