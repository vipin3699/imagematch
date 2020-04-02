import React, { Component } from "react";
import axios from "axios";
import Versions from "./Versions";
import AppPage from "./page";

import {
  Brand,
  Button,
  Card,
  CardActions,
  CardHead,
  CardHeader,
  CardBody,
  CardFooter,
  Gallery
} from "@patternfly/react-core";
import { Split, SplitItem } from "@patternfly/react-core";

class Screenshots extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pass: 0,
      fail: 0,
      screenshots: [],
      disabled: false
    };
    this.setState({
      product_version_id: this.props.location.state.product_version_id
    });
    this.setState({ locale_id: this.props.location.state.locale_id });
  }

  // passcount() {
  //   this.setState({
  //     pass: this.state.pass + 1
  //   });
  // }

  // failcount() {
  //   this.setState({
  //     fail: this.state.fail + 1
  //   });
  // }
  componentDidMount() {
    // this.state.selectVersions = this.props.selectVersions;
    // this.state.selectLocales = this.props.selectLocales;
    // let vid = this.state.product_version_id;
    // let lid = this.state.locale_id;
    axios
      .get(`http://localhost:3001/api/v1/screenshots`, {
        params: {
          // product_version_id: 4,
          // locale_id: 1
          product_version_id: this.props.location.state.product_version_id,
          locale_id: this.props.location.state.locale_id
        }
      })
      .then(screenshots => {
        this.setState({ screenshots: screenshots.data });
      })
      .catch(error => console.log(error));
  }

  render() {
    return (
      <AppPage>
        <Gallery gutter="lg">
          {this.state.screenshots.map(screenshots => {
            return (
              <Card>
                <CardHeader>{screenshots.name}</CardHeader>
                <div style={{ height: "530px", width: "750px" }}>
                  {screenshots.Images.map(image => {
                    return (
                      <div className="float-right">
                        <img src={image}></img>
                      </div>
                    );
                  })}
                </div>
              </Card>
            );
          })}
        </Gallery>
      </AppPage>
    );
  }
}

export default Screenshots;

/* <div>
                          <button onClick={e => this.passcount(e)}>Pass</button>
                          <button onClick={e => this.failcount(e)}>Fail</button>
                        </div> */
