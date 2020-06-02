import React, { useState, useContext, useEffect } from "react";
import mongoosy from "mongoosy/frontend";
import LeafletMap from "./LeafletMap";

export default function NewAddress(props) {
  const { Address } = mongoosy;
  const [addressInfo, setAddressInfo] = useState([]);
  const [savedAddress, setSavedAddress] = useState("");

  useEffect(() => {
    getAddressInfo();
  }, []);

  useEffect(() => {
    console.log(addressInfo);
    addAddress();
  }, [addressInfo]);

  const getAddressInfo = async () => {
    const address = props.mapAddress.label;
    await setAddressInfo(address.split(","));
    console.log(address.split(","));
    console.log(address.substring(0, address.indexOf(",")));
    console.log(address);
  };

  const addAddress = async () => {
    let anAddress;
    let ord = "Hej";
    if (addressInfo[0]) {
      if (!isNaN(addressInfo[0])) {
        anAddress = new Address({
          streetName: addressInfo[1],
          postCode: addressInfo[9],
          city: addressInfo[5],
          country: addressInfo[10],
          coordinates: [props.mapAddress.y, props.mapAddress.x],
        });
        console.log("option 1", isNaN(addressInfo[0]));
      } else if (addressInfo.length <= 5) {
        console.log("option 2");
        anAddress = new Address({
          streetName: "-",
          postCode: "-",
          city: addressInfo[0],
          country: addressInfo[4],
          coordinates: [props.mapAddress.y, props.mapAddress.x],
        });
      } else {
        console.log("option 3");
        anAddress = new Address({
          streetName: addressInfo[0],
          postCode: addressInfo[8],
          city: addressInfo[4],
          country: addressInfo[9],
          coordinates: [props.mapAddress.y, props.mapAddress.x],
        });
      }

      await anAddress.save();

      setSavedAddress(await Address.findOne({ _id: anAddress._id }));
    }
  };

  return (
    <div>
      <div>{savedAddress.streetName}</div>
      <div>{savedAddress.postCode}</div>
      <div>{savedAddress.city}</div>
      <div>{savedAddress.country}</div>
      <LeafletMap mapAddress={props.mapAddress}></LeafletMap>
    </div>
  );
}
