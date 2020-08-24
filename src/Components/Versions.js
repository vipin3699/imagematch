import React, { useState, useEffect } from "react";
import axios from "axios";
import BASE_URL from "../API/BASE_URL";
import AppPage from "../PageHeader/page";
import { PageSection, PageSectionVariants } from "@patternfly/react-core";
import VersionsToolbar from "./VersionToolbar";
import EmptyStateForm from "./EmptyStateForm";
import Paginate from "./Paginate"
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import { useHistory } from "react-router";

export default function Versions(props) {
  const [elements_right, setelement_right] = useState([]);
  const [elements_left, setelement_left] = useState([]);
  const [elements, setelements] = useState([]);
  const [offset, setoffset] = useState(0);
  const [currentPage, sercurrent_Page] = useState(0);
  const [page, setpage] = useState(0);
  const [perPage, setperPage] = useState(10);
  const [previousProductID] = useState(props.match.params.productid);
  const [onSubmitValue, setonSubmitValue] = useState(false)
  const [product_locale_data, setproduct_locale_data] = useState({
    products_version: [],
    locales: [],
    selectProductsVersion: '',
    selectLocales: ''
  })
  const { locales, products_version, selectProductsVersion, selectLocales } = product_locale_data;

  const [screenshots, setscreenshots] = useState({
    screenshots_other: [],
    screenshots_en: [],
    itemCount: ''
  });
  const { screenshots_other, screenshots_en, itemCount } = screenshots;

  let history = useHistory();

  function handleDropdownChangeVersion(e) {
    setproduct_locale_data({
      selectProductsVersion: e
    })
    console.log(selectProductsVersion)
  }
  function handleDropdownChangeLocale(e) {
    setproduct_locale_data({
      selectLocales: e
    })
    console.log(selectLocales)
  }


  //To get Versions and Locales of selected Product
  React.useEffect(() => {
    const fetchProductsVersionData = async () => {
      const ProductsVersionData = await axios(
        `${BASE_URL}/products/${previousProductID}/product_versions`
      ).catch(e => { console.error(e) });


      const LocalesData = await axios(`${BASE_URL}/locales`).catch(e => { console.error(e) });


      //Return to Products if no version for selected Product is available
      if (ProductsVersionData.data.length !== 0) {
        setproduct_locale_data({
          products_version: ProductsVersionData.data,
          locales: LocalesData.data,
          selectProductsVersion: ProductsVersionData.data[0].id,
          selectLocales: LocalesData.data[0].id
        })
      }
      else {

        alert(" No Versions available for selected Product. Please select other Product");
        history.push({
          pathname: "/products"
        })

      }
    };
    fetchProductsVersionData();
  }, []);



  // To get selected Version and Locale to get screenshots
  React.useEffect(() => {
    const FetchScreenshots = async () => {

      const screenshotsData = await axios(`${BASE_URL}/screenshots`, {
        params: {
          product_version_id: selectProductsVersion,
          locale_id: selectLocales
        },
      })
      console.log(screenshotsData)

      const screenshots_enData = await axios(`${BASE_URL}/screenshots`, {
        params: {
          product_version_id: selectProductsVersion,
          locale_id: 3,
        },
      })
      console.log(screenshots_enData)

      if (!screenshots_enData.data.length) {
        alert("The selected Version have no English Screenshots")
      }
      else {
        setscreenshots({
          screenshots_other: screenshotsData.data,
          screenshots_en: screenshots_enData.data,
          itemCount: Math.ceil(screenshots_enData.data[0].Images.length)
        })
      }
    }

    FetchScreenshots();
  }, [onSubmitValue])


  const onSubmit = () => {
    setonSubmitValue(true)
  }


  return (
    <>
      <AppPage>
        <PageSection variant={PageSectionVariants.light}>
          <Breadcrumbs />
          {product_locale_data.locales.length && product_locale_data.products_version.length &&
            ((screenshots.screenshots_other && screenshots.screenshots_other.length != 0) ||
              (screenshots.screenshots_en && screenshots.screenshots_en.length != 0)) &&
            (
              <VersionsToolbar
                selectProductsVersion={
                  selectProductsVersion
                }
                selectLocales={selectLocales}
                products_version={products_version}
                locales={locales}
                handleProductsVersion={handleDropdownChangeVersion}
                handleLocales={handleDropdownChangeLocale}
                // handleFormSubmit={(a, b) => onSubmit(a, b)}
                handleFormSubmit={onSubmit}

              />
            )}
        </PageSection>
        <PageSection>
          {(screenshots.screenshots_other && screenshots.screenshots_other.length !== 0) ||
            (screenshots.screenshots_en && screenshots.screenshots_en.length !== 0) ?
            (
              <div className="form-container">
                <Paginate
                  screenshots={screenshots}
                  screenshots_en={screenshots_en}
                  itemCount={itemCount}
                  elements={elements}
                  elements_right={elements_right}
                  elements_left={elements_left}
                  offset={offset}
                  currentPage={currentPage}
                  page={page}
                  perPage={perPage}
                />
              </div>
            ) :
            (
              product_locale_data.locales.length && product_locale_data.products_version.length &&
              (
                <EmptyStateForm
                  products_version={products_version}
                  locales={locales}
                  handleVersionChange={(e) =>
                    handleDropdownChangeVersion(e)}
                  handleLocaleChange={(e) => handleDropdownChangeLocale(e)}
                  // handleSubmit={(a, b) => onSubmit(a, b)}
                  handleSubmit={onSubmit}
                ></EmptyStateForm>
              ))
          }


        </PageSection>
      </AppPage >
    </>
  );
}
