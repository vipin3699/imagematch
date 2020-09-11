import React from "react";
import { useState } from "react";
import {
  DataToolbar,
  DataToolbarContent,
  DataToolbarItem,
  Button,
  Form,
  FormSelect,
  FormSelectOption,
  FormGroup,
  ActionGroup
} from "@patternfly/react-core";
export default function VersionToolbar(props) {
  const [productsVersion, setProductsVersion] = useState([]);
  const [locales, setLocales] = useState([]);
  const [selectProductsVersion, setSelectProductsVersion] = useState("");
  const [selectLocales, setSelectLocales] = useState("");
  return (
    <DataToolbar
      variant="label"
      id="data-toolbar-group-types"
      className="pf-c-data-toolbar"
    >
      {/* <Form onSubmit={() => props.handleSubmit(selectProductsVersion, selectLocales)}> */}
      <Form>
        <FormGroup role="form">
          <DataToolbarContent>
            <DataToolbarItem variant="label" id="version">
              Select a Version
              </DataToolbarItem>
            <DataToolbarItem>
              <FormGroup>
                <FormSelect
                  value={props.selectProductsVersion}
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
                  value={props.selectLocales}
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
                    />))}
                </FormSelect>
              </FormGroup>
            </DataToolbarItem>
            <DataToolbarItem>
              <ActionGroup>
                <Button type="button" onClick={() => props.handleSubmit(selectProductsVersion, selectLocales)}>Submit</Button>
              </ActionGroup>
            </DataToolbarItem>
          </DataToolbarContent>
        </FormGroup>
      </Form>
    </DataToolbar>

  )
}
