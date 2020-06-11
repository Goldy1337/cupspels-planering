import React, { createContext, useState, useEffect } from "react";
import mongoosy from "mongoosy/frontend";
const { Address } = mongoosy;

export const AddressContext = createContext();

export default function AddressContextProvider(props) {
  const [addresses, setAddresses] = useState([]);
  const [address, setAddress] = useState();
  const [unformattedAddress, setUnformattedAddress] = useState();
  const [arenaAddress, setArenaAddress] = useState();

  async function fetchAddresses() {
    let initAddresses = await Address.find();
    setAddresses(initAddresses);
  }
  async function fetchAddress(id) {
    let anAddress = await Address.findOne({ _id: id });
    setAddress(anAddress)
  }
  async function addUnformattedAddress(anAddress){
    //let anAddress = await Address.find({_id: id})
    setUnformattedAddress(anAddress)
  }


  async function fetchArenaAddress(coords){
    let anAddress;
    try{
        anAddress = await Address.findOne({ coordinates: coords });
       }catch{
         console.log("Rejected promise ", 400)
       }
    setArenaAddress(anAddress)
  }

  const appendAddress = (address) => {
    setAddresses([...addresses, address]);
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  const values = {
    address,
    arenaAddress,
    unformattedAddress,
    appendAddress,
    addUnformattedAddress,
    fetchAddress,
    fetchAddresses,
    fetchArenaAddress,
  };

  return (
    <AddressContext.Provider value={values}>
      {props.children}
    </AddressContext.Provider>
  );
}
