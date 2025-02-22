import PageHeader from "../../components/PageHeader/PageHeader";
import taskIcon from "../../assets/rule.svg";

function RulePage() {
  return (
    <PageHeader
      title="ПРАВИЛА"
      icon={taskIcon}
      gradientStart="#C26E41"
      gradientEnd="#000000"
    />
  );
}

export default RulePage;
