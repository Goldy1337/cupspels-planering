import React, { useState, useEffect } from "react";
import mongoosy from "mongoosy/frontend";
import { Form, FormGroup, Input, Col, Button } from "reactstrap";
import LeafletMap from "./LeafletMap";
import NewAddress from "./NewAddress";
import { OpenStreetMapProvider } from "react-leaflet-geosearch";

const SearchAddress = () => {
  const { Address } = mongoosy;
  const [showMap, setShowMap] = useState(false);
  const [foundAddresses, setFoundAddresses] = useState([]);
  const [mapAddress, setMapAddress] = useState("");
  const prov = OpenStreetMapProvider();

  let throttleSearch;
  // useEffect(() => {
  //   setShowMap(true);
  // }, [setMapAddress]);
  const saveAddress = async (address) => {
    console.log(address)
    setMapAddress(address)
    //show map = true, <NewAddress address={mapAddress}
    //dela upp address i delar, return <LeafletMap> & address info
        setShowMap(true)

  }

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

  //addAddress

  return (
    <div>
      {showMap ? (
        <NewAddress mapAddress={mapAddress}></NewAddress>
        // <LeafletMap mapAddress={mapAddress} />
      ) : (
        <Form id="form" autoComplete="off">
          <FormGroup className="col-sm-10 col-md-6 col-lg-4">
            <Col>
              <Input
                type="text"
                placeholder="Please enter address"
                onChange={(e) => setSearchValue(e.target.value)}
              />
              {foundAddresses ? (
                <Input
                  type="select"
                  name="selectMulti"
                  id="exampleSelectMulti"
                  multiple
                >
                  {foundAddresses.map((f) => (
                    <option
                      key={f.raw.place_id}
                      value={mapAddress}
                      onClick={() => saveAddress(f)}
                    >
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
          <FormGroup>
            <Button>Done</Button>
          </FormGroup>
        </Form>
      )}
    </div>
  );
};
export default SearchAddress
;
