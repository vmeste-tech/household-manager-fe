import DashboardHeader from "../../components/Dashboard/DashboardHeader";
import PurchaseTables from "../../components/Purchases/PurchasesTable";
import Timeline from "../../components/Purchases/PurchaseHistory";
import Heading from "../../components/Universal/Heading";
import CustomButton from "../../components/Universal/CustomButton";

function PurchasesPage() {
  const expencesData = [
    {
      id: 1,
      item: "Продукты для недели",
      description: "Овощи, фрукты, молочные продукты, хлеб и яйца.",
    },
    {
      id: 2,
      item: "Бытовая химия",
      description:
        "Моющее средство, чистящие средства, мыло и дезинфицирующие средства.",
    },
    {
      id: 3,
      item: "Канцелярия",
      description: "Бумага, ручки, маркеры, степлеры и скрепки.",
    },
    {
      id: 4,
      item: "Зоотовары",
      description: "Корм, игрушки и аксессуары для домашних животных.",
    },
    {
      id: 5,
      item: "Одежда",
      description: "Футболки, джинсы, куртки и аксессуары.",
    },
    {
      id: 6,
      item: "Электроника",
      description: "Смартфоны, планшеты, наушники и зарядные устройства.",
    },
  ];

  const purchasesData = [
    {
      item: "Оплата ЖКХ",
      date: "2025-03-10",
      amount: 1500,
      description: "Оплата квартплаты за февраль.",
    },
    {
      item: "Покупка продуктов",
      date: "2025-03-11",
      amount: 2300,
      description: "Совместная покупка продуктов на неделю.",
    },
    {
      item: "Оплата интернета",
      date: "2025-03-12",
      amount: 800,
      description: "Ежемесячная оплата интернета.",
    },
  ];

  return (
    <div className="bg-indigo-50 min-h-screen overflow-x-hidden">
      <DashboardHeader />
      <div className="pt-20 max-w-7xl mx-auto flex flex-col gap-8">
        <Heading>Покупки и затраты</Heading>
        <div className="flex flex-col md:flex-row gap-8">
          {/* Таблица слева */}
          <div className="flex-1">
            <PurchaseTables expenses={expencesData} />
            <div className="flex justify-center mt-3">
              <CustomButton text="+ Добавить статью затрат" variant="filled" />
            </div>
          </div>
          {/* История справа */}
          <div className="flex-1">
            <Timeline purchases={purchasesData} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PurchasesPage;
