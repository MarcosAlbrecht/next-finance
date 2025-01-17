import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import AddTransactionButton from "../_components/add-transaction-button";
import Navbar from "../_components/navbar";
import { DataTable } from "../_components/ui/data-table";
import { ScrollArea } from "../_components/ui/scroll-area";
import { canUserAddTransaction } from "../_data/can-user-add-transaction";
import { db } from "../_lib/prisma";
import { transactionColumns } from "./_columns";

const TransactionsPage = async () => {
  const { userId } = await auth();
  if (!userId) {
    redirect("/login");
  }
  // Obtém o primeiro dia do mês atual
  const currentDate = new Date();
  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1,
  );

  // Obtém o último dia do mês atual
  const lastDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0,
  );
  const transactions = JSON.parse(
    JSON.stringify(
      await db.transaction.findMany({
        where: {
          userId,
          date: {
            gte: firstDayOfMonth,
            lt: lastDayOfMonth,
          },
        },

        orderBy: { date: "asc" },
      }),
    ),
  );
  const userCanAddTransaction = await canUserAddTransaction();
  return (
    <>
      <Navbar />
      <div className="flex max-h-screen flex-col space-y-6 overflow-hidden p-4 md:p-6">
        {/* TÍTULO E BOTÃO */}
        <div className="flex flex-col items-start justify-between md:flex-row md:items-center">
          <h1 className="text-xl font-bold md:text-2xl">Transações</h1>
          <div className="mt-4 md:mt-0">
            <AddTransactionButton
              userCanAddTransaction={userCanAddTransaction}
            />
          </div>
        </div>

        {/* SCROLL AREA */}
        <div className="flex-1 overflow-hidden">
          <ScrollArea className="h-full max-h-[calc(100vh-8rem)] overflow-y-auto rounded-md border">
            <div className="overflow-hidden overflow-x-auto">
              <DataTable columns={transactionColumns} data={transactions} />
            </div>
          </ScrollArea>
        </div>
      </div>
    </>
  );
};

export default TransactionsPage;
