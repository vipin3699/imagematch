import React, { useState } from "react";
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

  const [productsVersion, setProductsVersion] = useState([]);
  const [locales, setLocales] = useState([]);
  const [selectProductsVersion, setSelectProductsVersion] = useState("");
  const [selectLocales, setSelectLocales] = useState("");
  return (
    <Bullseye>
      <Card>
        <CardBody>
          <SimpleEmptyState />
          <Divider className="mb-4" />
          <Form>
            <FormGroup label="Select Version" fieldId="version">
              <FormSelect
                value={selectProductsVersion}
                onChange={(e, event) => (
                  props.handleVersionChange(e, event),
                  setSelectProductsVersion(e))}
                aria-label="Version"
                id="version"
                name="version"
              >

                <option>Select</option>
                {props.productsVersion.map((option, index) => (
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
                value={selectLocales}
                onChange={e => (props.handleLocaleChange(e),
                  setSelectLocales(e))}
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
    </Bullseye >
  );
}
