import {GameObjects} from 'phaser';
import { gameConfig } from '../../constants/GameConfig';

export default class SphereView extends GameObjects.Sprite {
  private startX: number
  private endX: number
  private startY: number
  private endY: number
  private value: number
  private text: GameObjects.Text
  private moveEnabled:boolean
  private xMultiplier: number
  private yMultiplier: number
  private xSpeed: number
  private ySpeed: number
  private activePointer: Phaser.Input.Pointer

  constructor(scene: Phaser.Scene, key: string, value: number, moveEnabled: boolean){
    super(scene, 0, 0, key)
    this.value = value
    this.moveEnabled = moveEnabled
    this.depth = 2 * value
    this.createText()
    this.setValues()
    this.setListeners()
  }

  public update():void {
    if(!this.moveEnabled){
      return
    }
    if (this.x >= this.endX || this.x <= this.startX) {
      this.xMultiplier *= -1
    }
    if (this.y >= this.endY || this.y <= this.startY) {
      this.yMultiplier *= -1
    }
    this.x += this.xSpeed / 10 * this.xMultiplier
    this.y += this.ySpeed / 10 * this.yMultiplier
    if(this.text){
      this.text.x = this.x
      this.text.y = this.y
    }
  }

  public enableMove () :void {
    this.moveEnabled = true
  }

  public disableMove () :void{
    this.moveEnabled = false
  }

  public changeValues(value: number, color:string):void {
    this.number -= value
    this.depth = this.number
    this.text.depth = this.number +1
    if(this.number <= 0){
      this.killSphere()
      return
    }
    this.setTexture(color)
    this.updateText()
    this.scene.tweens.killTweensOf([this, this.text])
    this.scene.tweens.add({
      targets: [this,this.text],
      duration: 100,
      scaleX: 1.5,
      scaleY: 1.5,
      onComplete: () => {
        this.scene.tweens.add({
          targets: [this,this.text],
          duration: 100,
          scaleX: 1,
          scaleY: 1,
        })
      }
    })

  }
  public preDestroy():void{
    this.text.destroy()
  }


  private setListeners():void{
    this.setInteractive()
    this.scene.input.setDraggable(this)
    this.scene.input.on('dragstart', this.onDragStart, this)
    this.scene.input.on('dragend', this.onDragEnd, this)
    this.scene.input.on('drag', this.onDrag, this)
  }

  private onDragStart(pointer: Phaser.Input.Pointer, target: SphereView):void{
    if(target !== this){
      return
    }
    this.activePointer = pointer
    this.scene.tweens.killTweensOf(this)
    this.scene.tweens.add({
      targets: this,
      duration: 200,
      scaleX: 1.3,
      scaleY: 1.3,
      onStart: () => {
        this.moveEnabled = false
      },
      onComplete: () => {
        this.scene.events.emit('sphereSelected', this)
      }
    })
  }
  private onDrag(pointer: Phaser.Input.Pointer, target: SphereView):void{
    if(target !== this || this.activePointer !== pointer){
      return
    }
    // this.x = dragX
    // this.x = dragY
  }
  private onDragEnd(pointer: Phaser.Input.Pointer, target: SphereView):void{
    if(target !== this || this.activePointer !== pointer){
      return
    }
    this.scene.tweens.killTweensOf(this)
    this.scene.tweens.add({
      targets: this,
      duration: 200,
      scaleX: 1,
      scaleY: 1,
      onStart: () => {
        this.moveEnabled = true
        this.scene.events.emit('sphereUnselected', this)
      }
    })
  }

  private  createText () :void {
    this.text = this.scene.add.text(
      this.x,
      this.y,
      this.value + '',
      {
        fontSize: "32px",
        fontFamily: "Arial",
        color: "#ffffff",
        align: "center"
      }
    );
    this.text.depth = this.depth + 1
    this.text.setOrigin(0.5, 0.5);
  }

  private updateText():void{
    this.text.setText(this.number + '')
  }

  private killSphere():void{
    this.scene.tweens.killTweensOf(this)
    this.scene.tweens.add({
      targets: [this, this.text],
      duration: 400,
      scaleX: 0,
      scaleY: 0,
      onStart: () => {
        this.scene.events.emit('sphereKilled', this)
      },
      onComplete: () => {
        this.destroy()
      }
    })
  }

  private setValues():void{
    const temp:number = Math.random() * 0.05
    this.ySpeed = 30 + temp * 600
    this.xSpeed = 20 + temp * 400
    this.xMultiplier = Math.random() * 10 > 5 ? 1 : -1
    this.yMultiplier = Math.random() * 10 > 5 ? 1 : -1

    const distance: number =  this.width * 1.3 / 2
    this.startX = distance
    this.endX = gameConfig.width as number - distance
    this.startY = distance
    this.endY = gameConfig.height as number - distance
    this.updatePosition()
  }

  private updatePosition():void{
    this.x = Phaser.Math.Between(this.startX, this.endX)
    this.y = Phaser.Math.Between(this.startY, this.endY)
  }


  get number():number {
    return this.value
  }

  set number(value: number){
    this.value = value
  }

}