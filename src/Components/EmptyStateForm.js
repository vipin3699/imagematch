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
} from "@patternfly/react-core";
export default function EmptyStateFrom(props) {
  const [products_version, setProductsVersion] = useState([]);
  const [locales, setlocales] = useState([]);
  const [selectProductsVersion, setselectProductsVersion] = useState("");
  const [selectLocale, setselectLocale] = useState("");
  const [handleLocaleChange, sethandleLocaleChange] = useState("");
  const [handleVersionChange, sethandleVersionChange] = useState("");
  const { register, handleSubmit } = useForm();
  const inputRef = useRef(null);

  function handlelocale(locale) {
    setselectLocale(locale);
    props.handleLocaleChange(locale)
    setselectLocale(locale)
  }
  console.log(selectLocale);


  function handleVerison(version) {
    setselectProductsVersion(version);
    props.handleVersionChange(version)
    setselectProductsVersion(version)
  };
  console.log(selectProductsVersion);

  useEffect(() => {
    setProductsVersion(products_version.data);
    setlocales(locales.data);
    setselectProductsVersion(props.products_version.id);
    setselectLocale(props.locales.id);
  }, []);
  // const onSubmit = props => {
  //   console.log(props);
  // }
  return (
    <Bullseye>
      <Card>
        <CardBody>
          <SimpleEmptyState />
          <Form onSubmit={() => props.handleSubmit(selectProductsVersion, selectLocale)}>
            <FormGroup label="Select Version" fieldId="version" ref={register}>
              <FormSelect
                value={selectProductsVersion}
                onChange={handleVerison}
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
                value={selectLocale}
                onChange={handlelocale}
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
              <Button type="submit" value="Submit" >
                Submit
              </Button>
            </ActionGroup>
          </Form>
        </CardBody>
      </Card>
    </Bullseye>
  );
}
