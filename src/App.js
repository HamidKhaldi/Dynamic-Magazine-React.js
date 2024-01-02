import React, { useState, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./pages/Root";
import ErrorPage from "./pages/Error";
import LoadingComponent from "./components/LoadingComponent/LoadingComponent";
import UserAnalytics from "./analyticsPlugin/UserAnalytics";
import EventAnalytics from "./analyticsPlugin/EventAnalytics";
import PageTemplate from "./pages/PageTemplate";
import { usePathString } from "./hooks/usePathString";
import { AllDataContext } from "./store/data-context";
import GetAllData from "./data/api";

import "./App.scss";

function App() {
  const [listData, setListData] = useState({});
  const [pageData, setPageData] = useState([]);
  const returnedPath = usePathString();

  const fetchData = async () => {
    try {
      const data = await GetAllData();
      setListData(data);
      setPageData(data.pagesData);
      ////console.log("data", data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  fetchData();

  return (
    <AllDataContext.Provider value={listData}>
      {Object.keys(listData).length === 22 ? (
        <RouterProvider
          router={createRouter(listData, pageData, returnedPath)}
        />
      ) : (
        <LoadingComponent />
      )}
    </AllDataContext.Provider>
  );
}

function orderBy(data) {
  return data.sort((a, b) => a.Nav_x002d_Order - b.Nav_x002d_Order);
}

function createRouter(listData, pageData, returnedPath) {
  pageData = orderBy(pageData);
  const routerConfig = pageData.map((item) => ({
    path: returnedPath + "/" + item.Title.replace(/\s+/g, ""), // Remove spaces and use as path .replace(/\s+/g, '')
    element: <PageTemplate pageID={item.ID} Title={item.Title} />,
    name: item.Title,
  }));

  const indexID = pageData.find((item) => item.Nav_x002d_Order === 1).ID;
  const indexTitle = pageData.find((item) => item.Nav_x002d_Order === 1).Title;

  return createBrowserRouter([
    {
      path: returnedPath + "/",
      element: (
        <UserAnalytics>
          <EventAnalytics>
            <RootLayout routerConfig={routerConfig} />
          </EventAnalytics>
        </UserAnalytics>
      ),
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          path: "",
          element: <PageTemplate pageID={indexID} Title={indexTitle} />,
        },
        ...routerConfig,
      ],
    },
  ]);
}

export default App;
