<template>
    <div class="rect-container">
        <div class="container css">
            <div class="square"></div>
            <div class="info">
              <div class="title">CSS原生</div>
              <code class="code"></code>
            </div>
        </div>
        <div class="container canvas">
            <div class="test"></div>
            <div class="title">CSS Houdini</div>
            <code class="code"></code>
        </div>
        <div class="container webgl">
            <canvas ref="displayCanvas"></canvas>
            <div class="title">WebGL</div>
            <code class="code"></code>
        </div>
    </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import * as THREE from 'three'
import {checkerboard} from '../assets/checkerboard';
const WorkUrl = URL.createObjectURL(
    new Blob(
        [
            '(',
            function() {
                function TR() {}

                TR.prototype = {
                    constructor: TR,
                    paint(
                        ctx: CanvasRenderingContext2D,
                        geom: any,
                        properties: any
                    ) {
                        const colors = ['#fff', '#eee']
                        for (var i = 0, j = 0; j < geom.width; j += 8, i++) {
                            for (
                                let u = 0, v = 0;
                                v < geom.height;
                                v += 8, u++
                            ) {
                                ctx.fillStyle = colors[(i + u) % colors.length]
                                ctx.fillRect(j, v, 8, 8)
                            }
                        }
                    }
                }

                let regist = (globalThis as any)['registerPaint']
                regist('checkerboard', TR)
            }.toString(),
            ')()'
        ],
        { type: 'application/javascript' }
    )
)
declare interface CurrentCSS extends CSS {
    paintWorklet: Worklet
}
class WebGLCheckerboard {
    scene: THREE.Scene = new THREE.Scene()
    renderer: THREE.WebGLRenderer
    camera: THREE.OrthographicCamera
    clock: THREE.Clock = new THREE.Clock(true)
    cb = new checkerboard()
    runState:boolean = true;
    constructor(private canvas: HTMLCanvasElement) {
        const width = canvas.offsetWidth
        const height = canvas.offsetHeight
        //canvas.addEventListener('resize', this.onSizeChange.bind(this))
        setTimeout(()=>{this.onSizeChange()})
        this.renderer = new THREE.WebGLRenderer({
            canvas
        })
        this.camera = new THREE.OrthographicCamera(
            width / -2,
            width / 2,
            height / 2,
            height / -2
        )
        this.camera.position.z = 1000
        this.camera.lookAt(new THREE.Vector3(0, 0, 0))
        this.init();
        //requestAnimationFrame(this.frame);
        setTimeout(()=>{this.frame();setTimeout(()=>{this.frame()},30)},30); 
        //setTimeout(()=>{this.frame();},100); 
    }
    init(){
      this.initObject();
    }
    initObject(){
      this.scene.add(this.cb as any as THREE.Object3D);
    }
    onSizeChange() {
        var width = this.canvas.offsetWidth
        var height = this.canvas.offsetHeight
        this.camera.left = width / -2
        this.camera.right = width / 2
        this.camera.top = height / 2
        this.camera.bottom = height / -2
        this.camera.updateProjectionMatrix()
        this.renderer.setSize(width, height, false);
    }
    lt:number = 0;
    update(t:number){
      this.lt+=t;
      if(this.lt>.5){
        this.lt = 0;
        this.onSizeChange();
      }
      this.renderer.render(this.scene,this.camera);
    }
    frame = ()=>{
      this.update(this.clock.getDelta());
    }
    pause(){
      this.runState = false;
      return this;
    }
    resume(){
      this.runState = true;
      return this;
    }
    destory(){
      this.pause();
    }
}
@Component
export default class TransparentRect extends Vue {
  webGL:WebGLCheckerboard|undefined;
    created() {
        this.toRegistPaint()
        
    }
    mounted(){
      if(!this.webGL)this.webGL = new WebGLCheckerboard(this.$refs['displayCanvas'] as HTMLCanvasElement)
      this.webGL.resume();
    }
    toRegistPaint() {
        const current: CurrentCSS = CSS as any
        current.paintWorklet.addModule(WorkUrl)
    }
    beforeDestroy(){

    }
}
</script>
<style>

:root{
  --bg-color:#222;
  --text-color: #5187bd;
  --text-color-light:#bbdaf8;
}
</style>
<style lang="scss" scoped>

.rect-container {
    padding: 10px;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    transition: 0.3s;
    .container {
        flex: auto;
        transition: inherit;
        box-sizing: border-box;
        position: relative;
        padding: 20px;
        box-sizing: border-box;
        .title{
          position:absolute;
          bottom: 40px;
          left: 50%;
          transform: translate(-50%,-50%);
          font-size: 1.3em;
        }
        .code{
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translate(-50%,-50%);
          opacity: 0;
          font-size: .8em;
        }
    }
    .canvas,
    .webgl {
      position: relative;
      overflow: hidden;
        canvas {
            width: 100vw;
            height: 100%;
            position: absolute;
            left: 0;
        }
    }
    .canvas {
        .test {
            --rect-color: red;
            background-image: paint(checkerboard);
            width: 100%;
            height: 100%;
        }
    }
    .css {
        .square {
            width: 100%;
            height: 100%;
            background-color: #fff;
            background-image: linear-gradient(
                    45deg,
                    #eee 25%,
                    transparent 25%,
                    transparent 75%,
                    #eee 75%
                ),
                linear-gradient(
                    45deg,
                    #eee 25%,
                    transparent 25%,
                    transparent 75%,
                    #eee 75%
                );
            background-size: 16px 16px;
            background-position: 0 0, 8px 8px;
        }
    }
    .container:hover {
        width: 100%;
        height: 100%;
        filter: drop-shadow(0 0 12px);
        z-index: 10;
    }
    .container:not(:hover) {
        width: 100px;
        z-index: 0;
    }
}
</style>