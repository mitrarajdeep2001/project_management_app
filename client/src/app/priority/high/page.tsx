import React from "react";
import ReusablePriorityPage from "../../../components/reusablePriorityPage";
import { Priority } from "@/lib/types";
const Urgent = () => {
  return <ReusablePriorityPage priority={Priority.High} />;
};

export default Urgent;
