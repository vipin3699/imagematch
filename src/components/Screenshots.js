import React, { Component } from "react";
import axios from "axios";
import AppPage from "./page";
import { Split, SplitItem } from "@patternfly/react-core";
import { TextContent } from "@patternfly/react-core";
import { BASE_URL } from "./API/api";
import { Pagination, PaginationVariant } from "@patternfly/react-core";
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
      console.log("onPerPageSelect : " + perPage);
      this.setState(
        {
          perPage: perPage,
        },
        () => this.SetImages(this.state.offset, perPage)
      );
    };
    //Next set of Items
    this.onNextClick = () => {
      this.setState(
        {
          offset: this.state.page * this.state.perPage,
        },
        function () {
          console.log("onNextClick  offset:" + this.state.offset);
        }
      );
    };
    //Previous set of items
    this.onPreviousClick = (_event, page) => {
      this.setState(
        {
          offset: (this.state.page - 2) * this.state.perPage,
        },
        function () {
          console.log("onPreviousClick  offset:" + this.state.offset);
        }
      );
    };
    //First set of Items
    this.onFirstClick = (_event, page) => {
      console.log("onFirstClick:" + page);

      this.setState(
        {
          offset: 0,
        },
        function () {
          console.log("onFirstClick offset:" + this.state.offset);
        }
      );
    };
    //Last set of items
    this.onLastClick = (_event, page) => {
      console.log("onLastClick :" + page);

      this.setState(
        {
          offset: this.state.itemCount - this.state.perPage,
        },
        function () {
          console.log("onLastClick  offset:" + this.state.offset);
        }
      );
    };
    // Pagination functions end
  }
  componentDidMount() {
    axios
      .all([
        axios.get(`${BASE_URL}/screenshots`, {
          params: {
            product_version_id: this.props.location.state.product_version_id,
            locale_id: this.props.location.state.locale_id,
          },
        }),
        axios.get(`${BASE_URL}/screenshots`, {
          params: {
            product_version_id: this.props.location.state.product_version_id,
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
    this.setState({ elements_right: elements_right });
    this.setState({ elements_left: elements_left });
  }

  render() {
    return (
      <AppPage>
        <>
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
                return <img src={image}></img>;
              })}
            </SplitItem>
            <SplitItem>
              {this.state.elements_left.map((image) => {
                return <img src={image}></img>;
              })}
            </SplitItem>
          </Split>
        </>
      </AppPage>
    );
  }
}

export default Screenshots;
