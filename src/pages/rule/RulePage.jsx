import { useState } from "react";
import DashboardHeader from "../../components/Dashboard/DashboardHeader";
import RuleCards from "../../components/Rules/RuleCards";
import Tabs from "../../components/Rules/Tabs";

function RulePage() {
  const [activeFilter, setActiveFilter] = useState("Все");

  return (
    <div className="bg-indigo-50 min-h-screen overflow-x-hidden">
      <DashboardHeader />
      <div className="pt-20 max-w-7xl mx-auto flex flex-col gap-8">
        <Tabs activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
        <RuleCards activeFilter={activeFilter} />
      </div>
    </div>
  );
}

export default RulePage;
