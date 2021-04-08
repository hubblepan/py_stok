/**
 * TablePanel 封装类
 * @author huangsq
 * @version 2019-02-19
 */
;(function (window) {
	'use strict';

	window.webplus = window.webplus || {};

	var pluginName = 'tablePanel';

	var TablePanel = function (options) {
		// 合并用户配置和默认配置
		this.options = $.extend(true, {}, TablePanel.DEFAULTS, options);

		// 插件初始化
		this.init(this);
		this.initListener(this, this.options);
	}

	TablePanel.VERSION = '1.0.0'

	// 插件默认配置
	TablePanel.DEFAULTS = {
		url: {},
		listener: {
			query: {
				selector: '[data-event-type="search"],[data-event-type="query"]',
				disable: false,
				events: {
					click: 'query',
					dbclick: 'query'
				}
			},
			add: {
				selector: '[data-event-type="add"]',
				events: {
					click: 'add'
				}
			},
			edit: {
				selector: '[data-event-type="edit"]',
				disable: {
					"n_CHECK": 1,
					"auditState": 1,
					"c_DV_STATE": "ENAB",
					"editStatus": 1
				},
				events: {
					click: 'edit'
				}
			},
			copy: {
				selector: '[data-event-type="copy"]',
				events: {
					click: 'copy'
				}
			},
			save: {
				selector: '[data-event-type="save"]',
				events: {
					click: 'save'
				}
			},
			del: {
				selector: '[data-event-type="del"]',
				disable: {
					"n_CHECK": 1,
					"auditState": 1,
					"c_DV_STATE": "ENAB"
				},
				events: {
					click: 'del'
				}
			},
			check: {
				selector: '[data-event-type="audit"]',
				disable: {
					"n_CHECK": 1,
					"auditState": 1
				},
				events: {
					click: 'check'
				}
			},
			uncheck: {
				selector: '[data-event-type="unaudit"]',
				disable: {
					"n_CHECK": 0,
					"auditState": 0
				},
				events: {
					click: 'uncheck'
				}
			},
			sync: {
				selector: '[data-event-type="sync"]',
				disable: {
					"n_CHECK": 0,
					"auditState": 0
				},
				events: {
					click: 'sync'
				}
			},
			export: {
				selector: '[data-event-type="export"]',
				events: {
					click: 'export'
				}
			},
			dataImport: {
				selector: '[data-event-type="dataImport"]',
				events: {
					click: 'dataImport'
				}
			},
			undo: {
				selector: '[data-event-type="undo"]',
				events: {
					click: 'undo'
				}
			},
			up: {
				selector: '[data-event-type="up"]',
				events: {
					click: 'up'
				}
			},
			down: {
				selector: '[data-event-type="down"]',
				events: {
					click: 'down'
				}
			},
			print: {
				selector: '[data-event-type="print"]',
				events: {
					click: 'print'
				}
			},
			help: {
				selector: '[data-event-type="help"]',
				events: {
					click: 'help'
				}
			}
		},
		attrName: {
			auditStatus: ['n_CHECK', 'auditState'],
			editStatus: ['n_CHECK', 'auditState', 'editStatus'],
			deleteStatus: ['n_CHECK', 'auditState', 'deleteStatus'],
			creatorId: ['c_UPDATE_BY', 'modifier', 'creatorId'],
			isAutoAudit: ['n_CHECK', 'isAutoAudit'], // 关闭审核机制
			canSelfAudit: ['n_USER', 'canSelfAudit']
		},
		status: {
			isStatus: function (data, attrNames, value) {
				var flag = false;
				if (data) {
					for (var i = 0, size = attrNames.length; i < size; i++) {
						flag = flag || data[attrNames[i]] == value;
						if (flag) {
							break;
						}
					}
				}
				return flag;
			},
			isDisable: function (item, data) {
				if(!this.status.isDataSecurity.call(this)){  // 如果是关闭数据安全
					if (item.selector.indexOf('"unaudit"') > 0) {
						return true;
					}
					return false;
				}
				var flag = false;
				if (!item) {
					return flag;
				}
				if (item.disable) {
					for (var field in item.disable) {
						var values = item.disable[field];
						if (values instanceof Array) {
							for (var j = 0, len = values.length; j < len; j++) {
								if (item.operate === '!=') {
									flag = data[field] != values[j];
								} else {
									flag = data[field] == values[j];
								}
								if (flag) {
									break;
								}
							}
						} else {
							if (item.operate === '!=') {
								flag = data[field] != values
							} else {
								flag = data[field] == values
							}
						}
						if (flag) {
							break;
						}
					}
				}
				return flag;
			},
			isDataSecurity: function () {
				return this.status.isStatus.call(this, this.dataSecurity, this.attrName.isAutoAudit, 1);
			},
			canSelfAudit: function (data) {
				if (!this.status.isDataSecurity.call(this)) { // 如果是关闭数据安全
					return true;
				}
				if (this.status.isStatus.call(this, this.dataSecurity, this.attrName.canSelfAudit, 0)) { // 开启自审核功能
					return !this.status.isStatus.call(this, data, this.attrName.creatorId, this.userCode); // 数据不属于当前用户创建
				}
				return true;
			},
			isAuditStatus: function (data) {
				return this.status.isStatus.call(this, data, this.attrName.auditStatus, 1);
			},
			isUnauditStatus: function (data) {
				return this.status.isStatus.call(this, data, this.attrName.auditStatus, 0);
			},
			canEdit: function (data) {
				if (this.status.isDataSecurity.call(this)) { // 开启数据安全, 未审核的数可以编辑
					return this.status.isStatus.call(this, data, this.attrName.auditStatus, 0);
				}
				return true;
			},
			canDel: function (data) {
				if (this.status.isDataSecurity.call(this)) { // 开启数据安全, 未审核的数可以删除。
					return this.status.isStatus.call(this, data, this.attrName.auditStatus, 0);
				}
				return true;
			},

			canAudit: function (data) {
				return this.status.canSelfAudit.call(this, data);
			},
			canUnaudit: function (data) {
				return this.status.canSelfAudit.call(this, data);
			},
		},
		handle: {
			_emptyMethod: function (event, btn) {
				layer.alert('找不到实现方法！' + btn.name, {title: '错误', icon: 2});
				return false;
			},
			add: function (_tp, event, btn) {
				if (_tp == null) {
					layer.alert('获取当前表格面板失败！', {title: '错误', icon: 2});
					return false;
				}
				_tp.setOperate('add');

				var handle = this.handle;
				var beforResult = handle.addBefore.call(_tp, _tp, event, btn);
				if (beforResult) {
					_tp.sideSwitch(true);
					var formData = _tp.handle.getFormData(_tp, '');
					handle.showDetail.call(_tp, _tp, formData, beforResult);
					return handle.addAfter.call(_tp, _tp, event, btn);
				}
				return false;
			},
			addBefore: function (_tp, event, btn) {
				return true;
			},
			addAfter: function (_tp, event, btn) {
			},
			edit: function (_tp, event, btn) {
				if (_tp == null) {
					layer.alert('获取当前表格面板失败！', {title: '错误', icon: 2});
					return false;
				}
				if (!_tp.lastRow) {
					layer.msg('请选择需要编辑的记录！');
					return false;
				}
				_tp.setOperate('edit');

				var handle = this.handle;
				var beforResult = handle.editBefore.call(_tp, _tp, event, btn);
				if (beforResult) {
					_tp.sideSwitch(true);
					if (_tp.$form != null && _tp.$form.length == 1) {
						var formData = _tp.handle.getFormData(_tp, _tp.lastRow);
						handle.showDetail.call(_tp, _tp, formData, beforResult);
					}
					return handle.editAfter.call(_tp, _tp, event, btn);
				}
				return false;
			},
			editBefore: function (_tp, event, btn) {
				var data = _tp.grid.getRowDataById(_tp.lastRow);
				if (!_tp.status.canEdit.call(_tp, data)) { // 不能编辑
					layer.alert('已开启数据安全，不能编辑选中的数据！', {title: '错误', icon: 2, resize: false});
					return false;
				}
				return true;
			},
			editAfter: function (_tp, event, btn) {
			},
			copy: function (_tp, event, btn) {
				if (_tp == null) {
					layer.alert('获取当前表格面板失败！', {title: '错误', icon: 2});
					return false;
				}
				if (!_tp.lastRow) {
					layer.msg('请选择需要复制的记录！');
					return false;
				}
				_tp.setOperate('copy');

				var handle = this.handle;
				var beforResult = handle.copyBefore.call(_tp, _tp, event, btn);
				if (beforResult) {
					_tp.sideSwitch(true);
					if (_tp.$form != null && _tp.$form.length == 1) {
						var formData = _tp.handle.getFormData(_tp, _tp.lastRow);
						handle.showDetail.call(_tp, _tp, formData, beforResult);
					}
					return handle.copyAfter.call(_tp, _tp, event, btn);
				}
				return false;
			},
			copyBefore: function (_tp, event, btn) {
				return true;
			},
			copyAfter: function (_tp, event, btn) {
			},

			save: function (_tp, event, btn) {
				if (_tp == null) {
					this.showErrorMsg.call(_tp, '获取当前表格面板失败！');
					return false;
				}

				var beforResult = this.handle.saveBefore.call(_tp, _tp, event, btn);
				if (beforResult) {
					if (_tp.getSidePanel().isOpenState()) {
						var _url = _tp.options.url.save;
						if (_tp.operate == 'add' || _tp.operate == 'copy') {
						} else if (_tp.operate == 'edit') {
							_url = _tp.options.url.update;
						}

						var _formName = _tp.options.formName;
						var _form = $("#" + _formName);

						var data = Common.getFormData("#" + _formName);
						var formData = data.formData;
						var dataExtend = data.formExtend;
						var parameter = {};
						parameter.form = formData;
						parameter.formExtend = dataExtend;
						parameter.id = _form.find('#id').val();

						var options = {
							url: _url,
							data: {
								"parameter": JSON.stringify(parameter)
							},
							success: function (result) {
								_tp.handle.saveAfter.call(_tp, _tp, result);
							},
							error: function (req, textStatus, errorThrown) {
								_tp.showErrorMsg.call(_tp, '保存失败！', req.responseText);
							}
						};

						webplus.ajax(options);
						return true;
					}
				}
				return false;
			},
			saveBefore: function (_tp, event, btn) {
				if ("function" == typeof validateForm) {
					return validateForm(_tp.$form);
				}
				return true;
			},
			saveAfter: function (_tp, result) {
				if (result && !result.success) {
					_tp.showErrorMsg.call(_tp, result.message, result.detailMessage);

					return false;
				} else {
					if (_tp.operate == "add") {
						var _formName = _tp.options.formName;
						$("#" + _formName).find('#id').val(result.id); // 只有新增才需要返回id
					}
					_tp.handle.setReadonly.call(_tp, _tp.$form, true);
					//_tp.grid.jqGrid("setGridParam", { ajaxGridOptions : {async:false} }); //设置同步方式刷新
					_tp.grid.reload();
					//_tp.grid.jqGrid("setGridParam", { ajaxGridOptions : {async:true} });  //恢复异步方式
					_tp.setOperate("query"); // 保存成功才改变状态
					_tp.setModified(false);

					_tp.handle.resetFormToolbarStatus.call(_tp, _tp);
					_tp.handle.resetToolbarStatus.call(_tp, {});
					//STORY #80008 【安信基金】--【生命周期系统】--set界面的修改按钮优化     保存后可以接着点修改按钮
					/**
					if (_tp.$form != null && _tp.$form.length == 1) { 
						if(result.id && result.id != null && result.id != "") {   //新增保存后自动设置选中行
							_tp.lastRow = result.id;  
							_tp.grid.jqGrid('setSelection', _tp.lastRow);
							var formData = _tp.handle.getFormData(_tp, _tp.lastRow);
							_tp.handle.showDetail.call(_tp, _tp, formData, {});
						}else{ //修改保存
							var formData = _tp.handle.getFormData(_tp, _tp.lastRow);
							_tp.handle.resetFormToolbarStatus.call(_tp, _tp, formData);
						}
					}**/
					
					//_tp.showMsg.call(_tp, result.message);
					layer.msg(result.message, {icon: 1});
					if (_tp.getSidePanel().isOpenState()) {  //审核后关闭set界面
						_tp.sideSwitch(false);
					}
					return true;
				}
			},

			del: function (_tp, event, btn) {
				if (_tp == null) {
					layer.alert('获取当前表格面板失败！', {title: '错误', icon: 2});
					return false;
				}
				var ids = _tp.grid.getSelectRows();
				if (ids.length < 1) {
					layer.msg('请至少选择一条数据！');
					return false;
				}

				// return false;
				var handle = this.handle;

				var index = layer.confirm('确认删除选中的记录？', {
						title: '确认',
						icon: 3,
						resize: false,
						yes: function () {
							layer.close(index);
							var beforResult = handle.delBefore.call(_tp, _tp, event, btn);
							if (beforResult) {
								var _url = _tp.options.url.del;
								$.ajax({
									type: "post", // 访问WebService使用Post方式请求
									contentType: "application/x-www-form-urlencoded; charset=UTF-8",
									url: _url, // 调用WebService的地址和方法名称组合 ---- WsURL/方法名
									data: {
										"parameter": JSON.stringify(beforResult)
									}, // 这里是要传递的参数，格式为 data: "{paraName:paraValue}",下面将会看到
									dataType: 'json',
									success: function (result) { // 回调函数，result，返回值
										// _tp.handle.delAfter(result, index, _context, grid, _currentPanel)
										handle.delAfter.call(_tp, _tp, result);
									}
								});
							}
						}
					}
				);
				return true;
			},
			delBefore: function (_tp, event, btn) {
				var ids = _tp.grid.getSelectRows();
				var grid = _tp.grid;
				var rowDatas = [];
				var len = ids.length;
				for (var i = 0; i < len; i++) {
					var data = grid.getRowDataById(ids[i]);
					if (!_tp.status.canDel.call(_tp, data)) { // 不能删除数据
						continue;
					}
					rowDatas.push(data);
				}
				if (rowDatas.length > 0) {
					var parameter = {};
					parameter.datas = rowDatas;
					parameter.ids = ids;
					parameter.operate = _tp.operate;

					return parameter;
				}
				return null;
			},
			delAfter: function (_tp, result) {
				if (result && !result.success) {
					layer.alert('删除失败：<br>' + result.message, {title: '错误', icon: 2});
					return false;
				} else {
					layer.msg('删除成功！', 2000);
					_tp.lastRow = null;
					_tp.grid.reload();
				}
			},

			check: function (_tp, event, btn) {
				if (_tp == null) {
					layer.alert('获取当前表格面板失败！', {title: '错误', icon: 2});
					return false;
				}
				
				if(event.handleObj && event.handleObj.selector && event.handleObj.selector.indexOf("right-sidebar")==-1){ //grid界面的审核
					var ids = _tp.grid.getSelectRows(); 
					if (ids.length < 1) {
						layer.msg('请至少选择一条数据！');
						return false;
					}
				}
				var handle = this.handle;

				var index = layer.confirm('确定审核选中的数据吗？', {
					title: '信息',
					resize: false,
					yes: function () {
						layer.close(index);
						var beforResult = handle.checkBefore.call(_tp, _tp, event, btn);
						if (beforResult) {
							var _url = _tp.options.url.check;
							$.ajax({
								type: "post",
								contentType: "application/x-www-form-urlencoded; charset=UTF-8",
								url: _url,
								data: {
									"parameter": JSON.stringify(beforResult)
								},
								dataType: 'json',
								success: function (result) { // 回调函数，result，返回值
									handle.checkAfter.call(_tp, _tp, result);
								}
							});
						}
					}
				});
				return true;
			},
			checkBefore: function (_tp, event, btn) {
				var ids = [];
				if(event.handleObj && event.handleObj.selector && event.handleObj.selector.indexOf("right-sidebar")!=-1){  //set界面的审核
					ids.push(_tp.lastRow);
				}else{ //表格界面的审核
					ids = _tp.grid.getSelectRows();
				}
				var grid = _tp.grid;
				var rowDatas = [];
				var len = ids.length;
				for (var i = 0; i < len; i++) {
					var data = grid.getRowDataById(ids[i]);
					if (_tp.status.isUnauditStatus.call(_tp, data)) { // 数据未审核
						if (!_tp.status.canAudit.call(_tp, data)) { // 不能审核
							layer.alert('已开启数据安全，选中数据存在不能审核的数据！', {title: '错误', icon: 2, resize: false});
							return false;
						}
						rowDatas.push(ids[i]);
					}
				}
				if (rowDatas.length > 0) {
					var parameter = {};
					parameter.ids = rowDatas;
					parameter.operate = _tp.operate;

					return parameter;
				}
				return null;
			},
			checkAfter: function (_tp, result) {
				if (result && !result.success) {
					layer.alert('审核失败：<br>' + result.message, {title: '错误', icon: 2});
					return false;
				} else {
					layer.msg("审核成功！", {icon: 1});
					_tp.lastRow = null;
					_tp.grid.reload();
					if (_tp.getSidePanel().isOpenState()) {  //审核后关闭set界面
						_tp.sideSwitch(false);
					}
				}
			},

			uncheck: function (_tp, event, btn) {
				if (_tp == null) {
					layer.alert('获取当前表格面板失败！', {title: '错误', icon: 2});
					return false;
				}
				if(event.handleObj && event.handleObj.selector && event.handleObj.selector.indexOf("right-sidebar")==-1){ //grid界面的审核
					var ids = _tp.grid.getSelectRows();
					if (ids.length < 1) {
						layer.msg('请至少选择一条数据！');
						return false;
					}
				}
				var handle = this.handle;

				var index = layer.confirm('确定反审核选中的数据吗？', {
					title: '信息',
					resize: false,
					yes: function () {
						layer.close(index);
						var beforResult = handle.uncheckBefore.call(_tp, _tp, event, btn);
						if (beforResult) {
							var _url = _tp.options.url.uncheck;
							$.ajax({
								type: "post",
								contentType: "application/x-www-form-urlencoded; charset=UTF-8",
								url: _url,
								data: {
									"parameter": JSON.stringify(beforResult)
								},
								dataType: 'json',
								success: function (result) { // 回调函数，result，返回值
									handle.uncheckAfter.call(_tp, _tp, result);
								}
							});
						}
					}
				});
				return true;
			},
			uncheckBefore: function (_tp, event, btn) {
				_tp.setOperate('check');
				var ids = [];
				if(event.handleObj && event.handleObj.selector && event.handleObj.selector.indexOf("right-sidebar")!=-1){  //set界面的审核
					ids.push(_tp.lastRow);
				}else{ //表格界面的审核
					ids = _tp.grid.getSelectRows();
				}
				var grid = _tp.grid;
				var rowDatas = [];
				var len = ids.length;
				for (var i = 0; i < len; i++) {
					var data = grid.getRowDataById(ids[i]);
					if (_tp.status.isAuditStatus.call(_tp, data)) {	// 数据已审核
						if (!_tp.status.canUnaudit.call(_tp, data)) { // 不能反审核
							layer.alert('已开启数据安全，选中数据存在不能反审核的数据', {title: '错误', icon: 2, resize: false});
							return false;
						}
						rowDatas.push(ids[i]);
					}
				}
				if (rowDatas.length > 0) {
					var parameter = {};
					parameter.ids = rowDatas;
					parameter.operate = _tp.operate;

					return parameter;
				}
				return null;
			},
			uncheckAfter: function (_tp, result) {
				if (result && !result.success) {
					layer.alert('反审核失败：<br>' + result.message, {title: '错误', icon: 2});
					return false;
				} else {
					layer.msg("反审核成功！", {icon: 1});
					_tp.lastRow = null;
					_tp.grid.reload();
					if (_tp.getSidePanel().isOpenState()) {  //反审核后关闭set界面
						_tp.sideSwitch(false);
					}
				}
			},


			query: function (_tp, event, btn) {
				if (_tp == null) {
					return;
				}
				_tp.setOperate('query');
				_tp.grid.jqGrid('setGridParam', {
					page: 1
				});
				_tp.grid.reload();

				return true;
			},

			updateStatus: function (_tp, event, btn) {
				if (_tp == null) {
					layer.alert('获取当前表格面板失败！', {title: '错误', icon: 2});
					return false;
				}
				var ids = _tp.grid.getSelectRows();
				if (ids.length < 1) {
					layer.msg('请至少选择一条数据！');
					return false;
				}
				var handle = this.handle;

				var beforResult = handle.updateStatusBefore.call(_tp, _tp, event, btn);
				if (beforResult) {
					var _url = _tp.options.url[btn.name];
					var options = {
						url: _url,
						data: {
							"parameter": JSON.stringify(beforResult)
						},
						success: function (result) {
							_tp.handle.updateStatusAfter.call(_tp, _tp, result, btn);
						},
						error: function (req, textStatus, errorThrown) {
							layer.alert(btn.label + '失败：<br>' + req.responseText, {title: '错误', icon: 2});
						}
					};

					webplus.ajax(options);
				}
				return true;
			},
			updateStatusBefore: function (_tp, event, btn) {
				_tp.setOperate('check');
				var ids = _tp.grid.getSelectRows();
				var grid = _tp.grid;
				var rowDatas = [];
				var len = ids.length;
				for (var i = 0; i < len; i++) {
					var data = grid.getRowDataById(ids[i]);
					if (!_tp.status.canEdit.call(_tp, data)) { // 不能编辑
						continue;
					}
					rowDatas.push(ids[i]);
				}
				if (rowDatas.length > 0) {
					var parameter = {};
					parameter.ids = rowDatas;
					parameter.operate = btn.name;

					return parameter;
				}
				return null;
			},
			updateStatusAfter: function (_tp, result, btn) {
				if (result && !result.success) {
					layer.alert(btn.label + '失败：<br>' + result.message, {title: '错误', icon: 2});
					return false;
				} else {
					layer.msg(btn.label + '成功', 2);
					_tp.lastRow = null;
					_tp.grid.reload();
				}
			},

			export: function (_tp, event, btn) {
				var title = $(event.currentTarget).attr("data-exportfile");
				this.handle.exportBtn.call(_tp, $(event.currentTarget), _tp, "xlsx", title);
				return false;
			},
			exportBtn: function (currentTarget, _tp, type, title) {
				// 拿到最近表的表头
				var grid = _tp.grid;
				var colModel = grid.jqGrid('getGridParam', "colModel");
				var groupHeader = grid.jqGrid('getGridParam', "groupHeader"); // 分组表头
				var coldatas = [];
				var htmlreg = /<[^>]+>/g;
				if (colModel.length > 0) { // 一级头信息
					var header0 = [];
					for (var i = 0; i < colModel.length; i++) {
						// if (colModel[i].hidden == false && colModel[i].header) {
						if (colModel[i].isExport == true && colModel[i].header) {
							var data = {}, header = colModel[i].header;
							if (htmlreg.test(colModel[i].header)) {
								// 去掉列头的自定义checkbox
								header = colModel[i].header.replace(htmlreg, '').replace('&nbsp;', '').trim();
							}
							data['header'] = header;
							data['name'] = colModel[i].name;
							data['format'] = colModel[i].format;
							header0.push(data);
						}
					}
					coldatas.push(JSON.stringify(header0));
				}
				if (groupHeader) { // 多级头
					for (var i = groupHeader.length - 1; i >= 0; i--) {
						var header = [];
						var groupHeaders = groupHeader[i].groupHeaders;
						for (var j = 0; j < groupHeaders.length; j++) {
							var data = {};
							data['header'] = groupHeaders[j].titleText;
							data['startColumnName'] = groupHeaders[j].startColumnName;
							data['numberOfColumns'] = groupHeaders[j].numberOfColumns;
							header.push(data);
						}
						coldatas.push(JSON.stringify(header));
					}
				}
				if (coldatas.length == 0) {
					layer.alert("导出失败！请检查表头数据是否完整", {title: '错误', icon: 2, resize: false});
					return false;
				}
				// 拿到查询条件
				var param = {};
				param.param = Common.getFormData("#" + grid.jqGrid('getGridParam', 'searchForm').attr('id')).formData;
				var advancedSearch = {};
				if ($.isFunction(grid.jqGrid('getGridParam').advancedSearch)) {
					advancedSearch = grid.jqGrid('getGridParam').advancedSearch.call(this);
				}
				var queryParams = $.extend(true, {}, param, advancedSearch);

				// 拿到分页信息
				var pageNo = 0, pageSize = 0; // 兼容老模式默认导出所有页
				// 拿到导出的excel的标题，如果没有，默认取菜单+当前tab页的标题
				if (title === undefined) {
					var maintitle = $(".J_menuTabs .active", parent.document).text();
					var subTab = $(currentTarget).closest('[data-auto-height="container"]').find('.nav-tabs .active').find('[data-tab-panel="' + _tp.id + '"]');
					var subtitle = "";
					if (subTab) {
						subtitle = subTab.text();
					}
					title = maintitle + (subtitle == "" ? "" : ("_" + subtitle));
				}

				// 组装参数
				var parameter = {};
				parameter.coldatas = JSON.stringify(coldatas);
				parameter.param = {};
				parameter.operate = "export";
				parameter.type = "normal";
				parameter.funCode = _tp.funcCode;
				parameter.fileName = title;
				var exportUrl = _tp.options.url.export;
				// 开始导出
				// 动态创建表单并提交
				// 创建前先判断是否已经存在
				if ($('#export_submitForm')[0] == null) {
					var _formhtml = "<form id='export_submitForm' method='post' action ='" + exportUrl + "' class='hide' target='export_download_iframe' accept-charset='UTF-8'>" +
						"<input type='hidden' name='parameter'/>" +
						"<input type='hidden' name='pageNo'/>" +
						"<input type='hidden' name='pageSize'/>" +
						"<button type='submit'></button></form>" +
						"<iframe id='export_download_iframe' name='export_download_iframe' class='hide'></iframe>";
					$(currentTarget).parent().append(_formhtml);

					$('#export_download_iframe').load(function () {
						var jsonstr = $('#export_download_iframe').contents().find("body").html();
						jsonstr = jsonstr.replace(/<.*?>/ig, "");
						if ("" != jsonstr) {
							try {
								var msg = JSON.parse(jsonstr);
								if (typeof msg == 'object' && msg) {
									layer.msg(msg.message);
								} else {
									layer.msg(jsonstr);
								}
							} catch (e) {
								layer.alert(jsonstr, {title: '错误', icon: 2});
								return false;
							}
						}
						$('#export_download_iframe').contents().find("body").empty();
					});
				} else {
					$('#export_submitForm').attr("action", exportUrl)
				}
				$('#export_submitForm input[name=parameter]').val(JSON.stringify($.extend({}, parameter, queryParams)));
				$('#export_submitForm input[name=pageNo]').val(pageNo);
				$('#export_submitForm input[name=pageSize]').val(pageSize);
				// 提交表单
				$('#export_submitForm button').click();
			},
			dataImport: function (_tp, event, btn) {
				return false;
			},

			selectRow: function (_tp, event, rowid, status) {
				if (_tp == null) {
					layer.alert('获取当前表格面板失败！', {title: '错误', icon: 2});
					return false;
				}
				_tp.setOperate("query");
				_tp.lastRow = rowid;
				var beforResult = _tp.handle.selectRowBefore.call(_tp, _tp, event);
				if (beforResult) {
					var formData = _tp.handle.getFormData(_tp, rowid);
					_tp.handle.resetToolbarStatus.call(_tp, formData);
					if (_tp.$form && _tp.getSidePanel().isOpenState()) {
						_tp.handle.resetToolbarStatus.call(_tp, formData);
						_tp.handle.showDetail.call(_tp, _tp, formData);
					}
					return _tp.handle.selectRowAfter.call(_tp, _tp, event);
				}
				return false;

			},
			selectRowBefore: function (_tp, event) {
				return true;
			},
			selectRowAfter: function (_tp, event) {
			},
			dblClick: function (_tp, event, rowid, iRow, iCol) {
				if (_tp == null) {
					layer.alert('获取当前表格面板失败！', {title: '错误', icon: 2});
					return false;
				}
				_tp.setOperate("query");
				_tp.lastRow = rowid;

				var beforResult = this.handle.dblClickBefore.call(_tp, _tp, event);
				if (beforResult) {
					if (!_tp.$form) {
						return false;
					}
					_tp.sideSwitch(true);
					if (_tp.getSidePanel().isOpenState()) {
						var formData = _tp.handle.getFormData(_tp, rowid);
						_tp.handle.resetToolbarStatus.call(_tp, formData);
						_tp.handle.showDetail.call(_tp, _tp, formData);
					}
					return _tp.handle.dblClickAfter.call(_tp, _tp, event);
				}
				return false;
			},
			dblClickBefore: function (_tp, event) {
				return true;
			},
			dblClickAfter: function (_tp, event) {
			},

			sync: function (_tp, event, btn) {
				if (typeof _sync == 'function') {
					_sync();
				}
				return false;
			},

			print: function (_tp, event, btn) {
				return false;
			},
			up: function (_tp, event, btn) {
				if (Common.getContext().isOpenState()) {
				}
				return false;
			},
			down: function (_tp, event, btn) {
				if (Common.getContext().isOpenState()) {
				}
				return false;
			},
			undo: function (_tp, event, btn) {
				if (Common.getContext().isOpenState()) {
				}
				return false;
			},
			help: function (_tp, event, btn) {
				var _url = _tp.url.base;
				var param = _tp.operate + "&_helpfile=" + getHelpFileName(_tp);
				layer.open({
					type: 2,
					title: "帮助",
					content: _url + param,
					area: ['500px', '500px'],
					end: callback
				});
				return false;
			},

			setReadonly: function ($form, readonly) {
				var _id = $form.find('input[name="id"]').val()
				var readonlySelector = '[data-readonly*="add"]';
				if (_id) {
					readonlySelector = '[data-readonly*="edit"]';
				}
				var $input = $form.find('input, textarea');
				var $btn = $form.find(':checkbox, :radio, button');
				var $select = $form.find('.layer-date, select');
				if (readonly) {
					$input.attr('readonly', readonly);
					$btn.attr("disabled", "disabled");
					this.handle.setSelectReadonly($select, readonly);
				} else {
					$input.parent().find(readonlySelector).attr('readonly', true);
					$btn.parent().find(readonlySelector).attr("disabled", "disabled");
					this.handle.setSelectReadonly($select.parent().find(readonlySelector), true);

					$input.not(readonlySelector).attr('readonly', readonly);
					$btn.not(readonlySelector).removeAttr("disabled");
					this.handle.setSelectReadonly($select.not(readonlySelector), readonly);
				}
			},
			setSelectReadonly: function ($select, readonly) {
				if (readonly) {
					$select.each(function () {
						var $button = $($(this).siblings()[0]);
						if ($button !== undefined) {
							$button.addClass("disabled");
							$button.removeClass("btn-white");
						}
						$(this).attr("disabled", "disabled");
					});
				} else {
					$select.each(function () {
						var $button = $($(this).siblings()[0]);
						if ($button !== undefined) {
							$button.addClass("btn-white");
							$button.removeClass("disabled");
						}
						$(this).removeAttr("disabled");
					});
				}
			},
			setFieldReadonly: function ($form, fields) {
				if (fields) {
					var $input = $form.find('input, textarea');
					var $btn = $form.find(':checkbox, :radio, button');
					var $select = $form.find('.layer-date, select');

					for (var i = 0; i < $input.length; i++) {
						if (fields.indexOf($($input[i]).attr("name") + ",") != -1) {
							$($input[i]).attr('readonly', true);
						}
					}
					for (var i = 0; i < $btn.length; i++) {
						if (fields.indexOf($($btn[i]).attr("name") + ",") != -1) {
							$($btn[i]).attr("disabled", "disabled");
						}
					}
					for (var i = 0; i < $select.length; i++) {
						if (fields.indexOf($($select[i]).attr("name") + ",") != -1) {
							this.handle.setSelectReadonly($($select[i]), true);
						}
					}
				}
			},

			// resetButtonStatus: function (_tp, rowData) {
			// 	// this.handle.resetFormToolbarStatus.call(_tp, _currentPanel);
			// 	this.handle.resetToolbarStatus.call(_tp, rowData);
			// },
			resetFormToolbarStatus: function (_currentPanel, data) {
				_currentPanel.getSidePanel().resetFormToolbarStatus(data);
				// var selector = '[data-panel-id="' + _currentPanel.options.id + '"]';
				// var operate = _currentPanel.operate;
				// if (operate == 'query') {
				// 	// $(selector + '[data-event-type="save"]').attr('disabled', false);
				// 	$(selector).find('[data-event-type="add"]').attr('disabled', false);
				// 	$(selector).find('[data-event-type="edit"]').attr('disabled', false);
				// 	$(selector).find('[data-event-type="copy"]').attr('disabled', false);
				// } else if (operate == 'add' || operate == 'copy' || operate == 'edit') {
				// 	$(selector).find('[data-event-type="add"]').attr('disabled', true);
				// 	$(selector).find('[data-event-type="edit"]').attr('disabled', true);
				// 	$(selector).find('[data-event-type="copy"]').attr('disabled', true);
				// }
			},
			resetToolbarStatus: function (rowData) {
				var _this = this;
				var selector = this.options.selector;
				if (_this.operate == "add" || _this.operate == "edit" || _this.operate == "copy") {
					$.each(_this.options.listener, function (name, item) {
						if (name == "add" || name == "edit" || name == "copy" || name == "del" || name == "check" || name == "uncheck") {
							$(selector).find(item.selector).attr('disabled', true);
						} else {
							$(selector).find(item.selector).attr('disabled', false);
						}
					});
					return;
				}
				$.each(this.options.listener, function (name, item) {
					if (name == "save") {
						$(selector).find(item.selector).attr('disabled', true);
					} else {
						var flag = _this.status.isDisable.call(_this, item, rowData);
						$(selector).find(item.selector).attr('disabled', flag);
					}
				});
			},

			initForm: function (formData, $form) {
				if (!formData || !$form) {
					return;
				} else if (!formData.id && $form.length > 0) {
					$form[0].reset();
				}

				$.each(formData, function (name, value) {
					$form.find(' [name="' + name + '"]').val(value);
					var selectPicker = $("select[name='" + name + "']");
					if (selectPicker.length > 0) {
						if (selectPicker.attr("multiple") == "multiple") {
							var arr = value.split(",");
							selectPicker.setYssSelectValue(arr);
						} else {
							selectPicker.setYssSelectValue(value);
						}
					}
				});
			},
			removeValidate: function ($form) {
				var _this = this;
				if ($form != null && $form.length == 1) {
					$form.find('*[required]').each(function () {
						_this.handle.removeElementValidate($(this));
					});
				} else {
					$('*[required]').each(function () {
						_this.handle.removeElementValidate($(this));
					});
				}
				var validator = $form.validate();
				validator.resetForm();
			},
			removeElementValidate: function ($element) {
				var errorClass = "error";
				if ($element.next("div").hasClass("tooltip")) {
					$element.tooltip('destroy');
				}
				if ($element.hasClass("error")) {
					$element.removeClass(errorClass);
				}
			},
			getFormData: function (_tp, id) {
				var formData = {};
				if (_tp.options.remotedata) {
					var parameter = {};
					parameter.id = id;
					var options = {
						url: _tp.options.url.detail,
						async: false,
						data: {
							"parameter": JSON.stringify(parameter)
						},
						success: function (result) {
							if (result && result.success) {
								formData = result.data;
							} else {
								layer.alert('加载数据失败：<br>' + result.message, {title: '错误', icon: 2});
							}
							_tp.handle.saveAfter.call(_tp, _tp, result);
						},
						error: function (req, textStatus, errorThrown) {
							layer.alert('加载数据失败：<br>' + req.responseText, {title: '错误', icon: 2});
						}
					};
					webplus.ajax(options);
				} else if (_tp.operate == 'edit' || _tp.operate == 'query') {
					formData = _tp.grid.jqGrid('getRowData', id);
				} else if (_tp.operate == 'copy') {
					formData = _tp.grid.jqGrid('getRowData', id);
					formData.id = '';
				} else {
					formData = {};
				}
				return formData;
			},
			showDetail: function (_currentPanel, formData, beforResult) {
				var sidePanel = _currentPanel.getSidePanel();
				if (!sidePanel.isOpenState()) {
					return true;
				}
				if (sidePanel.isModified()) {
					var index = layer.confirm('切换状态正在编辑的内容将丢失，确定继续吗？', {
							title: '确认',
							icon: 3,
							area: '380px',
							resize: false,
							yes: function () {
								_currentPanel.handle.resetSideForm.call(_currentPanel, _currentPanel, formData, beforResult);
								layer.close(index);
							},
							cancel: function () {
								layer.close(index);
							}
						}
					);
					return false;
				}
				_currentPanel.handle.resetSideForm.call(_currentPanel, _currentPanel, formData, beforResult);
				return true;
			},
			resetSideForm: function (_tp, formData, beforResult) {
				_tp.active();
				_tp.getSidePanel().setMsg('');
				_tp.setModified(false);
				_tp.resetEditorTabLabel.call(_tp);
				if (!formData) {
					formData = _tp.handle.getFormData(_tp, null);
					if (!formData) {
						return;
					}
				}
				$('#tab-form form').hide();
				_tp.$form.show();

				_tp.handle.resetFormToolbarStatus.call(_tp, _tp, formData);
				_tp.handle.resetToolbarStatus.call(_tp, formData);
				_tp.handle.removeValidate.call(_tp, _tp.$form);
				_tp.handle.initForm.call(_tp, formData, _tp.$form);
				_tp.handle.setReadonly.call(_tp, _tp.$form, _tp.operate == "query");
				_tp.handle.setFieldReadonly.call(_tp, _tp.$form, _tp.options.readonlyFields);
				// _tp.handle.clearMsg.call(_tp, _tp.$form, _tp.operate == "query");

			}
		},
		gridOptions: {
			/**
			 * 单击表格事件
			 * @param rowid
			 * @param status
			 * @param e
			 * @returns
			 */
			onSelectRow: function (rowid, status, event) {
				if (event === undefined) {
					return false;
				}
				var _currentPanel = webplus.pagePanel.getActivePanel(event);
				_currentPanel.handle.selectRow.call(_currentPanel, _currentPanel, event, rowid, status);
				return true;
			},
			ondblClickRow: function (rowid, iRow, iCol, event) {
				if (event === undefined) {
					return false;
				}
				var _currentPanel = webplus.pagePanel.getActivePanel(event);
				_currentPanel.handle.dblClick.call(_currentPanel, _currentPanel, event, rowid, iRow, iCol);
				return true;
			},
		}
	};
	// TablePanel.attrName = {
	// 	auditStatus: ['n_CHECK', 'auditState'],
	// 	editStatus: ['n_CHECK', 'auditState', 'editStatus'],
	// 	deleteStatus: ['n_CHECK', 'auditState', 'deleteStatus'],
	// 	creatorId: ['c_UPDATE_BY', 'modifier', 'creatorId'],
	// 	isAutoAudit: ['isAutoAudit'],
	// 	canSelfAudit: ['n_USER', 'canSelfAudit']
	// };

	// 插件原型
	TablePanel.prototype = {
		// 插件初始化函数
		init: function (_tp) {
			this.id = _tp.options.id;
			if (!_tp.options.selector) {
				_tp.options.selector = '[data-panel-id=' + _tp.id + ']';
			}

			this.name = _tp.options.name;
			this.status = _tp.options.status;
			this.attrName = _tp.options.attrName;

			// this.events = _tp.options.events;
			this.handle = _tp.options.handle;
			this.userCode = _tp.options.userCode;
			this.funCode = _tp.options.funCode;

			if (!this.name) {
				this.name = this.id;
			}
			if (!this.options.formName) {
				this.options.formName = this.name + 'Form';
			}
			this.dataSecurity = {};
			if (_tp.options.dataSecurity) {
				this.dataSecurity = _tp.options.dataSecurity;
			}
			if ($('#' + this.options.formName).length > 0) {
				this.$form = $('#' + this.options.formName);
				// 表单绑定change事件
				this.$form.find("input,select,textarea").change(function () {
					if(_tp.operate != 'query'){
						_tp.setModified(true);
					}
				});
			}

			_tp.initUrl('add', _tp);
			_tp.initUrl('edit', _tp);
			_tp.initUrl('detail', _tp);
			_tp.initUrl('find', _tp);
			_tp.initUrl('del', _tp);
			_tp.initUrl('save', _tp);
			_tp.initUrl('update', _tp);
			_tp.initUrl('query', _tp);
			_tp.initUrl('check', _tp);
			_tp.initUrl('uncheck', _tp);
			_tp.initUrl('export', _tp);
			_tp.initUrl('import', _tp);

			var gridOptions = _tp.options.gridOptions;
			if (_tp.options.colModel != null) {
				gridOptions.colModel = _tp.options.colModel;
			}
			if (_tp.options.lazyLoad != null) {
				gridOptions.lazyLoad = _tp.options.lazyLoad;
			}
			if (!gridOptions.url) {
				gridOptions.url = _tp.options.url.query;
			}
			if (_tp.options.grid) {
				this.grid = _tp.options.grid;
			} else if (gridOptions.colModel) {
				this.grid = $('#' + this.id).YssDataGrid(gridOptions);
			} else {
				this.grid = {};
			}
			this.isLoading = !gridOptions.lazyLoad;
		},
		initUrl: function (key, _tp) {
			if (!_tp.options.url[key]) {
				_tp.options.url[key] = _tp.options.url.base + key;
			}
		},
		initListener: function (_tp, options) {
			webplus.initListener(options, _tp);

			var $element = $(options.selector);

			$($element).bind('shown.bs.collapse', function (event) {
				$(window).resize();
			});
			$($element).bind('hidden.bs.collapse', function (event) {
				$(window).resize();
			});

		},

		setPagePanel: function (pagePanel) {
			this.pagePanel = pagePanel;
		},
		setOperate: function (operate) {
			this.operate = operate;
			if (Common && Common.context) {
				Common.context.currentState = operate;
			}
		},
		active: function () {
			this.pagePanel.setCurrentPanel(this);
		},
		refresh: function () {
			this.isLoading = true;
			this.grid.refresh();
		},
		// setState: function (state) {
		// 	var d = 'disabled'
		// 	var $el = this.$element
		// 	var val = $el.is('input') ? 'val' : 'html'
		// 	var data = $el.data()
		//
		// 	state += 'Text'
		//
		// 	if (data.resetText == null) $el.data('resetText', $el[val]())
		//
		// 	// push to event loop to allow forms to submit
		// 	setTimeout($.proxy(function () {
		// 		$el[val](data[state] == null ? this.options[state] : data[state])
		//
		// 		if (state == 'loadingText') {
		// 			this.isLoading = true
		// 			$el.addClass(d).attr(d, d).prop(d, true)
		// 		} else if (this.isLoading) {
		// 			this.isLoading = false
		// 			$el.removeClass(d).removeAttr(d).prop(d, false)
		// 		}
		// 	}, this), 0)
		// },
		showErrorMsg: function (msg, detail) {
			this.getSidePanel().setMsg({status: 'error', title: msg, detail: detail});
		},
		showWarningMsg: function (msg, detail) {
			this.getSidePanel().setMsg({status: 'warning', title: msg, detail: detail});
		},
		showMsg: function (msg, detail) {
			this.getSidePanel().setMsg({status: 'success', title: msg, detail: detail});
		},
		getActivePanel: function (event) {
			return webplus.pagePanel.getActivePanel(event);
		},
		getCurrentPanel: function () {
			return this.pagePanel.getCurrentPanel();
		},
		sideSwitch: function (isOpenState) {
			this.getSidePanel().sideSwitch(isOpenState);
		},
		setModified: function (modified) {
			this.getSidePanel().setModified(modified);
		},
		resetEditorTabLabel: function () {
			var _this = this;
			if (_this.operate == 'query') {
				this.getSidePanel().setEditorTabLabel('<i class="fa fa-list-alt"></i> 浏览</a>');
			} else if (_this.operate == 'add') {
				this.getSidePanel().setEditorTabLabel('<i class="fa fa-edit"></i> 新增</a>');
			} else if (_this.operate == 'copy') {
				this.getSidePanel().setEditorTabLabel('<i class="fa fa-copy"></i> 复制</a>');
			} else if (_this.operate == 'edit') {
				this.getSidePanel().setEditorTabLabel('<i class="fa fa-edit"></i> 修改</a>');
			}
		},
		isModified: function () {
			return this.getSidePanel().isModified();
		},
		isSamePanel: function () {
			var oldPanel = this.getSidePanel().getCurrentPanel();
			return !oldPanel || this == oldPanel;
		},
		getSidePanel: function () {
			return this.pagePanel.getSidePanel();
		}
	};

	var old = webplus[pluginName];
	webplus[pluginName] = function (options) {
		var tablePanel = new TablePanel(options);
		return tablePanel;
	}

	// webplus[pluginName].Constructor = TablePanel;
	webplus[pluginName].DEFAULTS = TablePanel.DEFAULTS;
	// webplus[pluginName].attrName = TablePanel.attrName;

	webplus[pluginName].noConflict = function () {
		webplus[pluginName] = old;
		return this;
	};

})(window);
