import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import products from "./Products";
// import versions from "./Versions";
import {
  Button,
  Card,
  CardHeader,
  CardFooter,
  Gallery
} from "@patternfly/react-core";
class Locales extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locales: [],
      previousVersionID: "",
      previousProductID: ""
    };
  }
  componentDidMount() {
    this.state.previousProductID = this.props.match.params.productid;
    this.state.previousVersionID = this.props.match.params.versionid;
    // debugger;
    axios
      .get(
        `http://localhost:3001/api/v1/products/${this.state.previousProductID}/product_versions/${this.state.previousVersionID}/locales`
      )
      .then(locales => {
        this.setState({ locales: locales.data });
      })
      .catch(error => console.log(error));
  }

  render() {
    return (
      <Gallery gutter="lg">
        <Link to={`/products/${this.state.previousProductID}/product_versions`}>
          Back to Version
        </Link>
        {this.state.locales.map(locales => {
          return (
            <Link
              to={`/products/${this.state.previousProductID}/prodcut_versions/${this.state.previousVersionID}/locales/${locales.id}/screenshots`}
            >
              {locales.name}
            </Link>
          );
        })}
      </Gallery>
    );
  }
}

export default Locales;
