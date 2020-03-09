import { Injectable } from '@nestjs/common';
import {Task, TASK_STATUS} from './task.model';
import * as uuid from 'uuid/v1';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {

    private tasks: Task[] = [];

    getAllTasks(){
        return this.tasks;
    }

    getTaskById(id: string): Task {
        return this.tasks.find(task => task.id === id);
    }

    getTasgetTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
        const {status, search} = filterDto;

        let tasks = this.getAllTasks();
        if(status){
            tasks = tasks.filter(task => task.status === status)
        }

        if(search){
            tasks = tasks.filter(task => 
                task.title.includes(search) ||  task.description.includes(search) 
            );
        }
        return tasks;
    }


    deleteTaskById(id: string): void {
        this.tasks = this.tasks.filter(task => task.id !== id);
    }

    updateTaskStatus(id:string, status:TASK_STATUS){
        const task = this.getTaskById(id);
        task.status = status;
        return task;
    }

    createTask(CreateTaskDto:CreateTaskDto) : Task {

        const {title, description} = CreateTaskDto;

        const task: Task = {
            id: uuid(),
            title,
            description,
            status:TASK_STATUS.OPEN,
        };


        this.tasks.push(task);
        return task;
    }

}
