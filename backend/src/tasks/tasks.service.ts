import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Task, TaskDocument } from './schemas/task.schema';
import { Model } from 'mongoose';
import { CreateTaskDto } from './dtos/create-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task.name)
    private taskModel: Model<TaskDocument>,
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

  async editTask(taskAlias: string) {
    // ... label and description
  }

  async assignTask(taskId: string, memberId: string) {
    // ...
  }

  async clearAssignment(taskAlias: string) {
    // ...
  }

  async addDeadline(taskAlias: string) {
    // ...
  }

  async deleteDeadline(taskAlias: string) {
    // ...
  }
}
