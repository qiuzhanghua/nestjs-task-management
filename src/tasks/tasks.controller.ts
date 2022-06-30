import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from "@nestjs/common";
import { CreateTaskDto } from "./dto/create-task.dto";
import { Task, TaskStatus } from "./task.model";
import { TasksService } from "./tasks.service";
import { GetTasksFilterDto } from "./get-tasks-filter.dto";

@Controller("/tasks")
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  getTasks(@Query() filterDto: GetTasksFilterDto): Task[] {
    if (Object.keys(filterDto).length) {
      return this.taskService.getTasksFilters(filterDto);
    } else {
      return this.taskService.getAllTasks();
    }
  }

  @Get("/:id")
  getTaskById(@Param("id") id: string): Task {
    return this.taskService.getTaskById(id);
  }

  @Delete("/:id")
  deleteTakById(@Param("id") id: string): void {
    this.taskService.deleteTaskById(id);
  }

  @Post()
  createTask(@Body() dto: CreateTaskDto): Task {
    return this.taskService.createTask(dto);
  }

  @Patch("/:id/status")
  updateTaskStatus(
    @Param("id") id: string,
    @Body("status") status: TaskStatus,
  ): Task {
    return this.taskService.updateTaskStatus(id, status);
  }
}
