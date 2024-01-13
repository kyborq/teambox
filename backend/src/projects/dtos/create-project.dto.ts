import { IsString, MinLength } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  @MinLength(8)
  name: string;
}
