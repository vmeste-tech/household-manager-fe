import { useState } from "react";
import DashboardHeader from "../../components/Dashboard/DashboardHeader";
import RuleCards from "../../components/Rules/RuleCards";
import Tabs from "../../components/Rules/Tabs";
import CustomButton from "../../components/Universal/CustomButton";
import CreateRuleModal from "../../components/Modal/CreateRuleModal";
import Heading from "../../components/Universal/Heading";
import StatCardsGrid from "../../components/Tasks/TaskStats";

function RulePage() {
  const [activeFilter, setActiveFilter] = useState("Все");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Статистика для правил
  const statsData = [
    {
      title: "Активные правила",
      value: "5",
      changeText: "с прошлой недели",
      isIncrease: true,
    },
    {
      title: "На голосовании",
      value: "2",
      changeText: "новых предложений",
      isIncrease: true,
    },
    {
      title: "Соблюдаемость",
      value: "87%",
      changeText: "выше среднего",
      isIncrease: true,
    },
    {
      title: "Штрафы",
      value: "3420₽",
      changeText: "общая сумма",
      isIncrease: false,
    },
  ];

  const handleCreateRule = (ruleData) => {
    console.log("Создать правило:", ruleData);
    // Здесь можно добавить вызов API для создания правила
    setIsModalOpen(false);
  };

  return (
    <div className="bg-indigo-50 min-h-screen overflow-x-hidden">
      <DashboardHeader />
      <div className="pt-20 max-w-7xl mx-auto flex flex-col gap-8 px-4">
        <Heading>Статистика правил</Heading>
        <StatCardsGrid cardsData={statsData} />

        <Heading>Правила квартиры</Heading>
        <Tabs activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
        <RuleCards activeFilter={activeFilter} />

        <div className="flex justify-center mb-8">
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
