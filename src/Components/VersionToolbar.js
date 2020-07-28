import React from "react";
import { useState, useEffect } from "react";
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
  const [products_version, setProductsVersion] = useState([]);
  const [locales, setlocales] = useState([]);
  const [selectProductsVersion, setselectProductsVersion] = useState("");
  const [selectLocale, setselectLocale] = useState("");
  const [handleLocaleChange, sethandleLocaleChange] = useState("");
  const [handleVersionChange, sethandleVersionChange] = useState("");

  function handlelocale(locale) {
    setselectLocale(locale);
    sethandleLocaleChange(locale)
    setselectLocale(locale)
  }

  function handleVerison(version) {
    setselectProductsVersion(version);
    sethandleVersionChange(version)
    setselectProductsVersion(version)
  }

  useEffect(() => {
    setProductsVersion(products_version.data);
    setlocales(locales.data);
    setselectProductsVersion(props.products_version.id);
    setselectLocale(props.locales.id);
  }, []);

  return (
    <DataToolbar
      variant="label"
      id="data-toolbar-group-types"
      className="pf-c-data-toolbar"
    >
      <Form onSubmit={() => props.handleFormSubmit(selectProductsVersion, selectLocale)}>
        <FormGroup role="form">
          <DataToolbarContent>
            <DataToolbarItem variant="label" id="version">
              Select a Version
              </DataToolbarItem>
            <DataToolbarItem>
              <FormGroup>
                <FormSelect
                  value={selectProductsVersion}
                  onChange={handleVerison}
                  aria-label="Version"
                  id="version"
                  name="version"
                >
                  {props.products_version.map((option, index) => (
                    <FormSelectOption
                      key={index}
                      value={option.id}
                      label={option.name}
                    />))}
                </FormSelect>
              </FormGroup>
            </DataToolbarItem>
            <DataToolbarItem variant="label" id="locale">
              Select a Locale
              </DataToolbarItem>
            <DataToolbarItem>
              <FormGroup>
                <FormSelect
                  value={selectLocale}
                  onChange={handlelocale}
                  aria-label="Locale"
                  id="locale"
                  name="locale"
                >
                  {props.locales.map((option, index) => (
                    <FormSelectOption
                      key={index}
                      value={option.id}
                      label={option.name}
                    />))}
                </FormSelect>
              </FormGroup>
            </DataToolbarItem>
            <DataToolbarItem>
              <Button variant="primary" type="submit">
                Submit
                </Button>
            </DataToolbarItem>
          </DataToolbarContent>
        </FormGroup>
      </Form>
    </DataToolbar>

  )
}
