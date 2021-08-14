<template>
  <div>
    <div id="chart"></div>
  </div>
</template>

<script>
import Chart from "roc-charts";
export default {
  data() {
    return {
      chartData: require('../2dData.json'),
      config: {
        // 核心配置
        core: {
          watermark: {
            // 水印
            image: "", // 背景图片 dataURI
            width: 300,
            height: 300,
          },
          animation: true, // 是否开启动画
          showExtend: true, // 是否显示扩展标识
          initStore: true, // 是否要初始化 store，通常传入的 data 是简单数据，只有 nodes 和 links，如果传入的 data 就是已经初始化后的数据结构，则不需要再初始化
          scale: 1, // 缩放比例
          dynamicLineWidth: true, // 线的粗细是否随缩放率变化
          initPlugin: true, // 是否启用插件，为 false 时所有插件都不会实例化
        },

        // 场景配置
        scene: {
          scale: {
            // 图谱的缩放比例相关配置
            max: 2,
            min: 0.05,
            step: 0.05,
          },
        },

        // 节点配置
        node: {
          color: "pink", // 节点没使用图片，则会使用此颜色画圆
          selectedColor: "#66B3FF", // 选中的边框颜色
          size: {
            // 3种大小
            small: {
              r: 10,
            },
            normal: {
              r: 20,
            },
            large: {
              r: 30,
            },
          },
          sub: {
            // subImage 的配置
            r: 6,
          },
          interval: 3, // name, subImage 等与节点的间隔
          fadeOpacity: 0.1, // 淡化节点的透明度
        },

        // 线配置
        link: {
          lineWidth: 1,
          color: "#F1D07B",
          twoWayColor: "#EE7768", // 曲线的颜色
          side: 10, // 箭头的边长
          optimize: 200, // 多少条线开启优化（拖拽等操作时不绘制线）
        },

        // 文字配置
        text: {
          align: "center",
          verticalAlign: "middle",
          color: "#666",
          fontSize: 12,
        },
        plugin: {
          // 点击空白处，所有节点和线高亮功能
          blankClick: {
            click: true, // 默认为 true，设为 false 则禁用。也可通过 disable 配置禁用。
          },
          // 拖拽空白处图谱移动功能
          blankDrag: {
            drag: true, // 默认为 true，设为 false 则禁用。也可通过 disable 配置禁用。
          },
          // 点击节点高亮与之相连的点功能
          nodeClick: {
            click: true,
            deep: true, // 默认为 false，设置为 true 则会深度查找
          },
          // 节点拖拽功能
          nodeDrag: {
            drag: true, // 默认为 true，设为 false 则禁用。也可通过 disable 配置禁用。
          },
          scaleOnPC: {}, // PC 端鼠标滚轮缩放功能
          scaleOnMobile: {}, // 移动端双指缩放功能
          // 插件的公共配置
          common: {
            // 配置禁用的插件，默认为空
            disable: ["changeNodeDrag", "nodeInfo", "changeLineWidth"],
            // 是否显示工具栏，默认为 true
            toolbarShow: true,
          },

          // 单个插件的配置
          // 字段名是插件类的名称：static pluginName = 'changeChart'
          changeChart: {
            // 图谱切换插件配置
            charts: ["force", "annular"],
          },
          nodeInfo: {
            // 展示节点信息插件配置
          },
          changeAnimation: {}, // 图谱动画是否启动插件
          changeChart: {
            // 图谱切换插件
            charts: ["force"], // 配置可切换的图谱
          },
          changeLineWidth: {
            // 线条宽度切换插件
            width: 1,
          },
          changeNodeDrag: {}, // 节点拖拽功能是否启用插件
          fullScreen: {}, // 全屏插件
          hideSelectedNodes: {}, // 隐藏选中节点插件
          lasso: {
            // 套索工具插件
            backgroundColor: "orange",
            borderColor: "red",
          },
          reset: {}, // 重置图谱插件
          saveImg: {}, // 保存图谱为图片的插件
          searchNode: {}, // 搜索节点插件
          shortestPath: {}, // 最短路径插件
          // 右键菜单功能
          rightKey: {
            // keys 的值为数组，每一项为一个菜单按钮功能
            keys: [
              {
                name: "学", // 右键菜单按钮显示的文本
                /*
                 * 菜单点击时调用 click 方法。接收一个 params 对象
                 * @param isNode {bool} 是否为节点
                 * @param target {obj}  右键点击位置的目标对象
                 * @param $chart {obj} 当前图谱对象实例。同 new Chart(...) 得到的对象实例
                 */
                click: ({ isNode, target, $chart }) => {
                  const node = target.source; // 获取节点信息
                  // console.log("1111111111111111");
                  this.$message("3031行，传参跳转," + target.source.id);

                  // 此处传参跳转
                  this.$router.push({
                    path: "video",
                    params: { param1: "", param2: "" },
                  });

                  // $chart.util.hideNodes([node.id]); // 使用 chart 的工具方法隐藏节点
                },
                // isShow 方法用于决定当前点击的右键菜单中是否显示这个按钮，这个方法需要返回一个 bool 值
                isShow({ isNode, target, $chart }) {
                  // 判断点击的是节点才显示此按钮
                  if (isNode) {
                    return true;
                  }
                },
              },
              // 另一个按钮
              {
                name: "练", // 右键菜单按钮显示的文本
                /*
                 * 菜单点击时调用 click 方法。接收一个 params 对象
                 * @param isNode {bool} 是否为节点
                 * @param target {obj}  右键点击位置的目标对象
                 * @param $chart {obj} 当前图谱对象实例。同 new Chart(...) 得到的对象实例
                 */
                click: ({ isNode, target, $chart }) => {
                  const node = target.source; // 获取节点信息
                  // console.log("1111111111111111");
                  this.$message("3058行，传参跳转," + target.source.id);

                  // 此处传参跳转
                  this.$router.push({
                    path: "practice",
                    params: { param1: "", param2: "" },
                  });

                  // $chart.util.hideNodes([node.id]); // 使用 chart 的工具方法隐藏节点
                },
                // isShow 方法用于决定当前点击的右键菜单中是否显示这个按钮，这个方法需要返回一个 bool 值
                isShow({ isNode, target, $chart }) {
                  // 判断点击的是节点才显示此按钮
                  if (isNode) {
                    return true;
                  }
                },
              },
            ],
          },
        },
      },
    };
  },
  mounted() {
    this.config.core.watermark.width = document.body.clientWidth;
    this.config.core.watermark.height = document.body.clientHeight;
    // for (let i = 0; i < this.chartData.nodes.length; i++) {
    //   this.chartData.nodes[i].id = i + 1;
    // }
    
    const chart = new Chart({
      id: "chart", // 绘制图谱 dom 的 id
      type: "force", // 图谱类型
      data: this.chartData, // 图谱数据
    });

    chart.init(this.config);
    this.getJson();
  },
  methods: {
    //本地读取json文件,在static文件夹创建文件,在需要读取的组件内用get找到文件读取
  getJson () {
    console.log(111)
    // var aa= require('../data/records.json');
    // console.log(res.body)
}
  },
};
</script>
<style scoped>
#chart {
  width: 100vw;
  height: calc(100vh);
}
#chart /deep/ .searchNodeContainer-roc {
  position: fixed !important;
  z-index: 2;
  top: 10px;
  left: 30px;
}
</style>