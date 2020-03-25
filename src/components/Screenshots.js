import React, { Component } from "react";
import axios from "axios";
import { Card, CardHeader, Gallery } from "@patternfly/react-core";
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

  passcount() {
    this.setState({
      pass: this.state.pass + 1
    });
  }

  failcount() {
    this.setState({
      fail: this.state.fail + 1
    });
  }
  componentDidMount() {
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
      <Gallery gutter="lg">
        <h1>Pass: {this.state.pass}</h1>
        <h1>Fail: {this.state.fail}</h1>

        {this.state.screenshots.map(screenshots => {
          return (
            <Card>
              <CardHeader>{screenshots.name}</CardHeader>
              <div style={{ height: "530px", width: "750px" }}>
                {screenshots.Images.map(image => {
                  return (
                    <div className="float-right">
                      <img src={image}></img>
                      <div>
                        <button onClick={e => this.passcount(e)}>Pass</button>
                        <button onClick={e => this.failcount(e)}>Fail</button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          );
        })}
      </Gallery>
    );
  }
}

export default Screenshots;
