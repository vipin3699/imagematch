import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import BASE_URL from "../API/BASE_URL";
import AppPage from "../PageHeader/page";
import { PageSection } from "@patternfly/react-core";
import VersionsToolbar from "./VersionToolbar";
import EmptyStateForm from "./EmptyStateForm";
import Screenshots from "./Screenshots";
import {test} from "./test"

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
  const [isProductsVersionSelected, setisProductsVersionSelected] = useState(
    false
  );
  const [isLocaleSelected, setisLocaleSelected] = useState(false);
  const [previousProductID, setpreviousProductID] = useState(
    props.match.params.productid
  );

  function handleDropdownChangeVersion(version) {
    setselectProductsVersion(version, setisProductsVersionSelected(true));
    console.log(selectProductsVersion)
  }
  function handleDropdownChangeLocale(locale) {
    setselectLocales(locale, setisLocaleSelected(true));
    console.log(locale)
  }
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

  function onSubmit(props){
    const {history} = props;
    test(props);
  }
  // async function Data() {
//     useEffect(() => {
//       // async function Data() {
//     function onSubmit(Data){
//        console.log(Data)
//         const screenshotsData =  axios(`${BASE_URL}/screenshots`, {
//           params: {
//             product_version_id: selectProductsVersion,
//             locale_id:  selectLocales
//           },
//         })
//         const screenshots_enData =  axios(`${BASE_URL}/screenshots`, {
//           params: {
//             product_version_id: selectProductsVersion,
//             locale_id: 3,
//           },
//         })
//         setscreenshots(screenshotsData.data);
//         setscreenshots_en(screenshots_enData.data);

//       // setitemCount(Math.ceil(screenshots_enData.data[0].Images.length));
//   }
//   onSubmit();
// }, []);
  
 
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
          handleVersionChange={(version) =>
            setselectProductsVersion(version),
            console.log((selectProductsVersion))
            
          }
          handleLocaleChange={(locale) => setselectLocales(locale),
          console.log(selectLocales)}
          handleSubmit={(props) => onSubmit(props)}
        ></EmptyStateForm>
      </PageSection>
    </AppPage>
  );
}
