import React, { Component } from "react";
import axios from "axios";
import { Split, SplitItem } from "@patternfly/react-core";
import { BASE_URL } from "./API/api";
import { Pagination, PaginationVariant } from "@patternfly/react-core";
import SimpleEmptyState from "./SimpleEmptyState";
class Screenshots extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pass: 0,
      fail: 0,
      screenshots_en: [],
      screenshots: [],
      offset: 0,
      elements: [],
      currentPage: 0,
      elements_right: [],
      elements_left: [],
      page: 1,
      perPage: 10,
    };
    // Pagination functions
    //Set the Page
    this.onSetPage = (_event, pageNumber) => {
      this.setState(
        {
          page: pageNumber,
        },
        () => this.SetImages(this.state.offset, this.state.perPage)
      );
    };
    //Items to be displayed per page
    this.onPerPageSelect = (_event, perPage) => {
      this.setState(
        {
          perPage: perPage,
        },
        () => this.SetImages(this.state.offset, perPage)
      );
    };
    //Next set of Items
    this.onNextClick = () => {
      this.setState({
        offset: this.state.page * this.state.perPage,
      });
    };
    //Previous set of items
    this.onPreviousClick = (_event, page) => {
      this.setState({
        offset: (this.state.page - 2) * this.state.perPage,
      });
    };
    //First set of Items
    this.onFirstClick = (_event, page) => {
      console.log("onFirstClick:" + page);

      this.setState({
        offset: 0,
      });
    };
    //Last set of items
    this.onLastClick = (_event, page) => {
      console.log("onLastClick :" + page);

      this.setState({
        offset: this.state.itemCount - this.state.perPage,
      });
    };
    // Pagination functions end
  }
  componentDidMount() {
    axios
      .all([
        axios.get(`${BASE_URL}/screenshots`, {
          params: {
            // product_version_id: this.props.location.state.product_version_id,
            // locale_id: this.props.location.state.locale_id,
            product_version_id: this.props.product_version_id,
            locale_id: this.props.locale_id,
          },
        }),
        axios.get(`${BASE_URL}/screenshots`, {
          params: {
            // product_version_id: this.props.location.state.product_version_id,
            product_version_id: this.props.product_version_id,
            locale_id: 3,
          },
        }),
      ])

      .then(([screenshots, screenshots_en]) =>
        this.setState(
          {
            screenshots: screenshots.data,
            screenshots_en: screenshots_en.data,
            itemCount: Math.ceil(screenshots_en.data[0].Images.length),
          },
          () => this.SetImages(this.state.offset, this.state.perPage)
        )
      )
      .catch((error) => console.log(error));
  }

  SetImages(offset, perPage) {
    let elements_right = this.state.screenshots_en[0].Images.slice(
      offset,
      offset + perPage
    );
    let elements_left = this.state.screenshots[0].Images.slice(
      offset,
      offset + perPage
    );
    this.setState({ elements_right: elements_right }, function () {
      console.log("left images:" + this.state.elements_left.length);
    });
    this.setState({ elements_left: elements_left }, function () {
      console.log("right images:" + this.state.elements_right.length);
    });
  }

  render() {
    if (this.state.screenshots_en.length === 0) {
      return <SimpleEmptyState />;
    } else {
      return (
        <div>
          <Pagination
            itemCount={this.state.itemCount}
            widgetId="pagination-options-menu-bottom"
            perPage={this.state.perPage}
            page={this.state.page}
            variant={PaginationVariant.bottom}
            onSetPage={this.onSetPage}
            onPerPageSelect={this.onPerPageSelect}
            onNextClick={this.onNextClick}
            onPreviousClick={this.onPreviousClick}
            onFirstClick={this.onFirstClick}
            onLastClick={this.onLastClick}
          />

          <Split gutter="md">
            <SplitItem>
              {this.state.elements_right.map((image) => {
                return <img src={image} alt="" />;
              })}
            </SplitItem>
            <SplitItem>
              {this.state.elements_left.map((image) => {
                return <img src={image} alt="" />;
              })}
            </SplitItem>
          </Split>

          <Pagination
            itemCount={this.state.itemCount}
            widgetId="pagination-options-menu-bottom"
            perPage={this.state.perPage}
            page={this.state.page}
            variant={PaginationVariant.bottom}
            onSetPage={this.onSetPage}
            onPerPageSelect={this.onPerPageSelect}
            onNextClick={this.onNextClick}
            onPreviousClick={this.onPreviousClick}
            onFirstClick={this.onFirstClick}
            onLastClick={this.onLastClick}
          />
        </div>
      );
    }
  }
}

export default Screenshots;
