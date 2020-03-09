import { TASK_STATUS } from "../task.model";
import { IsOptional, IsIn } from "class-validator";

export class GetTasksFilterDto{

    @IsOptional()
    @IsIn()
    status:TASK_STATUS;

    @IsOptional()
    search:string;
}