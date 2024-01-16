import { Workspace } from 'src/workspaces/schema/workspace.schema';
import { User } from '../schemas/user.schema';

export class UserDto {
  public id: string;
  public login: string;
  public name: string;
  public workspace?: Workspace;

  constructor(user: User) {
    this.id = user._id;
    this.login = user.login;
    this.name = user.name;
    this.workspace = user.workspace;
  }
}
