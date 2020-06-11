import React, { useState, useEffect, useContext} from "react";
import mongoosy from "mongoosy/frontend";
import { Form, FormGroup, Input, Col } from "reactstrap";
import NewAddress from "./NewAddress";
import {GlobalContext} from "../contexts/GlobalContextProvider"
import { OpenStreetMapProvider } from "react-leaflet-geosearch";

const SearchAddress = (props) => {
  const [addAddress, setAddAddress] = useState(false);
  const [foundAddresses, setFoundAddresses] = useState([]);
  const { addUnformattedAddress, unformattedAddress, appendAddress } = useContext(GlobalContext);
  const prov = OpenStreetMapProvider();

  let throttleSearch;
  // useEffect(() => {
  //   setShowMap(true);
  // }, [setMapAddress]);
  const saveAddress = async (mapAddress) => {
    console.log(mapAddress)
    // setMapAddress(mapAddress)
    appendAddress(mapAddress)
     addUnformattedAddress(mapAddress)
    //show map = true, <NewAddress address={mapAddress}
    //dela upp address i delar, return <LeafletMap> & address info
        // setAddAddress(true)
  }
  useEffect(() => {
     console.log(unformattedAddress);

  },[unformattedAddress])

  const doSearch = async (input) => {
    //  useEffect( async () => {
    //const form = document.getElementById("form");
    // const input = form.querySelector('input[type="text"]');

    //input.addEventListener("keyup", async (event) => {
    // event.preventDefault();
    setFoundAddresses([]);

    const results = await prov.search({ query: input });

    console.log("results ", results); // » [{}, {}, {}, ...]

    setFoundAddresses(results);

    //  }, [search]);
  };
    useEffect(() => {
      console.log("found addresses ", foundAddresses);
    }, [foundAddresses]);

  const setSearchValue = async (searchVal) => {
    clearTimeout(throttleSearch);
    throttleSearch = setTimeout(() => {
      doSearch(searchVal);
    }, 1000);
  };

  return (
    <div>
      {unformattedAddress ? (
        <NewAddress address={unformattedAddress} />
      ) : (
        // <LeafletMap mapAddress={mapAddress} />
        ""
      )}
      <Form id="form" autoComplete="off">
        <FormGroup className="col-sm-10 col-md-6 col-lg-4">
          <Col>
            <Input
              style={{ width: "40vw" }}
              type="text"
              placeholder="Please enter address"
              onChange={(e) => setSearchValue(e.target.value)}
            />
            {foundAddresses[0] ? (
              <Input
                style={{ width: "40vw" }}
                type="select"
                name="selectMulti"
                id="exampleSelectMulti"
                multiple
              >
                {foundAddresses.map((f) => (
                  <option key={f.raw.place_id} onClick={() => saveAddress(f)}>
                    {f.label}
                  </option>
                  // console.log("f ", f)
                ))}
              </Input>
            ) : (
              ""
            )}
          </Col>
        </FormGroup>
      </Form>
    </div>
  );
};
export default SearchAddress
;
