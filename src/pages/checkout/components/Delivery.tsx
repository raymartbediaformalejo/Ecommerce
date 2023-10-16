import Input from "../../../components/ui/Input/Input";
import { REGION_CODE, COUNTY_CODE } from "../../../utils/productConstant";
import classes from "../../../styles/pages/checkout/Delivery.module.css";
import { useState } from "react";
import Select from "../../../components/ui/Select/Select";

const Delivery = () => {
  const [region, setRegion] = useState("");
  const regionOptions = [...new Set(REGION_CODE)].map((region) => ({
    value: region,
  }));

  const countryOptions = [...new Set(COUNTY_CODE)].map((country) => ({
    value: country,
  }));

  const handleRegion = (value: string) => {
    setRegion(value);
  };
  return (
    <div className={`container ${classes["delivery"]}`}>
      <h2>Delivery</h2>
      <div className={classes["input-fields"]}>
        <Select label="Country" options={countryOptions} />
        <Input placeholder="Country/Region" />
        <Input placeholder="First name" />
        <Input placeholder="Last name" />
        <Input placeholder="Address" />
        <Input placeholder="Postal code" />
        <Input placeholder="City" />
        <Input placeholder="Region" />
        <Input placeholder="Phone" />
        <Select label="Region" options={regionOptions} />
      </div>
    </div>
  );
};

export default Delivery;
