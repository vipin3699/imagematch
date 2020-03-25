import React, { Component } from "react";
import axios from "axios";
import "@patternfly/react-core/dist/styles/base.css";
class Versions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product_versions: [],
      locales: [],
      previousProductID: "",
      selectVersions: "",
      selectLocales: ""
    };
    this.handleDropdownChangeVersion = this.handleDropdownChangeVersion.bind(
      this
    );
    this.handleDropdownChangeLocale = this.handleDropdownChangeLocale.bind(
      this
    );
    this.handleSubmit = this.onSubmit.bind(this);
  }
  handleDropdownChangeVersion(e) {
    this.setState({ selectVersions: e.target.value });
  }
  handleDropdownChangeLocale(e) {
    this.setState({ selectLocales: e.target.value });
  }

  onSubmit = e => {
    this.props.history.push({
      pathname: "/screenshots",
      state: {
        product_version_id: this.state.selectVersions,
        locale_id: this.state.selectLocales
      }
    });
  };

  componentDidMount() {
    this.state.previousProductID = this.props.match.params.productid;
    axios
      .all([
        axios.get(
          `http://localhost:3001/api/v1/products/${this.state.previousProductID}/product_versions`
        ),
        axios.get("http://localhost:3001/api/v1/locales")
      ])
      .then(([product_versions, locales]) =>
        this.setState({
          product_versions: product_versions.data,
          locales: locales.data
        })
      )
      .catch(error => console.log(error));
  }

  render() {
    let product_versions = this.state.product_versions;
    let optionItems = product_versions.map(product_versions => (
      <option key={product_versions.id}>{product_versions.id}</option>
    ));

    let locales = this.state.locales;
    let optionItems1 = locales.map(locales => (
      <option key={locales.id}>{locales.id}</option>
    ));

    return (
      <div>
        <div align="left">
          Select a Version
          <select onChange={this.handleDropdownChangeVersion}>
            {optionItems}
          </select>
        </div>
        <div align="right ">
          Selected value is : {this.state.selectVersions}
        </div>

        <div align="left">
          Select a Locale
          <select onChange={this.handleDropdownChangeLocale}>
            {optionItems1}
          </select>
        </div>
        <div align="right ">Selected value is : {this.state.selectLocales}</div>
        <button onClick={this.onSubmit}>Send</button>
      </div>
    );
  }
}
export default Versions;
