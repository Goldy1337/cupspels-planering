import React, { useState, useContext, useEffect } from "react";
import "../scss/style.scss";
import mongoosy from "mongoosy/frontend";
import LeafletMap from "./LeafletMap";
import { GlobalContext } from "../contexts/GlobalContextProvider";

export default function ShowAddress(props) {
  const { Address } = mongoosy;
  const { fetchAddress, address } = useContext(GlobalContext);
  const [mapAddress, setMapAddress] = useState("")


  // useEffect(() => {
  //   fetchAddress(props.addressId);
  //     // getAddress();
  // },[])


  // const getAddress = async () => {
  //   console.log(props);
  //   // if (props.addressId) {

  //     // try{
  //     //      let arenaAddress = await fetchArenaAddress(props.addressId);
  //     //    }catch{  console.log("Promise rejected ", 400)}
    
  //       setMapAddress(address);
       
  //   // } else {
  //   //   setMapAddress(arenaAddress);
  //   // }
     
  // }
  useEffect(() => {
    console.log(address)
  }, [])

  return (
    <>
    {address ? (
    <div className="address-info">
      <div>{address.streetName}</div>
      <div>{address.postCode}</div>
      <div>{address.city}</div>
      <div>{address.country}</div>
      <LeafletMap mapAddress={address}></LeafletMap>
    </div>
):("")} 
    </>
  );
}
