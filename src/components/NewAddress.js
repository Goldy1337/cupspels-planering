import React, { useState, useEffect } from "react";
import mongoosy from "mongoosy/frontend";
import { Form, FormGroup, Input, Col, Button } from "reactstrap";
import LeafletMap from "./LeafletMap";
import { SearchControl, OpenStreetMapProvider } from "react-leaflet-geosearch";
import L from "leaflet";
import * as ELG from "esri-leaflet-geocoder";

const NewAddress = () => {
  const { Address } = mongoosy;
  const [search, setSearch] = useState("");
  const [postCode, setPostCode] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [coordinates, setCoordinates] = useState([""]);
  const [showMap, setShowMap] = useState(false);
  const [foundAddresses, setFoundAddresses] = useState([]);
  const prov = OpenStreetMapProvider();


  const clearResult = () => {

  
     
  }

  useEffect(() => {
    const form = document.getElementById("form");
    const input = form.querySelector('input[type="text"]');

    input.addEventListener("keyup", async (event) => {
      event.preventDefault();
      //  setFoundAddresses((foundAddresses) => [foundAddresses, []]);
     
       for(let i= 0; i<foundAddresses.length; i++){
         foundAddresses[i] = []
       }
      
      console.log("foundAd bf: ", foundAddresses);

      const results = await prov.search({ query: input.value });
      console.log("results ", results); // » [{}, {}, {}, ...]
      //setFoundAddresses(results)

      results.forEach(r => {
        foundAddresses.push(r.label)
      });
      console.log("found addresses ", foundAddresses);
    });
  }, []);

  async function addAddress() {
    const anAddress = {
      // address,
      postCode,
      city,
      country,
      coordinates,
    };

    setShowMap(true);
  }

  return (
    <div>
      <Form id="form" autoComplete="off">
        <FormGroup className="col-sm-10 col-md-6 col-lg-4">
          <Col>
            <Input
              type="text"
              placeholder="Please enter address"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {foundAddresses[1] ? (
              <Input
                type="select"
                name="selectMulti"
                id="exampleSelectMulti"
                multiple
              >
                {foundAddresses
                  .filter((a) => a.includes(search))
                  .map(
                    (filteredAddress) => (
                      (<option>{filteredAddress}</option>),
                      console.log("f ", filteredAddress)
                    )
                  )}
              </Input>
            ) : (
              ""
            )}
          </Col>
        </FormGroup>

        <FormGroup>
          <Button>Done</Button>
        </FormGroup>
      </Form>
      {/* { showMap ?   */}
      <LeafletMap city={city} country={country}></LeafletMap>
      {/* // :''} */}
    </div>
  );
};
export default NewAddress;
