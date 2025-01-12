import {
  PiggyBankIcon,
  TrendingDownIcon,
  TrendingUpIcon,
  WalletIcon,
} from "lucide-react";
import SummaryCard from "./summary-card";

interface SummaryCard {
  month: string;
  balance: number;
  depositsTotal: number;
  investimentsTotal: number;
  expensesTotal: number;
  userCanAddTransaction?: boolean;
  hasPremium: boolean;
}

export default async function SummaryCards({
  balance,
  depositsTotal,
  expensesTotal,
  investimentsTotal,
  userCanAddTransaction,
  hasPremium,
}: SummaryCard) {
  return (
    <div className="space-y-6">
      {/*Primero card  */}

      <SummaryCard
        icon={<WalletIcon size={16} />}
        title="Saldo"
        amount={balance}
        size="large"
        userCanAddTransaction={userCanAddTransaction}
        hasPremium={hasPremium}
      />

      {/* outros cards */}
      <div className="grid gap-6 sm:grid-cols-3">
        <SummaryCard
          icon={<PiggyBankIcon size={16} />}
          title="Investido"
          amount={investimentsTotal}
          hasPremium={hasPremium}
        />
        <SummaryCard
          icon={<TrendingUpIcon size={16} className="text-primary" />}
          title="Receita"
          amount={depositsTotal}
          hasPremium={hasPremium}
        />

        <SummaryCard
          icon={<TrendingDownIcon size={16} className="text-red-500" />}
          title="Despesas"
          amount={expensesTotal}
          hasPremium={hasPremium}
        />
      </div>
    </div>
  );
}
