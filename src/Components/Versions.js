import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import BASE_URL from "../API/BASE_URL";
import AppPage from "../PageHeader/page";
import { PageSection, PageSectionVariants } from "@patternfly/react-core";
import VersionsToolbar from "./VersionToolbar";
import EmptyStateForm from "./EmptyStateForm";
import Paginate from "./Paginate"
import useTest from "./Test";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import { useHistory } from "react-router-dom";

export default function Versions(props) {
  const [products_version, setProductsVersion] = useState([]);
  const [locales, setLocales] = useState([]);
  const [selectProductsVersion, setselectProductsVersion] = useState("");
  const [selectLocales, setselectLocales] = useState("");
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
  const [isProductsVersionSelected, setisProductsVersionSelected] = useState(
    false
  );
  const [isLocaleSelected, setisLocaleSelected] = useState(false);
  const [previousProductID, setpreviousProductID] = useState(
    props.match.params.productid
  );
  let history = useHistory();

  function handleDropdownChangeVersion(e) {
    setselectProductsVersion(e, setisProductsVersionSelected(true));
    console.log(selectProductsVersion)
  }
  function handleDropdownChangeLocale(e) {
    setselectLocales(e, setisLocaleSelected(true));
    console.log(selectLocales)
  }
  //To get Versions and Locales of selected Product
  useEffect(() => {
    const fetchProductsVersionData = async () => {
      const ProductsVersionData = await axios(
        `${BASE_URL}/products/${previousProductID}/product_versions`
      );
      const LocalesData = await axios(`${BASE_URL}/locales`);

      //Return to Products if no version for selected Product is available
      if (ProductsVersionData.data.length === 0) {
        alert(" No Versions available for selected Product. Please select other Product")
        history.push("/products")
      }
      else {
        setProductsVersion(ProductsVersionData.data);
        setselectProductsVersion(ProductsVersionData.data.id);
        setLocales(LocalesData.data);
        setselectLocales(LocalesData.data.id);
      }
    };
    fetchProductsVersionData();
  }, []);

  // To get selected Version and Locale to get screenshots
  React.useEffect(() => {
    const test = async () => {
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
        setscreenshots(screenshotsData)
        setscreenshots_en(screenshots_enData)
        setitemCount(Math.ceil(screenshots_enData.data[0].Images.length));
      }
    }

    test();
  }, [selectProductsVersion, selectLocales])


  const onSubmit = () => {
  }
  console.log(screenshots_en);
  console.log(screenshots);

  return (
    <AppPage>
      <PageSection variant={PageSectionVariants.light}>
        <Breadcrumbs />
        {locales.length && products_version.length &&
          ((screenshots && screenshots.length > 0) ||
            (screenshots_en && screenshots_en.length > 0)) &&
          (
            <VersionsToolbar
              selectProductsVersion={setselectProductsVersion(
                selectProductsVersion
              )}
              selectLocales={setselectLocales(selectLocales)}
              products_version={setProductsVersion(products_version)}
              locales={setLocales(locales)}
              handleProductsVersion={handleDropdownChangeVersion}
              handleLocales={handleDropdownChangeLocale}
              handleFormSubmit={(a, b) => onSubmit(a, b, screenshots_en, screenshots)}
            />
          )}
      </PageSection>
      <PageSection>
        {(screenshots && screenshots.length > 0) || (screenshots_en && screenshots_en.length > 0) ?
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
          (locales.length && (products_version).length && (
            <EmptyStateForm
              products_version={products_version}
              locales={locales}
              handleVersionChange={(e) =>
                handleDropdownChangeVersion(e)}
              handleLocaleChange={(e) => handleDropdownChangeLocale(e)}
              handleSubmit={(a, b) => onSubmit(a, b)}
            ></EmptyStateForm>
          ))
        }
      </PageSection>
    </AppPage >
  );
}
