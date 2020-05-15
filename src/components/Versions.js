import React, { Component } from "react";
import axios from "axios";
import "@patternfly/react-core/dist/styles/base.css";
import { BASE_URL } from "./API/api";
import SimpleEmptyState from "./SimpleEmptyState";
import { withRouter } from "react-router-dom";
import {
  Card,
  CardBody,
  Bullseye,
  Divider,
  Form,
  FormGroup,
  ActionGroup,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  DataToolbar,
  DataToolbarItem,
  DataToolbarContent,
  CardHeader,
} from "@patternfly/react-core";
import AppPage from "./page";
import Screenshots from "./Screenshots";
class Versions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product_versions: [],
      locales: [],
      previousProductID: "",
      selectVersions: "",
      selectLocales: "",
      isclicked: false,
      isVersionSelected: false,
      isLocaleSelected: false,
    };

    this.handleDropdownChangeVersion = this.handleDropdownChangeVersion.bind(
      this
    );
    this.handleDropdownChangeLocale = this.handleDropdownChangeLocale.bind(
      this
    );
  }
  handleChange = (e) => {
    var value = this.state.locales.filter(function (item) {
      return item.key === e.target.value;
    });
    console.log(e.target.value);
  };
  handleDropdownChangeVersion(e) {
    this.setState({ selectVersions: e.target.value, isVersionSelected: true });
  }
  handleDropdownChangeLocale(e) {
    this.setState({ selectLocales: e.target.value, isLocaleSelected: true });
  }
  componentDidMount() {
    this.state.previousProductID = this.props.match.params.productid;
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
        {this.state.isclicked ? (
          <div>
            <DataToolbar
              variant="label"
              id="data-toolbar-group-types"
              class="pf-c-data-toolbar"
            >
              <DataToolbarContent>
                <DataToolbarItem variant="label" id="version">
                  Select a Version
                </DataToolbarItem>
                <DataToolbarItem>
                  <select
                    class="pf-c-form-control"
                    id="version"
                    name="version"
                    onChange={
                      (this.handleChange, this.handleDropdownChangeVersion)
                    }
                    ariaLabelledBy="version"
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
                    class="pf-c-form-control"
                    id="locale"
                    name="locale"
                    onChange={
                      (this.handleChange, this.handleDropdownChangeLocale)
                    }
                    ariaLabelledBy="locale"
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
                  <Button
                    variant="primary"
                    onClick={() => {
                      if (
                        this.state.isLocaleSelected === false &&
                        this.state.isVersionSelected === false
                      ) {
                        alert("Please select a Version and a Locale");
                      } else {
                        this.setState({ isclicked: true });
                      }
                    }}
                  >
                    Submit
                  </Button>
                </DataToolbarItem>
              </DataToolbarContent>
            </DataToolbar>
            <Screenshots
              product_version_id={this.state.selectVersions}
              locale_id={this.state.selectLocales}
            />
          </div>
        ) : (
          <Bullseye>
            <Card>
              <CardBody>
                <SimpleEmptyState />
                <Divider />
                <span> &nbsp; </span>
                <Form>
                  <FormGroup label="Select Version" fieldId="version">
                    <select
                      class="pf-c-form-control"
                      id="version"
                      name="version"
                      onChange={
                        (this.handleChange, this.handleDropdownChangeVersion)
                      }
                      ariaLabelledBy="version"
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
                      class="pf-c-form-control"
                      id="locale"
                      name="locale"
                      onChange={
                        (this.handleChange, this.handleDropdownChangeLocale)
                      }
                      ariaLabelledBy="locale"
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
                    <Button
                      variant="primary"
                      onClick={() => {
                        if (
                          this.state.isLocaleSelected === false &&
                          this.state.isVersionSelected === false
                        ) {
                          alert("Please select a Version and a Locale");
                        } else {
                          this.setState({ isclicked: true });
                        }
                      }}
                    >
                      Submit
                    </Button>
                  </ActionGroup>
                </Form>
              </CardBody>
            </Card>
          </Bullseye>
        )}
      </AppPage>
    );
  }
}
export default withRouter(Versions);
