import BaseScene from './BaseScene';
import SphereView from '../components/SphereView';
export default class GameScene extends BaseScene {
    static NAME: string;
    selectedSpheres: SphereView[];
    unSelectedSpheres: SphereView[];
    private spheres;
    private clearUnSelectedSpheresRunnable;
    private graphics;
    private lines;
    constructor();
    create(): void;
    createSpheres(sphereDatas: any[]): void;
    update(): void;
    onSelect(sphere: SphereView): void;
    onUnselect(sphere: SphereView): void;
    onKilled(sphere: SphereView): void;
    private clearUnSelectedSpheres();
    private check();
    private generateColor();
    private drawLines();
}
