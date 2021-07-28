import React from "react";
import { useSelector } from "react-redux";

export default function Loader() {
  const { loader } = useSelector((state) => state);
  return <div></div>;
}
