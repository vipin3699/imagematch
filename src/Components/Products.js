import React, { useState, useEffect } from "react";
import axios from "axios";
import AppPage from "../PageHeader/page";
import { Link } from "react-router-dom";
import BASE_URL from "../API/BASE_URL";
import {
  CardBody,
  Card,
  Text,
  TextContent,
  TextVariants,
  CardFooter,
  CardHeader,
  Grid,
  PageSection,
} from "@patternfly/react-core";

export default function Products() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchProductsData = async () => {
      const ProductsData = await axios(`${BASE_URL}/products`);
      setProducts(ProductsData.data);
    };
    fetchProductsData();
  }, []);

  return (
    <AppPage>
      <PageSection>
        <Grid hasGutter="lg" sm={6} md={3}>
          {products.map((product) => {
            return (
              <Card className="product-card" key={product.id} isHoverable>
                <CardHeader></CardHeader>
                <CardBody>
                  <Link to={`/products/${product.id}/screenshots`}>
                    <TextContent>
                      <Text
                        className="product-title"
                        component={TextVariants.h4}
                      >
                        {product.name}
                      </Text>
                    </TextContent>
                  </Link>
                </CardBody>
                <CardFooter></CardFooter>
              </Card>
            );
          })}
        </Grid>
      </PageSection>
    </AppPage>
  );
}
