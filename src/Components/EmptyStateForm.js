import React, { useState, useEffect, useCallback } from "react";
import { useForm , register} from "react-hook-form";
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

  function handlelocale(locale) {
    setselectLocale(locale);
  sethandleLocaleChange(locale)
  setselectLocale(locale)
  }

  const handleVerison = (version) => {
    setselectProductsVersion(version);
    sethandleVersionChange(version)
    setselectProductsVersion(version)
  };
  console.log(selectProductsVersion);
  console.log(selectLocale);

  useEffect(() => {
    setProductsVersion(products_version.data);
    setlocales(locales.data);
    setselectProductsVersion(props.products_version.id);
    setselectLocale(props.locales.id);
  }, []);
  return (
    <Bullseye>
      <Card>
        <CardBody>
          <SimpleEmptyState />
          <Form onSubmit={(Data) => props.handleSubmit(Data)}>
            <FormGroup label="Select Version" fieldId="version">
              <FormSelect
                // value={selectProductsVersion}
                ref={register}
                value={selectProductsVersion}
                onChange={version => handleVerison(version)}
                aria-label="Version"
                id="version"
                name="version"
              >
                {props.products_version.map((option, index) => (
                  <FormSelectOption
                    key={index}
                    value={option.id}
                    label={option.name}
                  ></FormSelectOption>
                ))}
              </FormSelect>
            </FormGroup>
            <FormGroup label="Select Locale" fieldId="locale">
              <FormSelect
                // value={selectLocale}
                ref={register}
                value={selectLocale}
                onChange={locale => handlelocale(locale)}
                aria-label="Locale"
                id="locale"
                name="locale"
              >
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
