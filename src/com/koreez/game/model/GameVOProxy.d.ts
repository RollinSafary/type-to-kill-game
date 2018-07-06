import { Proxy } from '@koreez/pure-mvc';
import GameVO from './vo/GameVO';
export default class GameVOProxy extends Proxy {
    static NAME: string;
    constructor(data: GameVO);
    vo: GameVO;
}
