<template>
  <div style="border-top: 1px solid rgb(235, 236, 245)">
    <div style="margin-top: 10px">
      <el-form label-position="right" label-width="140px" :model="extFormData" :rules="extRules" ref="extServiceForm" v-if="extFormData">
        <el-form-item label="外部服务" required>
          <el-checkbox v-model="extFormData.used" @change="handleSwitchExtService">启用</el-checkbox>
        </el-form-item>
        <el-form-item label="服务地址" prop="clusterUrl" v-if="extFormData.used">
          <el-input v-model="extFormData.clusterUrl" placeholder="" size="small" style="width: 400px"></el-input>
        </el-form-item>
        <el-form-item label="redis密码" prop="extraParameter.redisPassword" v-if="extFormData.used && extFormData.serviceCode === 'redis'">
          <el-input v-model="extFormData.extraParameter.redisPassword" :show-password="false" type="password" size="small" placeholder="******" style="width: 160px"></el-input>
        </el-form-item>
        <el-form-item label="" v-if="extFormData.used">
          <el-button size="mini" type="primary" @click="handleSaveExtService">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div v-if="!extFormData || !extFormData.used">
      <el-form label-position="right" label-width="140px" :model="formData" :inline="true" ref="formAddNode">
        <el-form-item label="选择服务版本" prop="programVersionId" required>
          <el-select v-model="formData.programVersionId" placeholder="请选择" size="small">
            <el-option v-for="item in versionList" :key="item.id"
              :label="item.versionNo"
              :value="item.versionNo">
            </el-option>
          </el-select>
          <el-button type="text" size="mini" style="margin-left: 10px" @click="showConfigManage">历史配置</el-button>
        </el-form-item>
      </el-form>
      <div>
        <!-- 实例标题-->
        <div style="background: #fafafa; height: 48px; line-height: 48px; font-size: 14px; border-top: 1px solid rgb(235, 238, 245); border-bottom: 1px solid rgb(235, 238, 245)">
          <span style="margin-left: 24px; color: rgba(0, 0, 0, 0.8); font-weight: 600;">配置实例程序</span>
          <i class="iconfont iconwarn" style="color: rgba(0, 0, 0, 0.4); margin-left: 9px;"></i>
          <span style="color: rgba(0, 0, 0, 0.4); margin-left: 5px;">分别选择每个实例，然后填写下面的配置内容</span>
        </div>

        <div>
          <!-- 实例横向滚动指示器 左-->
          <div style="width: 10px; height: 60px; background: #e8e8e8; float: left; margin-top: 20px; margin-left: 10px; line-height: 60px; text-align: center" @click="handleScrollRed">
            <i class="el-icon-arrow-left" style="font-size: 8px; color: rgba(0, 0, 0, 0.4)"></i>
          </div>
          <!-- 实例横向滚动指示器 右-->
          <div style="width: 10px; height: 60px; background: #e8e8e8; float: right; margin-top: 20px; margin-right: 10px; line-height: 60px; text-align: center" @click="handleScrollAdd">
            <i class="el-icon-arrow-right" style="font-size: 8px; color: rgba(0, 0, 0, 0.4)"></i>
          </div>
          <!-- 实例列表(横向)-->
          <div id="scroll-container-id" class="app-scroll-container" style="margin: 16px 24px">
            <div :style="{width: (instanceList.length + 1) * 320 + 'px'}">
              <div class="app-scroll-content" v-for="item in instanceList" :key="item.installDir + item.ip"  @click="handleSwitchInstance(currentInstance, item)">
                <div class="app-deploy-service" :class="{click: currentInstance && (item.installDir + item.ip === currentInstance.installDir + currentInstance.ip)}">
                  <div class="app-deploy-service-item" style="display: inline-block">
                    <span style="font-weight: 600; max-width: 180px; display: inline-block; overflow:hidden; vertical-align: bottom">{{item.name + (item.runningVersion ? ' : ' + item.runningVersion : '')}}&#12288;</span>
                    <i class="el-icon-refresh" style="color: #faad15; margin-left: 10px" v-if="item.programVersion && item.runningVersion !== item.programVersion"></i>
                    <i class="el-icon-warning" style="color: #faad15; margin-left: 10px" v-if="item.runningStatus === microServiceStatus.WARN"></i>
                    <i class="el-icon-error" style="color: #ff4d4f; margin-left: 10px" v-if="item.runningStatus === microServiceStatus.ERROR"></i>
                    <i class="el-icon-success" style="color: #13ce66; margin-left: 10px" v-if="item.runningStatus === microServiceStatus.NORMAL"></i>
                    <i class="el-icon-remove" style="color: rgba(0, 0, 0, 0.4); margin-left: 10px" v-if="item.runningStatus === microServiceStatus.INIT"></i>
                    <el-button type="text" size="mini" style="float: right; margin-right: 20px" v-if="currentInstance === item " @click="handleCompareConfig">对比</el-button>
                  </div>
                  <span class="app-deploy-service-item">{{item.ip}}</span>
                  <span class="app-deploy-service-item" v-if="formData.name && currentInstance === item">{{'当前配置版本: ' + formData.name}}</span>
                  <el-tooltip class="item" effect="dark" :content="item.installDir" placement="bottom" :open-delay="500">
                    <span class="app-deploy-service-item">{{item.installDir}}</span>
                  </el-tooltip>
<!--                  <span class="app-deploy-service-item">{{item.ip}}</span>-->
                </div>
                <div class="complete" style="position: absolute; right: 0; top: 0; width: 0; height:  0; border-top: 24px solid #3366ff;border-left: 24px solid transparent;" v-if="currentInstance !== item && item.deployStatus === 'DEPLOYED'"></div>
                <i class="el-icon-check" style="position: absolute; right: 0; top: 0; font-size: 8px; color: white; margin: 1px;"  v-if="currentInstance !== item && item.deployStatus === 'DEPLOYED'"></i>
              </div>

              <div class="app-scroll-content" @click="handleAddInstance" v-if="currentInstance && ['redis', 'fomp-traceCenter'].indexOf(currentInstance.serviceCode) === -1">
                <div class="app-deploy-add-instance">
                  <el-tooltip class="item" effect="light" content="实例动态扩容" placement="top" :open-delay="500">
                    <div style="height: 100%">
                      <i class="el-icon-plus" style="text-align: center; margin-top: 25px; font-size: 30px; color: blue"></i>
                    </div>
                  </el-tooltip>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div v-show="currentInstance && HIDE_MICRO_MAP.indexOf(currentInstance.serviceCode) === -1">
            <span class="app-deploy-h3">服务配置</span>
            <el-form label-position="right" label-width="160px" :model="formData.microserviceConfigVo" :rules="rules" :inline="true" ref="FormMicroService" style="margin-top: 10px; margin-left: -20px; width: 900px;">
              <div v-if="currentInstance && REQ_PARAMS_MAP.regCluster.indexOf(currentInstance.serviceCode) !== -1">
                <el-form-item label="注册中心类型" prop="regCenterType" >
                  <el-select v-model="formData.microserviceConfigVo.regCenterType" placeholder="请选择注册中心类型" size="small">
                    <el-option v-for="item in regTypeList" :key="item"
                               :label="item"
                               :value="item">
                    </el-option>
                  </el-select>
                </el-form-item>

                <el-form-item label="注册中心" prop="regClusterId">
                  <el-select v-model="formData.microserviceConfigVo.regClusterId" placeholder="请选择一个注册中心" size="small" style="width: 300px;">
                    <el-option v-for="item in regList" :key="item"
                               :label="item.clusterName"
                               :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
              </div>
              <el-form-item label="YSS_APP配置路径" prop="yssAppPath" required v-if="currentInstance && REQ_PARAMS_MAP.yssAppPath.indexOf(currentInstance.serviceCode) !== -1">
                <el-input v-model="formData.microserviceConfigVo.yssAppPath" style="width: 300px" placeholder="/home/test/yss_app" size="small"></el-input>
              </el-form-item>
              <!--      <el-form-item label="代理端口">-->
              <!--        <el-input v-model="formData.agentPort" style="width: 80px" placeholder="8080" size="small"></el-input>-->
              <!--      </el-form-item>-->
