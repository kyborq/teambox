import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

import { Project, ProjectDocument } from './schemas/project.schema';
import { CreateProjectDto } from './dtos/create-project.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel(Project.name) private projectModel: Model<ProjectDocument>,
  ) {}

  async createProject(userId: string, createProjectDto: CreateProjectDto) {
    // ...
  }
}
