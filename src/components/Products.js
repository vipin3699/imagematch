import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { CardBody, Card } from "@patternfly/react-core";
class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:3001/api/v1/products")
      .then(products => {
        this.setState({ products: products.data });
      })
      .catch(error => console.log(error));
  }

  render() {
    return this.state.products.map(products => {
      return (
        <li>
          <Card>
            <CardBody>
              <Link to={`/products/${products.id}/versions`}>
                {products.name}
              </Link>
            </CardBody>
          </Card>
        </li>
      );
    });
  }
}
export default Products;