<!--              <el-form-item label="日志路径" prop="logPath" required v-if="currentInstance && REQ_PARAMS_MAP.logPath.indexOf(currentInstance.serviceCode) !== -1">-->
<!--                <el-input v-model="formData.microserviceConfigVo.logPath" size="small" placeholder="/log/dir" style="width: 300px"></el-input>-->
<!--              </el-form-item>-->

              <el-form-item label="内置Tomcat目录" prop="tomcatDir" required v-if="currentInstance && REQ_PARAMS_MAP.tomcatDir.indexOf(currentInstance.serviceCode) !== -1">
                <el-input v-model="formData.microserviceConfigVo.tomcatDir" placeholder="/home/test/tomcatDir" size="small" type="text" style="width: 300px"></el-input>
              </el-form-item>

              <el-form-item label="tomcat端口" prop="tomcatPort" v-if="currentInstance && REQ_PARAMS_MAP.tomcatPort.indexOf(currentInstance.serviceCode) !== -1">
                <el-input v-model="formData.microserviceConfigVo.tomcatPort" size="small" placeholder="22" type="number" style="width: 150px"></el-input>
              </el-form-item>

              <el-form-item label="redis密码" prop="redisPassword" v-if="currentInstance && REQ_PARAMS_MAP.redisPassword.indexOf(currentInstance.serviceCode) !== -1" >
                <el-input v-model="formData.microserviceConfigVo.redisPassword" style="width: 200px" placeholder="123456" size="small" type="password"></el-input>
              </el-form-item>

              <el-form-item label="nameSrv端口" prop="nameSrvPort" v-if="currentInstance && REQ_PARAMS_MAP.nameSrvPort.indexOf(currentInstance.serviceCode) !== -1">
                <el-input v-model="formData.microserviceConfigVo.nameSrvPort" size="small" placeholder="22" type="number" style="width: 150px"></el-input>
              </el-form-item>
              <div  v-if="currentInstance && REQ_PARAMS_MAP.proxyPort.indexOf(currentInstance.serviceCode) !== -1">
                <el-form-item label="代理端口" prop="proxyPort">
                  <el-input v-model="formData.microserviceConfigVo.proxyPort" size="small" placeholder="22" type="number" style="width: 150px"></el-input>
                </el-form-item>
              </div>
              <div  v-if="currentInstance && REQ_PARAMS_MAP.mqListenerPort.indexOf(currentInstance.serviceCode) !== -1">
                <el-form-item label="Broker端口" prop="mqListenerPort">
                  <el-input v-model="formData.microserviceConfigVo.mqListenerPort" size="small" placeholder="" type="number" style="width: 150px"></el-input>
                </el-form-item>
                <div style="display: inline-block; padding-top: 10px;">
                  <span style="color: rgba(0, 0, 0, 0.4); margin-left: 5px; font-size: 12px;">说明: 该端口及其 +1, -2端口用于broker端口</span>
                </div>
              </div>
            </el-form>
            <el-divider></el-divider>
          </div>

          <div v-show="currentInstance && HIDE_OSGI_MAP.indexOf(currentInstance.serviceCode) === -1">
            <span class="app-deploy-h3">OSGI配置</span>
            <el-form  label-position="right" label-width="160px" :model="formData.osgiConfigVo" :rules="rules" :inline="true" ref="FormOsgi" style="margin-left: -20px; width: 900px;">
              <el-form-item label="license文件" prop="licensePath" v-if="currentInstance && REQ_PARAMS_MAP.licensePath.indexOf(currentInstance.serviceCode) !== -1">
                <el-input v-model="formData.osgiConfigVo.licensePath" placeholder="license地址" style="width: 300px;" size="small"></el-input>
                <el-upload
                  class="upload-demo"
                  style="display: inline-block"
                  :action="baseUrl + '/microservice/instance/license/upload'"
                  :on-progress="onUploadProgress"
                  :on-error="onUploadError"
                  :on-success="onUploadSuccess"
                  :before-upload="onBeforeUnload"
                  :auto-upload="true"
                  :data="{instanceId: currentInstance && currentInstance.id}"
                  :show-file-list="false"
                  accept=".lic">
                  <el-button size="small" type="primary" style="border: 1px solid #d9d9d9; background-color: white; color: #3366ff; margin-left: -1px;">上传</el-button>
                </el-upload>
              </el-form-item>
              <br v-if="currentInstance && REQ_PARAMS_MAP.licensePath.indexOf(currentInstance.serviceCode) !== -1"/>
              <div v-if="currentInstance && REQ_PARAMS_MAP.db.indexOf(currentInstance.serviceCode) !== -1">
                <el-form-item label="数据库类型" prop="dbType" v-if="currentInstance && REQ_PARAMS_MAP.dbType.indexOf(currentInstance.serviceCode) !== -1">
                  <el-select v-model="formData.osgiConfigVo.dbType" placeholder="请选择数据库类型" size="small" style="width: 300px;">
                    <el-option v-for="item in dbTypeList" :key="item"
                               :label="item"
                               :value="item">
                    </el-option>
                  </el-select>
                </el-form-item>
                <br v-if="currentInstance && REQ_PARAMS_MAP.dbType.indexOf(currentInstance.serviceCode) !== -1"/>
                <el-form-item label="数据库地址" prop="dbIp">
                  <el-input placeholder="ip地址" v-model="formData.osgiConfigVo.dbIp" size="small" style="width: 250px" v-if="!formData.osgiConfigVo.useRAC"></el-input>
                  <div style="display: inline-block" v-if="formData.osgiConfigVo.useRAC">
                    <el-input placeholder="rac配置" v-model="formData.osgiConfigVo.racUrl" size="small" style="width: 580px" readonly></el-input>
                    <el-button type="text" style="width: 40px" @click="handleEditRac">编辑</el-button>
                  </div>
                </el-form-item>
                <el-form-item label-width="0px" prop="dbPort" v-if="!formData.osgiConfigVo.useRAC">
                  <el-input :max="65535" :min="0" placeholder="端口号" type="number" v-model="formData.osgiConfigVo.dbPort" size="small" style="margin-top: 6px; width: 200px;">
                    <template slot="prepend">:</template>
                    <template slot="append" v-if="currentInstance && REQ_PARAMS_MAP.dbName.indexOf(currentInstance.serviceCode) !== -1">/</template>
                  </el-input>
                </el-form-item>
                <el-form-item label-width="0px" prop="dbName" v-if="currentInstance && REQ_PARAMS_MAP.dbName.indexOf(currentInstance.serviceCode) !== -1 && !formData.osgiConfigVo.useRAC">
                  <el-input placeholder="实例名称" v-model="formData.osgiConfigVo.dbName" :title="formData.osgiConfigVo.dbName" size="small" style="width: 150px;">
                  </el-input>
                </el-form-item>

                <el-form-item label-width="0px" prop="dbName" v-if="currentInstance && REQ_PARAMS_MAP.dbName.indexOf(currentInstance.serviceCode) !== -1">
                  <el-checkbox v-model="formData.osgiConfigVo.useRAC" @change="handleOnRacChange">rac模式</el-checkbox>
                </el-form-item>
                <br/>
                <el-form-item label="数据库用户名" prop="userName">
                  <el-input v-model="formData.osgiConfigVo.userName" style="width: 300px" placeholder="root" size="small"></el-input>
                </el-form-item>
                <el-form-item label="数据库密码" prop="password">
                  <el-input v-model="formData.osgiConfigVo.password" style="width: 200px" placeholder="123456" size="small" type="password"></el-input>
                </el-form-item>
              </div>
              <el-form-item label="数据库" prop="dbSourceConfigId" v-if="currentInstance && REQ_PARAMS_MAP.dbSourceConfigId.indexOf(currentInstance.serviceCode) !== -1">
                <el-select v-model="formData.osgiConfigVo.dbSourceConfigId" placeholder="请选择一个数据库" size="small" style="width: 300px;">
                  <el-option v-for="item in getDbList" :key="item"
                             :label="item.des"
                             :value="item.id">
                  </el-option>
                </el-select>
                <el-button size="mini" type="primary" style="margin-left: 15px" @click="handleShowExtDb">数据库管理</el-button>
              </el-form-item>
              <el-form-item label="日志路径" prop="logPath" v-if="currentInstance && REQ_PARAMS_MAP.logPath.indexOf(currentInstance.serviceCode) !== -1">
                <el-input v-model="formData.osgiConfigVo.logPath" size="small" placeholder="/log/dir" style="width: 670px"></el-input>
              </el-form-item>
              <el-form-item label="消息总线" prop="mqClusterId" v-if="currentInstance && REQ_PARAMS_MAP.mqClusterId.indexOf(currentInstance.serviceCode) !== -1">
                <el-select v-model="formData.osgiConfigVo.mqClusterId" placeholder="请选择一个消息总线" size="small" style="width: 300px;">
                  <el-option v-for="item in mqList" :key="item"
                             :label="item.clusterName"
                             :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
              <div  v-if="currentInstance && REQ_PARAMS_MAP.mqListenerPort2.indexOf(currentInstance.serviceCode) !== -1">
                <el-form-item label="Broker端口" prop="mqListenerPort">
                  <el-input v-model="formData.osgiConfigVo.mqListenerPort" size="small" placeholder="" type="number" style="width: 150px"></el-input>
                </el-form-item>
                <div style="display: inline-block; padding-top: 10px;">
                  <span style="color: rgba(0, 0, 0, 0.4); margin-left: 5px; font-size: 12px;">说明: 该端口及其 +1, -1, -2端口用于broker端口</span>
                </div>
              </div>
              <el-form-item label="zookeeper" prop="zkClusterId" v-if="currentInstance && REQ_PARAMS_MAP.zkClusterId.indexOf(currentInstance.serviceCode) !== -1">
                <el-select v-model="formData.osgiConfigVo.zkClusterId" placeholder="请选择一个zookeeper" size="small" style="width: 300px;">
                  <el-option v-for="item in zkList" :key="item"
                             :label="item.clusterName"
                             :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="Redis中心" prop="redisClusterId" v-if="currentInstance && REQ_PARAMS_MAP.redisClusterId.indexOf(currentInstance.serviceCode) !== -1">
                <el-select v-model="formData.osgiConfigVo.redisClusterId" placeholder="请选择一个redis" size="small" style="width: 300px;">
                  <el-option v-for="item in redisList" :key="item"
                             :label="item.clusterName"
                             :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="zk端口" prop="zkClientPort" required v-if="currentInstance && REQ_PARAMS_MAP.zkClientPort.indexOf(currentInstance.serviceCode) !== -1">
                <el-input v-model="formData.osgiConfigVo.zkClientPort" placeholder="" size="small"></el-input>
              </el-form-item>
            </el-form>
            <el-divider></el-divider>
          </div>
          <div v-for="advanceItem in formData.advanceConfigList" :key="advanceItem.path">
            <div @click="advanceItem.collapse = !advanceItem.collapse">
              <i :class="{'el-icon-caret-right': advanceItem.collapse, 'el-icon-caret-bottom': !advanceItem.collapse}" style="color: #999999; margin-left: 14px;"></i>
              <span class="app-deploy-h3" style="margin-left: 4px; cursor: default">{{advanceItem.des}}</span>
            </div>
            <div v-if="!advanceItem.collapse">
              <el-form label-position="right" label-width="auto" :model="advanceFormMap[advanceItem.key]" :rules="rules" :inline="true" ref="FormAdvance" style="margin-top: 10px; margin-left: 20px; width: 900px;" v-if="advanceItem.type === 'properties'">
                <el-form-item v-for="formItem in advanceFormMap[advanceItem.key].properties" :key="formItem.key" :label="formItem.tag" style="margin-right: 40px">
                  <el-input v-model="formItem.value" size="small" type="text" style="width: 190px" v-if="['true', 'false'].indexOf(formItem.value + '') === -1" :prop="formItem.key === 'debug_port' ? 'debug_port' : undefined"></el-input>

