import PageHeader from "../../components/PageHeader/PageHeader";
import ruleIcon from "../../assets/rule.svg";
import RuleCard from "../../components/RuleCard/RuleCard";
import "./RulePage.css";

function RulesPage() {
  const handleCreateRule = () => {
    console.log("Создать правило");
    // Здесь можно открыть модальное окно или перенаправить пользователя на форму создания правила
  };

  const handleVote = (vote) => {
    console.log("Пользователь проголосовал:", vote);
  };
  return (
    <div className="rules-page">
      {/* Заголовок страницы */}
      <PageHeader
        title="ПРАВИЛА ПРОЖИВАНИЯ"
        icon={ruleIcon}
        gradientStart="#C26E41"
        gradientEnd="#000000"
      />
      {/* Принятое правило (без голосования) */}
      <RuleCard
        title="Не шуметь после 22:00"
        frequency="ежедневно"
        fine="300 руб."
        status="accepted"
        votingActive={false}
      />

      {/* Правило, ожидающее голосования */}
      <RuleCard
        title="Убирать за собой"
        frequency="еженедельно"
        fine="100 руб."
        status="pending"
        votingActive={true}
        onVote={handleVote}
      />

      {/* Отклонённое правило (без голосования) */}
      <RuleCard
        title="Запрещено оставлять мусор"
        frequency="ежемесячно"
        fine="500 руб."
        status="rejected"
        votingActive={false}
      />
      <button className="create-rule-button" onClick={handleCreateRule}>
        + Создать правило
      </button>
    </div>
  );
}

export default RulesPage;
