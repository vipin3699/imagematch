import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AppPage from "./page";
import { BASE_URL } from "./API/api";
import {
  CardBody,
  Card,
  Text,
  TextContent,
  TextVariants,
  CardFooter,
  CardHeader,
  Grid,
} from "@patternfly/react-core";
class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
    };
  }

  componentDidMount() {
    axios.get(`${BASE_URL}/products`).then((products) => {
      this.setState({
        products: products.data,
      });
    });
  }
  render() {
    return (
      <AppPage>
        <Grid gutter="lg" span="4">
          {this.state.products.map((products) => {
            return (
              <Card className="product-card" isHoverable>
                <CardHeader></CardHeader>
                <CardBody>
                  <Link to={`/products/${products.id}/product_versions`}>
                    <TextContent>
                      <Text
                        className="product-title"
                        component={TextVariants.h3}
                      >
                        {products.name}
                      </Text>
                    </TextContent>
                  </Link>
                </CardBody>
                <CardFooter></CardFooter>
              </Card>
            );
          })}
        </Grid>
      </AppPage>
    );
  }
}

export default Products;
