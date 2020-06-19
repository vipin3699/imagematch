import React, { Component } from "react";
import { Split, SplitItem, Button } from "@patternfly/react-core";
import { Pagination, PaginationVariant } from "@patternfly/react-core";
import SimpleEmptyState from "./SimpleEmptyState";
import { Badge } from "@patternfly/react-core";
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
      showModal: false,
      pass: 0,
      fail: 0,
      pass_other: 0,
      fail_other: 0,
      disabled: [],
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
  //Pass fail button for ENG screens
  passcount = (image) => {
    // console.log(image);
    // this.setState({
    //   pass: this.state.pass + 1,
    //   clickedpassbutton: image,
    // });
    // console.log(id);
    this.setState((currentState) => ({
      disabled: [...currentState.disabled, image],
    }));
    this.setState({
      pass: this.state.pass + 1,
    });
  };
  failcount(image) {
    this.setState((currentState) => ({
      disabled: [...currentState.disabled, image],
    }));
    this.setState({
      fail: this.state.fail + 1,
    });
  }

  //Pass fail button for selected LANG screens
  passcount_other = (image) => {
    this.setState((currentState) => ({
      disabled: [...currentState.disabled, image],
    }));
    this.setState({
      pass_other: this.state.pass_other + 1,
    });
  };
  failcount_other(image) {
    this.setState((currentState) => ({
      disabled: [...currentState.disabled, image],
    }));
    this.setState({
      fail_other: this.state.fail_other + 1,
    });
  }
  setModalState(showModal) {
    this.setState({
      showModal: showModal,
    });
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
        <Badge>Pass: {this.state.pass}</Badge>
        <Badge>Fail: {this.state.fail}</Badge>

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
            <div>
              <img src={image} alt="" key={index} className="image" />

              <div>
                <Button
                  variant="secondary"
                  id={image}
                  onClick={() => this.passcount(image)}
                  isDisabled={this.state.disabled.includes(image)}
                >
                  Pass
                </Button>
                <Button
                  variant="secondary"
                  id={image}
                  onClick={() => this.failcount(image)}
                  isDisabled={this.state.disabled.includes(image)}
                >
                  Fail
                </Button>
              </div>
            </div>
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
        <Badge>Pass: {this.state.pass}</Badge>
        <Badge>Fail: {this.state.fail}</Badge>
      </div>
    );
  }
  pagination_for_other() {
    return (
      <div>
        <Badge>Pass: {this.state.pass}</Badge>
        <Badge>Fail: {this.state.fail}</Badge>
        <Badge className="pass_fail_other_locale">
          Pass: {this.state.pass_other}
        </Badge>
        <Badge className="pass_fail_other_locale">
          Fail: {this.state.fail_other}
        </Badge>

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
          {this.state.elements_left.length !== 0}
          {
            <SplitItem id="EN_split">
              {this.state.elements_left.map((image, index) => (
                <div>
                  <img src={image} alt="" key={index} className="image" />
                  <div>
                    <Button
                      variant="secondary"
                      id={image}
                      onClick={() => this.passcount(image)}
                      // disabled={this.state.disabled.includes(image)}
                      isDisabled={this.state.disabled.includes(image)}
                    >
                      Pass
                    </Button>
                    <Button
                      variant="secondary"
                      id={image}
                      onClick={() => this.failcount(image)}
                      isDisabled={this.state.disabled.includes(image)}
                    >
                      Fail
                    </Button>
                  </div>
                </div>
              ))}
            </SplitItem>
          }
          {this.state.elements_right.length !== 0}
          {
            <SplitItem id="other_split">
              {this.state.elements_right.map((image, index) => (
                <div>
                  <img src={image} alt="" key={index} className="image" />
                  <div>
                    <Button
                      variant="secondary"
                      id={image}
                      onClick={() => this.passcount_other(image)}
                      isDisabled={this.state.disabled.includes(image)}
                    >
                      Pass
                    </Button>
                    <Button
                      variant="secondary"
                      id={image}
                      onClick={() => this.failcount_other(image)}
                      isDisabled={this.state.disabled.includes(image)}
                    >
                      Fail
                    </Button>
                  </div>
                </div>
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

        <Badge>Pass: {this.state.pass}</Badge>
        <Badge>Fail: {this.state.fail}</Badge>
        <Badge className="pass_fail_other_locale">
          Pass: {this.state.pass_other}
        </Badge>
        <Badge className="pass_fail_other_locale">
          Fail: {this.state.fail_other}
        </Badge>
      </div>
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
