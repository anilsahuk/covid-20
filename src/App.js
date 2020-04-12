import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import axios from "axios";

function App() {
  const [latest, setLatest] = useState([]);
  const [results, setResults] = useState([]);
  const [searchCounties, setSearchCounties] = useState("");
  useEffect(() => {
    axios
      .all([
        axios.get("https://corona.lmao.ninja/all"),
        axios.get("https://corona.lmao.ninja/countries")
      ])
      .then(responseArr => {
        setLatest(responseArr[0].data);
        setResults(responseArr[1].data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const date = new Date(parseInt(latest.updated));
  const lastupdated = date.toString();

  const filterCounties = results.filter(item => {
    return searchCounties !== "" ? item.country.includes(searchCounties) : item;
  });

  const countries = filterCounties.map((data, i) => {
    return (
      <div>
        <div class="container col-12">
          <div class="row">
            <div class="col-md-12 col-sm-12">
              <div class="countrybox">
                <div class="row">
                  <div class="col-md-4">
                    <img src={data.countryInfo.flag} alt="" height="60" />
                  </div>
                  <div class="col-md-4">
                    <h4>
                      Country: <span>{data.country}</span>
                    </h4>
                    <h4>
                      Cases: <span>{data.cases}</span>
                    </h4>
                  </div>
                  <div class="col-md-4">
                    <h4>
                      Recovered: <span>{data.recovered}</span>
                    </h4>
                    <h4>
                      Deaths: <span>{data.deaths}</span>
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  });

  return (
    <div class="App">
      <div class="container col-12">
        <h2 class="top-heading">Covid 20 Live stats website</h2>
        <div class="row display-flex">
          <div class="col-md-4 col-sm-12">
            <div class="box-cases panel">
              <h4>
                Total Cases:<span> {latest.cases} </span>
              </h4>
              <h4>
                Active Cases:<span> {latest.active} </span>
              </h4>
              <h4>
                Today Cases:<span> {latest.todayCases} </span>
              </h4>
              <h4>
                Updated:<span> {lastupdated} </span>
              </h4>
            </div>
          </div>
          <div class="col-md-4 col-sm-12">
            <div class="box-recovered panel">
              <h4>
                Cases Per One Million:<span> {latest.casesPerOneMillion} </span>
              </h4>
              <h4>
                Affected Countries:<span> {latest.affectedCountries} </span>
              </h4>

              <h4>
                Recovered:<span> {latest.recovered} </span>
              </h4>
              <h4>
                Tests:<span> {latest.tests} </span>
              </h4>
            </div>
          </div>
          <div class="col-md-4 col-sm-12">
            <div class="box-death panel">
              <h4>
                Deaths Per One Million:
                <span> {latest.deathsPerOneMillion} </span>
              </h4>

              <h4>
                Today Deaths:<span> {latest.todayDeaths} </span>
              </h4>
              <h4>
                Critical:<span> {latest.critical} </span>
              </h4>
              <h4>
                Deaths:<span> {latest.deaths} </span>
              </h4>
            </div>
          </div>
          <div class="col-md-12">
            <input
              class="searchbtn"
              type="text"
              placeholder="Search a country"
              onChange={e => setSearchCounties(e.target.value)}
            />
          </div>
        </div>
      </div>
      {countries}
    </div>
  );
}

export default App;
