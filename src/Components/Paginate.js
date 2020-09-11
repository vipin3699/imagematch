import React, { useState, useEffect } from "react";
import { Split, SplitItem } from "@patternfly/react-core";
import { Pagination, PaginationVariant } from "@patternfly/react-core";
import SimpleEmptyState from "./SimpleEmptyState";
export default function Paginate(props) {
    const [screenshotsOther, setScreenshotsOther] = useState([]);
    const [screenshotsEN, setScreenshotsEN] = useState([]);
    const [itemCount, setItemCount] = useState("");
    const [elementsRight, setElementRight] = useState([]);
    const [elementsLeft, setElementLeft] = useState([]);
    const [elements, setElements] = useState([]);
    const [offset, setOffset] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [showModal, setshowModal] = useState(false);

    //Set the page
    const onsetPage = (_event, pageNumber) => {
        setPage(pageNumber)
        SetImages(setOffset(offset), setPerPage(perPage))
    }

    //Items to be displayed per page
    const onPerPageSelect = (_event, perPage) => {
        setPerPage(perPage)
        SetImages(setOffset(offset), perPage)
    }

    //Next set of Items 
    const onNextClick = () => {
        setOffset(setPage(page) * setPerPage(perPage))
    }

    //Previous set of Items
    const onPreviousClick = (_event, page) => {
        setOffset((setPage(page) - 2) * setPerPage(perPage));
    }

    //First set of Items
    const onFirstClick = (_event, page) => {
        console.log("onFirstClick:" + page);
        setOffset(0)
    }

    //Last set of items
    const onLastClick = (_event, page) => {
        console.log("onFirstClick:" + page);
        setOffset(props.itemCount - setPerPage(perPage))
    }
    useEffect(() => {
        setScreenshotsOther(props.screenshotsOther);
        setScreenshotsEN(props.screenshotsEN);
        setItemCount(props.itemCount);
        SetImages(offset, perPage)
    }, [screenshotsEN, screenshotsOther, itemCount]);

    function SetImages({ offset, perPage }) {
        if (screenshotsEN.length !== 0) {
            const elementsLeft = props.screenshotsEN[0].Images.slice(
                // offset,
                offset + perPage
            );
            setElementLeft(elementsLeft)
        }
        console.log(elementsLeft);

        if (screenshotsOther.length !== 0) {
            const elementsRight = props.screenshotsOther[0].Images.slice(
                // offset,
                offset + perPage
            );
            setElementRight(elementsRight)
        }
        console.log(elementsRight);
    }

    function Pagination_for_en() {
        return (
            <div>
                <Pagination
                    className="mb-4"
                    widgetId="pagination-options-menu-bottom"
                    itemCount={props.itemCount}
                    perPage={perPage}
                    page={page}
                    variant={PaginationVariant.bottom}
                    onsetPage={onsetPage}
                    onPerPageSelect={onPerPageSelect}
                    onNextClick={onNextClick}
                    onPreviousClick={onPreviousClick}
                    onFirstClick={onFirstClick}
                    onLastClick={onLastClick}
                />
                <div className="en_screens mb-4">
                    {elementsLeft.map((image, index) => (
                        <img src={image} alt="" key={index} className="image" />
                    ))}
                </div>

                <Pagination
                    itemCount={props.itemCount}
                    widgetId="pagination-options-menu-bottom"
                    perPage={perPage}
                    page={page}
                    variant={PaginationVariant.bottom}
                    onsetPage={onsetPage}
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
                    itemCount={props.itemCount}
                    perPage={perPage}
                    page={page}
                    variant={PaginationVariant.bottom}
                    onsetPage={onsetPage}
                    onPerPageSelect={onPerPageSelect}
                    onNextClick={onNextClick}
                    onPreviousClick={onPreviousClick}
                    onFirstClick={onFirstClick}
                    onLastClick={onLastClick}
                />
                <div id="image-compare">
                    <Split gutter="md">
                        {elementsLeft.length !== 0}
                        {
                            <div>
                                {elementsLeft.map((image, index) => (
                                    <div>
                                        <img src={image} alt="" key={index} className="image" />
                                        <img src={elementsRight[index]} alt="" key={index} className="image" />
                                        <br />
                                        <br />
                                        <br />
                                    </div>
                                ))}
                            </div>
                        }
                    </Split>

                </div>

                <Pagination
                    widgetId="pagination-options-menu-bottom"
                    variant={PaginationVariant.bottom}
                    itemCount={props.itemCount}
                    perPage={perPage}
                    page={page}
                    onsetPage={onsetPage}
                    onPerPageSelect={onPerPageSelect}
                    onNextClick={onNextClick}
                    onPreviousClick={onPreviousClick}
                    onFirstClick={onFirstClick}
                    onLastClick={onLastClick}

                />
            </div>
        );
    }

    if (props.screenshotsEN.length === 0) {
        return <SimpleEmptyState />
    }
    else if (props.screenshotsOther.length === 0) {
        return <div className="mb-4">{Pagination_for_en()}</div>;
    }
    else if (
        props.screenshotsOther[0].id === props.screenshotsEN[0].id) {
        return <div className="mb-4">{Pagination_for_en()}</div>;
    }
    else {
        return <div className="mb-4">{Pagination_for_other()}</div>;
    }

}