import PageHeader from "../../components/PageHeader/PageHeader";
import violationIcon from "../../assets/violation.svg";
import ViolationCard from "../../components/ViolationCard/ViolationCard";

function ViolationPage() {
  return (
    <div className="task-page">
      <PageHeader
        title="ШТРАФЫ"
        icon={violationIcon}
        gradientStart="#C24141"
        gradientEnd="#000000"
      />

      <div className="flex justify-center items-center h-screen">
        <ViolationCard
          user="Егор"
          status="не оплачен"
          date="17.01.2025"
          amount="500 руб."
          description="Это подробное описание нарушения. Здесь может быть дополнительная информация о событии."
        />
      </div>
    </div>
  );
}

export default ViolationPage;