<!--                  <el-switch-->
<!--                    v-model="formItem.value" size="small" v-if="['true', 'false'].indexOf(formItem.value + '') !== -1"-->
<!--                    active-text="是"-->
<!--                    inactive-text="否">-->
<!--                  </el-switch>-->
                  <el-select v-model="formItem.value" size="small" style="width: 300px;" v-if="['true', 'false'].indexOf(formItem.value + '') !== -1">
                    <el-option
                      label="true"
                      :value="true">
                    </el-option>
                    <el-option
                      label="false"
                      :value="false">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="其他参数" v-if="advanceItem.key !== 'debugMode'">
                  <el-input v-model="advanceItem.extra" :rows="5" type="textarea" style="width: 550px"></el-input>
                </el-form-item>
              </el-form>
              <codemirror v-model="advanceItem.value" :options="{tabSize: 4, mode: 'text/xml', theme: 'base16-light', lineNumbers: true, line: true,}" :key="advanceItem.path" style="margin: 10px 20px" v-if="advanceItem.type === 'xml'"></codemirror>
              <el-divider></el-divider>
            </div>
            <div style="height: 10px" v-if="advanceItem.collapse"></div>
          </div>
<!--          <div>-->
<!--            <div @click="onAdvanceConfigCollapse">-->
<!--              <i :class="{'el-icon-caret-right': collapseAdvance, 'el-icon-caret-bottom': !collapseAdvance}" style="color: #999999; margin-left: 14px;"></i>-->
<!--              <span class="app-deploy-h3" style="margin-left: 4px; cursor: default">高级配置</span>-->
<!--            </div>-->
<!--            <div style="width: 70%; margin-top: 10px; margin-left: 20px; border: 1px solid #EBEEF5; position: relative" v-if="!collapseAdvance">-->
<!--              <el-row style="margin-top: -1px">-->
<!--                <el-col :span="6">-->
<!--                  <el-table-->
<!--                    :data="advanceForm.fileList"-->
<!--                    style="margin: 0px -1px 0px -1px; width: 100%;"-->
<!--                    max-height="440"-->
<!--                    @row-click="handleClickTableRow"-->
<!--                    :header-cell-style="{background:'#FAFAFA',color:'#333333', fontWeight: '600'}"-->
<!--                    :header-row-style="{height: '40px'}"-->
<!--                    :row-style="{height: '40px'}"-->
<!--                    :cell-style="{fontSize: '14px', fontWeight: '400', color: '#333333'}"-->
<!--                    :row-class-name="tableRowClassName"-->
<!--                    row-key="filePath"-->
<!--                    default-expand-all-->
<!--                    :tree-props="{children: 'children'}"-->
<!--                    border>-->
<!--                    <el-table-column-->
<!--                      prop="name"-->
<!--                      label="文件列表">-->
<!--                    </el-table-column>-->
<!--                  </el-table>-->
<!--                  <el-button type="primary" size="mini" @click="handleSaveAdvanceConfig" style="margin-top: 10px; position: absolute; bottom: 10px; right: -120px">保存高级配置</el-button>-->
<!--                </el-col>-->

<!--                <el-col :span="18">-->
<!--                  <codemirror v-model="advanceForm.fileContent" :options="cmOptions" :key="advanceForm.filePath"></codemirror>-->
<!--&lt;!&ndash;                  <el-input v-model="advanceForm.fileContent" size="small" placeholder="###" style="width: 100%; margin-left: -1px" type="textarea" :rows="25"></el-input>&ndash;&gt;-->
<!--                </el-col>-->
<!--              </el-row>-->

<!--            </div>-->
<!--&lt;!&ndash;            <el-form label-position="right" label-width="140px" :model="advanceForm" :inline="true" ref="formAdvance" v-if="!collapseAdvance" v-loading="advanceLoading">&ndash;&gt;-->
<!--&lt;!&ndash;              <el-form-item label="配置文件">&ndash;&gt;-->
<!--&lt;!&ndash;                <el-select v-model="advanceForm.filePath" placeholder="选择一个配置文件" size="small" style="width: 300px" @change="handleConfigFileChange">&ndash;&gt;-->
<!--&lt;!&ndash;                  <el-option v-for="item in advanceForm.fileList" :key="item"&ndash;&gt;-->
<!--&lt;!&ndash;                             :label="item"&ndash;&gt;-->
<!--&lt;!&ndash;                             :value="item">&ndash;&gt;-->
<!--&lt;!&ndash;                  </el-option>&ndash;&gt;-->
<!--&lt;!&ndash;                </el-select>&ndash;&gt;-->
<!--&lt;!&ndash;              </el-form-item>&ndash;&gt;-->
<!--&lt;!&ndash;              <br/>&ndash;&gt;-->
<!--&lt;!&ndash;              <el-form-item label="配置内容">&ndash;&gt;-->
<!--&lt;!&ndash;                <el-input v-model="advanceForm.fileContent" size="small" placeholder="###" style="width: 670px" type="textarea" :rows="20"></el-input>&ndash;&gt;-->
<!--&lt;!&ndash;              </el-form-item>&ndash;&gt;-->
<!--&lt;!&ndash;              <br/>&ndash;&gt;-->
<!--&lt;!&ndash;              <el-form-item label=" ">&ndash;&gt;-->
<!--&lt;!&ndash;                <el-button type="primary" size="mini" @click="handleSaveAdvanceConfig">保存高级配置</el-button>&ndash;&gt;-->
<!--&lt;!&ndash;              </el-form-item>&ndash;&gt;-->
<!--&lt;!&ndash;            </el-form>&ndash;&gt;-->
<!--          </div>-->
        </div>
<!--        <el-collapse v-model="collapseName">-->
<!--          <el-collapse-item title="高级配置" name="3" style="margin-top: 20px; margin-bottom: 60px;">-->
<!--            <div>-->

<!--            </div>-->
<!--          </el-collapse-item>-->
<!--        </el-collapse>-->
        <div style="text-align: center; padding: 20px">
          <el-button type="primary" size="small" class="my-button" @click="handleSaveInstanceConfigVersion(formData)" style="border: 1px solid #3366ff; background-color: white; color: #3366ff; width: 88px; height: 33px; font-size: 14px; font-weight: 500">
            存档
          </el-button>
          <el-button type="primary" size="small" class="my-button" @click="handleSaveAndStartService(formData)" style="border: 1px solid #3366ff; background-color: #3366ff; color: white; width: 98px; height: 33px; font-size: 14px; font-weight: 500">
            启动
          </el-button>

          <el-button type="primary" size="small" class="my-button" @click="handleShowDeployLog" style="border: 1px solid #3366ff; background-color: white; color: #3366ff; width: 88px; height: 33px; font-size: 14px; font-weight: 500">
            日志
          </el-button>
        </div>
      </div>
    </div>
    <micro-setting-file-select ref="SettingFileSelect"></micro-setting-file-select>
    <micro-rac-edit ref="RacEdit" :on-added="handleOnRacEdit"></micro-rac-edit>
    <micro-compare-config ref="CompareConfig"></micro-compare-config>
    <micro-ext-db-manage ref="ExtDbManage" :do-refresh="refreshDbData"></micro-ext-db-manage>
    <micro-project-preview ref="ProjectPreview" :on-added="onProjectPreviewed"></micro-project-preview>
    <micro-config-manage ref="ConfigManage" :on-added="onSwitchConfig"></micro-config-manage>
    <app-loading ref="AppLoading"></app-loading>
  </div>

</template>

