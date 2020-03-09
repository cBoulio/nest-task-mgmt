import { PipeTransform, ArgumentMetadata, BadRequestException } from "@nestjs/common";
import { TASK_STATUS } from "../task.model";

export class TaskStatusValidationPipe implements PipeTransform{

    readonly allowedStatuses = [
        TASK_STATUS.DONE,
        TASK_STATUS.IN_PROGRESS,
        TASK_STATUS.OPEN,

    ];


    transform(value:any){
        value = value.toUpperCase();

        if(!this.isStatusValid(value)){
            throw new BadRequestException(`"${value}" isnt a valid status`)
        }

        return value;
    }

    private isStatusValid(status:any){
        const indx = this.allowedStatuses.indexOf(status);
        return indx !== -1;
    }

}