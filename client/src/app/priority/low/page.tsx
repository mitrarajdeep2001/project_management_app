import React from "react";
import ReusablePriorityPage from "../reusablePriorityPage";
import { Priority } from "@/lib/types";

const Urgent = () => {
  return <ReusablePriorityPage priority={Priority.Low} />;
};

export default Urgent;
