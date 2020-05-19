import React from "react";
import { Breadcrumb, BreadcrumbItem } from "@patternfly/react-core";

const Breadcrumbs = () => (
  <Breadcrumb>
    <BreadcrumbItem to="/products">Products</BreadcrumbItem>
    <BreadcrumbItem to="/products/:productid/screenshots" isActive>
      Versions
    </BreadcrumbItem>
  </Breadcrumb>
);
export default Breadcrumbs;
