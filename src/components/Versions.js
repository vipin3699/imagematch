import React, { Component, useRef } from "react";
import axios from "axios";
import "@patternfly/react-core/dist/styles/base.css";
import { Link, BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {
  Brand,
  Button,
  Card,
  CardActions,
  CardHead,
  CardHeader,
  CardBody,
  CardFooter,
  Gallery,
  GalleryItem,
  Text,
  TextContent,
  TextVariants
} from "@patternfly/react-core";

class Versions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      versions: [],
      previousProductID: ""
    };
  }
  componentDidMount() {
    this.state.previousProductID = this.props.match.params.productid;
    axios
      .get(
        `http://localhost:3001/api/v1/products/${this.state.previousProductID}/versions`
      )
      .then(versions => {
        this.setState({ versions: versions.data });
      })
      .catch(error => console.log(error));
  }

  render() {
    return (
      <Gallery gutter="lg">
        <Link to="/products">Back to Products</Link>

        {this.state.versions.map(versions => {
          return (
            <Link
              to={`/products/${this.state.previousProductID}/versions/${versions.id}/locales`}
            >
              {versions.name}
            </Link>
          );
        })}
      </Gallery>
    );
  }
}
export default Versions;
