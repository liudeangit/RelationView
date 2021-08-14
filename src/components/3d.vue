<template>
  <div ref="graph" id="graph"></div>
</template>

<script>
import ForceGraph3D from "3d-force-graph";
import SpriteText from 'three-spritetext'
export default {
  name: "3dView",
  data() {
    return {
      myGraph: null,
      graphData: null,
    };
  },
  mounted() {
    this.initGraph();
  },
  methods: {
    async initGraph() {
      /********************************************** 1.创建图 **********************************************/
      this.myGraph = ForceGraph3D({
        controlType: "trackball", // orbit沿2d轨迹绕着拖动，fly 固定不动
        rendererConfig: { antialias: true, alpha: true },
      })(this.$refs.graph)
        /*------------------------------------------- 画布配置 -------------------------------------------*/
        .backgroundColor("black") // 背景颜色，支持内置颜色和RGB
        .width(this.$refs.graph.parentElement.offsetWidth) // 画布宽度(充满父级容器)
        .height(this.$refs.graph.parentElement.offsetHeight + 150) // 画布高度(充满父级容器)
        .showNavInfo(false) // 是否显示底部导航提示信息
        //.cooldownTicks(100)
        this.myGraph.onEngineStop(() => this.myGraph.zoomToFit(400))//当引擎停止时适合画布
        /*------------------------------------------- 节点配置 -------------------------------------------*/
        .nodeRelSize(20) // 节点大小（支持数值）
        .nodeVal((node) => node.size * 0.05) // 节点大小（支持回调）
        .nodeAutoColorBy("id") // 节点颜色：根据属性划分（参数为graphData({nodes: nodes, links: links})）中nodes中每个node中的属性名称）
        .nodeAutoColorBy((node) => node.id) // 节点颜色：回调函数处理（功能同上）
        .nodeOpacity(0.5) // 节点透明度：回调函数处理（根据label划分）
        // .nodeLabel("name") // 节点标签显示内容（鼠标滑到节点显示，支持直接写节点属性名称）
        // .nodeLabel((node) => node.name) // 节点标签显示内容（鼠标滑到节点显示，也可以使用回调函数）
        .nodeThreeObjectExtend(true)
        //节点显示文字
        .nodeThreeObject(node=>{
          const sprite = new SpriteText(node.name)
          sprite.material.depthWrite = false // make sprite background transparent
          return sprite
        })
        .onNodeHover(
          (node) => (this.$refs.graph.style.cursor = node ? "pointer" : null)
        ) // 鼠标滑到节点上改变指针
        .onNodeClick((node) => {
          console.log(node);
          // 点击节点事件（视角转移到该节点）
          // Aim at node from outside it
          const distance = 260;
          const distRatio = 1 + distance / Math.hypot(node.x, node.y, node.z);
          this.myGraph.cameraPosition(
            {
              x: node.x * distRatio,
              y: node.y * distRatio,
              z: node.z * distRatio,
            }, // new position
            node, // lookAt ({ x, y, z })
            3000 // ms transition duration)
          );
        })
        /*------------------------------------------- 线的配置 -------------------------------------------*/
        .linkVisibility(true) // 是否显示线
      
        .linkLabel((r) => r.type) // 边的标签显示（鼠标滑到边上显示）
        .linkDirectionalArrowLength(3.5) // 边的指向箭头长度
        .linkDirectionalArrowRelPos(1) // 边的标签显示（鼠标滑到边上显示）
        .linkCurvature(0) // 边的弧度度
        .linkColor(() => "RGB(170,170,170)") // 边颜色
        .linkAutoColorBy((r) => r.type) // 边颜色自动化分
        .linkOpacity(0.5); // 边透明度（越小越透明）

      /********************************************** 2.加载数据 **********************************************/
      /** 构造3D-Graph数据的边 */
      // console.log(111)
      const links = require('../data.json').links;
      // console.log(links)
      /** 构造3D-Graph数据的节点 */
      const nodes = require('../data.json').nodes;
      this.myGraph.graphData({
        nodes: nodes,
        links: links,
      });
      /********************************************** 3.动态设置 **********************************************/
      /*  修改边长度,同d3引擎用法  */
      this.myGraph.d3Force("link").distance(400);
      /*  设置图谱自动旋转  */
      // const distance = 500;
      // let angle = 0;
      // setInterval(() => {
      //   this.myGraph.cameraPosition({
      //     x: distance * Math.sin(angle),
      //     y: distance * Math.sin(angle),
      //     z: distance * Math.cos(angle),
      //   });
      //   angle += Math.PI / 1000;
      // }, 100);
    },
  },
};
</script>

<style scoped>
#graph {
  background-color: rgba(0, 0, 0, 1);
  /* padding: 1rem; */
  height: 100vh;
  /*min-width: 300px;*/
  width: 100%;
  /* border-radius: 5px; */
}
</style>

