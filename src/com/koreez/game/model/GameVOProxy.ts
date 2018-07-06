import { Proxy } from '@koreez/pure-mvc';
import GameVO from './vo/GameVO';

export default class GameVOProxy extends Proxy {
  public static NAME:string = 'GameVOProxy'
  constructor(data:GameVO){
    super(GameVOProxy.NAME, data)
  }

  set vo(data:GameVO){
    this.setData(data)
  }

  get vo():GameVO{
    return this.getData()
  }
}