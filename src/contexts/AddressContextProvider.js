import React, { createContext, useState, useEffect } from "react";
import mongoosy from "mongoosy/frontend";
const { Address } = mongoosy;

export const AddressContext = createContext();

export default function AddressContextProvider(props) {
  const [addresses, setAddresses] = useState([]);
  const [address, setAddress] = useState();
  const [arenaAddress, setArenaAddress] = useState();

  async function fetchAddresses() {
    let initAddresses = await Address.find();
    setAddresses(initAddresses);
  }
  async function fetchAddress(anAddress){
    //let anAddress = await Address.find({_id: id})
    setAddress(anAddress)
  }

  async function fetchArenaAddress(id){
    let anAddress;
    try{
        anAddress = await Address.findOne({ _id: id });
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
    appendAddress,
    fetchAddress,
    fetchAddresses,
    fetchArenaAddress
  };

  return (
    <AddressContext.Provider value={values}>
      {props.children}
    </AddressContext.Provider>
  );
}
