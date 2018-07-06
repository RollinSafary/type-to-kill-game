import { Proxy } from '@koreez/pure-mvc';
import PlayerVO from './vo/PlayerVO';

export default class PlayerVOProxy extends Proxy{
  public static NAME:string = 'PlayerVOProxy'
  constructor(data:PlayerVO){
    super(PlayerVOProxy.NAME, data)
  }

  set vo(data:PlayerVO){
    this.setData(data)
  }

  get vo():PlayerVO{
    return this.getData()
  }
}