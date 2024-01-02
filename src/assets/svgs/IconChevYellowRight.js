import React, { useState, useEffect, useReducer } from "react";
// import parse from 'html-react-parser';
// import Container from 'react-bootstrap/Container';
// import 'bootstrap/dist/css/bootstrap.css';
// // import 'bootstrap-icons/font/bootstrap-icons.css';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
// import styles from './IconChevYellowRight.module.css'; // Import css modules stylesheet as styles

const IconChevYellowRight = ({ width, height, color, opacity }) => {
  // //console.log(title)

  React.useEffect(() => {}, []);
  return (
    <svg
      id="chevRight"
      xmlns="http://www.w3.org/2000/svg"
      width="26.594"
      height="46.342"
      viewBox="0 0 26.594 46.342"
    >
      <path
        id="chevRight"
        d="M122.736,22.445a3.135,3.135,0,0,1-.921,2.223L102.51,43.974a3.144,3.144,0,0,1-4.447-4.447l17.082-17.082L98.063,5.361A3.144,3.144,0,1,1,102.51.916l19.306,19.306A3.138,3.138,0,0,1,122.736,22.445Z"
        transform="translate(-96.642 0.726)"
        fill="none"
        stroke="#ffe600"
        strokeWidth="1"
      />
    </svg>
  );
};

export default IconChevYellowRight;
