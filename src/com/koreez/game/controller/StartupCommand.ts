import { SimpleCommand } from '@koreez/pure-mvc';

export default class StartupCommand extends SimpleCommand {
  public execute(notificationName: string): void {
    notificationName;
  }
}
