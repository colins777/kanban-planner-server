/*
  Warnings:

  - You are about to drop the `TimeSpentTask` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "TimeSpentTask" DROP CONSTRAINT "TimeSpentTask_task_id_fkey";

-- DropTable
DROP TABLE "TimeSpentTask";

-- CreateTable
CREATE TABLE "time_spent_task" (
    "id" TEXT NOT NULL,
    "task_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "start_time" TIMESTAMP(3) NOT NULL,
    "end_time" TIMESTAMP(3) NOT NULL,
    "is_completed" BOOLEAN DEFAULT false,
    "additional_data" TEXT NOT NULL,

    CONSTRAINT "time_spent_task_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "time_spent_task" ADD CONSTRAINT "time_spent_task_task_id_fkey" FOREIGN KEY ("task_id") REFERENCES "task"("id") ON DELETE CASCADE ON UPDATE CASCADE;
