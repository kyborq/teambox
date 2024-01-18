import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { AccessTokenGuard } from 'src/common/guards/access-token.guard';
import { CreateTaskDto } from './dtos/create-task.dto';
import { UserId } from 'src/common/decorators/user-id.decorator';

@Controller('tasks')
@UseGuards(AccessTokenGuard)
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get(':workspace')
  async getTasks(@Param('workspace') workspace: string) {
    return this.tasksService.getWorkspaceTasks(workspace);
  }

  @Post(':workspace')
  async createTask(
    @Param('workspace') workspace: string,
    @UserId() userId: string,
    @Body() createTaskDto: CreateTaskDto,
  ) {
    return this.tasksService.createTask(userId, workspace, createTaskDto);
  }

  @Put('deadline/:taskId')
  async setDeadline(@Param('taskId') taskId: string) {
    // ...
  }

  @Delete('deadline/:taskId')
  async clearDeadline(@Param('taskId') taskId: string) {
    // ...
  }

  @Put('assign/:taskId')
  async assignUser(@Param('taskId') taskId: string) {
    // ...
  }

  @Delete('assign/:taskId')
  async deleteAssignment(@Param('taskId') taskId: string) {
    // ...
  }
}
