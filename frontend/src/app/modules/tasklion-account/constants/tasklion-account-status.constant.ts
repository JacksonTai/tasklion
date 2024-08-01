export class TasklionAccountStatusConstant {

  public static readonly ACTIVE: string = 'ACTIVE';
  public static readonly BANNED: string = 'BANNED';

  private static readonly statusDisplayName: { [key: string]: string } = {
    [TasklionAccountStatusConstant.ACTIVE]: 'Active',
    [TasklionAccountStatusConstant.BANNED]: 'Banned',
  };

  static getDisplayName(role: string): string {
    return this.statusDisplayName[role];
  }

}
