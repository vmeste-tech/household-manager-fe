import { useState } from "react";
import DashboardHeader from "../../components/Dashboard/DashboardHeader";
import RuleCards from "../../components/Rules/RuleCards";
import Tabs from "../../components/Rules/Tabs";
import CustomButton from "../../components/Universal/CustomButton";

function RulePage() {
  const [activeFilter, setActiveFilter] = useState("Все");

  return (
    <div className="bg-indigo-50 min-h-screen overflow-x-hidden">
      <DashboardHeader />
      <div className="pt-20 max-w-7xl mx-auto flex flex-col gap-8">
        <Tabs activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
        <RuleCards activeFilter={activeFilter} />
        <div className="flex justify-center">
          <CustomButton text="+ Создать правило" variant="filled" />
        </div>
      </div>
    </div>
  );
}

export default RulePage;
