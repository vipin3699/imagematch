import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import SimpleEmptyState from "./SimpleEmptyState";
import {
  Card,
  CardBody,
  Form,
  FormGroup,
  FormSelect,
  FormSelectOption,
  ActionGroup,
  Button,
  Bullseye,
  Divider,
} from "@patternfly/react-core";
export default function EmptyStateFrom(props) {
  // const [handleLocaleChange, sethandleLocaleChange] = useState("");
  // const [handleVersionChange, sethandleVersionChange] = useState("");
  const { register, handleSubmit } = useForm();
  const inputRef = useRef(null);
  const [product_locale_data, setproduct_locale_data] = useState({
    products_version: [],
    locales: [],
    selectProductsVersion: '',
    selectLocales: ''
  })
  const { locales, products_version, selectProductsVersion, selectLocales } = product_locale_data;

  // const [products_version, setProductsVersion] = useState([]);
  // const [locales, setlocales] = useState([]);
  // const [selectProductsVersion, setselectProductsVersion] = useState("");
  // const [selectLocales, setselectLocales] = useState("");
  function handlelocale(e) {
    setproduct_locale_data({
      selectLocales: e
    });
    // setselectLocales(e)
    props.handleLocaleChange(e)
  }
  console.log(selectLocales);


  function handleVersion(e) {
    setproduct_locale_data({
      selectProductsVersion: e
    })
    // setselectProductsVersion(e)
    props.handleVersionChange(e)
  };
  console.log(selectProductsVersion);

  React.useEffect(() => {
    setproduct_locale_data({
      products_version: props.products_version,
      locales: props.locales,
      selectProductsVersion: props.products_version.id,
      selectLocales: props.locales.id
    })
    // setProductsVersion(products_version.data);
    // setlocales(locales.data);
    // setselectProductsVersion(props.products_version.id);
    // setselectLocales(props.locales.id);



  }
    , []);

  return (
    <Bullseye>
      <Card>
        <CardBody>
          <SimpleEmptyState />
          <Divider className="mb-4" />
          <Form>
            <FormGroup label="Select Version" fieldId="version" ref={register}>
              <FormSelect
                value={selectProductsVersion}
                // onChange={handleVerison}
                onChange={(e) => handleVersion(e)}
                aria-label="Version"
                id="version"
                name="version"
                ref={inputRef}
              >
                <option>Select</option>
                {props.products_version.map((option, index) => (
                  <FormSelectOption
                    ref={inputRef}
                    key={index}
                    value={option.id}
                    label={option.name}
                  ></FormSelectOption>
                ))}
              </FormSelect>
            </FormGroup>
            <FormGroup label="Select Locale" fieldId="locale" ref={register}
            >
              <FormSelect
                value={selectLocales}
                // onChange={handlelocale}
                onChange={(e) => handlelocale(e)}
                aria-label="Locale"
                id="locale"
                name="locale"
              >
                <option>Select</option>
                {props.locales.map((option, index) => (
                  <FormSelectOption
                    key={index}
                    value={option.id}
                    label={option.language}
                  ></FormSelectOption>
                ))}
              </FormSelect>
            </FormGroup>
            <ActionGroup>
              <Button type="button" onClick={() => props.handleSubmit(selectProductsVersion, selectLocales)}>Submit</Button>
            </ActionGroup>
          </Form>
        </CardBody>
      </Card>
    </Bullseye>
  );
}
