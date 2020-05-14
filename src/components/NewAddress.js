import React, { useState } from "react";
import mongoosy from "mongoosy/frontend";
import { Form, FormGroup, Input, Col, Button } from "reactstrap";
import MapBox from "./MapBox";

const NewAddress = () => {
  const { Address } = mongoosy;
  const [address, setAddress] = useState("");
  const [postCode, setPostCode] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [coordinates, setCoordinates] = useState([""]);

  async function addAddress() {
    let anAddress = new Address({
      address,
      postCode,
      city,
      country,
      coordinates,
    });

    await anAddress.save();

    let allAddresses = await Address.find();
    console.log("allAddresses", allAddresses.js);
  }

  return (
    <div>
      <Form autoComplete="off">
        <FormGroup className="col-sm-10 col-md-6 col-lg-4">
          <Col>
            <Input
              placeholder="Street name and number"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </Col>
        </FormGroup>
        <FormGroup className="col-sm-10 col-md-6 col-lg-4">
          <Col>
            <Input
              placeholder="Post code"
              value={postCode}
              onChange={(e) => setPostCode(e.target.value)}
            />
          </Col>
        </FormGroup>
        <FormGroup className="col-sm-10 col-md-6 col-lg-4">
          <Col>
            <Input
              placeholder="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </Col>
        </FormGroup>
        <FormGroup className="col-sm-10 col-md-6 col-lg-4">
          <Col>
            <Input
              placeholder="Country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
          </Col>
        </FormGroup>
        <FormGroup>
          <Button onClick={addAddress}>Done</Button>
        </FormGroup>
      </Form>
      <MapBox />
    </div>
  );
};
export default NewAddress;
