import React, { Component, createRef, useEffect, useState } from "react";
import { SearchControl, OpenStreetMapProvider } from "react-leaflet-geosearch";
import L from "leaflet";
import * as ELG from "esri-leaflet-geocoder";
import { Map, TileLayer, withLeaflet, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { render } from "react-dom";
import "../scss/style.scss";
import { Input } from "reactstrap";
//npm react-leaflet-geosearch

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const LeafletMap = (props) => {
  const [center, setCenter] = useState([37.7833, -122.4167]);
  const [streetName, setStreetName] = useState("");
  const [foundAddresses, setFoundAddresses] = useState([]);
  const [foundAddress, setFoundAddress] = useState("");

  const prov = OpenStreetMapProvider();
  const GeoSearchControlElement = withLeaflet(SearchControl);

  useEffect(() => {
    setCenter([props.mapAddress.y, props.mapAddress.x])
  },[])

  // async function getResult() {

  // console.log(coordinates)
  // }

  return (
    <>
       <div> 
         <div>{props.mapAddress.label}</div>
      <Map
        style={{ height: "400px", width: "60%" }}
        center={center}
        zoom="18"
        ref={React.createRef}
      >
        <TileLayer
          attribution="&amp;copy Google"
          url={"http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}
        />
        <Marker key={props.mapAddress.raw.place_id} position={center}></Marker>
        {/* <div className="pointer"></div> */}
        {/* <GeoSearchControlElement
          provider={prov}
          showMarker={true}
          showPopup={false}
          popupFormat={({ query, result }) => result.label}
          maxMarkers={3}
          retainZoomLevel={false}
          animateZoom={true}
          autoClose={true}
          searchLabel={"Enter address, please"}
          keepResult={true}
        /> */}
      </Map>
      </div>
    </>
  );
};
export default LeafletMap;
