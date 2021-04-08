/**
 * PagePanel 封装类
 * @author huangsq
 * @version 2019-04-23
 */
;(function (window) {
	'use strict';

	window.webplus = window.webplus || {};

	var pluginName = 'pagePanel';

	var PagePanel = function (options) {
		this.options = $.extend(true, {}, PagePanel.DEFAULTS, options);

		// 插件初始化
		this.init(this);
		this.initListener(this, this.options);
		this.initHotkeys(this, this.options);
		this.initPagePanel(this, this.options);
	}

	PagePanel.all = {};
	PagePanel.pages = {};
	PagePanel.currentPanel = null;

	// 默认配置
	PagePanel.DEFAULTS = {
		tablePanels: [],
		url: {},
		hotkeys: {
			// 'keydown.Ctrl_s': 'save',
		},
		listener: {
			add: {
				selector: '.right-sidebar [data-event-type="add"]',
				events: {
					click: 'add'
				}
			},
			edit: {
				selector: '.right-sidebar [data-event-type="edit"]',
				events: {
					click: 'edit'
				}
			},
			copy: {
				selector: '.right-sidebar [data-event-type="copy"]',
				events: {
					click: 'copy'
				}
			},
			save: {
				selector: '.right-sidebar [data-event-type="save"]',
				events: {
					click: 'save'
				}
			},
			del: {
				selector: '.right-sidebar [data-event-type="del"]',
				events: {
					click: 'del'
				}
			},
			tabPanelChange: {
				selector: '[data-tab-panel]',
				events: {
					click: 'tabPanelChange'
				}
			},
			close: {
				selector: '.right-sidebar [data-event-type="close"]',
				events: {
					click: 'close'
				}
			},
			help: {
				selector: '.right-sidebar [data-event-type="help"]',
				events: {
					click: 'help'
				}
			},
			check: {
				selector: '.right-sidebar [data-event-type="audit"]',
				events: {
					click: 'check'
				}
			},
			uncheck: {
				selector: '.right-sidebar [data-event-type="unaudit"]',
				events: {
					click: 'uncheck'
				}
			},
		},
		events: function (event, method) {
			var _currentPanel = webplus.pagePanel.getActivePanel(event);
			var _method = _currentPanel.handle[method];
			if (_method) {
				return _method.call(_currentPanel, _currentPanel, event);
			} else {
				var _method = this.handle[method];
				if (_method) {
					return _method.call(this, _currentPanel, event);
				} else {
					this.handle._emptyMethod.call(this);
				}
			}
		},
		handle: {
			_emptyMethod: function () {
				layer.alert('找不到实现方法！', {title: '错误', icon: 2, resize: false});
				return false;
			},
			close: function (_currentPanel, event) {
				var _this = this;
				if (!_this.sidePanel.isOpenState()) {
					return true;
				}
				if (_this.sidePanel.isModified()) {
					var index = layer.confirm('切换状态正在编辑的内容将丢失，确定继续吗？', {
							title: '确认',
							icon: 3,
							area: '380px',
							resize: false,
							yes: function () {
								_this.sidePanel.setModified(false);
								_this.sidePanel.sideSwitch.call(_this.sidePanel, false);
								layer.close(index);
							},
							cancel: function () {
								layer.close(index);
							}
						}
					);
				} else {
					_this.sidePanel.sideSwitch.call(_this.sidePanel, false);
				}
				//点击添加按钮后再关闭，toolbar按钮都是不可用 ，设置query变成启用状态  BUG #277101 数据执行完修改功能测试之后，不能直接点击复制按钮继续执行
				_currentPanel.setOperate("query");
				_currentPanel.handle.resetToolbarStatus.call(_currentPanel, {});
				//冻结列错位修正    BUG #280977 （9483）固定列错位显示
				if($(_currentPanel.grid.selector+"_frozen") && $(_currentPanel.grid.selector+"_frozen").length>0){
					$(_currentPanel.grid.selector+"_frozen").parent()[0].scrollTop = $(_currentPanel.grid.selector).parent().parent()[0].scrollTop;
				}
				return true;
			},
			tabPanelChange: function (_currentPanel, event) {
				this.handle.close.call(this, _currentPanel, event);
				return false;
			}
		},
		layout: {
			left: {},
			rightTop: {},
			rightBottom: {}
		}

	};

	// 原型
	PagePanel.prototype = {
		// 插件初始化函数
		init: function (_this) {
			this.id = _this.options.id;
			this.name = _this.options.name;
			// this.events = _this.options.events;
			this.handle = _this.options.handle;

			// $(window).bind('resize', function () {
			// 	// webplus.autoHeight.call(webplus);
			// 	App.autoHeight();
			// });
			// App.autoHeight();
		},
		setSidePanel: function (sidePanel) {
			this.sidePanel = sidePanel;
		},
		getSidePanel: function () {
			return this.sidePanel;
		},
		getCurrentPanel: function () {
			return PagePanel.currentPanel;
		},
		setCurrentPanel: function (currentPanel) {
			PagePanel.currentPanel = currentPanel;
			this.getSidePanel().currentPanel = currentPanel;
			if (Common && Common.context) {
				Common.context.currentPanel = currentPanel;
			}
		},
		initListener: function (_this, options) {
			var $element = $('body');
			$.each(options.listener, function (name, item) {
				item.name = name;
				$.each(item.events, function (key, _method) {
					var btnFun = function (handle) {
						return function (event) {
							handle.call(_this, event, _method);
							return true;
						}
					};
					$element.on(key, item.selector, btnFun(_this.options.events));
				});
			});

		},
		initHotkeys: function (_this, options) {
			$.each(options.hotkeys, function (hotkey, method) {
				var btnFun = function (handle) {
					return function (event) {
						handle.call(_this, event, method);
						return true;
					}
				};
				$(document).bind(hotkey, btnFun(_this.options.events));
			});
		},
		initPagePanel: function (_this, options) {
			$.each(options.tablePanels, function (index, tablePanelOptions) {

				tablePanelOptions.userCode = options.userCode;
				if (!tablePanelOptions.funCode) {
					tablePanelOptions.funCode = options.funCode;
				}
				if (!tablePanelOptions.dataSecurity && options.dataSecurity) {
					tablePanelOptions.dataSecurity = options.dataSecurity;
				}

				var _tablePanel = webplus.tablePanel(tablePanelOptions);
				_tablePanel.setPagePanel(_this);
				PagePanel.all[tablePanelOptions.id] = _tablePanel;
			});

		}
	};


	var SidePanel = function () {
	}

	SidePanel.prototype = {
		isModified: function () {
			return this.modified;
		},
		setModified: function (modified) {
			this.modified = modified;
		},
		setOperate: function (operate) {
			this.operate = operate;
		},
		getOperate: function () {
			return this.operate;
		},
		resetFormToolbarStatus: function (data) {
			var currentPanel = this.currentPanel;
			if (currentPanel.operate == 'query') {
				this.setButtonQueryStatus(data);
			} else if (currentPanel.operate == 'add' || currentPanel.operate == 'copy') {
				this.setButtonAddStatus();
			} else if (currentPanel.operate == 'edit') {
				this.setButtonEditStatus();
			}
		},
		setEditorTabLabel: function (text) {
			$('.right-sidebar [href="#editor-tab"]').html(text);
		},
		setMsg: function (msg) {
			var sidebar = $('.right-sidebar');
			sidebar.find('.msg-title').removeClass('error').removeClass('warning').removeClass('success');
			if (msg.status == 'error') {
				sidebar.find('.msg-title').addClass('error');
			} else if (msg.status == 'warning') {
				sidebar.find('.msg-title').addClass('warning');
			} else if (msg.status == 'success') {
				sidebar.find('.msg-title').addClass('success');
			}
			if (msg.title) {
				sidebar.find('.msg-title span').text(msg.title ? msg.title : '');
				sidebar.find('#msg-detail').html(msg.detail ? msg.detail : '').removeClass('in');
			} else {
				sidebar.find('.msg-title span').text(msg);
				sidebar.find('#msg-detail').html('').removeClass('in');
			}
		},
		setButtonEditStatus: function () {
			$('.right-sidebar [data-event-type]').attr('disabled', false);
			$('.right-sidebar [data-event-type="add"]').attr('disabled', true);
			$('.right-sidebar [data-event-type="edit"]').attr('disabled', true);
			$('.right-sidebar [data-event-type="copy"]').attr('disabled', true);
			$('.right-sidebar [data-event-type="audit"]').attr('disabled', true);
			$('.right-sidebar [data-event-type="unaudit"]').attr('disabled', true);
		},
		setButtonAddStatus: function () {
			$('.right-sidebar [data-event-type]').attr('disabled', false);
			$('.right-sidebar [data-event-type="add"]').attr('disabled', true);
			$('.right-sidebar [data-event-type="edit"]').attr('disabled', true);
			$('.right-sidebar [data-event-type="copy"]').attr('disabled', true);
			$('.right-sidebar [data-event-type="audit"]').attr('disabled', true);
			$('.right-sidebar [data-event-type="unaudit"]').attr('disabled', true);
		},
		setButtonQueryStatus: function (data) {
			$('.right-sidebar [data-event-type]').attr('disabled', false);
			$('.right-sidebar [data-event-type="save"]').attr('disabled', true);
			if (!this.currentPanel.status.canEdit.call(this.currentPanel, data)) {
				$('.right-sidebar [data-event-type="edit"]').attr('disabled', true);
				$('.right-sidebar [data-event-type="audit"]').attr('disabled', true);
				$('.right-sidebar [data-event-type="unaudit"]').attr('disabled', false);
			}else{
				$('.right-sidebar [data-event-type="audit"]').attr('disabled', false);
				$('.right-sidebar [data-event-type="unaudit"]').attr('disabled', true);
			}
		},
		isOpenState: function () {
			return this.openState;
		},
		sideSwitch: function (isOpenState) {
			var _this = this;
			var _side = $('.right-sidebar');

			this.openState = isOpenState;
			if (isOpenState) {
				if (!_side.hasClass('sidebar-open')) {
					var maxWidth = _side.css("max-width");
					_side.addClass('sidebar-open').animate({"right": "0px", opacity: '1'}, 200);
				}
			} else {
				_this.currentPanel.operate = 'query';

				if (_side.hasClass('sidebar-open')) {
					var maxWidth = _side.css("max-width");
					_side.animate({"right": "-" + maxWidth, opacity: '0'}, 200, function () {
						_side.removeClass('sidebar-open');
						_this.currentPanel.pagePanel.setCurrentPanel(null);
					});
				}
			}
			$(window).resize();
		}
	};

	var old = webplus[pluginName];
	webplus[pluginName] = {
		getTablePanel: function (tablePanelId) {
			return PagePanel.all[tablePanelId];
		},
		getActivePanel: function (event) {
			var _tablePanel = null;
			if (!event) {
				if (PagePanel.currentPanel) {
					_tablePanel = PagePanel.currentPanel;
				}
			} else {
				var tablePanelId = $(event.currentTarget).closest('[data-panel-id]').attr('data-panel-id');
				if (tablePanelId === undefined) {
					tablePanelId = $(event.currentTarget).closest('[data-tab-panel]').attr('data-tab-panel');
					if (tablePanelId != null) {
						_tablePanel = PagePanel.all[tablePanelId];
					}
				} else {
					_tablePanel = PagePanel.all[tablePanelId];
				}
			}
			if (_tablePanel != null) {
				this.getDefaultPagePanel().setCurrentPanel(_tablePanel);
			}

			if (_tablePanel == null) {
				if (PagePanel.currentPanel) {
					_tablePanel = PagePanel.currentPanel;
				} else {
					_tablePanel = PagePanel.all[Object.keys(PagePanel.all)[0]];
				}
			}
			if (!_tablePanel.isLoading) {
				_tablePanel.refresh();
			}
			return _tablePanel;
		},
		getDefaultPagePanel: function () {
			return this.getPagePanel({id: 'default'});
		},
		getPagePanel: function (options) {
			if (!options.id) {
				options.id = 'default';
			}
			var pagePanel = PagePanel.pages[options.id];
			if (pagePanel) {
				return pagePanel;
			} else {
				pagePanel = new PagePanel(options);
				pagePanel.setSidePanel(new SidePanel());
				PagePanel.pages[options.id] = pagePanel;
				return pagePanel;
			}
		}
	}

	webplus[pluginName].Constructor = PagePanel;
	webplus[pluginName].DEFAULTS = PagePanel.DEFAULTS;

	webplus[pluginName].noConflict = function () {
		webplus[pluginName] = old;
		return this;
	};

})(window);
