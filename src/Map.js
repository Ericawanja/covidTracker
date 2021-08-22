import React from 'react'
import './Map.css'
import { MapContainer, Marker, Popup, TileLayer, useMap, Circle, CircleMarker } from 'react-leaflet'
import { ShowDataOnMap } from './util'
import numeral from 'numeral';


function Map({countries, casesType, center, zoom}) {
  function ChangeView ({ center, zoom}){
    const map = useMap();
    map.setView(center, zoom)
    return null;
  }
  
    return (     
        <div className="map">
            <MapContainer casesType={casesType} center={center} zoom={zoom}>
              <ChangeView center={center} zoom={zoom}/>
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              />  
                        
                  { countries.map( country =>(
                    <CircleMarker 
                    center={[country.countryInfo.lat, country.countryInfo.long]}
                    pathOptions={{color:'red'}}
                    radius={
                     10
                    }
                    >
                      <Popup>
                        <div ClassName='info-Container'>
                          <div
                           className="info-flag"
                           style={{backgroundImage:`url(${country.countryInfo.flag})`}}
                          ></div>
                          <div className="info-name">{country.country}</div>
                          <div className="info-confirmed">
                            cases:{numeral(country.recovered).format("0,0")}
                          </div>
                          <div className="info-recovered">
                            Recovered:{numeral(country.recoverd).format("0,0")}
                          </div>
                          <div className="info-deaths">
                            Deaths: {numeral(country.deaths).format("0,0")}
                          </div>
                        </div>
                      </Popup>
                    </CircleMarker>
                  ))}
              
            </MapContainer>
        </div>
    )
}

export default Map
