import React, { useState, useCallback, Component } from "react";
import {
  Bullseye,
  Card,
  CardBody,
  Divider,
  Form,
  FormGroup,
  ActionGroup,
  Button,
  FormSelect,
  FormSelectOption,
} from "@patternfly/react-core";
import SimpleEmptyState from "./SimpleEmptyState";

class EmptyStateForm extends Component {
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
      selectLocales: this.props.productLocales[0].id,
      selectVersions: this.props.productVersions[0].id,
    });
  }

  render() {
    return (
      <Bullseye>
        <Card>
          <CardBody>
            <SimpleEmptyState />
            <Divider className="mb-4" />
            <Form onSubmit={(e) => this.props.handleFormSubmit(e)}>
              <FormGroup label="Select Version" fieldId="version">
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
              <FormGroup label="Select Locale" fieldId="locale">
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
}

export default EmptyStateForm;
