import React from "react";
import { AddressAutofill } from "@mapbox/search-js-react";

const accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN as string;

export const Autofill = () => {
  return (
    <form className="">
      <div className="my-2">
        <AddressAutofill accessToken={accessToken}>
          <input
            name="address"
            placeholder="Address"
            type="text"
            autoComplete="address-line1"
          />
        </AddressAutofill>
      </div>
      <div className="my-2">
        <input
          name="apartment"
          placeholder="Apartment number"
          type="text"
          autoComplete="address-line2"
        />
      </div>
      <div className="my-2">
        <input
          name="city"
          placeholder="City"
          type="text"
          autoComplete="address-level2"
        />
      </div>
      <div className="my-2">
        <input
          name="state"
          placeholder="State"
          type="text"
          autoComplete="address-level1"
        />
      </div>
      <div className="my-2">
        <input
          name="country"
          placeholder="Country"
          type="text"
          autoComplete="country-name"
        />
      </div>
      <div className="my-2">
        <input
          name="postcode"
          placeholder="Postcode"
          type="text"
          autoComplete="postal-code"
        />
      </div>
    </form>
  );
};
