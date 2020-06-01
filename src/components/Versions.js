import React, { Component } from "react";
import axios from "axios";
import "@patternfly/react-core/dist/styles/base.css";
import { BASE_URL } from "./API/api";
import SimpleEmptyState from "./SimpleEmptyState";
import { withRouter } from "react-router-dom";
import AppPage from "./page";
import Screenshots from "./Screenshots";
import Breadcrumbs from "./Breadcrumbs";
import {
  Card,
  CardBody,
  Bullseye,
  Divider,
  Form,
  FormGroup,
  ActionGroup,
  Button,
  DataToolbar,
  DataToolbarItem,
  DataToolbarContent,
} from "@patternfly/react-core";
class Versions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product_versions: [],
      locales: [],
      selectVersions: "",
      selectLocales: "",
      isclicked: false,
      isVersionSelected: false,
      isLocaleSelected: false,
      previousProductID: this.props.match.params.productid,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.paymentForm = null; //this
    this.handleDropdownChangeVersion = this.handleDropdownChangeVersion.bind(
      this
    );
    this.handleDropdownChangeLocale = this.handleDropdownChangeLocale.bind(
      this
    );
  }
  handleSubmit() {
    console.log("Version:" + this.state.selectVersions);
    console.log("Locales:" + this.state.selectLocales);
    this.setState({ isclicked: true });
    this.setState({ isclicked: true });
    this.paymentForm = (
      <Screenshots
        product_version_id={this.state.selectVersions}
        locale_id={this.state.selectLocales}
      />
    );
  }

  handleDropdownChangeVersion(e) {
    this.setState({ selectVersions: e.target.value, isVersionSelected: true });
  }
  handleDropdownChangeLocale(e) {
    this.setState({ selectLocales: e.target.value, isLocaleSelected: true });
  }

  componentDidMount() {
    axios
      .all([
        axios.get(
          `${BASE_URL}/products/${this.state.previousProductID}/product_versions`
        ),
        axios.get(`${BASE_URL}/locales`),
      ])
      .then(([product_versions, locales]) =>
        this.setState({
          product_versions: product_versions.data,
          locales: locales.data,
        })
      )
      .catch((error) => console.log(error));
  }

  render() {
    return (
      <AppPage>
        <Breadcrumbs />
        {this.state.isclicked ? (
          <form onSubmit={this.handleSubmit}>
            <div>
              <DataToolbar
                variant="label"
                id="data-toolbar-group-types"
                className="pf-c-data-toolbar"
              >
                <DataToolbarContent>
                  <DataToolbarItem variant="label" id="version">
                    Select a Version
                  </DataToolbarItem>
                  <DataToolbarItem>
                    <select
                      className="pf-c-form-control"
                      id="version"
                      name="version"
                      onChange={
                        (this.handleChange, this.handleDropdownChangeVersion)
                      }
                      aria-labelledby="version"
                      value={this.state.selectVersions}
                    >
                      <option></option>
                      {this.state.product_versions.map(function (data, key) {
                        return (
                          <option key={data.name} value={data.id}>
                            {data.name}
                          </option>
                        );
                      })}
                    </select>
                  </DataToolbarItem>
                  <DataToolbarItem variant="label" id="locale">
                    Select a Locale
                  </DataToolbarItem>
                  <DataToolbarItem>
                    <select
                      className="pf-c-form-control"
                      id="locale"
                      name="locale"
                      onChange={
                        (this.handleChange, this.handleDropdownChangeLocale)
                      }
                      aria-labelledby="locale"
                      value={this.state.selectLocales}
                    >
                      <option></option>
                      {this.state.locales.map(function (data, key) {
                        return (
                          <option key={data.language} value={data.id}>
                            {data.language}
                          </option>
                        );
                      })}
                    </select>
                  </DataToolbarItem>
                  <DataToolbarItem>
                    <Button type="submit" variant="primary">
                      Submit
                    </Button>
                  </DataToolbarItem>
                </DataToolbarContent>
              </DataToolbar>

              <div className="form-container">
                {this.state.isclicked ? this.paymentForm : <SimpleEmptyState />}
              </div>
            </div>
          </form>
        ) : (
          <Bullseye>
            <Card>
              <CardBody>
                <SimpleEmptyState />
                <Divider />
                <span> &nbsp; </span>
                <form onSubmit={this.handleSubmit}>
                  <Form>
                    <FormGroup label="Select Version" fieldId="version">
                      <select
                        className="pf-c-form-control"
                        id="version"
                        name="version"
                        onChange={
                          (this.handleChange, this.handleDropdownChangeVersion)
                        }
                        aria-labelledby="version"
                      >
                        <option>Select</option>
                        {this.state.product_versions.map(function (data, key) {
                          return (
                            <option key={data.name} value={data.id}>
                              {data.name}
                            </option>
                          );
                        })}
                      </select>
                    </FormGroup>
                    <FormGroup label="Select Locale" fieldId="locale">
                      <select
                        className="pf-c-form-control"
                        id="locale"
                        name="locale"
                        onChange={
                          (this.handleChange, this.handleDropdownChangeLocale)
                        }
                        aria-labelledby="locale"
                      >
                        <option>Select</option>
                        {this.state.locales.map(function (data, key) {
                          return (
                            <option key={data.language} value={data.id}>
                              {data.language}
                            </option>
                          );
                        })}
                      </select>
                    </FormGroup>
                    <ActionGroup>
                      <Button variant="primary" type="submit">
                        Submit
                      </Button>
                    </ActionGroup>
                  </Form>
                </form>
              </CardBody>
            </Card>
          </Bullseye>
        )}
      </AppPage>
    );
  }
}
export default withRouter(Versions);
