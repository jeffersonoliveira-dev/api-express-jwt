import { UserInstance, User } from "../models";


class UserService {
  async create(user: UserInstance): Promise<UserInstance> {
    const newUser = await User.create(user);
    return newUser;
  }

  async getById(userId: string): Promise<UserInstance | null> {
    const user = await User.findByPk(userId);
    return user;
  }

  async update(userId: string, updatedUser: Partial<UserInstance>): Promise<boolean> {
    const [rowsUpdated] = await User.update(updatedUser, { where: { id: userId } });
    return rowsUpdated > 0;
  }

  async remove(userId: string): Promise<boolean> {
    const rowsDeleted = await User.destroy({ where: { id: userId } });
    return rowsDeleted > 0;
  }

}

export default new UserService();