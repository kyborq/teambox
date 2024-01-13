import { Body, Controller, Get, Post } from '@nestjs/common';

import { UserId } from 'src/common/decorators/user-id.decorator';
import { CreateProjectDto } from './dtos/create-project.dto';
import { ProjectsService } from './projects.service';

@Controller('projects')
export class ProjectsController {
  constructor(private projectsService: ProjectsService) {}

  @Post()
  createProject(
    @UserId() userId: string,
    @Body() createProjectDto: CreateProjectDto,
  ) {
    return this.projectsService.createProject(userId, createProjectDto);
  }

  @Get()
  getCurrentProjects(@UserId() userId: string) {
    // ...
  }
}
