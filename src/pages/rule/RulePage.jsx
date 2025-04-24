import { useState, useEffect } from "react";
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
  const [refreshRules, setRefreshRules] = useState(false);
  const [ruleStats, setRuleStats] = useState({
    activeRules: 0,
    votingRules: 0
  });

  const fetchRuleData = () => {
    try {
      const apartmentId = localStorage.getItem("apartmentId");
      
      if (!apartmentId) {
        console.error("Идентификатор квартиры не найден");
        return;
      }
      
      setIsLoading(true);
      ruleApi.getApartmentRules(apartmentId, (error, data) => {
        setIsLoading(false);
        
        if (error) {
          console.error("Error fetching rules:", error);
          return;
        }
        
        const activeRules = data.filter(rule => rule.status === "ACCEPTED").length;
        const votingRules = data.filter(rule => rule.status === "VOTING").length;
        
        setRuleStats({
          activeRules,
          votingRules
        });
      });
    } catch (err) {
      console.error("Failed to fetch rule stats:", err);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRuleData();
  }, [refreshRules]);

  const statsData = [
    {
      title: "Активные правила",
      value: String(ruleStats.activeRules),
      changeText: "с прошлой недели",
      isIncrease: true,
    },
    {
      title: "На голосовании",
      value: String(ruleStats.votingRules),
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
      const createRuleRequest = new CreateRuleRequest(
        ruleData.name,
        ruleData.description,
        ruleData.cronExpression,
        ruleData.timeZone
      );
      
      if (ruleData.penaltyAmount) {
        createRuleRequest.penaltyAmount = parseFloat(ruleData.penaltyAmount);
      }
      
      createRuleRequest.apartmentId = ruleData.apartmentId;
      
      ruleApi.createRule(createRuleRequest, (error, data) => {
        setIsLoading(false);
        
        if (error) {
          console.error("Error creating rule:", error);
          setErrorMsg("Не удалось создать правило");
        } else {
          console.log("Rule created successfully:", data);
          setIsModalOpen(false);
          setRefreshRules(prev => !prev);
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
        <RuleCards activeFilter={activeFilter} refresh={refreshRules} />

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
          isLoading={isLoading}
        />
      )}
    </div>
  );
}

export default RulePage;
