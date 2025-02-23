import "./ActiveVotes.css";
import VoteWidget from "../../components/VoteWidget/VoteWidget";

function ActiveVotes() {
  // Обработчик голосования
  const handleVote = (value) => {
    console.log("Голос за правило:", value);
    // Здесь можно реализовать вызов API для сохранения голоса и обновления статистики
  };

  return (
    <VoteWidget
      title="Голосование за правило"
      options={[
        { label: "За", value: "for" },
        { label: "Против", value: "against" },
      ]}
      onVote={handleVote}
    />
  );
}

export default ActiveVotes;
