import React, { Component } from "react";
import axios from "axios";
import AppPage from "./page";
import { Split, SplitItem } from "@patternfly/react-core";
import { TextContent } from "@patternfly/react-core";
import { BASE_URL } from "./API/api";
import ReactPaginate from "react-paginate";

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
      perPage: 10,
      currentPage: 0,
      elements_right: [],
      elements_left: [],
    };
    this.setState({
      product_version_id: this.props.location.state.product_version_id,
      locale_id: this.props.location.state.locale_id,
    });
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
            pageCount_right: Math.ceil(
              screenshots_en.data[0].Images.length / this.state.perPage
            ),
            pageCount_left: Math.ceil(
              screenshots.data[0].Images.length / this.state.perPage
            ),
          },
          () => this.setElementsForCurrentPage()
        )
      )
      .catch((error) => console.log(error));
  }
  setElementsForCurrentPage() {
    console.log(this.state);
    let elements_right = this.state.screenshots_en[0].Images.slice(
      this.state.offset,
      this.state.offset + this.state.perPage
    );
    let elements_left = this.state.screenshots[0].Images.slice(
      this.state.offset,
      this.state.offset + this.state.perPage
    );
    this.setState({ elements_right: elements_right });
    this.setState({ elements_left: elements_left });
  }
  handlePageClick = (screenshots) => {
    const selectedPage = screenshots.selected;
    const offset = selectedPage * this.state.perPage;
    this.setState({ currentPage: selectedPage, offset: offset }, () => {
      this.setElementsForCurrentPage();
    });
  };
  render() {
    let paginationElement;
    if (this.state.pageCount_right > 1 || this.state.pageCount_left > 1) {
      paginationElement = (
        <ReactPaginate
          previousLabel={"← Previous"}
          nextLabel={"Next →"}
          breakLabel={<span className="gap">...</span>}
          pageCount_right={this.state.pageCount_right}
          pageCount_left={this.state.pageCount_left}
          onPageChange={this.handlePageClick}
          forcePage={this.state.currentPage}
          containerClassName={"pagination"}
          previousLinkClassName={"previous_page"}
          nextLinkClassName={"next_page"}
          disabledClassName={"disabled"}
          activeClassName={"active"}
        />
      );
    }
    return (
      <AppPage>
        <>
          <TextContent>
            {/* <Text component={TextVariants.h1}>{screenshots.name}</Text> */}
          </TextContent>
          <div>
            {paginationElement}
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
          </div>
        </>
      </AppPage>
    );
  }
}

export default Screenshots;
