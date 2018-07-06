import { delayRunnable, removeRunnable } from '../../utils/Utils';
import BaseScene from './BaseScene';
import SphereView from '../components/SphereView';
import { ALL_COLORS } from '../../constants/Constants';

export default class GameScene extends BaseScene {
  public static NAME: string = 'GameScene';
  public selectedSpheres: SphereView[];
  public unSelectedSpheres: SphereView[];
  private spheres: SphereView[];
  private clearUnSelectedSpheresRunnable: Phaser.Time.TimerEvent
  private graphics: Phaser.GameObjects.Graphics
  private lines: Phaser.Geom.Line[]

  constructor() {
    super(GameScene.NAME);
    this.spheres = [];
    this.selectedSpheres = [];
    this.unSelectedSpheres = [];
    this.lines = []
  }

  public create(): void {
    (this.input as any).addPointer(9)
    this.graphics = this.add.graphics({
      lineStyle: { width: 2, color: 0xffffff },
      strokeStyle: {width: 2, color: 0xffffff}
      })

  }

  public createSpheres(sphereDatas:any[] ):void{
    for(const data of sphereDatas){
      const sphere:SphereView = new SphereView(this, data.color, data.value, data.moveEnabled)
      this.add.existing(sphere)
      this.spheres.push(sphere)
    }
  }

  public update(): void {
    for(const sphere of this.spheres){
      sphere.update()
    }
    this.drawLines()
  }

  public onSelect(sphere:SphereView):void {
    this.selectedSpheres.push(sphere)
  }
  public onUnselect(sphere:SphereView):void {
    const sphereIndex: number = this.selectedSpheres.indexOf(sphere)
    if(sphereIndex === -1){
      return
    }
    this.selectedSpheres.splice(sphereIndex, 1)
    this.unSelectedSpheres.push(sphere)

    if(this.clearUnSelectedSpheresRunnable){
      removeRunnable(this.clearUnSelectedSpheresRunnable)
    }
    this.clearUnSelectedSpheresRunnable = delayRunnable(this, 200, this.clearUnSelectedSpheres, this)
    if(this.selectedSpheres.length === 0){
      this.check()
    }
  }
  public onKilled(sphere:SphereView) :void{
    const sphereIndex:number = this.spheres.indexOf(sphere)
    this.spheres.splice(sphereIndex, 1)
  }

  private clearUnSelectedSpheres():void{
    this.unSelectedSpheres = []
  }

  private check():void{
    const selectedSpheres: SphereView[] = this.unSelectedSpheres
    if(selectedSpheres.length === 1){
      return
    }
    const color: string = selectedSpheres[0].frame.texture.key

    for(const sphere of selectedSpheres){
      if(sphere.frame.texture.key !== color){
        return
      }
    }

    for(const sphere of selectedSpheres){
      let newColor: string = this.generateColor()
      const index: number = selectedSpheres.indexOf(sphere)
      if(!newColor){
        newColor = ALL_COLORS[Phaser.Math.Between(0, ALL_COLORS.length - 1)]
        this.selectedSpheres.splice(index, 1)
      }
      sphere.changeValues(index + 1, newColor)
    }
  }

  private generateColor() :string{
    const colorsArray: string[] = []
    for(const sphere of this.spheres){
      const color: string = sphere.frame.texture.key
      if(this.unSelectedSpheres.indexOf(sphere) !== -1 || colorsArray.indexOf(color) !== -1){
        continue
      }
      colorsArray.push(color)
    }
    const randomIndex: number = Phaser.Math.Between(0, colorsArray.length)
    return colorsArray[randomIndex]
  }

  private drawLines():void{
    this.graphics.clear()
    if(this.selectedSpheres.length <= 1){
      return
    }
    for(let i:number = 0; i < this.selectedSpheres.length; i++){
      const sphere1: SphereView = this.selectedSpheres[i]
      const sphere2: SphereView = this.selectedSpheres[i + 1] || this.selectedSpheres[0]
      const line :Phaser.Geom.Line= new Phaser.Geom.Line(sphere1.x, sphere1.y, sphere2.x, sphere2.y)
      this.graphics.strokeLineShape(line)
      this.graphics.strokeCircle(sphere1.x, sphere1.y, sphere1.width)
      this.graphics.strokeCircle(sphere2.x, sphere2.y, sphere2.width)
      this.lines.push(line)
    }
  }
}
