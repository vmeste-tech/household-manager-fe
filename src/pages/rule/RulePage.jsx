import { useState } from "react";
import DashboardHeader from "../../components/Dashboard/DashboardHeader";
import RuleCards from "../../components/Rules/RuleCards";
import Tabs from "../../components/Rules/Tabs";
import CustomButton from "../../components/Universal/CustomButton";
import CreateRuleModal from "../../components/Modal/CreateRuleModal";
import Heading from "../../components/Universal/Heading";
import StatCardsGrid from "../../components/Tasks/TaskStats";
import CreateRuleRequest from "../../generated-rules-client-js/src/model/CreateRuleRequest";
import { ruleApi } from "../../api";

function RulePage() {
  const [activeFilter, setActiveFilter] = useState("Все");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

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
    setIsLoading(true);
    setErrorMsg("");
    
    try {
      // Create a request object based on the API model
      const createRuleRequest = new CreateRuleRequest(
        ruleData.name,
        ruleData.description,
        ruleData.cronExpression,
        ruleData.timeZone
      );
      
      // Set optional penaltyAmount if it exists
      if (ruleData.penaltyAmount) {
        createRuleRequest.penaltyAmount = parseFloat(ruleData.penaltyAmount);
      }
      
      // Add apartmentId from the input data
      createRuleRequest.apartmentId = ruleData.apartmentId;
      
      // Call the API
      ruleApi.createRule(createRuleRequest, (error, data) => {
        setIsLoading(false);
        
        if (error) {
          console.error("Error creating rule:", error);
          setErrorMsg("Не удалось создать правило");
        } else {
          console.log("Rule created successfully:", data);
          // Close the modal
          setIsModalOpen(false);
          
          // You might want to refresh the rules list here or show a success message
          // This would depend on how your RuleCards component gets its data
          // If RuleCards fetches data on mount, you could implement a refresh mechanism
        }
      });
    } catch (error) {
      console.error("Error preparing rule creation request:", error);
      setIsLoading(false);
      setErrorMsg("Ошибка при создании правила");
    }
  };

  return (
    <div className="bg-indigo-50 min-h-screen overflow-x-hidden">
      <DashboardHeader />
      <div className="pt-20 max-w-7xl mx-auto flex flex-col gap-8 px-4">
        {errorMsg && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            {errorMsg}
            <span className="absolute top-0 right-0 px-4 py-3" onClick={() => setErrorMsg("")}>
              <svg className="h-6 w-6 text-red-500" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </span>
          </div>
        )}
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
          isLoading={isLoading} // Pass the loading state to the modal
        />
      )}
    </div>
  );
}

export default RulePage;
