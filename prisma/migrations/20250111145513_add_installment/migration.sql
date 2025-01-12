-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "installments" INTEGER,
ADD COLUMN     "parentTransactionId" TEXT;
