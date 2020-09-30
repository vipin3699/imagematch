import React, { useState } from "react";
import axios from "axios";
import BASE_URL from "../API/BASE_URL";
import SimpleDropdown from "../Components/SimpleDropdown";
import Paginate from "../Components/Paginate"
import Breadcrumbs from "../Components/Breadcrumbs";
import { useHistory } from "react-router";
import SimpleEmptyState from "../Components/SimpleEmptyState";
import constant from "../Constants/EnglishScreens.json"
import { PageSection, PageSectionVariants, Bullseye, DataToolbar, Divider, Card, CardBody, DataToolbarItem } from "@patternfly/react-core";

export default function Versions(props) {
  const [elementsRight, setElementsRight] = useState([]);
  const [elementsLeft, setElementsLeft] = useState([]);
  const [elements, setElements] = useState([]);
  const [offset, setOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [onSubmitValue, setonSubmitValue] = useState(false)
  const [productsVersion, setProductsVersion] = useState([]);
  const [locales, setLocales] = useState([]);
  const [selectProductsVersion, setSelectProductsVersion] = useState("");
  const [selectLocales, setSelectLocales] = useState("");
  const [screenshotsOther, setScreenshotsOther] = useState([]);
  const [screenshotsEN, setScreenshotsEN] = useState([]);
  const [itemCount, setItemCount] = useState();
  const [previousProductId] = useState(props.match.params.productid);
  let history = useHistory();

  function handleDropdownChangeVersion(e) {
    setSelectProductsVersion(e);
  }

  function handleDropdownChangeLocale(e) {
    setSelectLocales(e)
  }

  //To get Versions and Locales of selected Product
  React.useEffect(() => {
    const fetchProductsVersionData = async () => {
      const productsVersionData = await axios(
        `${BASE_URL}/products/${previousProductId}/product_versions`
      ).catch(e => { console.error(e) });

      const LocalesData = await axios(`${BASE_URL}/locales`).catch(e => { console.error(e) });

      //Return to Products if no version for selected Product is available
      if (productsVersionData.data.length !== 0) {
        setProductsVersion(productsVersionData.data);
        setLocales(LocalesData.data)
      }
      else {
        alert(" No Versions available for selected Product. Please select other Product");
        history.push({
          pathname: "/"
        })
      }
    };
    fetchProductsVersionData();
  }, [previousProductId]);

  // To get selected Version and Locale to get screenshots
  React.useEffect(() => {
    const FetchScreenshots = async () => {
      setonSubmitValue(false);
      const screenshotsData = await axios(`${BASE_URL}/screenshots`, {
        params: {
          product_version_id: selectProductsVersion,
          locale_id: selectLocales
        },
      })
      const screenshotsENData = await axios(`${BASE_URL}/screenshots`, {
        params: {
          product_version_id: selectProductsVersion,
          locale_id: constant.englishLocaleId,
        },
      })

      if (!screenshotsENData.data.length) {
        alert("The selected Version have no English Screenshots")
      }
      else {
        setScreenshotsOther(screenshotsData.data);
        setScreenshotsEN(screenshotsENData.data);
        setItemCount(Math.ceil(screenshotsENData.data[0].images.length))
      }
    }
    FetchScreenshots();
  }, [onSubmitValue])


  const onSubmit = () => {
    setonSubmitValue(true)
  }

  return (
    <div>
      <PageSection variant={PageSectionVariants.light}>
        <Breadcrumbs />
        {locales && productsVersion &&
          ((screenshotsOther && screenshotsOther.length !== 0) ||
            (screenshotsEN && screenshotsEN.length !== 0)) &&
          (
            <DataToolbar
              variant="label"
              id="data-toolbar-group-types"
              className="pf-c-data-toolbar">
              <DataToolbarItem>
                <SimpleDropdown
                  selectProductsVersion={selectProductsVersion}
                  selectLocales={selectLocales}
                  productsVersion={productsVersion}
                  locales={locales}
                  handleVersionChange={(e, event) =>
                    handleDropdownChangeVersion(e, event)}
                  handleLocaleChange={(e) => handleDropdownChangeLocale(e)}
                  handleSubmit={onSubmit}
                />
              </DataToolbarItem>
            </DataToolbar>
          )}
      </PageSection>
      <PageSection>
        {(screenshotsOther && screenshotsOther.length !== 0) ||
          (screenshotsEN && screenshotsEN.length !== 0) ?
          (
            <div className="form-container">
              <Paginate
                screenshotsOther={screenshotsOther}
                screenshotsEN={screenshotsEN}
                itemCount={itemCount}
                elements={elements}
                elementsRight={elementsRight}
                elementsLeft={elementsLeft}
                offset={offset}
                currentPage={currentPage}
                page={page}
                perPage={perPage}
              />
            </div>
          ) :
          (
            locales && productsVersion &&
            (
              <Bullseye>
                <Card>
                  <CardBody>
                    <SimpleEmptyState />
                    <Divider className="mb-4" />
                    <SimpleDropdown
                      productsVersion={productsVersion}
                      locales={locales}
                      handleVersionChange={(e, event) =>
                        handleDropdownChangeVersion(e, event)}
                      handleLocaleChange={(e) => handleDropdownChangeLocale(e)}
                      handleSubmit={onSubmit}
                    />
                  </CardBody>
                </Card>
              </Bullseye>
            ))
        }
      </PageSection>
    </div>
  );
}
