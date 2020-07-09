import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import BASE_URL from "../API/BASE_URL";
import AppPage from "../PageHeader/page";
import { PageSection } from "@patternfly/react-core";
import VersionsToolbar from "./VersionToolbar";
import EmptyStateForm from "./EmptyStateForm";
import Screenshots from "./Screenshots";

export default function Versions(props) {
  const [products_version, setProductsVersion] = useState([]);
  const [locales, setLocales] = useState([]);
  const [selectProductsVersion, setselectProductsVersion] = useState([]);
  const [selectLocales, setselectLocales] = useState([]);
  const [screenshots, setscreenshots] = useState([]);
  const [screenshots_en, setscreenshots_en] = useState([]);
  const [itemCount, setitemCount] = useState("");
  const [elements_right, setelement_right] = useState([]);
  const [elements_left, setelement_left] = useState([]);
  const [isProductsVersionSelected, setisProductsVersionSelected] = useState(
    false
  );
  const [isLocaleSelected, setisLocaleSelected] = useState(false);
  const [previousProductID, setpreviousProductID] = useState(
    props.match.params.productid
  );
  // function handleDropdownChangeVersion(version) {
  //   setselectProductsVersion(version, setisProductsVersionSelected(true));
  // }
  // function handleDropdownChangeLocale(locale) {
  //   setselectLocales(locale, setisLocaleSelected(true));
  // }
  function setImages(offset, perPage) {
    if (screenshots_en.length !== 0) {
      let elements_left = screenshots_en[0].Images.slice(
        offset,
        offset + perPage
      );
      setelement_left(elements_left);
    }
    if (screenshots.length !== 0) {
      let elements_right = screenshots[0].Images.slice(
        offset,
        offset + perPage
      );
      setelement_right(elements_right);
    }
  }
  const handleSubmit = () => {
    // e.preventDefault();
    // console.log("Clicked");
    // Screenshots();
    
    // console.log(selectProductsVersion);
    // console.log(selectLocales);
    // this.fetchall(); 
    
    axios.get(`${BASE_URL}/screenshots`, { 
      params: {
              product_version_id: selectProductsVersion,
              locale_id: selectLocales,
            }
           })
      .then(screenshots => {
        console.log(screenshots);
        console.log(screenshots.data);
      })
      axios.get(`${BASE_URL}/screenshots`, { 
        params: {
                product_version_id: selectProductsVersion,
                locale_id: 3,
              }
             })
        .then(screenshots_en => {
          console.log(screenshots_en)
          console.log(screenshots_en.data);
        })
    }
  
  // useEffect(() => {
  //   const fetchall = async () => {
  //     console.log(selectProductsVersion)
  //     console.log(selectLocales)
  //     const screenshotsData = await axios(`${BASE_URL}/screenshots`, {
  //       params: {
  //         product_version_id: selectProductsVersion,
  //         locale_id: selectLocales,
  //       },
  //     });
  //     const screenshots_enData = await axios(`${BASE_URL}/screenshots`, {
  //       params: {
  //         product_version_id: selectProductsVersion,
  //         locale_id: 3,
  //       },
  //     });
  //     setscreenshots(screenshotsData.data);
  //     setscreenshots_en(screenshots_enData.data);
  //     setitemCount(Math.ceil(screenshots_enData.data[0].Images.length));
  //   };
  //   fetchall();
  // }, []);

  useEffect(() => {
    const fetchProductsVersionData = async () => {
      const ProductsVersionData = await axios(
        `${BASE_URL}/products/${previousProductID}/product_versions`
      );
      const LocalesData = await axios(`${BASE_URL}/locales`);
      setProductsVersion(ProductsVersionData.data);
      setselectProductsVersion(ProductsVersionData.data.id);
      setLocales(LocalesData.data);
      setselectLocales(LocalesData.data.id);
    };
    fetchProductsVersionData();
  }, []);

  return (
    <AppPage>
      {/* <PageSection>
        <VersionsToolbar
          selectProductsVersion={setselectProductsVersion(
            selectProductsVersion
          )}
          selectLocales={setselectLocales(selectLocales)}
          products_version={setProductsVersion(products_version)}
          locales={setLocales(locales)}
          handleProductsVersion={handleDropdownChangeVersion}
          handleLocales={handleDropdownChangeLocale}
          handleFormSubmit={handleSubmit}
        />
      </PageSection> */}
      <PageSection>
        <EmptyStateForm
          products_version={products_version}
          locales={locales}
          handleVersionChange={(e) =>
            setselectProductsVersion(e)
          }
          handleLocaleChange={(e) => setselectLocales(e)}
          handleFormSubmit={() => handleSubmit()}
        ></EmptyStateForm>
      </PageSection>
    </AppPage>
  );
}
