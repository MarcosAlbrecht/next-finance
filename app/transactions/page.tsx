import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import AddTransactionButton from "../_components/add-transaction-button";
import NavBar from "../_components/navbar";
import { DataTable } from "../_components/ui/data-table";
import { ScrollArea } from "../_components/ui/scroll-area";
import { db } from "../_lib/prisma";
import { transactionsColumns } from "./_columns";

export default async function TransactionsPage() {
  const { userId } = await auth();
  if (!userId) {
    redirect("/login");
  }
  //acessar as transaçoes do banco de dados
  const transactions = await db.transaction.findMany({
    where: { userId },
    orderBy: { date: "asc" },
  });
  return (
    <>
      <NavBar />
      <div className="space-y-6 overflow-hidden p-6">
        <div className="flex w-full items-center justify-between">
          <h1 className="text-2xl font-bold">Transações</h1>
          <AddTransactionButton />
        </div>
        <div>
          <ScrollArea>
            <DataTable columns={transactionsColumns} data={transactions} />
          </ScrollArea>
        </div>
      </div>
    </>
  );
}
