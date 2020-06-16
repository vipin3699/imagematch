import React, { Component } from "react";
import axios from "axios";
import "@patternfly/react-core/dist/styles/base.css";
import { BASE_URL } from "./API/api";
import { withRouter, Link } from "react-router-dom";
import AppPage from "./page";
import Screenshots from "./Screenshots";
import Breadcrumbs from "./Breadcrumbs";
import { PageSection, PageSectionVariants } from "@patternfly/react-core";
import EmptyStateForm from "./EmptyStateForm";
import VersionsToolbar from "./VersionsToolbar";
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
      screenshots: [],
      screenshots_en: [],
      itemCount: "",
      elements: [],
      elements_right: [],
      elements_left: [],
      offset: 0,
      currentPage: 0,
      page: 1,
      perPage: 10,
    };
  }

  handleDropdownChangeVersion(version) {
    this.setState({ selectVersions: version, isVersionSelected: true });
  }
  handleDropdownChangeLocale(locale) {
    this.setState({ selectLocales: locale, isLocaleSelected: true });
  }

  SetImages(offset, perPage) {
    if (this.state.screenshots_en.length !== 0) {
      let elements_left = this.state.screenshots_en[0].Images.slice(
        offset,
        offset + perPage
      );
      this.setState({ elements_left });
    }
    if (this.state.screenshots.length !== 0) {
      let elements_right = this.state.screenshots[0].Images.slice(
        offset,
        offset + perPage
      );
      this.setState({ elements_right });
    }
  }
  handleSubmit(e) {
    e.preventDefault();
    axios
      .all([
        axios.get(`${BASE_URL}/screenshots`, {
          params: {
            product_version_id: this.state.selectVersions,
            locale_id: this.state.selectLocales,
          },
        }),
        axios.get(`${BASE_URL}/screenshots`, {
          params: {
            product_version_id: this.state.selectVersions,
            locale_id: 3,
          },
        }),
      ])
      .then(([screenshots, screenshots_en]) => {
        if (!screenshots_en.data.length) {
          alert("The selected Version have no English Screenshots");
        } else {
          this.setState(
            {
              screenshots: screenshots.data,
              screenshots_en: screenshots_en.data,
              itemCount: Math.ceil(screenshots_en.data[0].Images.length),
            }

            // () => this.SetImages(this.state.offset, this.state.perPage)
          );
        }
      })

      .catch((error) => console.log(error));
  }

  componentDidMount() {
    axios
      .all([
        axios.get(
          `${BASE_URL}/products/${this.state.previousProductID}/product_versions`
        ),
        axios.get(`${BASE_URL}/locales`),
      ])
      .then(([product_versions, locales]) => {
        if (product_versions.data.length === 0) {
          alert(
            "No Versions available for selected Product. Please select other Product"
          );
          this.props.history.push("/products");
        } else {
          this.setState({
            product_versions: product_versions.data,
            locales: locales.data,
            selectVersions: product_versions.data[0].id,
            selectLocales: locales.data[0].id,
          });
        }
      })
      .catch((error) => console.log(error));
  }

  render() {
    return (
      <>
        <AppPage>
          <PageSection variant={PageSectionVariants.light}>
            <Breadcrumbs />

            {this.state.locales.length &&
              this.state.product_versions.length &&
              ((this.state.screenshots && this.state.screenshots.length > 0) ||
                (this.state.screenshots_en &&
                  this.state.screenshots_en.length > 0)) && (
                <VersionsToolbar
                  selectVersions={this.state.selectVersions}
                  selectLocales={this.state.selectLocales}
                  productVersions={this.state.product_versions}
                  productLocales={this.state.locales}
                  handleVersionChange={(version) =>
                    this.handleDropdownChangeVersion(version)
                  }
                  handleLocaleChange={(locale) =>
                    this.handleDropdownChangeLocale(locale)
                  }
                  handleFormSubmit={(e) => this.handleSubmit(e)}
                />
              )}
          </PageSection>

          <PageSection>
            {(this.state.screenshots && this.state.screenshots.length > 0) ||
            (this.state.screenshots_en &&
              this.state.screenshots_en.length > 0) ? (
              <div className="form-container">
                <Screenshots
                  screenshots={this.state.screenshots}
                  screenshots_en={this.state.screenshots_en}
                  itemCount={this.state.itemCount}
                  elements={this.state.elements}
                  elements_right={this.state.elements_right}
                  elements_left={this.state.elements_left}
                  offset={this.state.offset}
                  currentPage={this.state.currentPage}
                  page={this.state.page}
                  perPage={this.state.perPage}
                />
              </div>
            ) : (
              this.state.locales.length &&
              this.state.product_versions.length && (
                <EmptyStateForm
                  productVersions={this.state.product_versions}
                  productLocales={this.state.locales}
                  handleVersionChange={(version) =>
                    this.handleDropdownChangeVersion(version)
                  }
                  handleLocaleChange={(locale) =>
                    this.handleDropdownChangeLocale(locale)
                  }
                  handleFormSubmit={(e) => this.handleSubmit(e)}
                />
              )
            )}
          </PageSection>
        </AppPage>
      </>
    );
  }
}
export default withRouter(Versions);
