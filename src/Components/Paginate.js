import React, { useState, useEffect } from "react";
import { Split, SplitItem } from "@patternfly/react-core";
import { Pagination, PaginationVariant } from "@patternfly/react-core";
import SimpleEmptyState from "./SimpleEmptyState";
export default function Paginate() {
    const [screenshots, setscreenshots] = useState("");
    const [screenshots_en, setscreenshots_en] = useState("");
    const [itemCount, setitemCount] = useState("");
    const [elements_right, setelement_right] = useState([]);
    const [elements_left, setelement_left] = useState([]);
    const [elements, setelements] = useState([]);
    const [offset, setoffset] = useState(0);
    const [currentPage, sercurrent_Page] = useState(0);
    const [page, setpage] = useState(0);
    const [perPage, setperPage] = useState(10);
    const [showModel, setshowModal] = useState(false);

    //Set the page
    const onSetPage = (_event, pageNumber) => {
        setperPage(pageNumber)
        SetImages(setoffset(offset), setperPage(perPage))
    }

    //Items to be displayed per page
    function onPerPageSelect(_event, perPage) {
        setperPage(perPage)
        SetImages(setoffset(offset), perPage)
    }

    //Next set of Items 
    function onNextClick() {
        setoffset(page * setperPage(perPage))
    }

    //Previous set of Items
    function onPreviousClick(_event, page) {
        setoffset((setpage - 2) * setperPage(perPage));
    }

    //First set of Items
    function onFirstClick(_event, page) {
        setoffset(0)
    }

    //Last set of items
    function onLastClick(_event, page) {
        setoffset(setitemCount(itemCount) - setperPage(perPage))
    }


    useEffect(() => {
        setscreenshots(screenshots);
        setscreenshots_en(screenshots_en);
        itemCount(itemCount);
        SetImages(setoffset(offset, setperPage(perPage)))
    }, []);

    //componuntdidupdate
    // useEffect(() => {
    // if (prevProps.screenshots !== props.screenshots) {
    //     setscreenshots(screenshots);
    //     setscreenshots_en(screenshots_en);
    //     itemCount(itemCount);
    //     () => SetImages(setoffset(offset, setperPage(perPage)));
    // }, []);

    // setshowModal(showModel) {
    //     setshowModal(showModel);
    // }

    function SetImages(offset, perPage) {
        if (screenshots_en.length !== 0) {
            let elements_left = setscreenshots_en([0]).Images.slice(
                offset,
                offset + perPage
            );
            setelement_left(elements_left)
        }

        if (screenshots.length !== 0) {
            let elements_right = setscreenshots([0]).Images.slice(
                offset,
                offset + perPage
            );
            setelement_right(elements_right)
        }

        function Pagination_for_en() {
            return (
                <div>
                    <Pagination
                        className="mb-4"
                        widgetId="pagination-options-menu-bottom"
                        itemCount={itemCount}
                        perPage={perPage}
                        page={page}
                        variant={PaginationVariant.bottom}
                        onSetPage={onSetPage}
                        onPerPageSelect={onPerPageSelect}
                        onNextClick={onNextClick}
                        onPreviousClick={onPreviousClick}
                        onFirstClick={onFirstClick}
                        onLastClick={onLastClick}
                    />
                    <div className="en_screens mb-4">
                        {elements_left.map((image, index) => (
                            <img src={image} alt="" key={index} className="image" />
                        ))}
                    </div>

                    <Pagination
                        itemCount={itemCount}
                        widgetId="pagination-options-menu-bottom"
                        perPage={perPage}
                        page={page}
                        variant={PaginationVariant.bottom}
                        onSetPage={onSetPage}
                        onPerPageSelect={onPerPageSelect}
                        onNextClick={onNextClick}
                        onPreviousClick={onPreviousClick}
                        onFirstClick={onFirstClick}
                        onLastClick={onLastClick}
                    />
                </div>
            );
        }

        function Pagination_for_other() {
            return (
                <div>
                    <Pagination
                        widgetId="pagination-options-menu-bottom"
                        itemCount={itemCount}
                        perPage={perPage}
                        page={page}
                        variant={PaginationVariant.bottom}
                        onSetPage={onSetPage}
                        onPerPageSelect={onPerPageSelect}
                        onNextClick={onNextClick}
                        onPreviousClick={onPreviousClick}
                        onFirstClick={onFirstClick}
                        onLastClick={onLastClick}
                    />
                    <div id="image-compare">
                        <Split gutter="md">
                            {elements_left.length !== 0}
                            {
                                <SplitItem>
                                    {elements_left.map((image, index) => (
                                        <img src={image} alt="" key={index} className="image" />
                                    ))}
                                </SplitItem>
                            }
                        </Split>
                        {this.state.elements_right.length !== 0}
                        {
                            <SplitItem>
                                {this.state.elements_right.map((image, index) => (
                                    <img src={image} alt="" key={index} className="image" />
                                ))}
                            </SplitItem>
                        }
                    </div>

                    <Pagination
                        widgetId="pagination-options-menu-bottom"
                        variant={PaginationVariant.bottom}
                        itemCount={itemCount}
                        perPage={perPage}
                        page={page}
                        onSetPage={onSetPage}
                        onPerPageSelect={onPerPageSelect}
                        onNextClick={onNextClick}
                        onPreviousClick={onPreviousClick}
                        onFirstClick={onFirstClick}
                        onLastClick={onLastClick}

                    />
                </div>
            );
        }
        if (screenshots_en.length === 0) {
            return <SimpleEmptyState />
        }
        else if (screenshots.length === 0) {
            return <div className="mb-4">{Pagination_for_en()}</div>;
        }
        else if (
            screenshots[0].id === screenshots_en[0].id
        )
            return <div className="mb-4">{Pagination_for_en()}</div>;
        else {
            return <div className="mb-4">{Pagination_for_other()}</div>;
        }
    }


}