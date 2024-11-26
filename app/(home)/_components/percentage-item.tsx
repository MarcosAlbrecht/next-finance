import { ReactNode } from "react";

interface PerncetagemItemProps {
  icon: ReactNode;
  value: number;
  title: string;
}

const PercentagemItem = ({ icon, value, title }: PerncetagemItemProps) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="rounded-lg bg-white bg-opacity-[3%] p-2">{icon}</div>

        <p className="text-sm text-muted-foreground">{title}</p>
      </div>
      <p className="text-sm font-bold">{value}%</p>
    </div>
  );
};

export default PercentagemItem;
