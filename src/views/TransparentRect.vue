<template>
  <div class="rect-container">
    <div class="container css">
      <div class="square"></div>
    </div>
    <div class="container canvas">
      <div class="test"></div>
    </div>
    <div class="container webgl">
      <canvas></canvas>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import * as Three from "three";
const WorkUrl = URL.createObjectURL(
  new Blob(
    [
      "(",
      function() {
        function TR() {}
        const colors = ["#fff", "#eee"];
        TR.prototype = {
          constructor: TR,
          paint(ctx: CanvasRenderingContext2D, geom: any, properties: any) {
            // for (var i = 0, j = 0; j < size.width; j += 32, i++) {
            //   for (let u = 0, v = 0; v < size.height; v += 32, u++) {
            //     ctx.fillStyle = colors[(i + u) % colors.length];
            //     ctx.fillRect(j, v, 32, 32);
            //   }
            // }
            // ctx.fillStyle = "rgb(0,0,0)"
            // ctx.fillRect(size.width*.799,0,size.width*.05,100);
            // console.log(i)
            const colors = ["red", "green", "blue"];
            const size = 32;
            for (let y = 0; y < geom.height / size; y++) {
              for (let x = 0; x < geom.width / size; x++) {
                const color = colors[(x + y) % colors.length];
                ctx.beginPath();
                ctx.fillStyle = color;
                ctx.rect(x * size, y * size, size, size);
                ctx.fill();
              }
            }
          }
        };

        let regist = (globalThis as any)["registerPaint"];
        regist("simpleRect", TR);
      }.toString(),
      ")()"
    ],
    { type: "application/javascript" }
  )
);
declare interface CurrentCSS extends CSS {
  paintWorklet: Worklet;
}
@Component
export default class TransparentRect extends Vue {
  created() {
    this.toRegistPaint();
  }
  toRegistPaint() {
    const current: CurrentCSS = CSS as any;
    current.paintWorklet.addModule(WorkUrl);
  }
}
</script>
<style lang="scss" scoped>
.rect-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  transition: 0.3s;
  .container {
    flex: auto;
    transition: inherit;
    box-sizing: border-box;
  }
  .canvas,
  .webgl {
    canvas {
      width: 100%;
      height: 100%;
    }
  }
  .canvas {
    .test {
      --rect-color: red;
      background-image: paint(simpleRect);
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
  }
  .container:not(:hover) {
    width: 0;
  }
}
</style>