<script>
import MicroConfigManage from './MicroConfigManage';
import MicroProjectPreview from './MicroProjectPreview';
import MicroExtDbManage from './MicroExtDbManage';
import MicroSettingFileSelect from './MicroSettingFileSelect';
import MicroCompareConfig from './MicroCompareConfig';
import * as validate from '@/libs/validate';
import * as api from '../api/micro_service_api';
import AppLoading from '../../../components/AppLoading';
import MicroRacEdit from './MicroRacEdit';
import 'codemirror/mode/javascript/javascript.js';
import 'codemirror/mode/properties/properties.js';
import 'codemirror/mode/xml/xml.js';
import 'codemirror/mode/yaml/yaml.js';
// import theme style
import 'codemirror/theme/base16-light.css';
export default {
  name: 'MicroDeployPanel',
  components: { MicroConfigManage, MicroExtDbManage, MicroCompareConfig, MicroSettingFileSelect, AppLoading, MicroRacEdit, MicroProjectPreview },
  props: ['microServiceDigestVo', 'extServiceVo', 'onDeploying', 'doUpdate'],
  data() {
    // let validClusterUrl = (rule, value, callback) => {
    //   let serviceCode = this.currentInstance.serviceCode;
    //   if (serviceCode === 'zookeeper') {
    //
    //   } else if (serviceCode === 'redis') {
    //
    //   }
    //   api.checkDirPermission(this.currentInstance.serverId, value)
    //     .then(res => {
    //       if (res.data) {
    //         callback();
    //       } else {
    //         callback(new Error('该目录无权限'));
    //       }
    //     })
    //     .catch(reason => {
    //       console.log(reason);
    //       callback(new Error('网络错误'));
    //     });
    // };
    let validDirPermission = (rule, value, callback) => {
      api.checkDirPermission(this.currentInstance.serverId, value)
        .then(res => {
          if (res.data) {
            callback();
          } else {
            callback(new Error('该目录无权限'));
          }
        })
        .catch(reason => {
          console.log(reason);
          callback(new Error('网络错误'));
        });
    };
    let validBrokerPort = (rule, value, callback) => {
      console.log(value);
      let broker1 = parseInt(value) + 1;
      let broker2 = parseInt(value) - 2;
      let broker3 = parseInt(value) - 1;
      let broker = parseInt(value);
      if ([broker + '', broker1 + '', broker2 + '', broker3 + ''].indexOf(this.formData.microserviceConfigVo.tomcatPort + '') !== -1) {
        callback(new Error('tomcat端口和broker端口(+1, -1, -2)冲突'));
      }
      api.checkPortUsed([broker + '', broker1 + '', broker2 + '', broker3 + ''].join(','), this.currentInstance.serverId, this.currentInstance.id)
        .then(res => {
          if (!res.data) {
            callback();
          } else {
            callback(new Error('端口' + value + '已被使用'));
          }
        })
        .catch(reason => {
          // do nth
          console.log(reason);
          callback(new Error('网络异常'));
        });
    };
    let validDebugPort = (rule, value, callback) => {
      if (value + '' === this.formData.microserviceConfigVo.tomcatPort + '') {
        callback(new Error('tomcat端口和debug端口冲突'));
      }

      api.checkPortUsed(value, this.currentInstance.serverId, this.currentInstance.id)
        .then(res => {
          if (!res.data) {
            callback();
          } else {
            callback(new Error('端口' + value + '已被使用'));
          }
        })
        .catch(reason => {
          // do nth
          console.log(reason);
          callback(new Error('网络异常'));
        });
    };
    let validPort = (rule, value, callback) => {
      if (this.formData.microserviceConfigVo.tomcatPort + '' === this.formData.osgiConfigVo.zkClientPort + '') {
        callback(new Error('tomcat端口和zk端口冲突'));
      }
      if (this.formData.microserviceConfigVo.tomcatPort + '' === this.formData.microserviceConfigVo.proxyPort + '') {
        callback(new Error('tomcat端口和代理端口冲突'));
      }

      api.checkPortUsed(value, this.currentInstance.serverId, this.currentInstance.id)
        .then(res => {
          if (!res.data) {
            callback();
          } else {
            callback(new Error('端口' + value + '已被使用'));
          }
        })
        .catch(reason => {
          // do nth
          console.log(reason);
          callback(new Error('网络异常'));
        });
    };
    return {
      extFormData: null,
      reqParamsKeyMap: {
        regCenterType: '注册中心类型',
        regClusterId: '注册中心',
        yssAppPath: 'YSS_APP配置路径',
        tomcatDir: '内置Tomcat目录',
        tomcatPort: 'tomcat端口',
        redisPassword: 'redis密码',
        nameSrvPort: 'nameSrv端口',
        proxyPort: '代理端口',
        mqListenerPort: 'Broker端口',
        mqListenerPort2: 'Broker端口',
        licensePath: 'license文件',
        dbType: '数据库类型',
        dbIp: '数据库地址',
        logPath: '日志路径',
        mqClusterId: '消息总线',
        zkClusterId: 'zookeeper',
        redisClusterId: 'Redis中心',
        dbSourceConfigId: '数据库',
        zkClientPort: 'zk端口',
      },
      microServiceStatus: {
        WARN: 'WARN',
        ERROR: 'ERROR',
        NORMAL: 'NORMAL',
        INIT: 'INIT',
      },
      INST_DEPLOY_STATUS: {
        NOT_DEPLOYED: '未部署',
        DEPLOYING: '部署中',
        DEPLOYED: '已部署',
      },
      SERVICE_CODE_MAP: {
        zookeeper: 'zookeeper',
        zkService: 'osgi-zookeeper',
        fastService: 'osgi-fast',
        automaticService: 'osgi-automatic',
      },
      // 用于控制 某个微服务是否 显示整个 osgi 配置区域
      HIDE_OSGI_MAP: ['fomp-eureka', 'osgi-gateway', 'fomp-mq-rocketmq-namesrv', 'redis'],
      // 用于控制 某个微服务 是否显示 整个 服务配置 区域
      HIDE_MICRO_MAP: ['zookeeper'],
      REQ_PARAMS_MAP: {
        zkClientPort: ['zookeeper', 'osgi-zookeeper'],
        zkClusterId: ['osgi-mq', 'osgi-fast', 'osgi-basebusiness', 'osgi-automatic', 'osgi-uco', 'osgi-unifypay', 'osgi-elecreco'],
        mqClusterId: [
          'osgi-fast', 'osgi-basebusiness', 'osgi-automatic', 'osgi-uco', 'osgi-unifypay', 'osgi-elecreco', 'fomp-mq-rocketmq-broker', 'fomp-mq-rocketmq-console', 'fomp-mq-proxy',
        ],
        redisClusterId: [
          'osgi-fast', 'osgi-basebusiness', 'osgi-automatic', 'osgi-uco', 'osgi-unifypay', 'osgi-elecreco', 'fomp-mq-rocketmq-broker', 'fomp-mq-rocketmq-console', 'fomp-mq-proxy',
        ],
        dbSourceConfigId: ['fomp-traceCenter', 'osgi-mq', 'fomp-mq-proxy', 'osgi-fast', 'osgi-basebusiness', 'osgi-automatic', 'osgi-uco', 'osgi-unifypay', 'osgi-elecreco'],
        db: [], // 'fomp-traceCenter', 'osgi-mq', 'fomp-mq-proxy', 'osgi-fast', 'osgi-basebusiness', 'osgi-automatic', 'osgi-uco', 'osgi-unifypay', 'osgi-elecreco'
        dbType: ['fomp-traceCenter'],
        dbName: ['osgi-mq', 'fomp-mq-proxy', 'osgi-fast', 'osgi-basebusiness', 'osgi-automatic', 'osgi-uco', 'osgi-unifypay', 'osgi-elecreco'],
        licensePath: [],
        tomcatPort: ['osgi-zookeeper', 'fomp-eureka', 'fomp-traceCenter', 'osgi-gateway', 'redis', 'osgi-mq', 'fomp-mq-rocketmq-console', 'fomp-mq-proxy', 'osgi-fast', 'osgi-basebusiness', 'osgi-automatic', 'osgi-uco', 'osgi-unifypay', 'osgi-elecreco'],
        nameSrvPort: ['fomp-mq-rocketmq-namesrv'],
        proxyPort: ['fomp-mq-proxy'],
        tomcatDir: [],
        logPath: [
          // 'osgi-fast', 'osgi-mq', 'osgi-basebusiness', 'osgi-automatic', 'osgi-uco', 'osgi-unifypay', 'osgi-elecreco'
        ],
        redisPassword: ['redis'],
        yssAppPath: [],
        // regCenterAddress: ['osgi-zookeeper', 'fomp-traceCenter'],
        // regCenterType: ['osgi-zookeeper', 'fomp-traceCenter'],
        regCluster: ['fomp-traceCenter', 'osgi-gateway', 'osgi-mq', 'fomp-mq-proxy', 'osgi-fast', 'osgi-basebusiness', 'osgi-automatic', 'osgi-uco', 'osgi-unifypay', 'osgi-elecreco'], // 控制 微服务注册中心 配置是否显示, (兼容性， 两个都要)
        regClusterId: ['fomp-traceCenter', 'osgi-gateway', 'osgi-mq', 'fomp-mq-proxy', 'osgi-fast', 'osgi-basebusiness', 'osgi-automatic', 'osgi-uco', 'osgi-unifypay', 'osgi-elecreco'], // 控制 微服务注册中心 配置是否显示, (兼容性， 两个都要)
        mqListenerPort: ['fomp-mq-rocketmq-broker'],
        mqListenerPort2: ['osgi-mq'],
      },
      baseUrl: process.env.VUE_APP_MONITOR_API,
      mainOperate: 'upgrade',
      activeName: 'first',
      collapseName: ['1', '2'],
      startProgram: 0,
      endProgram: 4,
      microServiceDigest: null,
      instanceList: [],
      instanceListMap: {},
      cacheVersion: '',
      instanceItem: {
        deployStatus: 'deployed', // deploying
        id: '1',
        installDir: '/home/tomcat/1',
        ip: '192.168.4.225',
        name: '实例1',
        runningStatus: 'DOWN',
        schemeId: '1',
        schemeName: '方案1',
        serverId: '1',
        serviceCode: '微服务1',
      },
      currentInstance: null,
      versionList: [],
      mqList: [],
      zkList: [],
      regList: [],
      redisList: [],
      regTypeList: [],
      dbTypeList: [],
      dbList: [],
      initDb: false, // 是否已初始化db数据
      initConfig: false,
      collapseAdvance: true,
      advanceLoading: false,
      advanceForm: {
        loading: false,
        fileList: [],
        filePath: '',
        fileContent: '',
      },
      advanceFormFileListItem: {
        name: '',
        filePath: '',
        children: [],
      },
      cmOptions: {},
      formData: {
        id: '',
        schemeId: '',
        serviceCode: '',
        instanceId: '',
        programVersionId: '',
        microserviceConfigVo: {
          regCenterType: 'eureka',
          regCenterAddress: '',
          regClusterId: '',
          id: '',
          instanceId: '',
          // logPath: '',
          tomcatDir: '',
          tomcatPort: 0,
          nameSrvPort: 0,
          proxyPort: 0,
          yssAppPath: '',
          redisPassword: '',
        },
        osgiConfigVo: {
          dbType: '',
          dbIp: '',
          dbName: '',
          dbPort: 0,
          racUrl: '',
          racData: '',
          id: '',
          instanceId: '',
          licensePath: '',
          mqClusterId: '',
          redisClusterId: '',
          dbSourceConfigId: '',
          mqListenerPort: '',
          password: '',
          userName: '',
          zkClusterId: '',
          zkClientPort: '',
          logPath: '',
        },
        advanceConfigList: [
          // {
          //   path: 'YSS_APP/global/zoo.cfg',
          //   des: 'xxx配置',
          //   type: 'properties',
          //   collapse: true,
          //   properties: [
          //     {
          //       key: 'tickTime',
          //       tag: 'xx时间',
          //       value: '',
          //     },
          //     {
          //       key: 'admin.enableServer',
          //       tag: 'xxx',
          //       value: '',
          //     },
          //   ],
          //   extra: 'xxx=aaa',
          // },
          // {
          //   path: 'YSS_APP/global/zoo.xml',
          //   des: 'xxx配置',
          //   type: 'xml',
          //   collapse: true,
          //   value: '',
          // },
        ],
        advancedValue: '',
        advancedFile: '',
      },
      advanceFormMap: {
      },
      advanceFormMapItem: {
        advanceConfigVoItemKey: 'advanceConfigVoItem',
      },
      extRules: {
        clusterUrl: [
          { required: true, message: '请输入url地址', trigger: 'blur' },
          {validator: validate.validCluster, trigger: 'blur'},
        ],
        extraParameter: {
          redisPassword: [{required: true, message: 'redis密码不能为空', trigger: 'blur'}],
        },
        // redisPassword: [{required: true, message: 'redis密码不能为空', trigger: 'blur'}],
      },
      rules: {
        clusterUrl: [
          { required: true, message: '请输入url地址', trigger: 'blur' },
        ],
        debug_port: [
          {required: true, message: 'tomcat端口不能为空', trigger: 'blur'},
          {
            pattern: validate.portExp().exp,
            message: validate.portExp().msg,
            trigger: 'blur',
          },
          {validator: validDebugPort, trigger: 'blur'},
        ],
        programVersionId: [{ required: true, message: '选择一个服务版本', trigger: 'change' }],
        regCenterAddress: [
          {required: true, message: '注册中心地址不能为空', trigger: 'blur'},
          {validator: validate.validIpPort, trigger: 'blur'},
        ],
        regClusterId: [
          {required: true, message: '请选择一个注册中心', trigger: 'blur'},
        ],
        yssAppPath: [{validator: validate.isNotEmpty, trigger: 'blur'}],
        tomcatDir: [{validator: validate.isNotEmpty, trigger: 'blur'}],
        tomcatPort: [
          {required: true, message: 'tomcat端口不能为空', trigger: 'blur'},
          {
            pattern: validate.portExp().exp,
            message: validate.portExp().msg,
            trigger: 'blur',
          },
          {validator: validPort, trigger: 'blur'},
        ],
        nameSrvPort: [
          {required: true, message: 'nameSrv端口不能为空', trigger: 'blur'},
          {
            pattern: validate.portExp().exp,
            message: validate.portExp().msg,
            trigger: 'blur',
          },
          {validator: validPort, trigger: 'blur'},
        ],
        proxyPort: [
          {required: true, message: '代理端口不能为空', trigger: 'blur'},
          {
            pattern: validate.portExp().exp,
            message: validate.portExp().msg,
            trigger: 'blur',
          },
          {validator: validPort, trigger: 'blur'},
        ],
        mqListenerPort: [
          {required: true, message: 'broker端口不能为空', trigger: 'blur'},
          {
            pattern: validate.portExp().exp,
            message: validate.portExp().msg,
            trigger: 'blur',
          },
          {validator: validBrokerPort, trigger: 'blur'},
        ],
        logPath: [
          {required: true, message: '日志目录不能为空', trigger: 'blur'},
          // {
          //   pattern: validate.cateExp().exp,
          //   message: validate.cateExp().msg,
          //   trigger: 'blur',
          // },
          {validator: validDirPermission, trigger: 'blur'},
        ],
        mqClusterId: [{required: true, message: '请选择一个消息总线', trigger: 'blur'}],
        redisClusterId: [{required: true, message: '请选择一个redis', trigger: 'blur'}],
        dbSourceConfigId: [{required: true, message: '请选择一个数据库', trigger: 'change'}],
        licensePath: [{required: true, message: 'license地址不能为空', trigger: 'blur'}],
        //
        // : [{validator: validate.isNotEmpty, trigger: 'blur'}],
        advancedFile: [{validator: validate.isNotEmpty, trigger: 'change'}],
        advancedValue: [{validator: validate.isNotEmpty, trigger: 'change'}],
        dbType: [{required: true, message: '数据库类型不能为空', trigger: 'blur'}],
        dbIp: [{required: true, message: '数据库地址不能为空', trigger: 'blur'}],
        dbPort: [
          {required: true, message: '数据库端口不能为空', trigger: 'blur'},
          {
            pattern: validate.portExp().exp,
            message: validate.portExp().msg,
            trigger: 'blur',
          },
        ],
        dbName: [{required: true, message: '数据库名称不能为空', trigger: 'blur'}],
        userName: [{required: true, message: '数据库用户名不能为空', trigger: 'blur'}],
        password: [{required: true, message: '数据库密码不能为空', trigger: 'blur'}],
        redisPassword: [{required: true, message: 'redis密码不能为空', trigger: 'blur'}],
        zkClusterId: [{required: true, message: '请选择一个zookeeper', trigger: 'blur'}],
        zkClientPort: [
          {required: true, message: 'zk端口不能为空', trigger: 'blur'},
          {
            pattern: validate.portExp().exp,
            message: validate.portExp().msg,
            trigger: 'blur',
          },
          {validator: validPort, trigger: 'blur'},
        ],
      },
    };
  },
  created() {
    this.handleAdvanceFormMap();
  },
  computed: {
    getDbList() {
      if (this.currentInstance.serviceCode === 'fomp-traceCenter') {
        return this.dbList.filter(item => item.type === 'mysql');
      } else {
        return this.dbList.filter(item => item.type === 'oracle');
      }
    },
  },
  mounted() {
    this.microServiceDigest = this.microServiceDigestVo;
    if (this.extServiceVo) {
      let extFormData = {};
      Object.assign(extFormData, this.extServiceVo);
      this.extFormData = extFormData;
      if (!this.extServiceVo.extraParameter) {
        this.extServiceVo.extraParameter = {};
      }
      this.extFormData.extraParameter = {
        redisPassword: this.extServiceVo.extraParameter.redisPassword,
      };
      console.log(this.extServiceVo, this.extFormData, '测试');
    }
    console.log(this.microServiceDigest);
    this.instanceList = this.microServiceDigest.instanceVoList;
    let instanceListMap = {};
    this.instanceList.forEach(item => {
      instanceListMap[item.id] = item;
    });
    this.instanceListMap = instanceListMap;
    if (this.instanceList && this.instanceList.length > 0) {
      this.handleSwitchInstance(null, this.instanceList[0]);
    }
    this.initData();
    console.log(this.$root, 'xxx');
  },
  methods: {
    onSwitchConfig(versionVo) {
      this.$refs.ConfigManage.close();
      let val = JSON.parse(JSON.stringify(versionVo));
      val.configVersionId = val.id;
      Object.assign(this.formData, versionVo);
      // this.formData.osgiConfigVo = val.osgiConfigVo;
      // this.formData.microserviceConfigVo = val.microserviceConfigVo;
      // this.formData.advanceConfigList = val.advanceConfigList;
      // this.formData.programVersionId = val.programVersionId;
    },
    showConfigManage() {
      this.$refs.ConfigManage.show(this.currentInstance.id);
    },
    refreshDbData() {
      api.getExtDbConfigBySchemeId(this.currentInstance.schemeId)
        .then(res => {
          this.hideLoading();
          this.dbList = res.data;
          if (!this.dbList || this.dbList.length === 0 || this.dbList.map(item => item.id).indexOf(this.formData.osgiConfigVo.dbSourceConfigId) === -1) {
            this.formData.osgiConfigVo.dbSourceConfigId = '';
          }
          this.handleSetDefaultRegData();
        })
        .catch(reason => {
          console.log(reason);
          this.hideLoading();
        });
    },
    onProjectPreviewed(p) {
      p.then(res => {
        this.$refs.ProjectPreview.closeLoading();
        this.$refs.ProjectPreview.close();
        this.doUpdate(true);
      }).catch(reason => {
        console.log(reason);
        this.$refs.ProjectPreview.closeLoading();
      });
    },
    onInstanceListChanged() {
      let instanceListMap = {};
      this.instanceList.forEach(item => {
        instanceListMap[item.id] = item;
      });
      this.instanceListMap = instanceListMap;
    },
    handleAddInstance() {
      this.$prompt('请输入扩容数量', '实例扩容', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /[1-9]/,
        inputErrorMessage: '请输入1-10内的扩容数量',
      }).then(({ value }) => {
        return api.expandServiceNode(value, this.currentInstance.schemeId, this.currentInstance.serviceCode);
      }).then(res => {
        if (res.data && res.data.length > 1) {
          this.$refs.ProjectPreview.show(res.data);
        } else {
          this.doUpdate(true);
        }
      }).catch((reason) => {
        console.log(reason);
      });
    },
    testChange(val) {
      console.log(this.extFormData, '  aaa  ', val);
    },
    handleShowExtDb() {
      this.$refs.ExtDbManage.show(this.formData.schemeId);
    },
    handleSwitchExtService(val) {
      if (!val && this.extFormData.id) {
        let data = Object.assign({}, this.extFormData);
        data.extraParameter = JSON.stringify(data.extraParameter);
        this.showLoading('正在取消外部' + this.currentInstance.serviceCode);
        api.changeExtServiceStatus(data)
          .then(res => {
            this.hideLoading();
            // 更新父界面数据
            Object.assign(this.extServiceVo, this.extFormData);
          })
          .catch(reason => {
            console.log(reason);
            this.extFormData.used = !val;
            this.hideLoading();
          });
      }
    },
    handleSaveExtService() {
      this.$refs.extServiceForm.validate(valid => {
        if (valid) {
          this.showLoading('请求中');
          let data = Object.assign({}, this.extFormData);
          data.extraParameter = JSON.stringify(data.extraParameter);
          api.saveExtService(data)
            .then(res => {
              this.hideLoading();
              // 更新父界面数据
              if (res.data.extraParameter) {
                res.data.extraParameter = JSON.parse(res.data.extraParameter);
              }
              Object.assign(this.extServiceVo, res.data);
              Object.assign(this.extFormData, this.extServiceVo);
              console.log(this.extServiceVo, 'bbbb');
            })
            .catch(reason => {
              console.log(reason);
              this.hideLoading();
            });
        }
      });
    },
    handleCompareConfig() {
      this.formData.instanceId = this.currentInstance.id;
      let data = JSON.parse(JSON.stringify(this.formData));
      data.id = '';
      this.$refs.CompareConfig.show(data);
    },
    handleEditRac() {
      this.$refs.RacEdit.show(this.formData.osgiConfigVo.racData);
    },
    handleOnRacEdit(racData, racUrl) {
      if (racData) {
        this.formData.osgiConfigVo.racUrl = racUrl;
        this.formData.osgiConfigVo.racData = racData;
      } else {
        if (!this.formData.osgiConfigVo.racUrl) {
          this.formData.osgiConfigVo.useRAC = false;
        }
      }
    },
    handleOnRacChange(val) {
      if (val) {
        if (!this.formData.osgiConfigVo.racUrl) {
          // show rac edit dialog
          this.$refs.RacEdit.show();
        }
      }
    },
    handleClickTableRow(row, event, column) {
      console.log(this, 'xxxxxx');
      if (!row.children || row.children.length === 0) {
        this.handleConfigFileChange(row.filePath);
      }
    },
    tableRowClassName({row, rowIndex}) {
      if (this.advanceForm.filePath && this.advanceForm.filePath === row.filePath) {
        return 'warning-row';
      }
      return '';
    },
    genrateTree(pathList) {
      let tree = {
        name: '',
        filePath: '',
        children: [],
      };
      function insertPath(childTree, path) {
        if (!childTree.children) {
          childTree.children = [];
        }
        for (let item of childTree.children) {
          if (item.name === path) {
            return item;
          }
        }
        let item = {
          name: path,
          filePath: childTree.filePath ? [childTree.filePath, path].join('/') : path,
        };
        childTree.children.push(item);
        return item;
      }

      for (let path of pathList) {
        let paths = path.split('/');
        let currentTree = tree;
        for (let path of paths) {
          currentTree = insertPath(currentTree, path);
        }
      }
      return tree.children;
    },
    onAdvanceConfigCollapse() {
      if (!this.formData.programVersionId) {
        this.$alert('请先选择一个服务版本');
        return;
      }
      this.collapseAdvance = !this.collapseAdvance;
      if (!this.collapseAdvance) {
        // 获取 xxxx
        this.advanceForm = {
          loading: false,
          fileList: [],
          filePath: '',
          fileContent: '',
        };
        this.advanceLoading = true;
        api.listAdvanceConfig(this.currentInstance.serviceCode)
          .then(res => {
            this.advanceLoading = false;
            this.advanceForm.fileList = res.data && res.data.length > 0 ? this.genrateTree(res.data) : [];
            // this.advanceForm.fileList = res.data;
            // this.advanceForm.fileList = [
            //   {
            //     name: 'YSS_APP',
            //     filePath: 'YSS_APP',
            //     children: [
            //       {
            //         name: 'global',
            //         filePath: 'YSS_APP/global',
            //         children: [
            //           {
            //             name: 'zoo.cfg',
            //             filePath: 'YSS_APP/global/zoo.cfg',
            //           },
            //           {
            //             name: 'runtime.properties',
            //             filePath: 'YSS_APP/global/runtime.properties',
            //           },
            //         ],
            //       },
            //     ],
            //   },
            // ];
            if (this.advanceForm.fileList && this.advanceForm.fileList.length > 0) {
              let firstFile = this.advanceForm.fileList[0];
              while (firstFile.children && firstFile.children.length > 0) {
                firstFile = firstFile.children[0];
              }
              // 获取配置
              this.handleConfigFileChange(firstFile.filePath);
            }
          })
          .catch(reason => {
            console.log(reason);
            this.advanceLoading = false;
          });
      }
    },
    handleSaveAdvanceConfig() {
      this.$confirm('该操作将直接覆盖配置文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        this.advanceLoading = true;
        api.saveAdvanceConfig(this.currentInstance.id, this.formData.programVersionId, this.advanceForm.filePath, this.advanceForm.fileContent)
          .then(res => {
            this.advanceLoading = false;
            this.$message.success('保存' + this.advanceForm.filePath + '成功');
          })
          .catch(reason => {
            console.log(reason);
            this.advanceLoading = false;
          });
      });
    },
    handleConfigFileChange(filePath) {
      function fileMiniType() {
        let ext = filePath.split('.')[1];
        let miniType = 'text/x-properties';
        ext === 'xml' && (miniType = 'text/xml');
        ext === 'json' && (miniType = 'application/json');
        ext === 'yaml' && (miniType = 'text/yaml');
        return miniType;
      }
      this.cmOptions = {
        tabSize: 4,
        mode: fileMiniType(filePath),
        theme: 'base16-light',
        lineNumbers: true,
        line: true,
      };
      this.advanceForm.filePath = filePath;
      this.advanceLoading = true;
      this.advanceForm.fileContent = '';

      api.getAdvanceConfigContent(this.currentInstance.id, this.formData.programVersionId, filePath)
        .then(res => {
          this.advanceLoading = false;
          this.advanceForm.fileContent = res.data;
        })
        .catch(reason => {
          console.log(reason);
          this.advanceLoading = false;
        });
    },
    handleScrollAdd() {
      this.animationScroll(310, 300);
      // document.getElementById('container').scrollLeft = document.getElementById('container').scrollLeft + 160;
    },
    handleScrollRed() {
      this.animationScroll(-310, 300);
      // document.getElementById('container').scrollLeft = document.getElementById('container').scrollLeft - 160;
    },

    animationScroll(scroll, durationMs) {
      let num = durationMs / 30 + 1;
      num = num < 0 ? -num : num;
      let count = 0;
      let intervalId = setInterval(() => {
        count += 1;
        if (count >= num) {
          clearInterval(intervalId);
        }
        document.getElementById('scroll-container-id').scrollLeft = document.getElementById('scroll-container-id').scrollLeft + scroll / num;
      }, 30);
    },
    initData() {
      // 获取当前微服务版本列表
      this.showLoading('加载中');
      api.programDetail(this.microServiceDigest.serviceCode)
        .then(res => {
          this.versionList = res.data;
          return api.getMqList(this.currentInstance.schemeId);
        })
        .then(res => {
          this.mqList = res.data;
          return api.getZkList(this.currentInstance.schemeId);
        })
        .then(res => {
          this.zkList = res.data;
          return api.listRegCenterType(this.microServiceDigest.serviceCode);
        })
        .then(res => {
          this.regTypeList = res.data;
          return api.listDbType(this.microServiceDigest.serviceCode);
        })
        .then(res => {
          this.dbTypeList = res.data;
          return api.getRegList(this.currentInstance.schemeId);
        })
        .then(res => {
          this.regList = res.data;
          return api.getRedisList(this.currentInstance.schemeId);
        })
        .then(res => {
          this.redisList = res.data;
          return api.getExtDbConfigBySchemeId(this.currentInstance.schemeId);
        })
        .then(res => {
          this.hideLoading();
          this.initDb = true;
          this.dbList = res.data;
          this.handleSetDefaultRegData();
        })
        .catch(reason => {
          console.log(reason);
          this.hideLoading();
        });
    },

    // 设置默认的注册类型 和 注册中心数据
    handleSetDefaultRegData() {
      if (this.currentInstance && this.REQ_PARAMS_MAP.regCluster.indexOf(this.currentInstance.serviceCode) !== -1) {
        if (this.regTypeList && this.regList) { //  && !this.formData.microserviceConfigVo.regClusterId
          this.regTypeList.length > 0 && (this.formData.microserviceConfigVo.regCenterType = this.regTypeList[0]);
          this.regList.length > 0 && (this.formData.microserviceConfigVo.regClusterId = this.regList[0].id);
        }
      }

      if (this.currentInstance && this.REQ_PARAMS_MAP.zkClusterId.indexOf(this.currentInstance.serviceCode) !== -1) {
        if (this.zkList && this.zkList.length > 0) { //  && !this.formData.osgiConfigVo.zkClusterId
          this.formData.osgiConfigVo.zkClusterId = this.zkList[0].id;
        }
      }

      if (this.currentInstance && this.REQ_PARAMS_MAP.dbType.indexOf(this.currentInstance.serviceCode) !== -1) {
        if (this.dbTypeList && this.dbTypeList.length > 0 && !this.formData.osgiConfigVo.dbType) {
          this.formData.osgiConfigVo.dbType = this.dbTypeList[0];
        }
      }

      if (this.currentInstance && this.REQ_PARAMS_MAP.mqClusterId.indexOf(this.currentInstance.serviceCode) !== -1) {
        if (this.mqList && this.mqList.length > 0) { //  && !this.formData.osgiConfigVo.mqClusterId
          this.formData.osgiConfigVo.mqClusterId = this.mqList[0].id;
        }
      }

      if (this.currentInstance && this.REQ_PARAMS_MAP.redisClusterId.indexOf(this.currentInstance.serviceCode) !== -1) {
        if (this.redisList && this.redisList.length > 0) { //  && !this.formData.osgiConfigVo.redisClusterId
          this.formData.osgiConfigVo.redisClusterId = this.redisList[0].id;
        }
      }

      if (this.currentInstance && this.REQ_PARAMS_MAP.dbSourceConfigId.indexOf(this.currentInstance.serviceCode) !== -1) {
        let dbList = this.getDbList;
        if (dbList && dbList.length > 0 && !this.formData.osgiConfigVo.dbSourceConfigId) {
          if (!this.formData.osgiConfigVo.userName) {
            // 既不存在 dbSourceCOnfigId ， 也不存在 数据库配置
            this.formData.osgiConfigVo.dbSourceConfigId = dbList[0].id;
          }
        }
        if (this.initConfig && this.initDb && !this.formData.osgiConfigVo.dbSourceConfigId) {
          if (this.formData.osgiConfigVo.userName) {
            // 存在数据库配置， 不存在dbSourceConfigId
            // 1. 从数据库列表中找到相同的选项，将id赋值给formData.osgiConfigVo.dbSourceConfigId
            // 2.没有找到，则执行添加操作， 再刷新数据库， 重新设置默认值
            let dbSourceId = this.findDbSourceFromDbList(this.formData.osgiConfigVo);
            if (!dbSourceId) {
              this.autoInsertDbData(this.formData.osgiConfigVo);
            } else {
              this.formData.osgiConfigVo.dbSourceConfigId = dbSourceId;
            }
          }
        }
      }
    },

    findDbSourceFromDbList(osgiConfigVo) {
      let resultId = '';
      this.dbList.forEach(item => {
        // 匹配模式 dbType+dbIp+dbPort+dbName+racUrl+racData+dbAccount+dbPassowrd
        let pattern1 = item.type + item.ip + item.port + item.dbName + item.racUrl + item.racData + item.userName + item.password;
        // dbType: '',
        //   dbIp: '',
        //   dbName: '',
        //   dbPort: 0,
        //   racUrl: '',
        //   racData: '',
        let pattern2 = (osgiConfigVo.dbType === 'mysql' ? 'mysql' : 'oracle') + osgiConfigVo.dbIp + osgiConfigVo.dbPort + osgiConfigVo.dbName + osgiConfigVo.racUrl + osgiConfigVo.racData + osgiConfigVo.userName + osgiConfigVo.password;
        if (pattern1 === pattern2) {
          resultId = item.id;
        }
      });
      return resultId;
    },
    // 根据配置，自动插入一条db数据
    autoInsertDbData(osgiConfigVo) {
      api.updateExtDbConfig({
        type: osgiConfigVo.dbType === 'mysql' ? 'mysql' : 'oracle',
        ip: osgiConfigVo.dbIp,
        port: osgiConfigVo.dbPort,
        dbName: osgiConfigVo.dbName,
        racUrl: osgiConfigVo.racUrl,
        racData: osgiConfigVo.racData,
        userName: osgiConfigVo.userName,
        password: osgiConfigVo.password,
        schemeId: this.currentInstance.schemeId,
        des: osgiConfigVo.userName + '@' + osgiConfigVo.dbIp + ':' + osgiConfigVo.dbPort + '/' + osgiConfigVo.dbName,
      }).then(res => {
        if (res.data) {
          osgiConfigVo.dbSourceConfigId = res.data.id;
          this.refreshDbData();
        }
      }).catch(reason => {
        console.log(reason);
      });
    },
    showLoading(message) {
      this.$refs.AppLoading.show(message);
    },
    hideLoading() {
      this.$refs.AppLoading.dismiss();
    },
    onBeforeUnload() {
      this.$refs.AppLoading.show();
      return true;
    },
    onUploadSuccess(response) {
      this.$refs.AppLoading.dismiss();
      // 处理上传成功
      console.log(response);
      this.formData.osgiConfigVo.licensePath = response.data;
    },
    onUploadError() {
      this.$refs.AppLoading.dismiss();
    },
    onUploadProgress() {
    },
    handleSelectFile() {
      this.$refs.SettingFileSelect.show();
    },
    onSwitchService() {
      return new Promise((resolve, reject) => {
        if (this.currentInstance) {
          if (this.extFormData && this.extFormData.used) {
            let data = Object.assign({}, this.extFormData);
            data.extraParameter = JSON.stringify(data.extraParameter);
            this.$refs.extServiceForm.validate(valid => {
              if (valid) {
                this.showLoading('正在保存配置...');
                api.saveExtService(data)
                  .then(res => {
                    this.hideLoading();
                    // 更新父界面数据
                    resolve();
                    // 更新父界面数据
                    if (res.data.extraParameter) {
                      res.data.extraParameter = JSON.parse(res.data.extraParameter);
                    }
                    Object.assign(this.extServiceVo, res.data);
                    Object.assign(this.extFormData, this.extServiceVo);
                  })
                  .catch(reason => {
                    this.hideLoading();
                    console.log(reason);
                    this.$confirm('保存外部服务失败, 是否继续?', '提示', {
                      confirmButtonText: '确定',
                      cancelButtonText: '取消',
                      type: 'info',
                    }).then(() => {
                      resolve();
                    });
                  });
              } else {
                this.$confirm('外部服务验证失败, 是否继续?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'info',
                }).then(() => {
                  resolve();
                });
              }
            });
          } else {
            this.handleSetConfigOfInstance(this.formData,
              () => {
                resolve();
              },
              () => {
                // 保存鼠标
                this.$confirm('当前实例配置数据保存失败, 切换操作将丢失当前的配置数据, 是否继续?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'info',
                }).then(() => {
                  resolve();
                });
              });
          }
        } else {
          resolve();
        }
      });
    },
    handleSwitchInstance(currentInstance, item) {
      // if (!this.$root.filterDeployingSelected()) {
      //   return;
      // }
      if (currentInstance === item) {
        return;
      }
      // 保存当前的实例配置
      this.cacheVersion = this.formData.programVersionId;
      if (currentInstance) {
        this.handleSetConfigOfInstance(this.formData,
          () => {
            // 保存成功， 切换当前实例
            this.currentInstance = item;
            this.handleGetConfigOfInstance(this.currentInstance.schemeId, this.currentInstance.serviceCode, this.currentInstance.id);
          },
          () => {
            // 保存鼠标
            this.$confirm('当前实例配置数据保存失败, 切换操作将丢失当前的配置数据, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'info',
            }).then(() => {
              this.currentInstance = item;
              this.handleGetConfigOfInstance(this.currentInstance.schemeId, this.currentInstance.serviceCode, this.currentInstance.id);
            });
          });
      } else {
        this.currentInstance = item;
        this.handleGetConfigOfInstance(this.currentInstance.schemeId, this.currentInstance.serviceCode, this.currentInstance.id);
      }
    },
    handleSaveAndStartService(instanceConfigVo) {
      if (this.instanceList.length > 1) {
        let unDeployedStr = this.instanceList.filter(item => item.deployStatus === 'NOT_DEPLOYED' && item.id !== instanceConfigVo.instanceId).map(item => item.ip).join(',');
        if (unDeployedStr !== null && unDeployedStr !== '') {
          this.$alert('集群环境中还有实例：【' + unDeployedStr + '】未配置');
          return;
        }
      }
      this.handleSetConfigOfInstance(instanceConfigVo, () => {
        this.showLoading('服务启动中');
        api.startInstance(this.currentInstance.schemeId, this.currentInstance.serviceCode, this.currentInstance.id)
          .then(res => {
            this.hideLoading();
            if (!res.data) {
              this.onDeploying(this.currentInstance.id, true);
            } else {
              this.$alert(res.msg);
            }
          })
          .catch(reason => {
            console.log(reason);
            this.hideLoading();
            // do nth
          });
      });
    },
    handleShowDeployLog() {
      this.onDeploying(this.currentInstance.id, false);
    },
    handleSaveInstanceConfigVersion(instanceConfigVo, successCallback, errorCallback) {
      instanceConfigVo.schemeId = this.currentInstance.schemeId;
      instanceConfigVo.serviceCode = this.currentInstance.serviceCode;
      instanceConfigVo.instanceId = this.currentInstance.id;
      // 验证是否已选择微服务版本
      if (!instanceConfigVo.programVersionId) {
        this.$alert('请选择一个微服务版本');
        errorCallback && errorCallback();
        return;
      }
      // 处理 数据库 rac 模式
      if (!this.formData.osgiConfigVo.useRAC) {
        this.formData.osgiConfigVo.racUrl = '';
        this.formData.osgiConfigVo.racData = '';
      }
      this.$refs.FormOsgi.validate()
        .then(res => {
          return this.$refs.FormMicroService.validate();
        })
        .then(res => {
          return this.$prompt('请输入存档名称', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            inputErrorMessage: '请输入1-20个字符',
          });
        })
        .then(({ value }) => {
          this.showLoading('正在保存配置...');
          this.$set(instanceConfigVo, 'name', value);
          instanceConfigVo.name = value;
          let data = Object.assign({}, instanceConfigVo);
          data.id = '';
          return api.saveInstanceVersionConfig(data);
        })
        .then(res => {
          this.hideLoading();
          this.currentInstance.deployStatus = 'DEPLOYED';
          this.instanceListMap[instanceConfigVo.instanceId].programVersion = instanceConfigVo.programVersionId;
          res.data.configVersionId = res.data.id;
          // this.formData.id = res.data.configId;
          Object.assign(this.formData, res.data);
          successCallback && successCallback();
        })
        .catch(reason => {
          console.log(reason);
          this.hideLoading();
          errorCallback && errorCallback();
        });
    },
    handleSetConfigOfInstance(instanceConfigVo, successCallback, errorCallback) {
      // schemeId: '',
      //   serivceCode: '',
      //   instanceId: '',
      instanceConfigVo.schemeId = this.currentInstance.schemeId;
      instanceConfigVo.serviceCode = this.currentInstance.serviceCode;
      instanceConfigVo.instanceId = this.currentInstance.id;
      // 验证是否已选择微服务版本
      if (!instanceConfigVo.programVersionId) {
        this.$alert('请选择一个微服务版本');
        errorCallback && errorCallback();
        return;
      }
      // 处理 数据库 rac 模式
      if (!this.formData.osgiConfigVo.useRAC) {
        this.formData.osgiConfigVo.racUrl = '';
        this.formData.osgiConfigVo.racData = '';
      }
      this.showLoading('正在保存配置...');
      this.$refs.FormOsgi.validate()
        .then(res => {
          return this.$refs.FormMicroService.validate();
        })
        .then(res => {
          if (!instanceConfigVo.configVersionId) {
            return api.configInstance([instanceConfigVo]);
          } else {
            return api.saveInstanceVersionConfig(instanceConfigVo);
          }
        })
        .then(res => {
          this.hideLoading();
          this.currentInstance.deployStatus = 'DEPLOYED';
          this.instanceListMap[instanceConfigVo.instanceId].programVersion = instanceConfigVo.programVersionId;
          if (res.data && res.data.name) {
            res.data.configVersionId = res.data.id;
            Object.assign(this.formData, res.data);
          } else {
            this.formData.id = res.data;
          }
          successCallback && successCallback();
        })
        .catch(reason => {
          console.log(reason);
          this.hideLoading();
          errorCallback && errorCallback();
        });
    },
    handleUpdateInstanceStatus(instanceItem) {
      if (this.instanceListMap[instanceItem.id]) {
        Object.assign(this.instanceListMap[instanceItem.id], instanceItem);
      }
    },
    handleAdvanceFormMap() {
      let advanceFormMap = {};
      this.formData.advanceConfigList && this.formData.advanceConfigList.forEach(item => {
        advanceFormMap[item.key] = item;
      });
      this.advanceFormMap = advanceFormMap;
    },
    handleGetConfigOfInstance(schemeId, serviceCode, instanceId) {
      this.initConfig = false;
      this.showLoading('配置数据加载中');
      api.getInstanceConfigSingle(schemeId, serviceCode, instanceId)
        .then(res => {
          this.hideLoading();
          if (res.data) {
            this.initConfig = true;
            res.data.advanceConfigList.forEach(item => {
              item.collapse = true;
            });
            if (res.data.osgiConfigVo.racUrl) {
              res.data.osgiConfigVo.useRAC = true;
            } else {
              res.data.osgiConfigVo.useRAC = false;
            }

            // 如果存在版本id, 则将id替换为版本id
            if (res.data.configVersionId) {
              res.data.id = res.data.configVersionId;
              res.data.name = res.data.configVersionName;
            }
            this.formData = res.data;
            this.handleSetDefaultRegData();
            // this.formData.programVersionId = this.cacheVersion;
            this.handleAdvanceFormMap();
          }
        })
        .catch(reason => {
          console.log(reason);
          this.hideLoading();
        });
    },
  },
};
</script>

