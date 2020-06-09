import React, { Component } from "react";
import {
  DataToolbar,
  DataToolbarContent,
  DataToolbarItem,
  Button,
  Form,
  FormSelect,
  FormSelectOption,
  FormGroup,
} from "@patternfly/react-core";

class VersionsToolbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectLocales: "",
      selectVersions: "",
      productVersions: [],
      productLocales: [],
    };
  }

  handleLocale(locale) {
    this.setState({
      selectLocales: locale,
    });
    this.props.handleLocaleChange(locale);
  }
  handleVersion(version) {
    this.setState({
      selectVersions: version,
    });
    this.props.handleVersionChange(version);
  }
  componentDidMount() {
    this.setState({
      productLocales: this.props.productLocales,
      productVersions: this.props.productVersions,
      selectLocales: this.props.selectLocales,
      selectVersions: this.props.selectVersions,
    });
  }

  render() {
    return (
      <DataToolbar
        variant="label"
        id="data-toolbar-group-types"
        className="pf-c-data-toolbar"
      >
        <Form onSubmit={(e) => this.props.handleFormSubmit(e)}>
          <FormGroup role="form">
            <DataToolbarContent>
              <DataToolbarItem variant="label" id="version">
                Select a Version
              </DataToolbarItem>
              <DataToolbarItem>
                <FormGroup>
                  <FormSelect
                    value={this.state.selectVersions}
                    onChange={(version) => this.handleVersion(version)}
                    aria-label="Version"
                    id="version"
                    name="version"
                  >
                    {this.state.productVersions.map((option, index) => (
                      <FormSelectOption
                        key={index}
                        value={option.id}
                        label={option.name}
                      />
                    ))}
                  </FormSelect>
                </FormGroup>
              </DataToolbarItem>
              <DataToolbarItem variant="label" id="locale">
                Select a Locale
              </DataToolbarItem>
              <DataToolbarItem>
                <FormGroup>
                  <FormSelect
                    value={this.state.selectLocales}
                    onChange={(locale) => this.handleLocale(locale)}
                    aria-label="Locale"
                    id="locale"
                    name="locale"
                  >
                    {this.state.productLocales.map((option, index) => (
                      <FormSelectOption
                        key={index}
                        value={option.id}
                        label={option.language}
                      />
                    ))}
                  </FormSelect>
                </FormGroup>
              </DataToolbarItem>
              <DataToolbarItem>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </DataToolbarItem>
            </DataToolbarContent>
          </FormGroup>
        </Form>
      </DataToolbar>
    );
  }
}

export default VersionsToolbar;
