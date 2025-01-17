import { auth, clerkClient } from "@clerk/nextjs/server";
import { getMonth, isMatch } from "date-fns";
import { redirect } from "next/navigation";
import { canUserAddTransaction } from "../_data/can-user-add-transaction";
import { getDashboard } from "../_data/get-dashboard";
import Dashboard from "./_components/dashboard";

interface HomeProps {
  searchParams: {
    month: string;
  };
}

export default async function Home({ searchParams: { month } }: HomeProps) {
  const { userId } = await auth();

  if (!userId) {
    redirect("/login");
  }

  let updatedMonth =
    month !== undefined ? month : (new Date().getMonth() + 1).toString();

  if (updatedMonth.length < 2 && updatedMonth.length > 0) {
    updatedMonth = "0" + updatedMonth;
  }
  const year = new Date().getFullYear();
  const monthIsValid = !updatedMonth || !isMatch(updatedMonth, "MM");
  if (monthIsValid) {
    // Obtendo o índice do mês (0 para Janeiro, 11 para Dezembro)
    console.log("entrou aqui ", updatedMonth);
    const monthIndex = getMonth(new Date()) + 1;
    redirect("?month=" + monthIndex.toString());
  }
  const user = await clerkClient().users.getUser(userId);
  const accountType = (user.publicMetadata.subscriptionPlan as string) || null;
  const dashboard = await getDashboard(updatedMonth, year);
  const userCanAddTransaction = await canUserAddTransaction();
  return (
    <Dashboard
      updatedMonth={updatedMonth}
      dashboard={dashboard}
      type={accountType}
      userCanAddTransaction={userCanAddTransaction}
    />
  );
}
