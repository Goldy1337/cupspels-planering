//npm install react-map-gl
import ReactMapGL, { GeolocateControl } from "react-map-gl";
import React, {Component, useState} from "react"
import "../scss/style.scss"


export default function MapBox (props) {

  const access_token =
    "pk.eyJ1IjoiZGNiZXJnbWFuIiwiYSI6ImNrYTN5c3V5azAya2wzZWxibXduam51bW4ifQ.4YmXwdarg4cIyPVYT9IiVQ";

  const [viewport, setViewport] = useState({
    latitude: 55.6050,
    longitude: 13.0038,
    width: "80vw",
    height: "70vh",
    zoom: 10
  });

  // const credentials = {
  //  address: props.address, 
  //  city: props.city,
  //  country: props.country


  // async function createMap() {
  //   let response = await fetch("/api.mapbox.com/geocoding/v5/mapbox.places/paris.json?access_token=pk.eyJ1IjoiZGNiZXJnbWFuIiwiYSI6ImNrYTN5c3V5azAya2wzZWxibXduam51bW4ifQ.4YmXwdarg4cIyPVYT9IiVQ", {
  //     method: "GET",
  //     headers: { "Content-Type": "application/json" },
  //     // body: JSON.stringify(credentials),
  //   });

  //   try {
  //     response = await response.json();
  //     console.log(response)
  //   } catch {
  //     console.log("Bad credentials");
  //   }
    
  // }

   //api token: pk.eyJ1IjoiZGNiZXJnbWFuIiwiYSI6ImNrYTN5c3V5azAya2wzZWxibXduam51bW4ifQ.4YmXwdarg4cIyPVYT9IiVQ

  // get
  // /geocoding/5v /mapbox.places/ { search_text }.json;

  
  

 return (
   <div>
     <button>Map</button>
     <ReactMapGL
     className="mapStyle"
       {...viewport}
       mapboxApiAccessToken={access_token}
       mapStyle="mapbox://styles/dcbergman/cka55u77e0srj1imo1yrzu16s"
       onViewportChange={(viewport) => {
         setViewport(viewport);
       }}
     ></ReactMapGL>
   </div>
 );

}
