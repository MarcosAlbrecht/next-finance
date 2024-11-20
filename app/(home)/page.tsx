import { auth } from "@clerk/nextjs/server";
import { getMonth, isMatch } from "date-fns";
import { redirect } from "next/navigation";
import NavBar from "../_components/navbar";
import SummaryCards from "./_components/summary-cards";
import TimeSelect from "./_components/time-select";

interface HomeProps {
  searchParams: {
    month: string;
  };
}

export default async function Home({ searchParams: { month } }: HomeProps) {
  const { userId } = await auth();
  let updatedMonth = month;
  if (!userId) {
    redirect("/login");
  }

  updatedMonth = month;

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
  return (
    <>
      <NavBar />
      <div className="space-y-6 p-6">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <TimeSelect />
        </div>
        <SummaryCards month={updatedMonth} />
      </div>
    </>
  );
}
