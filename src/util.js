 import { CircleMarker, Popup } from "leaflet";

 const casesTypeColors={
    cases: {
        hex: "#CC1034",
        multiplier: 800,
      },
      recovered: {
        hex: "#7dd71d",
        multiplier: 1200,
      },
      deaths: {
        hex: "#fb4443",
        multiplier: 2000,
      },

 }
 
 const sortData = ( data) => {
    const  sortedData =[...data];
sortedData.sort((a,b)=> {
    if (a.cases> b.cases){
        return -1;
    } else{
        return 1;
    }
});
return sortedData
};

//draw circles and tooltips
export const ShowDataOnMap= (data, casesType="cases") =>
    data.map(country =>(
        <CircleMarker
        center={[country.countryInfo.lat, country.countryInfo.long]}
        fillOpacity={0.4}
        color={casesTypeColors[casesType].hex}
        fillColor={casesTypeColors[casesType].hex}
        radius= {
            Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
        }    
        >
            <Popup>I am a pop up</Popup>
        </CircleMarker>
    ))


export default sortData;