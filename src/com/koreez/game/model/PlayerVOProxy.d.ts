import { Proxy } from '@koreez/pure-mvc';
import PlayerVO from './vo/PlayerVO';
export default class PlayerVOProxy extends Proxy {
    static NAME: string;
    constructor(data: PlayerVO);
    vo: PlayerVO;
}
