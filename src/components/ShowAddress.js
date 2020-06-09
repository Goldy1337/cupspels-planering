import React, { useState, useContext, useEffect } from "react";
import "../scss/style.scss";
import mongoosy from "mongoosy/frontend";
import LeafletMap from "./LeafletMap";
import { AddressContext } from "../contexts/AddressContextProvider";

export default function ShowAddress(props) {
  const { Address } = mongoosy;
  const { fetchArenaAddress, arenaAddress } = useContext(AddressContext);
  const [mapAddress, setMapAddress] = useState("")


  useEffect(async () => {
    console.log(props)
    await fetchArenaAddress(props.addressId);
    getAddress()
  },[])

  const getAddress = async () => {
    console.log(props);
    if (props.addressId) {
      console.log("propsid")
      // try{
      //      let arenaAddress = await fetchArenaAddress(props.addressId);
      //    }catch{  console.log("Promise rejected ", 400)}
    
        setMapAddress(arenaAddress);
       
    } else {
      setMapAddress(props.address);
    }
     
  }
  useEffect(() => {
    console.log(mapAddress)
  })

  return (
    <>
    {mapAddress ? (
    <div className="address-info">
      <div>{mapAddress.streetName}</div>
      <div>{mapAddress.postCode}</div>
      <div>{mapAddress.city}</div>
      <div>{mapAddress.country}</div>
      <LeafletMap mapAddress={mapAddress}></LeafletMap>
    </div>
    ):("")}
    </>
  );
}
