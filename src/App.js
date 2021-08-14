
import React,{useState, useEffect} from 'react'
import './App.css';
import InfoBox from "./InfoBox"
import Table from "./Table"
import Map from "./Map"
import sortData from "./util.js"
import LineGraph from './LineGraph'
import {
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent,
} from "@material-ui/core"

function App() {
  const [countries, setCountries]= useState([]);
  const [country, setCountry] =useState(['worldwide'])
  const [countryInfo, setCountryInfo]= useState([])
  const [tableData, setTableData] = useState([])
  
  useEffect(()=>{
    fetch("https://disease.sh/v3/covid-19/all")
    .then(response=> response.json())
    .then( data => {
      setCountryInfo(data)
    })
  }, [])
  useEffect(() => {
    const getCountriesData = async () => {
      await fetch('https://disease.sh/v3/covid-19/countries')
      .then(response=> response.json())
      .then((data) => { 
        const countriesList = data.map((Country) => ({
          name: Country.country,
          value: Country.countryInfo.iso2,
        }));
        const sortedData = sortData(data)
        setTableData(sortedData)
        setCountries(countriesList)
      })
    };
    getCountriesData();
  }, []);

  const onCountryChange=  async(event)=> {
    const countryCode = event.target.value
    setCountry(countryCode);

    const url=
     countryCode === "worldwide"? "https://disease.sh/v3/covid-19/all"
     : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
     await fetch(url)
      .then(response => response.json())
      .then(data => {
        setCountryInfo(data)
      })  
  }; 
  return (
    <div className="app">
      <div className="app_left">
        <div className="app_header">
         <div> <h1>COVID-19 TRACKER</h1></div>
          <FormControl className="app_dropdown">
            <Select variant="outlined" value={country} onChange={onCountryChange}>
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {countries.map((country)=>(
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        {/*infobox*/}
        <div className="app_stats">
          <InfoBox title="Cases" total={countryInfo.todayCases}/>
          <InfoBox title ="Recovered" total={countryInfo.recovered}/>
          <InfoBox title ="Deaths" total={countryInfo.deaths}/>
        </div>

        {/*the map*/}
        <div>
          <Map/>
        </div>

      </div>
      <Card className app_right>
        <CardContent>
          <h3>Live cases by country</h3>
           <Table countries={tableData}/>    
        </CardContent>
        <CardContent>
          <h3>Worldwide new cases</h3>
          <LineGraph/>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
