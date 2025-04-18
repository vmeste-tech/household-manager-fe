import ApartmentCard from "./ApartmentCard";
import FinancesCard from "./FinancesCard";
import InboxCard from "./InboxCard";
import PenaltyCard from "./PenaltyCard";
import PurchasesCard from "./PurchasesCard";
import RulesCard from "./RulesCard";
import TasksCard from "./TasksCard";
import WelcomeCard from "./WelcomeCard";

const MainContent = () => {
  return (
    <main className="flex-1 p-4 sm:px-6 lg:px-8">
      <div className="flex flex-col lg:flex-row gap-4 mb-6">
        <WelcomeCard />
        <InboxCard />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <TasksCard />
        <RulesCard activeRules={3} votingRules={1} />
        <PenaltyCard finesCount={2} totalFines={430} />
        <FinancesCard balance={100} />
        <PurchasesCard
          purchasesData={[
            100, 250, 345, 234, 543, 123, 453, 234, 123, 432, 212, 1000,
          ]}
        />
        <ApartmentCard
          apartmentName={"Большая Очаковская 2"}
          residentsCount={3}
          daysLived={720}
        />
      </div>
    </main>
  );
};

export default MainContent;
