import DashboardHeader from "../../components/Dashboard/DashboardHeader";
import PenaltyStats from "../../components/Penalty/PenaltyStats";
import PenaltyTable from "../../components/Penalty/PenaltyTable";

function PenaltyPage() {
  return (
    <div className="bg-indigo-50 min-h-screen overflow-x-hidden">
      <DashboardHeader />
      <div className="pt-20 max-w-7xl mx-auto flex flex-col gap-8">
        <PenaltyStats />
        <PenaltyTable />
      </div>
    </div>
  );
}

export default PenaltyPage;
