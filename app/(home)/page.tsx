import { auth, clerkClient } from "@clerk/nextjs/server";
import { getMonth, isMatch } from "date-fns";
import { redirect } from "next/navigation";
import { userHasPremiumfunction } from "../_actions/user-haspremium";
import Navbar from "../_components/navbar";
import { ScrollArea } from "../_components/ui/scroll-area";
import { canUserAddTransaction } from "../_data/can-user-add-transaction";
import { getDashboard } from "../_data/get-dashboard";
import AiReportButton from "./_components/ai-report-button";
import { ExpensesPerCategory } from "./_components/expenses-per-category";
import LastTransactions from "./_components/last-transactions";
import SummaryCards from "./_components/summary-cards";
import TimeSelect from "./_components/time-select";
import TransactionPieChart from "./_components/transactions-pi-chart";

interface HomeProps {
  searchParams: {
    month?: string;
  };
}

export default async function Home({ searchParams }: HomeProps) {
  const { userId } = await auth();

  if (!userId) {
    redirect("/login");
  }
  const month = searchParams.month || new Date().toISOString().slice(0, 7);
  let updatedMonth =
    month !== undefined ? month : (new Date().getMonth() + 1).toString();

  if (updatedMonth.length < 2 && updatedMonth.length > 0) {
    updatedMonth = "0" + updatedMonth;
  }

  const monthIsValid = !updatedMonth || !isMatch(updatedMonth, "MM");
  if (monthIsValid) {
    // Obtendo o índice do mês (0 para Janeiro, 11 para Dezembro)
    console.log("entrou aqui ", updatedMonth);
    const monthIndex = getMonth(new Date()) + 1;
    redirect("?month=" + monthIndex.toString());
  }
  const year = new Date().getFullYear();
  const dashboard = await getDashboard(updatedMonth, year);
  const userCanAddTransaction = await canUserAddTransaction();
  const user = await clerkClient().users.getUser(userId);
  const haspremium = await userHasPremiumfunction(userId);
  return (
    <ScrollArea className="rounded-md border">
      <Navbar />
      <div className="flex h-full flex-col space-y-4 overflow-auto p-4 sm:space-y-6 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
          <h1 className="text-lg font-bold sm:text-2xl">Dashboard</h1>
          <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
            <AiReportButton
              month={month}
              hasPremiumPlan={
                user.publicMetadata.subscriptionPlan === "premium"
              }
            />
            <TimeSelect />
          </div>
        </div>

        {/* Configuração da grade para responsividade */}
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-[2fr,1fr] xl:gap-6">
          {/* Coluna principal */}
          <div className="flex flex-col gap-4 md:gap-6">
            <SummaryCards
              month={month}
              {...dashboard}
              userCanAddTransaction={userCanAddTransaction}
              hasPremium={haspremium}
            />
            <div className="grid grid-cols-1 gap-4 md:gap-6 xl:grid-cols-3">
              <TransactionPieChart {...dashboard} />
              <ExpensesPerCategory
                expensesPerCategory={dashboard.totalExpensePerCategory}
              />
            </div>
          </div>

          {/* LastTransactions será jogado para baixo em telas menores */}
          <div className="xl:col-start-2 xl:row-start-auto">
            <LastTransactions lastTransactions={dashboard.lastTransactions} />
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}
