"use server";

import { db } from "@/app/_lib/prisma";
import { auth } from "@clerk/nextjs/server";
import {
  TransactionCategory,
  TransactionPaymentMethod,
  TransactionType,
} from "@prisma/client";
import { addMonths } from "date-fns";
import { revalidatePath } from "next/cache";
import { upsertTransactionSchema } from "./schema";

interface UpsertTransactionParams {
  id?: string;
  name: string;
  amount: number;
  type: TransactionType;
  category: TransactionCategory;
  paymentMethod: TransactionPaymentMethod;
  date: Date;
  installments: number;
  installment?: number;
  parentTransactionId?: string;
}

// export const upsertTransaction = async (params: UpsertTransactionParams) => {
//   upsertTransactionSchema.parse(params);
//   const { userId } = await auth();
//   if (!userId) {
//     throw new Error("Unauthorized");
//   }
//   console.log(`dados do upsert: `, params);

//   await db.transaction.upsert({
//     update: { ...params, userId },
//     create: { ...params, userId },
//     where: {
//       id: params?.id ?? "",
//     },
//   });
//   revalidatePath("/transactions");
// };

export const upsertTransaction = async (params: UpsertTransactionParams) => {
  upsertTransactionSchema.parse(params);

  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  const { id, amount, installments, date, ...transactionData } = params;

  // Valor de cada parcela
  const installmentAmount = amount / installments;

  let parentTransactionId = id;

  // Se for uma edição (ID fornecido), remover as parcelas existentes
  if (id) {
    const existingTransaction = await db.transaction.findUnique({
      where: { id },
    });

    if (!existingTransaction) {
      throw new Error("Transaction not found.");
    }

    // Remover todas as parcelas relacionadas ao registro pai
    await db.transaction.deleteMany({ where: { parentTransactionId: id } });

    await db.transaction.update({
      data: { ...params, installment: installments > 1 ? 1 : 0 },
      where: {
        id: id,
      },
    });
  } else {
    // Criar uma nova transação principal e obter o ID gerado
    const createdTransaction = await db.transaction.create({
      data: {
        ...transactionData,
        amount: installmentAmount, // Define o valor da primeira parcela
        installments,
        installment: installments > 1 ? 1 : null,
        userId,
        date, // A data da primeira parcela será a data inicial fornecida
      },
    });

    parentTransactionId = createdTransaction.id;
  }

  // Criar as parcelas adicionais, caso haja mais de uma
  if (installments > 1) {
    const additionalInstallments = Array.from(
      { length: installments - 1 },
      (_, index) => {
        const installmentDate = addMonths(date, index + 1); // Incrementa a data em 1 mês para cada parcela

        return {
          ...transactionData,
          userId,
          parentTransactionId,
          installments,
          installment: index + 2, // Começa na segunda parcela
          amount: installmentAmount, // Valor proporcional da parcela
          date: installmentDate, // Define a data de cada parcela com a função addMonths
        };
      },
    );

    // Inserir as parcelas adicionais no banco
    await db.transaction.createMany({
      data: additionalInstallments,
    });
  }

  // Revalidar a página de transações
  revalidatePath("/transactions");
};
