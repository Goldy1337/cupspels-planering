import React, { useState, useEffect, useContext } from "react";
import "../scss/style.scss"
import mongoosy from "mongoosy/frontend";
import { GlobalContext } from "../contexts/GlobalContextProvider"

export default function NewAddress(props) {
  const { Address } = mongoosy;
  const [addressInfo, setAddressInfo] = useState([]);
  const [savedAddress, setSavedAddress] = useState("");
  const {fetchArenaAddress, arenaAddress} =useContext(GlobalContext)

  useEffect(() => {
    getAddressInfo();
    console.log(props)
  }, []);

  useEffect(() => {
    console.log(addressInfo);
    addAddress();
  }, [addressInfo]);

  const getAddressInfo = async () => {
     console.log("newAddress: ", props)
    await setAddressInfo(props.address.label.split(","));
  };

  const addAddress = async () => {
    let anAddress;
    if (addressInfo[0]) {
      if (!isNaN(addressInfo[0])) {
        anAddress = new Address({
          streetName: addressInfo[1],
          postCode: addressInfo[9],
          city: addressInfo[5],
          country: addressInfo[addressInfo.length - 1],
          coordinates: [props.address.y, props.address.x],
        });
      } else if (addressInfo.length <= 5) {
        anAddress = new Address({
          streetName: "-",
          postCode: "-",
          city: addressInfo[0],
          country: addressInfo[addressInfo.length - 1],
          coordinates: [props.address.y, props.address.x],
        });
      } else {
        anAddress = new Address({
          streetName: addressInfo[0],
          postCode: addressInfo[8],
          city: addressInfo[4],
          country: addressInfo[addressInfo.length-1],
          coordinates: [props.address.y, props.address.x],
        });
      }

      await anAddress.save();

      setSavedAddress(anAddress)
      console.log("Saved address: ", anAddress)
      

       await fetchArenaAddress(anAddress.coordinates)
       console.log(arenaAddress)
    }
   
  };

  return (
    <>
      <div></div>
    </>
  );
}
