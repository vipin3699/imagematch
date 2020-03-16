import React from "react";
import { Checkbox } from "@patternfly/react-core";
import AppPage from "./page";
import styles from "./Checkbox.css";

const Checkboxall = () => (
  <React.Fragment>
    {/* <AppPage> */}
    <Checkbox label="Asnible 3.5.0" className="check-5" />
    <Checkbox label="Asnible 3.6.0" className="check-5" />
    <Checkbox label="RHEL 7.8" className="check-5" />
    <Checkbox label="RHEL 8.2.0" className="check-5" />

    <Checkbox label="Chinese" className="check-6" />
    <Checkbox label="French" className="check-6" />
    <Checkbox label="Japanese" className="check-6" />
    <Checkbox label="Korean" className="check-6" />
    <Checkbox label="Spanish" className="check-6" />
    <Checkbox label="Russian" className="check-6" />
    {/* </AppPage> */}
  </React.Fragment>
);

export default Checkboxall;
