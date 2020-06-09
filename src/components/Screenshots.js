import React, { Component } from "react";
import { Split, SplitItem } from "@patternfly/react-core";
import { Pagination, PaginationVariant } from "@patternfly/react-core";
import SimpleEmptyState from "./SimpleEmptyState";
class Screenshots extends Component {
  constructor(props) {
    super(props);
    this.state = {
      screenshots_en: [],
      screenshots: [],
      elements: [],
      elements_right: [],
      elements_left: [],
      offset: 0,
      currentPage: 0,
      page: 1,
      perPage: 10,
    };
    this.pagination_for_en = this.pagination_for_en.bind(this);
    this.pagination_for_other = this.pagination_for_other.bind(this);

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
    this.setState(
      {
        screenshots: this.props.screenshots,
        screenshots_en: this.props.screenshots_en,
        itemCount: this.props.itemCount,

        // elements: this.props.elements,
        // elements_right: this.props.elements_right,
        // elements_left: this.props.elements_left,
        // offset: this.props.offset,
        // currentPage: this.props.currentPage,
        // page: this.props.page,
        // perPage: this.props.perPage,
      },
      () => this.SetImages(this.state.offset, this.state.perPage)
    );
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.screenshots !== this.props.screenshots) {
      this.setState(
        {
          screenshots: this.props.screenshots,
          screenshots_en: this.props.screenshots_en,
          itemCount: this.props.itemCount,
        },
        () => this.SetImages(this.state.offset, this.state.perPage)
      );
    }
  }

  SetImages(offset, perPage) {
    if (this.state.screenshots_en.length !== 0) {
      let elements_left = this.state.screenshots_en[0].Images.slice(
        offset,
        offset + perPage
      );
      this.setState({ elements_left: elements_left }, function () {
        console.log("left images:" + this.state.elements_left.length);
      });
    }
    if (this.state.screenshots.length !== 0) {
      let elements_right = this.state.screenshots[0].Images.slice(
        offset,
        offset + perPage
      );
      this.setState({ elements_right: elements_right }, function () {
        console.log("right images:" + this.state.elements_right.length);
      });
    }
  }

  pagination_for_en() {
    return (
      <div>
        <Pagination
          className="mb-4"
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

        <div className="en_screens mb-4">
          {this.state.elements_left.map((image, index) => (
            <img src={image} alt="" key={index} className="image" />
          ))}
        </div>
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
  pagination_for_other() {
    return (
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
          {this.state.elements_right.length !== 0}
          {
            <SplitItem>
              {this.state.elements_right.map((image, index) => (
                <img src={image} alt="" key={index} className="image" />
              ))}
            </SplitItem>
          }

          {this.state.elements_left.length !== 0}
          {
            <SplitItem>
              {this.state.elements_left.map((image, index) => (
                <img src={image} alt="" key={index} className="image" />
              ))}
            </SplitItem>
          }
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
      </>
    );
  }

  render() {
    if (this.state.screenshots_en.length === 0) {
      //If english locale screenshots are not present for selected version
      return <SimpleEmptyState />;
    } else if (this.state.screenshots.length === 0) {
      return <div className="mb-4">{this.pagination_for_en()}</div>;
    } else if (
      this.state.screenshots[0].id === this.state.screenshots_en[0].id
      // if user selects english display only one column of english screenshots
    )
      return <div className="mb-4">{this.pagination_for_en()}</div>;
    else {
      return <div className="mb-4">{this.pagination_for_other()}</div>;
    }
  }
}

export default Screenshots;
