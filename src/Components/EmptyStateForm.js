import React, { useState, useEffect } from "react";
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

  function handlelocale(locale) {
    setselectLocale(locale);
    props.handleLocaleChange(locale);
  }
  const handleVerison = (version) => {
    setselectProductsVersion(version);
    props.handleVersionChange(version);
  };
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
          <Form onSubmit={(e) => props.handleFormSubmit(e)}>
            <FormGroup label="Select Version" fieldId="version">
              <FormSelect
                value={selectProductsVersion}
                onChange={(version) => handleVerison(version)}
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
                value={selectLocale}
                onChange={(locale) => handlelocale(locale)}
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
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </ActionGroup>
          </Form>
        </CardBody>
      </Card>
    </Bullseye>
  );
}
