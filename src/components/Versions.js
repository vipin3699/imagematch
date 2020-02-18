import React, { Component } from "react";
import axios from "axios";
import "@patternfly/react-core/dist/styles/base.css";
import { Link } from "react-router-dom";
import { Gallery } from "@patternfly/react-core";

class Versions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      versions: []
    };
  }
  componentDidMount() {
    let { id } = this.props.match.params;
    axios
      .get(`http://localhost:3001/api/v1/products/${id}/versions`)
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
            <Link to={`/products/1/versions/${versions.id}/locales`}>
              {versions.name}
            </Link>
          );
        })}
      </Gallery>
    );
  }
}
export default Versions;
