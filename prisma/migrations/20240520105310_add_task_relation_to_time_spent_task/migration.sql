-- CreateTable
CREATE TABLE "TimeSpentTask" (
    "id" TEXT NOT NULL,
    "task_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "start_time" TIMESTAMP(3) NOT NULL,
    "end_time" TIMESTAMP(3) NOT NULL,
    "is_completed" BOOLEAN DEFAULT false,
    "additional_data" TEXT NOT NULL,

    CONSTRAINT "TimeSpentTask_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TimeSpentTask" ADD CONSTRAINT "TimeSpentTask_task_id_fkey" FOREIGN KEY ("task_id") REFERENCES "task"("id") ON DELETE CASCADE ON UPDATE CASCADE;
