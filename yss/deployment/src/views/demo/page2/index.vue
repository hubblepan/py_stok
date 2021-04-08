<template>
  <!--左右布局 -->
  <el-row class="app-container" style="height: 100%; width: 100%">
    <!-- 侧边栏 -->
    <el-col :span="4" class="app-aside">
      <div>
        <p>1. 设置百分比高度时, 其父元素的高度必须为一个确定的值。</p>
        <p>2. 一个元素 的 高度 有 内容区 + padding + border 组成。 margin不会影响 元素, 所以在计算高度时，一定注意减去margin</p>
        <p>3. 在高度的设计上，精细化的布局的高度都应该有明确的数值，而不是百分比, 这样可以根据margin去调整高度的位置</p>
        <P>4. 动态高度可以通过js去实现 或者 css 的媒体查询，写多套高度</P>
        <p>5. 横向上， 可以有float属性</p>
        <p>6. inline元素默认没有宽高属性， 只有当设置了 float属性 或者 position:absolute 属性时，元素会已 display:inline-block 的方式展现， 从而有了宽高属性</p>
        <p>7. lineheight 对 inline元素高度和边距的影响， 先不管原理， 调大或调小line-height属性</p>
      </div>
    </el-col>
    <!-- 内容区域 -->
    <el-col :span="20" class="app-content">
      <el-row class="app-content-r1">
        <el-col :span="4" class="app-content-grid" style="height: 180px">
          <div style="height: 100%; width: 100%">
            <!-- 内容区-->
            <div style="height: 20px; margin: 80px auto; text-align: center">
              居中的div
            </div>
          </div>
        </el-col>

        <el-col :span="4" class="app-content-grid" style="height: 180px">
          <!-- 内容区-->
          <div style="height: 100%; width: 100%">

          </div>
        </el-col>

        <el-col :span="4" class="app-content-grid" style="height: 180px;">
          <!-- 内容区-->
          <div style="height: 100%; width: 100%; text-align: center">
            <span style="font-size: 10px; height: 10px; margin: 85px 2px 85px 0">文本</span>
            <i class="el-icon-share" style="height:16px; margin: 77px 0 77px 2px"></i>
            <div style="display: inline-block; height: 12px; width: 18px; background-color: #107bf8; margin: 82px 0 82px 4px; font-size: 10px; line-height: 12px;">&nbsp;&nbsp;&nbsp;&nbsp;</div>
          </div>
        </el-col>
      </el-row>
      <el-row class="app-content-r2">

      </el-row>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'page2',
};
</script>

<style scoped>
 .app-container {
   width: 100%;
   height: 100%;
   background-color: #ebf1f6;
 }
  .app-aside {
    background-color: #3e98d8;
    height: 100%;
  }
  .app-content {
    background-color: white;
    height: 100%;
  }
  .app-content-r1 {
    background-color: #fd7e14;
    height: 200px;
  }
  .app-content-grid {
    border: 1px dotted #313131;
    margin: 10px 10px 10px 10px;
  }
</style>
