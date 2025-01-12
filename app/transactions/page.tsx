import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { userHasPremiumfunction } from "../_actions/user-haspremium";
import AddTransactionButton from "../_components/add-transaction-button";
import Navbar from "../_components/navbar";
import { DataTable } from "../_components/ui/data-table";
import { ScrollArea } from "../_components/ui/scroll-area";
import { canUserAddTransaction } from "../_data/can-user-add-transaction";
import { db } from "../_lib/prisma";
import { transactionsColumns } from "./_columns";

export default async function TransactionsPage() {
  const { userId } = await auth();
  if (!userId) {
    redirect("/login");
  }
  //acessar as transaçoes do banco de dados
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
  const hasPremium = await userHasPremiumfunction(userId);
  return (
    <>
      <Navbar />
      <div className="flex h-full flex-col space-y-6 overflow-hidden p-6">
        {/* TÍTULO E BOTÃO */}
        <div className="flex w-full items-center justify-between">
          <h1 className="text-2xl font-bold">Transações</h1>
          <AddTransactionButton
            userCanAddTransaction={userCanAddTransaction}
            hasPremium={hasPremium}
          />
        </div>
        {/* CONTAINER SCROLL */}
        <div className="flex-1 overflow-hidden overflow-y-auto">
          <ScrollArea className="col-span-2 h-full rounded-md border pb-6">
            <DataTable columns={transactionsColumns} data={transactions} />
          </ScrollArea>
        </div>
      </div>
    </>
  );
}
