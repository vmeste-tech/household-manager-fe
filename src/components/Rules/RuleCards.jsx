import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import RuleCard from "./RuleCard";
import RuleDetails from "./RuleDetails";
import { ruleApi } from "../../api";

const RuleCards = ({ activeFilter, refresh }) => {
  const [selectedRule, setSelectedRule] = useState(null);
  const [rules, setRules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Status-based styling configuration
  const statusStyles = {
    Принятые: {
      gradientClass: "from-green-500 to-teal-600",
      svgPath: "M5 13l4 4L19 7",
      svgViewBox: "0 0 24 24",
      badgeClass: "bg-green-100 text-green-800",
    },
    "На голосовании": {
      gradientClass: "from-amber-400 to-orange-500",
      svgPath:
        "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z",
      svgViewBox: "0 0 24 24",
      badgeClass: "bg-amber-100 text-amber-800",
    },
    Отклонённые: {
      gradientClass: "from-red-400 to-red-600",
      svgPath: "M6 18L18 6M6 6l12 12",
      svgViewBox: "0 0 24 24",
      badgeClass: "bg-red-100 text-red-800",
    },
  };

  useEffect(() => {
    const statusMapping = {
      "ACCEPTED": "Принятые",
      "VOTING": "На голосовании",
      "REJECTED": "Отклонённые"
    };
    
    const fetchRules = async () => {
      try {
        setLoading(true);
        const apartmentId = localStorage.getItem("apartmentId");
        
        if (!apartmentId) {
          throw new Error("Идентификатор квартиры не найден");
        }
        
        ruleApi.getApartmentRules(apartmentId, (error, data) => {
          if (error) {
            console.error("Error fetching rules:", error);
            setError("Не удалось загрузить правила");
            setLoading(false);
            return;
          }
          
          // Transform API data to match our component's expected format
          const transformedRules = data.map(rule => ({
            id: rule.id,
            title: rule.name,
            description: rule.description,
            status: statusMapping[rule.status] || "На голосовании",
            fine: `${rule.penaltyAmount}₽`,
            votesFor: rule.votesFor || 0,
            votesAgainst: rule.votesAgainst || 0,
            createdBy: rule.createdBy || "Система",
            createdAt: rule.createdAt || new Date().toISOString(),
            cronExpression: rule.cronExpression || "",
            timeZone: rule.timeZone || "Europe/Moscow"
          }));
          
          setRules(transformedRules);
          setLoading(false);
        });
      } catch (err) {
        console.error("Failed to fetch rules:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchRules();
  }, [refresh, activeFilter]);

  const filteredRules =
    activeFilter === "Все"
      ? rules
      : rules.filter((rule) => rule.status === activeFilter);

  const handleVote = (ruleId, voteType) => {
    // Здесь будет логика обработки голосования
    console.log(`Проголосовал ${voteType} за правило ${ruleId}`);

    // В реальном приложении здесь был бы API-запрос
    // и обновление состояния после успешного ответа
  };

  const closeDetails = () => {
    setSelectedRule(null);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
        <p>{error}</p>
        <button 
          className="mt-2 text-sm text-red-700 hover:text-red-900 underline"
          onClick={() => window.location.reload()}
        >
          Попробовать снова
        </button>
      </div>
    );
  }

  return (
    <>
      {filteredRules.length === 0 ? (
        <div className="text-center p-8 bg-gray-50 rounded-lg">
          <p className="text-gray-600">Правила не найдены</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRules.map((rule) => (
            <RuleCard
              key={rule.id}
              rule={rule}
              styleConfig={statusStyles[rule.status]}
              onClick={() => setSelectedRule(rule)}
            />
          ))}
        </div>
      )}

      {selectedRule && (
        <RuleDetails
          rule={selectedRule}
          styleConfig={statusStyles[selectedRule.status]}
          onClose={closeDetails}
          onVote={handleVote}
        />
      )}
    </>
  );
};

RuleCards.propTypes = {
  activeFilter: PropTypes.string.isRequired,
  refresh: PropTypes.bool
};

export default RuleCards;