<style scoped>
.micro-instance {
  display: inline-block;
  width: 100px;
  height: 80px;
  background: #a1a3a9;
  text-align: center;
  margin: 20px;
  font-size: 0.8rem;
}

/deep/ .el-radio__label{
  display: inline;
}

/deep/ .el-form-item {
  margin-bottom: 16px;
}

.app-deploy-add-instance{
  height: 122px;
  width: 300px;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.8);
  border: 1px solid #e8e8e8;
  border-radius: 2px;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 16px;
  cursor: pointer;
  text-align: center;
}

.app-deploy-service{
  height: 122px;
  width: 300px;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.8);
  border: 1px solid #e8e8e8;
  border-radius: 2px;
  display: flex;
  flex-direction: column;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 16px;
  cursor: pointer;
}
.click{
  background: rgba(41,105,255,0.05);
  border: 1px solid #3366ff;
}
.app-deploy-service-item {
  flex-grow: 1;
  justify-content: space-around;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.app-deploy-h3 {
  width: 70px;
  height: 20px;
  font-size: 14px;
  font-weight: 600;
  text-align: left;
  color: rgba(0,0,0,0.8);
  line-height: 20px;
  margin-left: 24px;
}
/deep/ .el-divider--horizontal{
  margin: 12px 20px;
}

.my-button:hover{
  opacity: 0.95;
}

.app-scroll-container {
  overflow-x: scroll;
  width: 96%;
  height: 146px;
  background-color: white;
  scrollbar-width: none;
}

::-webkit-scrollbar {
  display: none; /* Chrome Safari */
}

.app-scroll-content {
  width: 300px;
  height: 122px;
  display: inline-block;
  margin: 10px 4px;
  vertical-align: middle;
  position: relative;
}
</style>

<style>
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }

  /deep/ .CodeMirror {
    height: 400px;
  }
  /deep/ .CodeMirror-hscrollbar {
    height: 5px;
  }
</style>
