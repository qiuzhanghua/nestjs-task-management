import { Injectable } from "@nestjs/common";
import { Task, TaskStatus } from "./task.model";
import { v4 as uuid } from "uuid";
import { CreateTaskDto } from "./dto/create-task.dto";
import { GetTasksFilterDto } from "./get-tasks-filter.dto";

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks() {
    return this.tasks;
  }

  getTasksFilters(filterDto: GetTasksFilterDto): Task[] {
    const { status, search } = filterDto;
    let tasks = this.tasks;
    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }
    if (search) {
      tasks = tasks.filter(
        (task) =>
          task.title.includes(search) || task.description.includes(search),
      );
    }
    return tasks;
  }

  createTask(dto: CreateTaskDto): Task {
    const { title, description } = dto;
    const task: Task = {
      id: uuid(),
      title,
      status: TaskStatus.OPEN,
      description,
    };
    this.tasks.push(task);
    return task;
  }

  getTaskById(id: string): Task {
    return this.tasks.find((t) => t.id === id);
  }

  deleteTaskById(id: string): void {
    this.tasks = this.tasks.filter((t) => t.id !== id);
  }
  updateTaskStatus(id: string, status: TaskStatus) {
    const task = this.tasks.find((t) => t.id === id);
    task.status = status;
    return task;
  }
}
