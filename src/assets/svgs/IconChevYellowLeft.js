import React, { useState, useEffect, useReducer } from "react";
// import parse from 'html-react-parser';
// import Container from 'react-bootstrap/Container';
// import 'bootstrap/dist/css/bootstrap.css';
// // import 'bootstrap-icons/font/bootstrap-icons.css';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
// import styles from './IconChevYellowLeft.module.css'; // Import css modules stylesheet as styles

const IconChevYellowLeft = ({ width, height, color, opacity }) => {
  // //console.log(title)

  React.useEffect(() => {}, []);
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      id="chevLeft"
      width="26.9"
      height="46.34"
      viewBox="0 0 26.9 46.34"
    >
      <path
        id="chevLeft"
        d="M97.142,22.445a3.116,3.116,0,0,0,.932,2.223L117.61,43.974a3.209,3.209,0,0,0,4.5,0,3.118,3.118,0,0,0,0-4.447L104.823,22.445,122.11,5.361a3.117,3.117,0,0,0,0-4.446,3.209,3.209,0,0,0-4.5,0L98.073,20.222A3.119,3.119,0,0,0,97.142,22.445Z"
        transform="translate(-96.642 0.725)"
        fill="none"
        stroke="#ffe600"
        strokeWidth="1"
      />
    </svg>
  );
};

export default IconChevYellowLeft;
