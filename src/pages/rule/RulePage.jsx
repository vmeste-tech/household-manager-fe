import { useState } from "react";
import DashboardHeader from "../../components/Dashboard/DashboardHeader";
import RuleCards from "../../components/Rules/RuleCards";
import Tabs from "../../components/Rules/Tabs";
import CustomButton from "../../components/Universal/CustomButton";
import CreateRuleModal from "../../components/Modal/CreateRuleModal";

function RulePage() {
  const [activeFilter, setActiveFilter] = useState("Все");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreateRule = (ruleData) => {
    console.log("Создать правило:", ruleData);
    // Здесь можно добавить вызов API для создания правила
    setIsModalOpen(false);
  };

  return (
    <div className="bg-indigo-50 min-h-screen overflow-x-hidden">
      <DashboardHeader />
      <div className="pt-20 max-w-7xl mx-auto flex flex-col gap-8">
        <Tabs activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
        <RuleCards activeFilter={activeFilter} />
        <div className="flex justify-center">
          <CustomButton
            text="+ Создать правило"
            variant="filled"
            onClick={() => setIsModalOpen(true)}
          />
        </div>
      </div>
      {isModalOpen && (
        <CreateRuleModal
          onClose={() => setIsModalOpen(false)}
          onCreate={handleCreateRule}
        />
      )}
    </div>
  );
}

export default RulePage;
