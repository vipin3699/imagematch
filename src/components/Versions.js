import React, { Component } from "react";
import axios from "axios";
import "@patternfly/react-core/dist/styles/base.css";
import PropTypes from "prop-types";
import { BASE_URL } from "./API/api";
import {
  Button,
  DataToolbarContent,
  DataToolbarItem,
  DataToolbar,
} from "@patternfly/react-core";
import AppPage from "./page";
class Versions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product_versions: [],
      locales: [],
      previousProductID: "",
      selectVersions: "",
      selectLocales: "",
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
    this.setState({ selectVersions: e.target.value });
  }
  handleDropdownChangeLocale(e) {
    this.setState({ selectLocales: e.target.value });
  }

  static contextTypes = {
    router: PropTypes.object,
  };

  onSubmit = (e) => {
    this.props.history.push({
      pathname: "/screenshots",
      state: {
        product_version_id: this.state.selectVersions,
        locale_id: this.state.selectLocales,
      },
    });
  };

  componentDidMount() {
    this.state.previousProductID = this.props.match.params.productid;
    axios
      .all([
        axios.get(
          `${BASE_URL}/products/${this.state.previousProductID}/product_versions`
        ),
        axios.get("http://localhost:3001/api/v1/locales"),
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
        <DataToolbar variant="label" id="data-toolbar-group-types">
          <DataToolbarContent>
            <DataToolbarItem variant="label" id="version">
              Select a Version
            </DataToolbarItem>
            <DataToolbarItem>
              <select
                class="pf-c-form-control"
                id="version"
                name="version"
                onChange={(this.handleChange, this.handleDropdownChangeVersion)}
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
            </DataToolbarItem>
            <DataToolbarItem variant="label" id="locale">
              Select a Locale
            </DataToolbarItem>
            <DataToolbarItem>
              <select
                class="pf-c-form-control"
                id="locale"
                name="locale"
                onChange={(this.handleChange, this.handleDropdownChangeLocale)}
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
            </DataToolbarItem>
            <DataToolbarItem>
              <Button variant="primary" onClick={this.onSubmit}>
                Submit
              </Button>
            </DataToolbarItem>
          </DataToolbarContent>
        </DataToolbar>
      </AppPage>
    );
  }
}
export default Versions;
