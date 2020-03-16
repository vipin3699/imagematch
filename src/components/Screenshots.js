import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Checkbox.css";
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
// var ImagesEN = [];
// var ImagesFR = [];

class Screenshots extends Component {
  // importAll(r) {
  //   return r.keys().map(r);
  // }
  // componentWillMount() {
  //   ImagesEN = this.importAll(
  //     require.context("./images/", false, /\.(png|jpe?g)$/)
  //   );
  //   ImagesFR = this.importAll(
  //     require.context("./imagesfr/", false, /\.(png|jpe?g)$/)
  //   );
  // }

  constructor(props) {
    super(props);
    this.state = {
      pass: 0,
      fail: 0,
      screenshots: []
    };
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
  changecolour() {
    this.setState({
      Color: "red"
    });
  }
  componentDidMount() {
    this.state.previousProductID = this.props.match.params.productid;
    this.state.previousVersionID = this.props.match.params.versionid;
    this.state.previousLocaleID = this.props.match.params.localeid;

    let { id } = this.props.match.params;
    axios
      .get(
        `http://localhost:3001/api/v1/products/${this.state.previousProductID}/versions/${this.state.previousVersionID}/locales/${this.state.previousLocaleID}/screenshots`
      )
      .then(screenshots => {
        this.setState({ screenshots: screenshots.data });
      })
      .catch(error => console.log(error));
  }

  render() {
    return (
      // <div
      //   style={{
      //     columns: "2 auto"
      //   }}
      // >
      //   <div>Ansible</div>
      //   {ImagesEN.map((image, index) => (
      //     <img key={index} src={image} alt={""}></img>
      //   ))}
      //   <div>Button</div>

      //   {ImagesFR.map((image, index) => (
      //     <img key={index} src={image} alt={""}></img>
      //   ))}

      <Gallery gutter="lg">
        <Link
          to={`/products/${this.state.previousProductID}/versions/${this.state.previousVersionID}/locales`}
        >
          Back to Locales
          <h1>Pass: {this.state.pass}</h1>
          <h1>Fail: {this.state.fail}</h1>
        </Link>
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
                        <button
                          onClick={
                            (e => this.passcount(e), p => this.changecolour(p))
                          }
                        >
                          Pass
                        </button>
                        <button onClick={e => this.failcount(e)}>Fail</button>
                      </div>
                    </div>
                  );
                })}
              </div>
              {/* <Card>
                <div
                  style={{ height: "830px", width: "1150px", float: "right" }}
                >
                  {screenshots.Images.map(image => {
                    return (
                      <div className="float-right">
                        <img src={image}></img>
                      </div>
                    );
                  })}
                </div>
              </Card> */}
            </Card>
          );
        })}
      </Gallery>
    );
  }
}

export default Screenshots;
