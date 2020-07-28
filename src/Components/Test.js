
import React, { useState, useEffect } from "react";
import axios from "axios";
import BASE_URL from "../API/BASE_URL";
function useTest(selectedVersion, selectedLocale) {
  const [screenshots, setscreenshots] = useState([]);

  console.log(selectedVersion, selectedLocale)
  useEffect(() => {
    (async () => {
      const screenshotsData = await axios(`${BASE_URL}/screenshots`, {
        params: {
          product_version_id: selectedVersion,
          locale_id: selectedLocale
        },
      })
      setscreenshots(screenshotsData.data.results)
      console.log(screenshotsData.data.results)
    })()
  }, [])

  const [screenshots_en, setscreenshots_en] = useState([]);
  const [itemCount, setitemCount] = useState("");

  useEffect(() => {
    (async () => {
      const screenshots_enData = await axios(`${BASE_URL}/screenshots`, {
        params: {
          product_version_id: selectedVersion,
          locale_id: 3,
        },
      })
      setscreenshots_en(screenshots_enData.data);
      setitemCount(Math.ceil(screenshots_enData.data[0].Images.length));
    })()
  }, [])



  return (
    console.log(screenshots.data, screenshots_en.data, itemCount.data)
  )
}

export default useTest;
