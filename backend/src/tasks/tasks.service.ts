import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Task, TaskDocument } from './schemas/task.schema';
import { Model } from 'mongoose';
import { CreateTaskDto } from './dtos/create-task.dto';
import { EditTaskDto } from './dtos/edit-task.dto';
import { MembersService } from 'src/members/members.service';
import { DeadlineDto } from './dtos/deadline.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task.name)
    private taskModel: Model<TaskDocument>,
    private memberService: MembersService,
  ) {}

  async getWorkspaceTasks(workspace: string): Promise<Task[]> {
    const workspaceTasks = await this.taskModel
      .find({ workspace })
      .select('-workspace')
      .populate('author', 'name login')
      .populate('member', 'name login')
      .exec();
    return workspaceTasks;
  }

  async getMemberTasks(workspace: string, member: string): Promise<Task[]> {
    const memberTasks = await this.taskModel.find({ workspace, member }).exec();
    return memberTasks;
  }

  async createTask(
    userId: string,
    workspace: string,
    createTaskDto: CreateTaskDto,
  ): Promise<Task> {
    const workspaceTasksCount = await this.taskModel
      .countDocuments({ workspace })
      .exec();

    const taskAlias = (workspaceTasksCount + 1).toString();

    const createdTask = new this.taskModel({
      ...createTaskDto,
      alias: taskAlias.padStart(3, '0'),
      author: userId,
      workspace,
    });

    return createdTask.save();
  }

  async editTask(taskId: string, editTaskDto: EditTaskDto) {
    const editedTask = await this.taskModel
      .findByIdAndUpdate(taskId, {
        ...editTaskDto,
      })
      .exec();

    if (!editedTask) {
      throw new NotFoundException(`Task with alias ${taskId} not found`);
    }

    return editedTask;
  }

  async assignTask(taskId: string, memberId: string) {
    const member = this.memberService.getMember(memberId);

    const task = await this.taskModel
      .findByIdAndUpdate(taskId, { member })
      .exec();

    if (!task) {
      throw new NotFoundException(`Task with ID ${taskId} not found`);
    }

    return task;
  }

  async clearAssignment(taskId: string) {
    const task = await this.taskModel
      .findByIdAndUpdate(taskId, { member: null })
      .exec();

    if (!task) {
      throw new NotFoundException(`Task with ID ${taskId} not found`);
    }

    return task;
  }

  async addDeadline(taskId: string, deadlineDto: DeadlineDto) {
    const task = await this.taskModel
      .findByIdAndUpdate(taskId, {
        start: deadlineDto.startDate,
        end: deadlineDto.endDate,
      })
      .exec();

    if (!task) {
      throw new NotFoundException(`Task with ID ${taskId} not found`);
    }

    return task;
  }

  async deleteDeadline(taskAlias: string) {
    // ...
  }
}
