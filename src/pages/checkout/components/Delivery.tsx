import { useRef } from "react";

import Input from "../../../components/ui/Input/Input";
import { REGION_CODE, COUNTY_CODE } from "../../../utils/productConstant";
import classes from "../../../styles/pages/checkout/Delivery.module.css";
import Select from "../../../components/ui/Select/Select";

type TDeliveryProps = {
  errorMessages: Record<string, string>;
};

const Delivery = ({ errorMessages }: TDeliveryProps) => {
  const firstNameRef = useRef<HTMLInputElement | null>(null);
  // const [region, setRegion] = useState("");
  const regionOptions = [...new Set(REGION_CODE)].map((region) => ({
    value: region,
  }));

  const countryOptions = [...new Set(COUNTY_CODE)].map((country) => ({
    value: country,
  }));

  // const handleRegion = (value: string) => {
  //   setRegion(value);
  // };
  return (
    <div className={`container ${classes["delivery"]}`}>
      <h2>Delivery</h2>
      <div className={classes["input-fields"]}>
        <Select label="Country" options={countryOptions} />
        <Input
          inputRef={firstNameRef}
          placeholder="First name"
          type="text"
          errorMessage={errorMessages["first-name"]}
        />
        <Input
          placeholder="Last name"
          type="text"
          errorMessage={errorMessages["last-name"]}
        />
        <Input
          placeholder="Address"
          type="text"
          errorMessage={errorMessages["address"]}
        />
        <Input
          placeholder="Postal code"
          type="text"
          errorMessage={errorMessages["postal-code"]}
        />
        <Input
          placeholder="City"
          type="text"
          errorMessage={errorMessages["city"]}
        />
        <Select label="Region" options={regionOptions} />
        <Input
          placeholder="Phone"
          type="tel"
          errorMessage={errorMessages["phone"]}
        />
      </div>
    </div>
  );
};

export default Delivery;
