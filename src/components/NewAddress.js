import React, { useState, useContext, useEffect } from "react";
import "../scss/style.scss"
import mongoosy from "mongoosy/frontend";
import LeafletMap from "./LeafletMap";
import { AddressContext } from "../contexts/AddressContextProvider"
import ShowAddress from "./ShowAddress";

export default function NewAddress(props) {
  const { Address } = mongoosy;
  const [addressInfo, setAddressInfo] = useState([]);
  const [savedAddress, setSavedAddress] = useState("");
  const {fetchAddress} =useContext(AddressContext)

  useEffect(() => {
    getAddressInfo();
    console.log(props)
  }, []);

  useEffect(() => {
    console.log(addressInfo);
    addAddress();
  }, [addressInfo]);

  const getAddressInfo = async () => {
    // const address = props.address.label;
     console.log("newAddress: ", props)
    await setAddressInfo(props.address.label.split(","));
    // console.log(address.split(","));
    // console.log(address.substring(0, address.indexOf(",")));
    // console.log(address);
  };

  const addAddress = async () => {
    let anAddress;
    if (addressInfo[0]) {
      if (!isNaN(addressInfo[0])) {
        anAddress = new Address({
          streetName: addressInfo[1],
          postCode: addressInfo[9],
          city: addressInfo[5],
          country: addressInfo[10],
          coordinates: [props.address.y, props.address.x],
        });
      } else if (addressInfo.length <= 5) {
        anAddress = new Address({
          streetName: "-",
          postCode: "-",
          city: addressInfo[0],
          country: addressInfo[4],
          coordinates: [props.address.y, props.address.x],
        });
      } else {
        anAddress = new Address({
          streetName: addressInfo[0],
          postCode: addressInfo[8],
          city: addressInfo[4],
          country: addressInfo[9],
          coordinates: [props.address.y, props.address.x],
        });
      }

      await anAddress.save();

      setSavedAddress(anAddress)
      console.log("Saved address: ", savedAddress)

      // fetchAddress(anAddress._id)
    }
   
  };

  return (
    <>
      {props.newAddress ? (
        ""
      ) : (

        <ShowAddress address={savedAddress}/>
        // <div className="address-info">
        //   <div>{savedAddress.streetName}</div>
        //   <div>{savedAddress.postCode}</div>
        //   <div>{savedAddress.city}</div>
        //   <div>{savedAddress.country}</div>
        //   <LeafletMap mapAddress={props.address}></LeafletMap>
        // </div>
      )}
    </>
  );
}
