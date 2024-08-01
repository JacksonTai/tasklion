export class TaskStatusConstant {
  static readonly PENDING = 'PENDING';
  static readonly SCHEDULED = 'SCHEDULED';
  static readonly PENDING_REVIEW = 'PENDING_REVIEW';
  static readonly COMPLETED = 'COMPLETED';
  static readonly CANCELLED = 'CANCELLED';
  static readonly REVIEWED = 'REVIEWED';

  private static readonly statusDisplayNames: { [key: string]: string } = {
    [TaskStatusConstant.PENDING]: 'Pending',
    [TaskStatusConstant.SCHEDULED]: 'Scheduled',
    [TaskStatusConstant.PENDING_REVIEW]: 'Pending Review',
    [TaskStatusConstant.COMPLETED]: 'Completed',
    [TaskStatusConstant.CANCELLED]: 'Cancelled',
    [TaskStatusConstant.REVIEWED]: 'Reviewed',
  };

  static getDisplayName(status: string): string {
    return this.statusDisplayNames[status];
  }
}
