<template>
    <div class="setup-header">
      <div class="box-center">
          <div class="left">
            <ul>
              <!--<li><h4>运维门户</h4></li>-->
              <li>一键部署向导</li>
            </ul>
          </div>
        <div class="right">
          <ul>
            <!--<li>用户登录</li>-->
          </ul>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'SetupHeader',
};
</script>

<style scoped>
.setup-header{
  width: 100%;
  height: 5rem;
  background-color: #107bf8;
}
  .box-center{
    width: 1000px;
    height: 100%;
    margin: 0 auto;
  }
.box-center .left{
  display: inline-block;
  width: 300px;
}
  .box-center .left ul{
    display: inline-block;
    height: 100%;
  }

.box-center .left ul li{
  color: #fff;
  font-weight: bold;
  float: left;
  height: 100%;
  line-height: 5rem;
  width: 100px;
  margin-right: 30px;
}

.box-center .right{
  float: right;
  width: 300px;
}
.box-center .right ul li{
  color: #fff;
  float: right;
  height: 100%;
  line-height: 5rem;
  width: 100px;
  margin-right: 30px;
}
</style>
