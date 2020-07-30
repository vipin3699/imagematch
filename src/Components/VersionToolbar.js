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
  const [products_version, setProductsVersion] = useState([]);
  const [locales, setlocales] = useState([]);
  const [selectProductsVersion, setselectProductsVersion] = useState("");
  const [selectLocales, setselectLocales] = useState("");
  const { register, handleSubmit } = useForm();
  const inputRef = useRef(null);

  // const [handleLocaleChange, sethandleLocaleChange] = useState("");
  // const [handleVersionChange, sethandleVersionChange] = useState("");

  function handlelocale(locale) {
    setselectLocales(locale);
    props.handleLocaleChange(locale)
    setselectLocales(locale)
    console.log(selectLocales)
  }

  function handleVerison(version) {
    setselectProductsVersion(version);
    props.handleVersionChange(version)
    setselectProductsVersion(version)
  }

  useEffect(() => {
    setProductsVersion(products_version.data);
    setlocales(locales.data);
    setselectProductsVersion(props.products_version.id);
    setselectLocales(props.locales.id);
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
                  onChange={(version) => handleVerison(version)}
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
                  onChange={(locale) => handlelocale(locale)}
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
