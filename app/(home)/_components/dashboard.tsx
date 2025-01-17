"use client";

import Navbar from "@/app/_components/navbar";
import { ScrollArea } from "@/app/_components/ui/scroll-area";
import { useUserContext } from "@/app/_contexts/userContext";
import { useEffect } from "react";
import ExpensesPerCategory from "./expenses-per-category";
import LastTransactions from "./last-transactions";
import SummaryCards from "./summary-cards";
import TimeSelect from "./time-select";
import TransactionsPieChart from "./transactions-pie-chart";

interface DashboardProps {
  updatedMonth: string;
  dashboard: any;
  type: string | null; // Substitua "any" pela tipagem correta do seu dashboard
  userCanAddTransaction: boolean;
}

export default function Dashboard({
  updatedMonth,
  dashboard,
  type,
  userCanAddTransaction,
}: DashboardProps) {
  const { setAccountType } = useUserContext();

  useEffect(() => {
    setAccountType(type);
  }, []);

  const year = new Date().getFullYear();

  return (
    <ScrollArea className="rounded-md border">
      <Navbar />
      <div className="flex h-full flex-col space-y-4 overflow-auto p-4 sm:space-y-6 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
          <h1 className="text-lg font-bold sm:text-2xl">Dashboard</h1>
          <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
            <TimeSelect />
          </div>
        </div>

        {/* Configuração da grade para responsividade */}
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-[2fr,1fr] xl:gap-6">
          {/* Coluna principal */}
          <div className="flex flex-col gap-4 md:gap-6">
            <SummaryCards
              month={updatedMonth}
              {...dashboard}
              userCanAddTransaction={userCanAddTransaction}
            />
            <div className="grid grid-cols-1 gap-y-4 md:gap-6 xl:grid-cols-3">
              <TransactionsPieChart {...dashboard} />
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
