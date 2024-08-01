export class TasklionUserRoleConstant {

  public static readonly ADMIN: string = 'ADMIN';
  public static readonly TASKER: string = 'TASKER';
  public static readonly CUSTOMER: string = 'CUSTOMER';

  private static readonly roleDisplayNames: { [key: string]: string } = {
    [TasklionUserRoleConstant.ADMIN]: 'Admin',
    [TasklionUserRoleConstant.TASKER]: 'Tasker',
    [TasklionUserRoleConstant.CUSTOMER]: 'Customer',
  };

  static getDisplayName(role: string): string {
    return this.roleDisplayNames[role];
  }

}
