import React, { useState, useEffect } from "react";
import {
  DataToolbar,
  DataToolbarContent,
  DataToolbarItem,
  Button,
  Form,
  FormSelect,
  FormSelectOption,
  FormGroup,
} from "@patternfly/react-core";
export default function VersionToolbar() {
  const [products_version, setProductsVersion] = useState([]);
  const [locales, setlocales] = useState([]);
  const [selectProductsVersion, setselectProductsVersion] = useState("");
  const [selectLocales, setselectLocales] = useState("");

  function handleProductsVersion() {}
  function handleLocales() {}
  useEffect(() => {});
}
