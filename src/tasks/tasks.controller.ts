import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import {Task, TASK_STATUS} from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { stat } from 'fs';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/tasks-status-validation.pipe';


@Controller('tasks')
export class TasksController {

    constructor(private taskService:TasksService) {}

    @Get()
    getTasks(@Query(ValidationPipe) filterDto:GetTasksFilterDto): Task[] {
        if(Object.keys(filterDto).length){
            return this.taskService.getTasgetTasksWithFilters(filterDto);
        }
        return this.taskService.getAllTasks();
    }

    @Get('/:id')
    getTaskById(@Param('id') id:string):Task {
        return this.taskService.getTaskById(id);
    }

    @Delete('/:id')
    deleteTaskById(@Param('id') id:string):void {
        this.taskService.deleteTaskById(id);
    }

    @Patch('/:id/status')
    updateTaskStatus(@Param('id') id:string, @Body('status', TaskStatusValidationPipe) status:TASK_STATUS):Task {
        return this.taskService.updateTaskStatus(id, status);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTask( @Body() CreateTaskDto:CreateTaskDto):Task{

        return this.taskService.createTask(CreateTaskDto);   
    

    }
        


}
