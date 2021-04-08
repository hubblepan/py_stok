<template>
    <div>
      <el-tabs :tab-position="'top'" style="margin: 20px">
        <el-tab-pane label="基础配置">
          <el-form label-position="left" label-width="100px" :model="formData1" style="margin-left: 10px" ref="formAddNode">
            <el-form-item label="服务版本" prop="ip">
              <el-select v-model="formData1.version" placeholder="请选择" size="small">
                <el-option
                  label="V1.0.0.1"
                  value="V1.0.0.1">
                </el-option>
                <el-option
                  label="V2.0.0.1"
                  value="V2.0.0.1">
                </el-option>
                <el-option
                  label="V3.0.0.1"
                  value="V4.0.0.1">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="服务器地址" prop="ip">
              <el-select v-model="formData1.ip" placeholder="请选择" size="small" multiple @change="handleServerChange">
                <el-option
                  label="192.168.4.225"
                  value="192.168.4.225">
                </el-option>
                <el-option
                  label="192.168.4.226"
                  value="192.168.4.226">
                </el-option>
                <el-option
                  label="192.168.4.227"
                  value="192.168.4.227">
                </el-option>
              </el-select>
            </el-form-item>
            <!--      <el-form-item label="代理端口">-->
            <!--        <el-input v-model="formData.agentPort" style="width: 80px" placeholder="8080" size="small"></el-input>-->
            <!--      </el-form-item>-->
            <el-form-item
              v-for="server in formData1.servers"
              label="程序路径"
              :key="server.ip">
              <el-input v-model="server.dirs" placeholder="程序部署路径, 多个路径用'enter键'隔开" size="small" style="width: 300px" type="textarea" :rows="2"></el-input>
              {{'  (' + server.ip + ')'}}
              <!--        <el-input v-model="domain.value"></el-input><el-button @click.prevent="removeDomain(domain)">删除</el-button>-->
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="服务配置">
          <el-form label-position="left" label-width="140px" :model="formData" :inline="true" style="height: 320px;" :rules="rules" ref="formAddNode">
            <el-form-item label="eureka地址" prop="eurekaDir">
              <el-input v-model="formData.eurekaDir" placeholder="eureka地址" style="width: 200px;" size="small">/home/test/eureka</el-input>
            </el-form-item>
            <br/>
            <el-form-item label="YSS_APP配置路径" prop="ip">
              <el-input v-model="formData.yssAppPath" style="width: 200px" placeholder="/home/test/yss_app" size="small"></el-input>
            </el-form-item>
            <!--      <el-form-item label="代理端口">-->
            <!--        <el-input v-model="formData.agentPort" style="width: 80px" placeholder="8080" size="small"></el-input>-->
            <!--      </el-form-item>-->
            <br/>
            <el-form-item label="内置Tomcat目录" prop="tomcatDir">
              <el-input v-model="formData.tomcatDir" placeholder="/home/test/tomcatDir" size="small" style="width: 200px"></el-input>
            </el-form-item>
            <br/>
            <el-form-item label="tomcat端口" prop="tomcatPort">
              <el-input v-model="formData.tomcatPort" size="small" placeholder="22" style="width: 80px"></el-input>
            </el-form-item>
            <br/>
            <el-form-item label="日志路径" prop="logDir">
              <el-input v-model="formData.logDir" size="small" placeholder="/log/dir" style="width: 200px"></el-input>
            </el-form-item>
            <br/>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="OSGI配置">
          <micro-deploy-upgrade-osgi-settings ref="OsgiSettings"></micro-deploy-upgrade-osgi-settings>
        </el-tab-pane>
      </el-tabs>
    </div>
</template>

<script>
import MicroDeployUpgradeOsgiSettings from './MicroDeployUpgradeOsgiSettings';
export default {
  name: 'MicroDeployUpgradeStep',
  components: { MicroDeployUpgradeOsgiSettings },
  data() {
    return {
      formData1: {
        version: '',
        program: [],
        name: '',
        ip: [],
        sshAccount: '',
        dirs: '',
        servers: [],
      },
      formData: {
        eurekaDir: '',
        yssAppPath: '',
        tomcatDir: '',
        tomcatPort: '',
        logDir: '',
      },
    };
  },
  methods: {
    handleServerChange(val) {
      this.formData1.servers = [];
      val.forEach(item => {
        this.formData1.servers.push({
          ip: item,
          dirs: '',
        });
      });
    },
  },
};
</script>

<style scoped>

</style>
