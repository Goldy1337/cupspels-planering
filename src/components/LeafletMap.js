import React, { Component, createRef, useEffect, useState } from "react";
import { SearchControl, OpenStreetMapProvider } from "react-leaflet-geosearch";
import L from "leaflet";
import * as ELG from "esri-leaflet-geocoder";
import { Map, TileLayer, withLeaflet } from "react-leaflet";
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
  const [coordinates, setCoordinates] = useState([]);
  const [foundAddresses, setFoundAddresses] = useState([]);
  const [foundAddress, setFoundAddress] = useState("");

  const prov = OpenStreetMapProvider();
  const GeoSearchControlElement = withLeaflet(SearchControl);


  // useEffect(() => {
  //   getResult()
  // },[])



  // async function getResult() {
  //   const result = await prov.search({query: props.address && props.city && props.country})
  //   console.log(result)
  //   //setCoordinates([result[0].x, result[0].y])
  //   coordinates.push([result[4].y, result[4].x])
  //   setCenter(coordinates[0])
  //   for(let i=0; i<result.length; i++){
  //      foundAddresses.push(result[i]);
  //   }
  //   console.log(foundAddresses)
  //   console.log(coordinates)
  // }

  return (
    <>
      {/* <div> 
       {foundAddresses ? <Input type="select" name="select" id="exampleSelect">
          {foundAddresses.map((r, key) =>
          <option key={r.coordinates}>{r.address}</option>
          )}
        </Input>
      :''}
       </div> */}
      <Map
        style={{ height: "800px", width: "100%" }}
        center={center}
        zoom="10"
        ref={React.createRef}
      >
        <TileLayer
          attribution="&amp;copy Google"
          url={"http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}
        />
        <div className="pointer"></div>
        <GeoSearchControlElement
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
        />
      </Map>
    </>
  );
};
export default LeafletMap;
