-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "installment" INTEGER,
ADD COLUMN     "installments" INTEGER,
ADD COLUMN     "parentTransactionId" TEXT,
ALTER COLUMN "date" SET DEFAULT CURRENT_TIMESTAMP;
