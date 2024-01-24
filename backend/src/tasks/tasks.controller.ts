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
import { EditTaskDto } from './dtos/edit-task.dto';
import { DeadlineDto } from './dtos/deadline.dto';

@Controller('tasks')
@UseGuards(AccessTokenGuard)
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get(':workspace')
  async getTasks(@Param('workspace') workspace: string) {
    return this.tasksService.getWorkspaceTasks(workspace);
  }

  @Get(':workspace/:member')
  async getMemberTasks(
    @Param('workspace') workspace: string,
    @Param('member') member: string,
  ) {
    return this.tasksService.getMemberTasks(workspace, member);
  }

  @Post(':workspace')
  async createTask(
    @Param('workspace') workspace: string,
    @UserId() userId: string,
    @Body() createTaskDto: CreateTaskDto,
  ) {
    return this.tasksService.createTask(userId, workspace, createTaskDto);
  }

  @Put('edit/:taskId')
  async editTask(
    @Param('taskId') taskId: string,
    @Body() editTaskDto: EditTaskDto,
  ) {
    return this.tasksService.editTask(taskId, editTaskDto);
  }

  @Put('deadline/:taskId')
  async setDeadline(
    @Param('taskId') taskId: string,
    @Body() deadlineDto: DeadlineDto,
  ) {
    return this.tasksService.addDeadline(taskId, deadlineDto);
  }

  @Delete('deadline/:taskId')
  async clearDeadline(@Param('taskId') taskId: string) {
    return this.tasksService.deleteDeadline(taskId);
  }

  @Put('assign/:taskId/:memberId')
  async assignTask(
    @Param('taskId') taskId: string,
    @Param('memberId') memberId: string,
  ) {
    return this.tasksService.assignTask(taskId, memberId);
  }

  @Delete('assign/:taskId')
  async clearAssignment(@Param('taskId') taskId: string) {
    return this.tasksService.clearAssignment(taskId);
  }
}
