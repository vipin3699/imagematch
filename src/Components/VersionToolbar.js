import React from "react";
import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import {
  DataToolbar,
  DataToolbarContent,
  DataToolbarItem,
  Button,
  Form,
  FormSelect,
  FormSelectOption,
  FormGroup
}
  from "@patternfly/react-core";
export default function VersionToolbar(props) {
  // const [products_version, setProductsVersion] = useState([]);
  // const [locales, setlocales] = useState([]);
  // const [selectProductsVersion, setselectProductsVersion] = useState("");
  // const [selectLocales, setselectLocales] = useState("");
  const { register, handleSubmit } = useForm();
  const inputRef = useRef(null);
  const [product_locale_data, setproduct_locale_data] = useState({
    products_version: [],
    locales: [],
    selectProductsVersion: '',
    selectLocales: ''
  })
  const { locales, products_version, selectProductsVersion, selectLocales } = product_locale_data;


  // const [handleLocaleChange, sethandleLocaleChange] = useState("");
  // const [handleVersionChange, sethandleVersionChange] = useState("");

  function handlelocale(e) {
    // setselectLocales(locale);
    setproduct_locale_data({
      selectLocales: e
    });
    props.handleLocaleChange(e)
    // setselectLocales(locale)
    console.log(selectLocales)
  }

  function handleVerison(e) {
    // setselectProductsVersion(version);
    setproduct_locale_data({
      selectProductsVersion: e
    })
    props.handleVersionChange(e)
  }

  React.useEffect(() => {
    // setProductsVersion(products_version.data);
    // setlocales(locales.data);
    // setselectProductsVersion(props.products_version.id);
    // setselectLocales(props.locales.id);
    setproduct_locale_data({
      products_version: props.products_version,
      locales: props.locales,
      selectProductsVersion: props.products_version.id,
      selectLocales: props.locales.id
    })
  }, []);

  return (
    <DataToolbar
      variant="label"
      id="data-toolbar-group-types"
      className="pf-c-data-toolbar"
    >
      <Form onSubmit={() => props.handleSubmit(selectProductsVersion, selectLocales)}>
        <FormGroup role="form" ref={register}>
          <DataToolbarContent>
            <DataToolbarItem variant="label" id="version">
              Select a Version
              </DataToolbarItem>
            <DataToolbarItem>
              <FormGroup>
                <FormSelect
                  value={selectProductsVersion}
                  onChange={(e) => handleVerison(e)}
                  aria-label="Version"
                  id="version"
                  name="version"
                  ref={inputRef}
                >
                  {props.products_version.map((option, index) => (
                    <FormSelectOption
                      key={index}
                      value={option.id}
                      label={option.name}
                      ref={inputRef}
                    />))}
                </FormSelect>
              </FormGroup>
            </DataToolbarItem>
            <DataToolbarItem variant="label" id="locale">
              Select a Locale
              </DataToolbarItem>
            <DataToolbarItem>
              <FormGroup ref={register}>
                <FormSelect
                  value={selectLocales}
                  onChange={(e) => handlelocale(e)}
                  aria-label="Locale"
                  id="locale"
                  name="locale"
                  ref={inputRef}
                >
                  {props.locales.map((option, index) => (
                    <FormSelectOption
                      key={index}
                      value={option.id}
                      label={option.name}
                      ref={inputRef}
                    />))}
                </FormSelect>
              </FormGroup>
            </DataToolbarItem>
            <DataToolbarItem>
              <Button variant="primary" type="submit" value="submit">
                Submit
                </Button>
            </DataToolbarItem>
          </DataToolbarContent>
        </FormGroup>
      </Form>
    </DataToolbar>

  )
}
