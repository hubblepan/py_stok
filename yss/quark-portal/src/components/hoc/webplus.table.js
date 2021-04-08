/**
 * webplus.table 封装类
 * @author huangsq
 * @version 2019-03-26
 */
(function ($, window, document) {
	'use strict';

	var templ = webplus.templ;
	var pagebar = webplus.pagebar;
	var hint = webplus.hint();

	var layer = layui.layer
		, form = layui.form
		, device = layui.device()

		//外部接口
		, table = {
			config: {
				checkName: 'e_CHECKED' //是否选中状态的字段名
				, indexName: 'E_TABLE_INDEX' //下标索引名
			} //全局配置项
			, cache: {} //数据缓存
			, index: layui.table ? (layui.table.index + 10000) : 0

			//设置全局项
			, set: function (options) {
				var that = this;
				that.config = $.extend({}, that.config, options);
				return that;
			}

			//事件监听
			, on: function (events, callback) {
				return layui.onevent.call(this, MOD_NAME, events, callback);
			}
		}

		//操作当前实例
		, thisTable = function () {
			var that = this
				, options = that.config
				, id = options.id || options.index;

			if (id) {
				thisTable.that[id] = that; //记录当前实例对象
				thisTable.config[id] = options; //记录当前实例配置项
			}

			return {
				reload: function (options) {
					that.reload.call(that, options);
				}
				, setColsWidth: function () {
					that.setColsWidth.call(that);
				}
				, resize: function () { //重置表格尺寸/结构
					that.resize.call(that);
				}
				, config: options
			}
		}

		//获取当前实例配置项
		, getThisTableConfig = function (id) {
			var config = thisTable.config[id];
			if (!config) hint.error('The ID option was not found in the table instance');
			return config || null;
		}

		//字符常量
		, MOD_NAME = 'table', ELEM = '.e-table', THIS = 'e-this', SHOW = 'e-show', HIDE = 'e-hide',
		DISABLED = 'e-disabled', NONE = 'e-none'

		, ELEM_VIEW = 'e-table-view', ELEM_TOOL = '.e-table-tool', ELEM_BOX = '.e-table-box',
		ELEM_INIT = '.e-table-init', ELEM_HEADER = '.e-table-header', ELEM_BODY = '.e-table-body',
		ELEM_MAIN = '.e-table-main', ELEM_FIXED = '.e-table-fixed', ELEM_FIXL = '.e-table-fixed-l',
		ELEM_FIXR = '.e-table-fixed-r', ELEM_TOTAL = '.e-table-total', ELEM_PAGE = '.e-table-page',
		ELEM_SORT = '.e-table-sort', ELEM_EDIT = 'e-table-edit', ELEM_HOVER = 'e-table-hover'

		//thead区域模板
		, TPL_HEADER = function (options) {
			var rowCols = '{{#if(item2.colspan){}} colspan="{{item2.colspan}}"{{#} if(item2.rowspan){}} rowspan="{{item2.rowspan}}"{{#}}}';

			options = options || {};
			return ['<table cellspacing="0" cellpadding="0" border="0" class="e-table" '
				, '{{# if(d.data.skin){ }}data-skin="{{d.data.skin}}"{{# } }} {{# if(d.data.size){ }}lay-size="{{d.data.size}}"{{# } }} {{# if(d.data.even){ }}lay-even{{# } }}>'
				, '<thead>'
				, '{{# webplus.each(d.data.cols, function(i1, item1){ }}'
				, '<tr>'
				, '{{# webplus.each(item1, function(i2, item2){ }}'
				, '{{# if(item2.fixed && item2.fixed !== "right"){ left = true; } }}'
				, '{{# if(item2.fixed === "right"){ right = true; } }}'
				, function () {
					if (options.fixed && options.fixed !== 'right') {
						return '{{# if(item2.fixed && item2.fixed !== "right"){ }}';
					}
					if (options.fixed === 'right') {
						return '{{# if(item2.fixed === "right"){ }}';
					}
					return '';
				}()
				, '{{# var isSort = !(item2.colGroup) && item2.sort; }}'
				, '<th data-field="{{ item2.field||i2 }}" data-key="{{d.index}}-{{i1}}-{{i2}}" {{# if( item2.parentKey){ }}data-parentkey="{{ item2.parentKey }}"{{# } }} {{# if(item2.minWidth){ }}data-minwidth="{{item2.minWidth}}"{{# } }} ' + rowCols + ' {{# if(item2.unresize || item2.colGroup){ }}data-unresize="true"{{# } }} class="{{# if(item2.hide){ }}e-hide{{# } }}{{# if(isSort){ }} e-unselect{{# } }}{{# if(!item2.field){ }} e-table-col-special{{# } }}">'
				, '<div class="e-table-cell e-table-cell-'
				, '{{# if(item2.colGroup){ }}'
				, 'group'
				, '{{# } else { }}'
				, '{{d.index}}-{{i1}}-{{i2}}'
				, '{{# if(item2.type !== "normal"){ }}'
				, ' e-table-cell-{{ item2.type }}'
				, '{{# } }}'
				, '{{# } }}'
				, '" {{#if(item2.align){}}align="{{item2.align}}"{{#}}}>'
				, '{{# if(item2.type === "checkbox"){ }}' //复选框

				, '<label><input type="checkbox" name="{{item2.field || "eTableCheckbox"}}" data-skin="primary" {{# if(item2[d.data.checkName]){ }}checked {{# } if(d.data.checkName == item2.field){ }}data-check="selectAll" {{# } else { }} data-check="selectColumn"{{#  } }}>' +
				'<span>{{item2.title||""}}</span></label>'
				, '{{# } else { }}'
				, '<span>{{item2.title||""}}</span>'
				, '{{# if(isSort){ }}'
				, '<span class="e-table-sort e-inline"><i class="e-edge e-table-sort-asc" title="升序"></i><i class="e-edge e-table-sort-desc" title="降序"></i></span>'
				, '{{# } }}'
				, '{{# } }}'
				, '</div>'
				, '</th>'
				, (options.fixed ? '{{# }; }}' : '')
				, '{{# }); }}'
				, '</tr>'
				, '{{# }); }}'
				, '</thead>'
				, '</table>'].join('');
		}

		//tbody区域模板
		, TPL_BODY = ['<table cellspacing="0" cellpadding="0" border="0" class="e-table" '
			, '{{# if(d.data.skin){ }}data-skin="{{d.data.skin}}"{{# } }} {{# if(d.data.size){ }}lay-size="{{d.data.size}}"{{# } }} {{# if(d.data.even){ }}lay-even{{# } }}>'
			, '<tbody></tbody>'
			, '</table>'].join('')

		//主模板
		,
		TPL_MAIN = ['<div class="e-form e-border-box {{d.VIEW_CLASS}}" data-filter="table-index-{{d.index}}" data-id="{{ d.data.id }}" style="{{# if(d.data.width){ }}width:{{d.data.width}}px;{{# } }} {{# if(d.data.height){ }}height:{{d.data.height}}px;{{# } }}">'

			, '{{# if(d.data.toolbar){ }}'
			, '<div class="e-table-tool">'
			, '<div class="e-table-tool-temp"></div>'
			, '<div class="e-table-tool-self"></div>'
			, '</div>'
			, '{{# } }}'

			, '<div class="e-table-box">'
			, '{{# if(d.data.loading){ }}'
			, '<div class="e-table-init" style="background-color: #fff;">'
			, '<i class="fa fa-loading"></i>'
			, '</div>'
			, '{{# } }}'

			, '{{# var left, right; }}'
			, '<div class="e-table-header">'
			, TPL_HEADER()
			, '</div>'
			, '<div class="e-table-body e-table-main">'
			, TPL_BODY
			, '</div>'

			, '{{# if(left){ }}'
			, '<div class="e-table-fixed e-table-fixed-l">'
			, '<div class="e-table-header">'
			, TPL_HEADER({fixed: true})
			, '</div>'
			, '<div class="e-table-body">'
			, TPL_BODY
			, '</div>'
			, '</div>'
			, '{{# }; }}'

			, '{{# if(right){ }}'
			, '<div class="e-table-fixed e-table-fixed-r">'
			, '<div class="e-table-header">'
			, TPL_HEADER({fixed: 'right'})
			, '<div class="e-table-mend"></div>'
			, '</div>'
			, '<div class="e-table-body">'
			, TPL_BODY
			, '</div>'
			, '</div>'
			, '{{# }; }}'
			, '</div>'

			, '{{# if(d.data.totalRow){ }}'
			, '<div class="e-table-total">'
			, '<table cellspacing="0" cellpadding="0" border="0" class="e-table" '
			, '{{# if(d.data.skin){ }}data-skin="{{d.data.skin}}"{{# } }} {{# if(d.data.size){ }}lay-size="{{d.data.size}}"{{# } }} {{# if(d.data.even){ }}lay-even{{# } }}>'
			, '<tbody><tr><td><div class="e-table-cell" style="visibility: hidden;">Total</div></td></tr></tbody>'
			, '</table>'
			, '</div>'
			, '{{# } }}'

			, '{{# if(d.data.page){ }}'
			, '<div class="e-table-page">'
			, '<div id="e-table-page{{d.index}}"></div>'
			, '</div>'
			, '{{# } }}'

			, '<style>'
			, '{{# webplus.each(d.data.cols, function(i1, item1){'
			, 'webplus.each(item1, function(i2, item2){ }}'
			, '.e-table-cell-{{d.index}}-{{i1}}-{{i2}}{ '
			, '{{# if(item2.width){ }}'
			, 'width: {{item2.width}}px;'
			, '{{# } }}'
			, ' }'
			, '{{# });'
			, '}); }}'
			, '</style>'
			, '</div>'].join('')

		, _WIN = $(window)
		, _DOC = $(document);


	function Scrollbar() {
		this.options = {
			total: 0, //数据总数
			pos: 0, //当前滚动位置
			itemSize: 31, //单项尺寸
			height: 310 //控件尺寸
		};
	}

	Scrollbar.prototype = (function () {
		function setOptions(options) {
			for (var attr in options) {
				this.options[attr] = options[attr];
			}
			this.itemSize = this.options.itemSize;

			this.itemCount = parseInt(this.options.height / this.itemSize);
			this.tableHeight = this.itemCount * this.itemSize;

			this.dataHeight = this.options.total * this.itemSize;
			this.paddingHeight = this.dataHeight - this.tableHeight;
			this.isMoreData = this.paddingHeight > 0;
			Refresh(this);
		}

		function Refresh(_this) {
			if (!_this.created)
				return; //设置控件高度
			_this.bar.style.height = _this.options.height + "px";
			_this.content.style.height = _this.paddingHeight + "px";
		}

//获取滚动位置
		function getPos() {
			var top = this.bar.scrollTop;
			var pos = parseInt(top / this.options.itemSize);
			return pos;
		}

//每页可展示的数据数量
		function getPageItems() {
			return this.options.height / this.options.itemSize;
		}

//滚动事件响应
		function OnScroll(_this, datas) {
			var pos = _this.getPos();
			// if (pos == _this.options.pos)
			// 	return;
			_this.options.pos = pos;
			_this.onScroll(pos, datas);
		}

//滚动条创建
		function CreateAt(dom) {
			var _this = this;
			var bar = document.querySelector('.e-table-main');
			var content = document.createElement("div");
			bar.appendChild(content);

			webplus.addEvent(bar, 'scroll', null, function () {
				OnScroll(_this);
			});
			this.bar = bar;
			this.content = content;
			this.created = true;
			Refresh(this);
		}

		return {
			setOptions: setOptions,
			CreateAt: CreateAt,
			getPos: getPos,
			getPageItems: getPageItems,
			onScroll: null
		};
	})();

	//构造器
	var Class = function (options) {
		var that = this;
		that.index = ++table.index;
		that.config = $.extend({}, that.config, table.config, options);
		that.initTable();
	};
	Class.prototype = {

		//默认配置
		config: {
			pageSize: 10 //每页显示的数量
			, bigData: false
			, loading: true //请求数据时，是否显示loading
			, cellMinWidth: 60 //所有单元格默认最小宽度
			, defaultToolbar: ['filter', 'exports', 'print'] //工具栏右侧图标
			, autoSort: true //是否前端自动排序。如果否，则需自主排序（通常为服务端处理好排序）
			, text: {
				none: '无数据'
			}
		},
		initTable: function () {
			var that = this, options = that.config;

			options.id = options.id || that.index;
			options.elem = $('#' + options.id);
			options.where = options.where || {};

			//请求参数的自定义格式
			options.request = $.extend({
				pageNo: "pageNo",
				pageSize: 'pageSize'
			}, options.request);

			//响应数据的自定义格式
			options.response = $.extend({
				statusName: 'code',
				statusCode: 0,
				message: 'message',
				result: 'result',
				datas: 'datas',
				totalRecord: "totalRecord"
			}, options.response);

			//如果 page 传入 pagebar 对象
			if (typeof options.page === 'object') {
				options.pageSize = options.page.pageSize || options.pageSize;
				options.limits = options.page.limits || options.limits;
				that.pageNo = options.page.pageNo = options.page.pageNo || 1;
				delete options.page.elem;
				delete options.page.jump;
			}

		},
		//表格渲染
		render: function () {
			var that = this
				, options = that.config;

			if (!options.elem[0]) return that;

			//高度铺满：full-差距值
			if (options.height && /^full-\d+$/.test(options.height)) {
				that.fullHeightGap = options.height.split('-')[1];
			}

			//初始化一些参数
			that.setInit();

			//开始插入替代元素
			var othis = options.elem
				, hasRender = othis.next('.' + ELEM_VIEW)

				//主容器
				, reElem = that.elem = $(templ(TPL_MAIN).render({
					VIEW_CLASS: ELEM_VIEW
					, data: options
					, index: that.index //索引
				}));

			options.index = that.index;

			//生成替代元素
			hasRender[0] && hasRender.remove(); //如果已经渲染，则Rerender
			othis.append(reElem);

			//各级容器
			that.eTableToolbar = reElem.find(ELEM_TOOL);
			that.eTableBox = reElem.find(ELEM_BOX);
			that.eTableHeader = reElem.find(ELEM_HEADER);
			that.eTableMain = reElem.find(ELEM_MAIN);
			that.eTableBody = reElem.find(ELEM_BODY);
			that.eTableFixed = reElem.find(ELEM_FIXED);
			that.eTableFixedLeft = reElem.find(ELEM_FIXL);
			that.eTableFixedRight = reElem.find(ELEM_FIXR);
			that.eTableTotalBar = reElem.find(ELEM_TOTAL);
			if (!options.bigData) {
				that.pagebar = reElem.find(ELEM_PAGE);
			}
			//初始化工具栏
			that.renderToolbar();

			//让表格平铺
			that.fullSize();

			//如果多级表头，则填补表头高度
			if (options.cols.length > 1) {
				//补全高度
				var th = that.eTableFixed.find(ELEM_HEADER).find('th');
				th.height(that.eTableHeader.height() - 1 - parseFloat(th.css('padding-top')) - parseFloat(th.css('padding-bottom')));
			}

			that.events(); //事件
		},

		//根据列类型，定制化参数e-table-tips
		initOpts: function (item) {
			var that = this
				, options = that.config
				, initWidth = {
				checkbox: 39
				, radio: 39
				, space: 15
				, numbers: 50
			};

			//让 type 参数兼容旧版本
			if (item.checkbox) item.type = "checkbox";
			if (item.space) item.type = "space";
			if (!item.type) item.type = "normal";

			if (item.type !== "normal") {
				item.unresize = true;
				item.width = item.width || initWidth[item.type];
			}
		},

		//初始化一些参数
		setInit: function (type) {
			var that = this
				, options = that.config;

			options.clientWidth = options.width || function () { //获取容器宽度
				//如果父元素宽度为0（一般为隐藏元素），则继续查找上层元素，直到找到真实宽度为止
				var getWidth = function (parent) {
					var width, isNone;
					parent = parent || options.elem.parent();
					width = parent.width();
					try {
						isNone = parent.css('display') === 'none';
					} catch (e) {
					}
					if (parent[0] && (!width || isNone)) return getWidth(parent.parent());
					return width;
				};
				return getWidth();
			}();

			if (type === 'width') return options.clientWidth;

			//初始化列参数
			webplus.each(options.cols, function (i1, item1) {
				webplus.each(item1, function (i2, item2) {

					//如果列参数为空，则移除
					if (!item2) {
						item1.splice(i2, 1);
						return;
					}

					item2.key = i1 + '-' + i2;
					item2.hide = item2.hide || false;

					//设置列的父列索引
					//如果是组合列，则捕获对应的子列
					if (item2.colGroup || item2.colspan > 1) {
						var childIndex = 0;
						webplus.each(options.cols[i1 + 1], function (i22, item22) {
							//如果子列已经被标注为{HAS_PARENT}，或者子列累计 colspan 数等于父列定义的 colspan，则跳出当前子列循环
							if (item22.HAS_PARENT || (childIndex > 1 && childIndex == item2.colspan)) return;

							item22.HAS_PARENT = true;
							item22.parentKey = i1 + '-' + i2;

							childIndex = childIndex + parseInt(item22.colspan > 1 ? item22.colspan : 1);
						});
						item2.colGroup = true; //标注是组合列
					}

					//根据列类型，定制化参数
					that.initOpts(item2);
				});
			});

		},

		//初始工具栏
		renderToolbar: function () {
			var that = this
				, options = that.config

			//添加工具栏左侧模板
			var leftDefaultTemp = [
				'<div class="e-inline" data-event="add"><i class="fa fa-plus-square"></i></div>'
				, '<div class="e-inline" data-event="update"><i class="fa fa-edit"></i></div>'
				, '<div class="e-inline" data-event="delete"><i class="fa fa-remove"></i></div>'
			].join('')
				, elemToolTemp = that.eTableToolbar.find('.e-table-tool-temp');

			if (options.toolbar === 'default') {
				elemToolTemp.html(leftDefaultTemp);
			} else if (typeof options.toolbar === 'string') {
				var toolbarHtml = $(options.toolbar).html() || '';
				toolbarHtml && elemToolTemp.html(
					templ(toolbarHtml).render(options)
				);
			}

			//添加工具栏右侧面板
			var layout = {
				filter: {
					title: '筛选列'
					, layEvent: 'E_TABLE_COLS'
					, icon: 'fa-columns'
				}
				, exports: {
					title: '导出'
					, layEvent: 'E_TABLE_EXPORT'
					, icon: 'fa-cloud-download'
				}
				, print: {
					title: '打印'
					, layEvent: 'E_TABLE_PRINT'
					, icon: 'fa-print'
				}
			}, iconElem = [];

			if (typeof options.defaultToolbar === 'object') {
				webplus.each(options.defaultToolbar, function (i, item) {
					var thisItem = layout[item];
					if (thisItem) {
						iconElem.push('<div class="e-inline" title="' + thisItem.title + '" data-event="' + thisItem.layEvent + '">'
							+ '<i class="fa ' + thisItem.icon + '"></i>'
							+ '</div>');
					}
				});
			}
			that.eTableToolbar.find('.e-table-tool-self').html(iconElem.join(''));
		},

		//同步表头父列的相关值
		setParentCol: function (hide, parentKey) {
			var that = this
				, options = that.config

				, parentTh = that.eTableHeader.find('th[data-key="' + options.index + '-' + parentKey + '"]') //获取父列元素
				, parentColspan = parseInt(parentTh.attr('colspan')) || 0;

			if (parentTh[0]) {
				var arrParentKey = parentKey.split('-')
					, getThisCol = options.cols[arrParentKey[0]][arrParentKey[1]];

				hide ? parentColspan-- : parentColspan++;

				parentTh.attr('colspan', parentColspan);
				parentTh[parentColspan < 1 ? 'addClass' : 'removeClass'](HIDE);

				getThisCol.colspan = parentColspan; //同步 colspan 参数
				getThisCol.hide = parentColspan < 1; //同步 hide 参数

				//递归，继续往上查询是否有父列
				var nextParentKey = parentTh.data('parentkey');
				nextParentKey && that.setParentCol(hide, nextParentKey);
			}
		},

		//多级表头补丁
		setColsPatch: function () {
			var that = this
				, options = that.config

			//同步表头父列的相关值
			webplus.each(options.cols, function (i1, item1) {
				webplus.each(item1, function (i2, item2) {
					if (item2.hide) {
						that.setParentCol(item2.hide, item2.parentKey);
					}
				});
			});
		},

		//动态分配列宽
		setColsWidth: function () {
			var that = this
				, options = that.config
				, colNums = 0 //列个数
				, autoColNums = 0 //自动列宽的列个数
				, autoWidth = 0 //自动列分配的宽度
				, countWidth = 0 //所有列总宽度和
				, cntrWidth = that.setInit('width');

			//统计列个数
			that.eachCols(function (i, item) {
				item.hide || colNums++;
			});

			//减去边框差和滚动条宽
			cntrWidth = cntrWidth - function () {
				return (options.skin === 'line' || options.skin === 'nob') ? 2 : colNums + 1;
			}() - that.getScrollWidth(that.eTableMain[0]) - 1;

			//计算自动分配的宽度
			var getAutoWidth = function (back) {
				//遍历所有列
				webplus.each(options.cols, function (i1, item1) {
					webplus.each(item1, function (i2, item2) {
						var width = 0
							, minWidth = item2.minWidth || options.cellMinWidth; //最小宽度

						if (!item2) {
							item1.splice(i2, 1);
							return;
						}

						if (item2.colGroup || item2.hide) return;

						if (!back) {
							width = item2.width || 0;
							if (/\d+%$/.test(width)) { //列宽为百分比
								width = Math.floor((parseFloat(width) / 100) * cntrWidth);
								width < minWidth && (width = minWidth);
							} else if (!width) { //列宽未填写
								item2.width = width = 0;
								autoColNums++;
							}
						} else if (autoWidth && autoWidth < minWidth) {
							autoColNums--;
							width = minWidth;
						}

						if (item2.hide) width = 0;
						countWidth = countWidth + width;
					});
				});

				//如果未填充满，则将剩余宽度平分
				(cntrWidth > countWidth && autoColNums) && (
					autoWidth = (cntrWidth - countWidth) / autoColNums
				);
			}

			getAutoWidth();
			getAutoWidth(true); //重新检测分配的宽度是否低于最小列宽

			//记录自动列数
			that.autoColNums = autoColNums;

			//设置列宽
			that.eachCols(function (i3, item3) {
				var minWidth = item3.minWidth || options.cellMinWidth;
				if (item3.colGroup || item3.hide) return;

				//给位分配宽的列平均分配宽
				if (item3.width === 0) {
					that.getCssRule(options.index + '-' + item3.key, function (item) {
						item.style.width = Math.floor(autoWidth >= minWidth ? autoWidth : minWidth) + 'px';
					});
				}

				//给设定百分比的列分配列宽
				else if (/\d+%$/.test(item3.width)) {
					that.getCssRule(options.index + '-' + item3.key, function (item) {
						item.style.width = Math.floor((parseFloat(item3.width) / 100) * cntrWidth) + 'px';
					});
				}
			});

			//填补 Math.floor 造成的数差
			var patchNums = that.eTableMain.width() - that.getScrollWidth(that.eTableMain[0])
				- that.eTableMain.children('table').outerWidth();

			if (that.autoColNums && patchNums >= -colNums && patchNums <= colNums) {
				var getEndTh = function (th) {
					var field;
					th = th || that.eTableHeader.eq(0).find('thead th:last-child')
					field = th.data('field');
					if (!field && th.prev()[0]) {
						return getEndTh(th.prev())
					}
					return th
				}
					, th = getEndTh()
					, key = th.data('key');

				that.getCssRule(key, function (item) {
					var width = item.style.width || th.outerWidth();
					item.style.width = (parseFloat(width) + patchNums) + 'px';

					//二次校验，如果仍然出现横向滚动条（通常是 1px 的误差导致）
					if (that.eTableMain.height() - that.eTableMain.prop('clientHeight') > 0) {
						item.style.width = (parseFloat(item.style.width) - 1) + 'px';
					}
				});
			}

			that.loading(!0);
		},

		//重置表格尺寸/结构
		resize: function () {
			var that = this;
			// resizeGridWrapper(that);

			that.fullSize(); //让表格铺满
			that.setColsWidth(); //自适应列宽
			that.scrollPatch(); //滚动条补丁

		},

		//表格完整重载
		reload: function (options) {
			var that = this;
			if (that.config.datas && that.config.datas.constructor === Array) delete that.config.datas;
			that.config = $.extend({}, that.config, options);
			that.render();
		},

		//页码
		pageNo: 1,

		//获得数据
		pullData: function (pageNo) {
			var that = this
				, options = that.config
				, request = options.request
				, response = options.response
				, sort = function () {
				if (typeof options.initSort === 'object') {
					that.sort(options.initSort.field, options.initSort.type);
				}
			};

			that.startTime = new Date().getTime(); //渲染开始时间

			if (options.url) { //Ajax请求
				var params = {};
				params[request.pageNo] = pageNo;
				params[request.pageSize] = options.pageSize;

				//参数
				var data = $.extend(params, options.where);
				if (options.contentType && options.contentType.indexOf("application/json") == 0) { //提交 json 格式
					data = JSON.stringify(data);
				}

				$.ajax({
					type: options.method || 'get'
					, url: options.url
					, contentType: options.contentType
					, data: data
					, dataType: 'json'
					, headers: options.headers || {}
					, success: function (res) {
						//如果有数据解析的回调，则获得其返回的数据
						if (typeof options.parseData === 'function') {
							res = options.parseData(res) || res;
						}
						//检查数据格式是否符合规范
						if (res[response.statusName] != response.statusCode) {
							that.renderForm();
							that.eTableMain.html('<div class="' + NONE + '">' + (
								res[response.message] ||
								('返回的数据不符合规范，正确的成功状态码 (' + response.statusName + ') 应为：' + response.statusCode)
							) + '</div>');
						} else {
							that.renderData(res, pageNo, res[response.totalRecord]), sort();
							options.time = (new Date().getTime() - that.startTime) + ' ms'; //耗时（接口请求+视图渲染）
						}
						that.setColsWidth();
						typeof options.done === 'function' && options.done(res, pageNo, res[response.totalRecord]);
					}
					, error: function (e, m) {
						that.eTableMain.html('<div class="' + NONE + '">数据接口请求异常：' + m + '</div>');
						that.renderForm();
						that.setColsWidth();
					}
				});
			} else if (options.datas && options.datas.constructor === Array) { //已知数据
				var res = {}
					, startLimit = pageNo * options.pageSize - options.pageSize

				res[response.datas] = options.datas.concat().splice(startLimit, options.pageSize);
				res[response.totalRecord] = options.datas.length;

				that.renderData(res, pageNo, options.datas.length), sort();
				that.setColsWidth();
				typeof options.done === 'function' && options.done(res, pageNo, res[response.totalRecord]);
			}
		},

		//遍历表头
		eachCols: function (callback) {
			var that = this;
			table.eachCols(null, callback, that.config.cols);
			return that;
		},

		//数据渲染
		renderData: function (res, pageNo, totalRecord, sort) {
			var that = this
				, options = that.config
				, datas = res[options.response.datas] || [];

			//渲染视图
			var render = function () { //后续性能提升的重点
				var thisCheckedRowIndex;
				if (!sort && that.sortKey) {
					return that.sort(that.sortKey.field, that.sortKey.sort, true);
				}
				that.datas = datas;

				var tdatas = datas;
				if (options.bigData) {
					tdatas = datas.slice(0, that.rowCount);
					that.setScrollbar(datas, that.bodyHeight);
				}

				var trs = []
					, pageNo = 1
					, trs_fixed = []
					, trs_fixed_r = [];

				webplus.each(tdatas, function (i1, item1) {
					var tds = [], tds_fixed = [], tds_fixed_r = []
						, numbers = i1 + options.pageSize * (pageNo - 1) + 1; //序号

					if (item1.length === 0) return;
					if (!sort) {
						item1[table.config.indexName] = i1;
					}

					that.eachCols(function (i3, item3) {
						var field = item3.field || i3
							, key = options.index + '-' + item3.key
							, content = item1[field];

						if (content === undefined || content === null) content = '';
						if (item3.colGroup) return;

						var tplData = $.extend(true, {
							E_INDEX: numbers
						}, item1)
							, checkName = table.config.checkName;

						//td内容
						var td = ['<td data-field="' + field + '" data-key="' + key + '" ' + function () { //追加各种属性
							var attr = [];
							if (item3.edit) attr.push('data-edit="' + item3.edit + '"'); //是否允许单元格编辑
							if (item3.align) attr.push('align="' + item3.align + '"'); //对齐方式
							if (item3.templet) attr.push('data-content="' + content + '"'); //自定义模板
							if (item3.toolbar) attr.push('data-off="true"'); //行工具列关闭单元格事件
							if (item3.event) attr.push('data-event="' + item3.event + '"'); //自定义事件
							if (item3.style) attr.push('style="' + item3.style + '"'); //自定义样式
							if (item3.minWidth) attr.push('data-minwidth="' + item3.minWidth + '"'); //单元格最小宽度
							return attr.join(' ');
						}() + ' class="' + function () { //追加样式
							var classNames = [];
							if (item3.hide) classNames.push(HIDE); //插入隐藏列样式
							if (!item3.field) classNames.push('e-table-col-special'); //插入特殊列样式
							var _fieldValue = tplData[item3.field];

							if (_fieldValue && _fieldValue[options.checkboxRender.background]) {
								classNames.push('bg-info');
							}

							return classNames.join(' ');
						}() + '">'
							, '<div class="e-table-cell e-table-cell-' + function () { //返回对应的CSS类标识
								return item3.type === 'normal' ? key
									: (key + ' e-table-cell-' + item3.type);
							}() + '">' + function () {
								var _fieldValue = tplData[item3.field];

								//渲染不同风格的列
								switch (item3.type) {
									case 'checkbox':

										if (checkName == item3.field) {
											return '<input type="checkbox" data-check="row" name="' + item3.field + '" lay-skin="primary"  data-skin="primary" ' + function () {
												if (_fieldValue) {
													return 'checked';
												} else {
													return '';
												}
											}() + '>';
										} else if (_fieldValue == null) {
											return '';
										}
										// return '<input type="checkbox" name="' + (item3.field || 'eTableCheckbox') + '" data-skin="primary" ' + function () {
										// 	//如果是全选
										// 	if (item3[checkName]) {
										// 		item1[checkName] = item3[checkName];
										// 		return item3[checkName] ? 'checked' : '';
										// 	}
										// 	return tplData[checkName] ? 'checked' : '';
										// }() + '>';
										return '<input ' + function () {
											if (!_fieldValue[options.checkboxRender.rowCheckField] && !item3.rowCheckbox) {
												return 'data-check="column"'
											} else {
												return 'data-check="item"'
											}
										}() + ' type="checkbox" name="' + item3.field + '" lay-skin="primary" data-skin="primary" ' + function () {
											if (_fieldValue && _fieldValue[options.checkboxRender.checked]) {
												return 'checked';
											} else if (_fieldValue && !_fieldValue[options.checkboxRender.checked]) {
												return '';
											} else if (_fieldValue) {
												return 'checked';
											} else {
												return '';
											}
										}() + '>';
										break;
									case 'radio':
										if (tplData[checkName]) {
											thisCheckedRowIndex = i1;
										}
										return '<input type="radio" name="eTableRadio_' + options.index + '" '
											+ (tplData[checkName] ? 'checked' : '') + ' data-type="eTableRadio">';
										break;
									case 'numbers':
										return numbers;
										break;
								}
								;

								//解析工具列模板
								if (item3.toolbar) {
									return templ($(item3.toolbar).html() || '').render(tplData);
								}
								return item3.templet ? function () {
									return typeof item3.templet === 'function'
										? item3.templet(tplData)
										: templ($(item3.templet).html() || String(content)).render(tplData)
								}() : content;
							}()
							, '</div></td>'].join('');

						tds.push(td);
						if (item3.fixed && item3.fixed !== 'right') tds_fixed.push(td);
						if (item3.fixed === 'right') tds_fixed_r.push(td);
					});

					trs.push('<tr data-index="' + i1 + '">' + tds.join('') + '</tr>');
					trs_fixed.push('<tr data-index="' + i1 + '">' + tds_fixed.join('') + '</tr>');
					trs_fixed_r.push('<tr data-index="' + i1 + '">' + tds_fixed_r.join('') + '</tr>');
				});

				that.eTableMain.find('tbody').append(trs.join(''));
				that.eTableFixedLeft.find('tbody').append(trs_fixed.join(''));
				that.eTableFixedRight.find('tbody').append(trs_fixed_r.join(''));
				//执行下一页渲染，第二参数为：满足“加载更多”的条件，即后面仍有分页


				that.eTableBody.scrollTop(0);
				that.eTableMain.find('.' + NONE).remove();

				that.renderForm();
				typeof thisCheckedRowIndex === 'number' && that.setThisRowChecked(thisCheckedRowIndex);
				that.syncCheckAll();

				//滚动条补丁
				that.haveInit ? that.scrollPatch() : setTimeout(function () {
					that.scrollPatch();
				}, 50);
				that.haveInit = true;

				layer.close(that.tipsIndex);

				//同步表头父列的相关值
				options.HAS_SET_COLS_PATCH || that.setColsPatch();
				options.HAS_SET_COLS_PATCH = true;
			};
			that.key = options.id || options.index;
			table.cache[that.key] = datas; //记录数据

			if (!options.bigData) {
				//显示隐藏分页栏
				that.pagebar[(totalRecord == 0 || (datas.length === 0 && pageNo == 1)) ? 'addClass' : 'removeClass'](HIDE);
			}

			//排序
			if (sort) {
				return render();
			}

			if (datas.length === 0) {
				that.renderForm();
				that.eTableFixed.remove();
				that.eTableMain.find('tbody').html('');
				that.eTableMain.find('.' + NONE).remove();
				return that.eTableMain.append('<div class="' + NONE + '">' + options.text.none + '</div>');
			}

			render(); //渲染数据
			that.renderTotal(datas); //数据合计

			if (!options.bigData) {
				//同步分页状态
				if (options.page) {
					options.page = $.extend({
						elem: 'e-table-page' + options.index
						, totalRecord: totalRecord
						, pageSize: options.pageSize
						, limits: options.limits || [5, 10, 15, 20, 30, 50, 100, 200, 500, 1000]
						, groups: 3
						, layout: ['prev', 'pageNo', 'next', 'skip', 'totalRecord', 'pageSize']
						, prev: '<i class="fa fa-angle-left fa-2x"></i>'
						, next: '<i class="fa fa-angle-right fa-2x"></i>'
						, jump: function (obj, first) {
							if (!first) {
								//分页本身并非需要做以下更新，下面参数的同步，主要是因为其它处理统一用到了它们
								//而并非用的是 options.page 中的参数（以确保分页未开启的情况仍能正常使用）
								that.pageNo = obj.pageNo; //更新页码
								options.pageSize = obj.pageSize; //更新每页条数

								that.loading();
								that.pullData(obj.pageNo);
							}
						}
					}, options.page);
					options.page.totalRecord = totalRecord; //更新总条数
					pagebar.render(options.page);
				}
			}
		},

		//数据合计行
		renderTotal: function (data) {
			var that = this
				, options = that.config
				, totalNums = {};

			if (!options.totalRow) return;

			webplus.each(data, function (i1, item1) {
				if (item1.length === 0) return;

				that.eachCols(function (i3, item3) {
					var field = item3.field || i3
						, content = item1[field];

					if (item3.totalRow) {
						totalNums[field] = (totalNums[field] || 0) + (parseFloat(content) || 0);
					}
				});
			});

			var tds = [];
			that.eachCols(function (i3, item3) {
				var field = item3.field || i3;

				//td内容
				var td = ['<td data-field="' + field + '" data-key="' + options.index + '-' + item3.key + '" ' + function () {
					var attr = [];
					if (item3.align) attr.push('align="' + item3.align + '"'); //对齐方式
					if (item3.style) attr.push('style="' + item3.style + '"'); //自定义样式
					if (item3.minWidth) attr.push('data-minwidth="' + item3.minWidth + '"'); //单元格最小宽度
					return attr.join(' ');
				}() + ' class="' + function () { //追加样式
					var classNames = [];
					if (item3.hide) classNames.push(HIDE); //插入隐藏列样式
					if (!item3.field) classNames.push('e-table-col-special'); //插入特殊列样式
					return classNames.join(' ');
				}() + '">'
					, '<div class="e-table-cell e-table-cell-' + function () { //返回对应的CSS类标识
						var str = (options.index + '-' + item3.key);
						return item3.type === 'normal' ? str
							: (str + ' e-table-cell-' + item3.type);
					}() + '">' + function () {
						var text = item3.totalRowText || '';
						return item3.totalRow ? (parseFloat(totalNums[field]).toFixed(2) || text) : text;
					}()
					, '</div></td>'].join('');

				tds.push(td);
			});

			that.eTableTotalBar.find('tbody').html('<tr>' + tds.join('') + '</tr>');
		},

		//找到对应的列元素
		getColElem: function (parent, key) {
			var that = this
				, options = that.config;
			return parent.eq(0).find('.e-table-cell-' + (options.index + '-' + key) + ':eq(0)');
		},

		//渲染表单
		renderForm: function (type) {
			form.render(type, 'table-index-' + this.index);
		},

		//标记当前行选中状态
		setThisRowChecked: function (index) {
			var that = this
				, options = that.config
				, ELEM_CLICK = 'e-table-click'
				, tr = that.eTableBody.find('tr[data-index="' + index + '"]');

			tr.addClass(ELEM_CLICK).siblings('tr').removeClass(ELEM_CLICK);
		},
		//设置滚动条
		setScrollbar: function (datas, bodyHeight) {
			var that = this;

			var scrbar = new Scrollbar();
			scrbar.CreateAt(".e-table-main");
			scrbar.setOptions({
				total: datas.length,
				height: bodyHeight
			});
			that.scrbar = scrbar;
			scrbar.onScroll = function (pos) {
				that.updateShowData(pos);
			}
		},
		//滚动更新数据
		updateShowData: function (pos) {
			var that = this;
			var n = that.scrbar.getPageItems();
			var elem = that.config.elem[0];
			var etb = elem.querySelector('.e-table-main .e-table');
			var mtb = elem.querySelector('.e-table-main');

			var fixetb = elem.querySelector('.e-table-fixed-l .e-table-body .e-table'); //固定列table
			var fixRows = null;
			if (fixetb) {
				fixRows = fixetb.querySelector('tbody').rows;
			}

			etb.style.top = mtb.scrollTop + 'px';
			var options = that.config;

			var rows = etb.querySelector('tbody').rows;

			if (pos > that.datas.length - rows.length) {  //滚动条到最后几条数据范围内 rows.length内
				pos = that.datas.length - rows.length;
			}

			var trs = []
				, pageNo = 1
				, trs_fixed = []
				, trs_fixed_r = [];
			var maxRow = pos + rows.length;
			for (var i = pos; i < maxRow; i++) {
				var tds = [], tds_fixed = [], tds_fixed_r = []
					, numbers = i + 1;//i1 + options.pageSize * (pageNo - 1) + 1; //序号

				var item1 = that.datas[i];
				if (item1 == null) {
					return;
				}

				that.eachCols(function (i3, item3) {
					var field = item3.field || i3
						, key = options.index + '-' + item3.key
						, content = item1[field];

					if (content === undefined || content === null) content = '';
					if (item3.colGroup) return;

					var tplData = $.extend(true, {
						// E_INDEX: numbers
					}, item1)
						, checkName = table.config.checkName;

					//td内容
					var td = ['<td data-field="' + field + '" data-key="' + key + '" ' + function () { //追加各种属性
						var attr = [];
						if (item3.edit) attr.push('data-edit="' + item3.edit + '"'); //是否允许单元格编辑
						if (item3.align) attr.push('align="' + item3.align + '"'); //对齐方式
						if (item3.templet) attr.push('data-content="' + content + '"'); //自定义模板
						if (item3.toolbar) attr.push('data-off="true"'); //行工具列关闭单元格事件
						if (item3.event) attr.push('data-event="' + item3.event + '"'); //自定义事件
						if (item3.style) attr.push('style="' + item3.style + '"'); //自定义样式
						if (item3.minWidth) attr.push('data-minwidth="' + item3.minWidth + '"'); //单元格最小宽度
						return attr.join(' ');
					}() + ' class="' + function () { //追加样式
						var classNames = [];
						if (item3.hide) classNames.push(HIDE); //插入隐藏列样式
						if (!item3.field) classNames.push('e-table-col-special'); //插入特殊列样式
						var _fieldValue = tplData[item3.field];

						if (_fieldValue && _fieldValue[options.checkboxRender.background]) {
							classNames.push('bg-info');
						}

						return classNames.join(' ');
					}() + '">'
						, '<div class="e-table-cell e-table-cell-' + function () { //返回对应的CSS类标识
							return item3.type === 'normal' ? key
								: (key + ' e-table-cell-' + item3.type);
						}() + '">' + function () {
							var _fieldValue = tplData[item3.field];

							//渲染不同风格的列
							switch (item3.type) {
								case 'checkbox':

									if (checkName == item3.field) {
										return '<input type="checkbox" data-check="row" name="' + item3.field + '" lay-skin="primary"  data-skin="primary" ' + function () {
											if (_fieldValue) {
												return 'checked';
											} else {
												return '';
											}
										}() + '>';
									} else if (_fieldValue == null) {
										return '';
									}
									return '<input ' + function () {
										if (!_fieldValue[options.checkboxRender.rowCheckField] && !item3.rowCheckbox) {
											return 'data-check="column"'
										} else {
											return 'data-check="item"'
										}
									}() + ' type="checkbox" name="' + item3.field + '" lay-skin="primary" data-skin="primary" ' + function () {
										if (_fieldValue && _fieldValue[options.checkboxRender.checked]) {
											return 'checked';
										} else if (_fieldValue && !_fieldValue[options.checkboxRender.checked]) {
											return '';
										} else if (_fieldValue) {
											return 'checked';
										} else {
											return '';
										}
									}() + '>';
									break;
								case 'radio':
									if (tplData[checkName]) {
										// thisCheckedRowIndex = i1;
									}
									return '<input type="radio" name="eTableRadio_' + options.index + '" '
										+ (tplData[checkName] ? 'checked' : '') + ' data-type="eTableRadio">';
									break;
								case 'numbers':
									return numbers;
									break;
							}

							//解析工具列模板
							if (item3.toolbar) {
								return templ($(item3.toolbar).html() || '').render(tplData);
							}
							return item3.templet ? function () {
								return typeof item3.templet === 'function'
									? item3.templet(tplData)
									: templ($(item3.templet).html() || String(content)).render(tplData)
							}() : content;
						}()
						, '</div></td>'].join('');

					tds.push(td);
					if (item3.fixed && item3.fixed !== 'right') tds_fixed.push(td);
					if (item3.fixed === 'right') tds_fixed_r.push(td);
				});

				trs.push('<tr data-index="' + i + '">' + tds.join('') + '</tr>');
				trs_fixed.push('<tr data-index="' + i + '">' + tds_fixed.join('') + '</tr>');
				trs_fixed_r.push('<tr data-index="' + i + '">' + tds_fixed_r.join('') + '</tr>');

			}

			that.eTableMain.find('tbody').html('');
			that.eTableFixedLeft.find('tbody').html('');
			that.eTableFixedRight.find('tbody').html('');

			that.eTableMain.find('tbody').append(trs.join(''));
			that.eTableFixedLeft.find('tbody').append(trs_fixed.join(''));
			that.eTableFixedRight.find('tbody').append(trs_fixed_r.join(''));

			if (!that.auditState) {
				that.elem.find('.e-table-body .e-table-cell').addClass('text-warning');
			}
			if (!that.editState) {
				that.elem.find('.e-table-body input[type="checkbox"]').attr('disabled', true);
			} else {
				that.elem.find('.e-table-body input[type="checkbox"]').attr('disabled', false);
			}

		},

		//数据渲染
		renderVisibleData: function (pos) {

			var that = this
				, options = that.config
				, datas = that.datas

			//渲染视图
			var thisCheckedRowIndex;
			if (!sort && that.sortKey) {
				return that.sort(that.sortKey.field, that.sortKey.sort, true);
			}

			var tdatas = datas.slice(minIndex, maxIndex);

			var trs = []
				, pageNo = 1
				, trs_fixed = []
				, trs_fixed_r = [];

			webplus.each(tdatas, function (i1, item1) {
				var tds = [], tds_fixed = [], tds_fixed_r = []
					, numbers = i1 + options.pageSize * (pageNo - 1) + 1; //序号

				if (item1.length === 0) return;
				if (!sort) {
					item1[table.config.indexName] = i1;
				}

				that.eachCols(function (i3, item3) {
					var field = item3.field || i3
						, key = options.index + '-' + item3.key
						, content = item1[field];

					if (content === undefined || content === null) content = '';
					if (item3.colGroup) return;

					var tplData = $.extend(true, {
						E_INDEX: numbers
					}, item1)
						, checkName = table.config.checkName;

					//td内容
					var td = ['<td data-field="' + field + '" data-key="' + key + '" ' + function () { //追加各种属性
						var attr = [];
						if (item3.edit) attr.push('data-edit="' + item3.edit + '"'); //是否允许单元格编辑
						if (item3.align) attr.push('align="' + item3.align + '"'); //对齐方式
						if (item3.templet) attr.push('data-content="' + content + '"'); //自定义模板
						if (item3.toolbar) attr.push('data-off="true"'); //行工具列关闭单元格事件
						if (item3.event) attr.push('data-event="' + item3.event + '"'); //自定义事件
						if (item3.style) attr.push('style="' + item3.style + '"'); //自定义样式
						if (item3.minWidth) attr.push('data-minwidth="' + item3.minWidth + '"'); //单元格最小宽度
						return attr.join(' ');
					}() + ' class="' + function () { //追加样式
						var classNames = [];
						if (item3.hide) classNames.push(HIDE); //插入隐藏列样式
						if (!item3.field) classNames.push('e-table-col-special'); //插入特殊列样式
						var _fieldValue = tplData[item3.field];

						if (_fieldValue && _fieldValue[options.checkboxRender.background]) {
							classNames.push('bg-info');
						}

						return classNames.join(' ');
					}() + '">'
						, '<div class="e-table-cell e-table-cell-' + function () { //返回对应的CSS类标识
							return item3.type === 'normal' ? key
								: (key + ' e-table-cell-' + item3.type);
						}() + '">' + function () {
							var _fieldValue = tplData[item3.field];

							//渲染不同风格的列
							switch (item3.type) {
								case 'checkbox':

									if (checkName == item3.field) {
										return '<input type="checkbox" data-check="row" name="' + item3.field + '" lay-skin="primary"  data-skin="primary" ' + function () {
											if (_fieldValue) {
												return 'checked';
											} else {
												return '';
											}
										}() + '>';
									} else if (_fieldValue == null) {
										return '';
									}
									// return '<input type="checkbox" name="' + (item3.field || 'eTableCheckbox') + '" data-skin="primary" ' + function () {
									// 	//如果是全选
									// 	if (item3[checkName]) {
									// 		item1[checkName] = item3[checkName];
									// 		return item3[checkName] ? 'checked' : '';
									// 	}
									// 	return tplData[checkName] ? 'checked' : '';
									// }() + '>';
									return '<input ' + function () {
										if (!_fieldValue[options.checkboxRender.rowCheckField] && !item3.rowCheckbox) {
											return 'data-check="column"'
										} else {
											return 'data-check="item"'
										}
									}() + ' type="checkbox" name="' + item3.field + '" lay-skin="primary" data-skin="primary" ' + function () {
										if (_fieldValue && _fieldValue[options.checkboxRender.checked]) {
											return 'checked';
										} else if (_fieldValue && !_fieldValue[options.checkboxRender.checked]) {
											return '';
										} else if (_fieldValue) {
											return 'checked';
										} else {
											return '';
										}
									}() + '>';
									break;
								case 'radio':
									if (tplData[checkName]) {
										thisCheckedRowIndex = i1;
									}
									return '<input type="radio" name="eTableRadio_' + options.index + '" '
										+ (tplData[checkName] ? 'checked' : '') + ' data-type="eTableRadio">';
									break;
								case 'numbers':
									return numbers;
									break;
							}
							;

							//解析工具列模板
							if (item3.toolbar) {
								return templ($(item3.toolbar).html() || '').render(tplData);
							}
							return item3.templet ? function () {
								return typeof item3.templet === 'function'
									? item3.templet(tplData)
									: templ($(item3.templet).html() || String(content)).render(tplData)
							}() : content;
						}()
						, '</div></td>'].join('');

					tds.push(td);
					if (item3.fixed && item3.fixed !== 'right') tds_fixed.push(td);
					if (item3.fixed === 'right') tds_fixed_r.push(td);
				});

				trs.push('<tr data-index="' + i1 + '">' + tds.join('') + '</tr>');
				trs_fixed.push('<tr data-index="' + i1 + '">' + tds_fixed.join('') + '</tr>');
				trs_fixed_r.push('<tr data-index="' + i1 + '">' + tds_fixed_r.join('') + '</tr>');
			});

			that.eTableMain.find('tbody').append(trs.join(''));
			that.eTableFixedLeft.find('tbody').append(trs_fixed.join(''));
			that.eTableFixedRight.find('tbody').append(trs_fixed_r.join(''));
			//执行下一页渲染，第二参数为：满足“加载更多”的条件，即后面仍有分页

			that.eTableBody.scrollTop(0);
			that.eTableMain.find('.' + NONE).remove();

			that.renderForm();
			typeof thisCheckedRowIndex === 'number' && that.setThisRowChecked(thisCheckedRowIndex);
			that.syncCheckAll();

			//滚动条补丁
			that.haveInit ? that.scrollPatch() : setTimeout(function () {
				that.scrollPatch();
			}, 50);
			that.haveInit = true;

			layer.close(that.tipsIndex);

			//同步表头父列的相关值
			options.HAS_SET_COLS_PATCH || that.setColsPatch();
			options.HAS_SET_COLS_PATCH = true;
		},

		//数据排序
		sort: function (th, type, pull, formEvent) {
			var that = this
				, field
				, res = {}
				, options = that.config
				, filter = options.elem.attr('data-filter')
				, data = table.cache[that.key], thisData;

			//字段匹配
			if (typeof th === 'string') {
				that.eTableHeader.find('th').each(function (i, item) {
					var othis = $(this)
						, _field = othis.data('field');
					if (_field === th) {
						th = othis;
						field = _field;
						return false;
					}
				});
			}

			try {
				var field = field || th.data('field')
					, key = th.data('key');

				//如果欲执行的排序已在状态中，则不执行渲染
				if (that.sortKey && !pull) {
					if (field === that.sortKey.field && type === that.sortKey.sort) {
						return;
					}
				}

				var elemSort = that.eTableHeader.find('th .e-table-cell-' + key).find(ELEM_SORT);
				that.eTableHeader.find('th').find(ELEM_SORT).removeAttr('lay-sort'); //清除其它标题排序状态
				elemSort.attr('lay-sort', type || null);
				that.eTableFixed.find('th')
			} catch (e) {
				return hint.error('Table modules: Did not match to field');
			}

			//记录排序索引和类型
			that.sortKey = {
				field: field
				, sort: type
			};

			//默认为前端自动排序。如果否，则需自主排序（通常为服务端处理好排序）
			if (options.autoSort) {
				if (type === 'asc') { //升序
					thisData = layui.sort(data, field);
				} else if (type === 'desc') { //降序
					thisData = layui.sort(data, field, true);
				} else { //清除排序
					thisData = layui.sort(data, table.config.indexName);
					delete that.sortKey;
				}
			}

			res[options.response.datas] = thisData || data;
			that.renderData(res, that.pageNo, that.totalRecord, true);

			if (formEvent) {
				layui.event.call(th, MOD_NAME, 'sort(' + filter + ')', {
					field: field
					, type: type
				});
			}
		},

		//请求loading
		loading: function (hide) {
			var that = this
				, options = that.config;
			if (options.loading) {
				if (hide) {
					that.layInit && that.layInit.remove();
					delete that.layInit;
					that.eTableBox.find(ELEM_INIT).remove()
				} else {
					that.layInit = $(['<div class="e-table-init">'
						, '<i class="fa fa-loading"></i>'
						, '</div>'].join(''));
					that.eTableBox.append(that.layInit);
				}
			}
		},

		setCheckboxStatus: function (elements, checked) {
			elements.each(function (i, item) {
				item.checked = checked;
			});
		},

		setCheckNameData: function (minIndex, maxIndex, fieldsss, checkName, checked) {
			var that = this
				, options = that.config
				, thisData = table.cache[that.key];
			if (maxIndex == -1) {
				maxIndex = thisData.length - 1;
			}
			var result = false;

			for (var index = minIndex; index <= maxIndex; index++) {
				result = false;
				for (var fIndex = 0; fIndex <= fieldsss.length; fIndex++) {
					var cellData = thisData[index][fieldsss[fIndex]];

					if (cellData && cellData.constructor === Array) {
						for (var j = 0; j < cellData.length; j++) {
							var cCellData = cellData[j];
							if (cCellData && cCellData['checked']) {
								result = true;
								break;
							} else if (cCellData && cCellData['checked'] == undefined) {
								// thisData[index][checkName] = true;
								result = true;
								break;
							}
						}
					} else {
						if (cellData && cellData['checked']) {
							// thisData[index][checkName] = true;
							result = true;
							break;
						} else if (cellData && cellData['checked'] == undefined) {
							// thisData[index][checkName] = true;
							result = true;
							break;
						}
					}
				}
				var v = thisData[index][checkName];
				if (!result) {
					if (v.constructor == Object) {
						v['checked'] = !checked;
					} else {
						thisData[index][checkName] = !checked;
					}
				} else {
					if (v.constructor == Object) {
						v['checked'] = checked;
					} else {
						thisData[index][checkName] = checked;
					}
				}
			}

			return result;
		},
		setFieldNameData: function (minIndex, maxIndex, checkName, fieldName, checked) {
			var that = this
				, options = that.config
				, thisData = table.cache[that.key];
			if (maxIndex == -1) {
				maxIndex = thisData.length - 1;
			}
			var result = false;

			for (var index = minIndex; index <= maxIndex; index++) {
				result = false;
				var cellData = thisData[index][checkName];

				if (cellData && cellData.constructor === Array) {
					for (var j = 0; j < cellData.length; j++) {
						var cCellData = cellData[j];
						if (cCellData && cCellData['checked']) {
							result = true;
						} else if (cCellData && cCellData['checked'] == undefined) {
							result = true;
						}
					}
				} else {
					if (cellData && cellData['checked']) {
						result = true;
					} else if (cellData && cellData['checked'] == undefined) {
						result = true;
					}
				}
				var v = thisData[index][fieldName];
				if (!result) {
					if (v.constructor == Object) {
						v['checked'] = false;
					} else {
						thisData[index][fieldName] = false;
					}
				} else {
					if (v.constructor == Object) {
						v['checked'] = checked;
					} else {
						thisData[index][fieldName] = checked;
					}
				}
			}

			return result;
		},

		/**
		 * 设置指定行中字段的值
		 * @param rowIndex 行索引，-1表示所有行
		 * @param checked 选中状态
		 * @param fieldName 字段名称
		 * @param disableField 禁用字段名称
		 */
		setRowCheckData: function (minIndex, maxIndex, checked, fieldName, disableField) {
			var that = this
				, options = that.config
				, thisData = table.cache[that.key];
			var result = false;
			if (maxIndex == -1) {
				maxIndex = thisData.length - 1;
			}
			for (var index = minIndex; index <= maxIndex; index++) {
				var cellData = thisData[index][fieldName]

				if (cellData && cellData.constructor === Array) {
					for (var j = 0; j < cellData.length; j++) {
						var cCellData = cellData[j];
						if (cCellData && cCellData['checked'] != undefined) {
							// 禁用字段为空，可以设置值，不为空根据字段自动设置值
							if (disableField == null || !cCellData[disableField]) {
								cCellData['checked'] = checked;
								result = true;
							}
						} else if (cCellData) {
							cCellData = checked;
							result = true;
						}
					}
				} else {
					if (cellData && cellData['checked'] != undefined) {
						// 禁用字段为空，可以设置值，不为空根据字段自动设置值
						if (disableField == null || !cellData[disableField]) {
							cellData['checked'] = checked;
							result = true;
						}
					} else if (cellData != undefined) {
						thisData[index][fieldName] = checked;
						result = true;
					}
				}
			}
			return result;
		},
		setOtherCheckData: function (rowIndex, checked, fieldName, childFieldName, disableField) {
			var that = this
				, thisData = table.cache[that.key];

			var maxIndex = rowIndex;
			var minIndex = rowIndex;
			if (rowIndex == -1) {
				minIndex = 0;
				maxIndex = thisData.length - 1;
			}

			for (var index = minIndex; index <= maxIndex; index++) {
				var otherField = thisData[index][fieldName];
				if (otherField) {

					for (var j = 0; j < otherField.length; j++) {
						var cCellData = otherField[j];

						if (cCellData.c_OPER_CODE == childFieldName) {
							if (cCellData && cCellData['checked'] != undefined) {
								// 禁用字段为空，可以设置值，不为空根据字段自动设置值
								if (disableField == null || !cCellData[disableField]) {
									cCellData['checked'] = checked;
								}
							} else if (cCellData) {
								cCellData = checked;
							}
						}
						// }
						// if (cCellData && cCellData['checked'] != undefined) {
						// 	// 禁用字段为空，可以设置值，不为空根据字段自动设置值
						// 	if (disableField == null || !cCellData[disableField]) {
						// 		cCellData['checked'] = checked;
						// 		result = true;
						// 	}
						// } else if (cCellData) {
						// 	cCellData = checked;
						// 	result = true;
						// }
					}


					// if(otherField.c_OPER_CODE == childFieldName){
					// 	if (otherField && otherField['checked'] != undefined) {
					// 		// 禁用字段为空，可以设置值，不为空根据字段自动设置值
					// 		if (disableField == null || !otherField[disableField]) {
					// 			otherField['checked'] = checked;
					// 		}
					// 	} else if (otherField != undefined) {
					// 		otherField = checked;
					// 	}
					// }
					// var childField = otherField[childFieldName];
					// if (childField && childField['checked'] != undefined) {
					// 	// 禁用字段为空，可以设置值，不为空根据字段自动设置值
					// 	if (disableField == null || !childField[disableField]) {
					// 		childField['checked'] = checked;
					// 	}
					// } else if (childField != undefined) {
					// 	childField = checked;
					// }
					// for (var j = 0; j < otherField.length; j++) {
					// 	var childField = otherField[j];
					//
					// 	if (childField && childField['checked'] != undefined) {
					// 		// 禁用字段为空，可以设置值，不为空根据字段自动设置值
					// 		if (disableField == null || !childField[disableField]) {
					// 			childField['checked'] = checked;
					// 		}
					// 	} else if (childField) {
					// 		childField = checked;
					// 	}
					// }
				}
			}
		},

		//同步全选按钮状态
		syncCheckAll: function (inputFilter, checkboxName) {
			var that = this
				, options = that.config
				, checkAllElem = that.eTableHeader.find(inputFilter)
				, syncColsCheck = function (checked) {
				that.eachCols(function (i, item) {
					if (item.type === 'checkbox') {
						item[checkboxName] = checked;
					}
				});
				return checked;
			};

			if (!checkAllElem[0]) return;

			if (table.checkStatus(that.key).isAll) {
				if (!checkAllElem[0].checked) {
					checkAllElem.prop('checked', true);
					that.renderForm('checkbox');
				}
				syncColsCheck(true);
			} else {
				if (checkAllElem[0].checked) {
					checkAllElem.prop('checked', false);
					that.renderForm('checkbox');
				}
				syncColsCheck(false);
			}
		},

		//获取cssRule
		getCssRule: function (key, callback) {
			var that = this
				, style = that.elem.find('style')[0]
				, sheet = style.sheet || style.styleSheet || {}
				, rules = sheet.cssRules || sheet.rules;
			webplus.each(rules, function (i, item) {
				if (item.selectorText === ('.e-table-cell-' + key)) {
					return callback(item), true;
				}
			});
		},

		//让表格铺满
		fullSize: function () {
			var that = this
				, options = that.config
				, height = options.height, bodyHeight;

			var container = webplus.closest(options.elem[0], '[data-auto-height="container"]');
			if (container) {
				webplus.handleAutoHeight($(container));
			}
			height = options.elem[0].offsetHeight - that.fullHeightGap - 1;

			if (!height) return;

			//减去列头区域的高度
			bodyHeight = parseFloat(height) - (that.eTableHeader.outerHeight() || 38); //此处的数字常量是为了防止容器处在隐藏区域无法获得高度的问题，暂时只对默认尺寸的表格做支持。

			//减去工具栏的高度
			if (options.toolbar) {
				bodyHeight = bodyHeight - (that.eTableToolbar.outerHeight() || 50);
			}

			//减去统计朗的高度
			if (options.totalRow) {
				bodyHeight = bodyHeight - (that.eTableTotalBar.outerHeight() || 40);
			}

			//减去分页栏的高度
			if (options.page) {
				if (!options.bigData) {
					bodyHeight = bodyHeight - (that.pagebar.outerHeight() || 41) - 2;
				}
			}
			that.eTableMain.css('height', bodyHeight);

			that.bodyHeight = bodyHeight;
			if (options.bigData) {
				that.rowCount = Math.floor((bodyHeight - 10) / 31);
			}
		},

		//获取滚动条宽度
		getScrollWidth: function (elem) {
			var width = 0;
			if (elem) {
				width = elem.offsetWidth - elem.clientWidth;
			} else {
				elem = document.createElement('div');
				elem.style.width = '100px';
				elem.style.height = '100px';
				elem.style.overflowY = 'scroll';

				document.body.appendChild(elem);
				width = elem.offsetWidth - elem.clientWidth;
				document.body.removeChild(elem);
			}
			return width;
		},

		//滚动条补丁
		scrollPatch: function () {
			var that = this
				, eTableMainTable = that.eTableMain.children('table')
				, scollWidth = that.eTableMain.width() - that.eTableMain.prop('clientWidth') //纵向滚动条宽度
				, scollHeight = that.eTableMain.height() - that.eTableMain.prop('clientHeight') //横向滚动条高度
				, getScrollWidth = that.getScrollWidth(that.eTableMain[0]) //获取主容器滚动条宽度，如果有的话
				, outWidth = eTableMainTable.outerWidth() - that.eTableMain.width() //表格内容器的超出宽度

				//添加补丁
				, addPatch = function (elem) {
					if (scollWidth && scollHeight) {
						elem = elem.eq(0);
						if (!elem.find('.e-table-patch')[0]) {
							var patchElem = $('<th class="e-table-patch"><div class="e-table-cell"></div></th>'); //补丁元素
							patchElem.find('div').css({
								width: scollWidth
							});
							elem.find('tr').append(patchElem);
						}
					} else {
						elem.find('.e-table-patch').remove();
					}
				}

			addPatch(that.eTableHeader);
			addPatch(that.eTableTotalBar);

			//固定列区域高度
			var mainHeight = that.eTableMain.height()
				, fixHeight = mainHeight - scollHeight;
			that.eTableFixed.find(ELEM_BODY).css('height', eTableMainTable.height() >= fixHeight ? fixHeight : 'auto');

			//表格宽度小于容器宽度时，隐藏固定列
			that.eTableFixedRight[outWidth > 0 ? 'removeClass' : 'addClass'](HIDE);

			//操作栏
			that.eTableFixedRight.css('right', scollWidth - 1);
		},

		//事件处理
		events: function () {
			var that = this
				, options = that.config
				, _BODY = $('body')
				, dict = {}
				, th = that.eTableHeader.find('th')
				, resizing
				, ELEM_CELL = '.e-table-cell'
				, filter = options.elem.attr('data-filter');
			var elem = that.config.elem[0];

			//工具栏操作事件
			that.eTableToolbar.on('click', '*[data-event]', function (e) {
				var othis = $(this)
					, events = othis.attr('data-event')
					, openPanel = function (sets) {
					var list = $(sets.list)
						, panel = $('<ul class="e-table-tool-panel"></ul>');

					panel.html(list);

					//限制最大高度
					if (options.height) {
						panel.css('max-height', options.height - (that.eTableToolbar.outerHeight() || 50));
					}

					//插入元素
					othis.find('.e-table-tool-panel')[0] || othis.append(panel);
					that.renderForm();

					panel.on('click', function (e) {
						layui.stope(e);
					});

					sets.done && sets.done(panel, list)
				};

				layui.stope(e);
				_DOC.trigger('table.tool.panel.remove');
				layer.close(that.tipsIndex);

				switch (events) {
					case 'E_TABLE_COLS': //筛选列
						openPanel({
							list: function () {
								var lis = [];
								that.eachCols(function (i, item) {
									if (item.field && item.type == 'normal') {
										lis.push('<li><input type="checkbox" name="' + item.field + '" data-key="' + item.key + '" data-parentkey="' + (item.parentKey || '') + '" data-skin="primary" ' + (item.hide ? '' : 'checked') + ' title="' + (item.title || item.field) + '" data-filter="E_TABLE_TOOL_COLS"></li>');
									}
								});
								return lis.join('');
							}()
							, done: function () {
								form.on('checkbox(E_TABLE_TOOL_COLS)', function (obj) {
									var othis = $(obj.elem)
										, checked = this.checked
										, key = othis.data('key')
										, parentKey = othis.data('parentkey');

									webplus.each(options.cols, function (i1, item1) {
										webplus.each(item1, function (i2, item2) {
											if (i1 + '-' + i2 === key) {
												var hide = item2.hide;

												//同步勾选列的 hide 值和隐藏样式
												item2.hide = !checked;
												that.elem.find('*[data-key="' + options.index + '-' + key + '"]')
													[checked ? 'removeClass' : 'addClass'](HIDE);

												//根据列的显示隐藏，同步多级表头的父级相关属性值
												if (hide != item2.hide) {
													that.setParentCol(!checked, parentKey);
												}

												//重新适配尺寸
												that.resize();
											}
										});
									});
								});
							}
						});
						break;
					case 'E_TABLE_EXPORT': //导出
						if (device.ie) {
							layer.tips('导出功能不支持 IE，请用 Chrome 等高级浏览器导出', this, {
								tips: 3
							})
						} else {
							openPanel({
								list: function () {
									return [
										'<li data-type="csv">导出到 Csv 文件</li>'
										, '<li data-type="xls">导出到 Excel 文件</li>'
									].join('')
								}()
								, done: function (panel, list) {
									list.on('click', function () {
										var type = $(this).data('type')
										table.exportFile(options.id, null, type);
									});
								}
							});
						}
						break;
					case 'E_TABLE_PRINT': //打印
						var printWin = window.open('打印窗口', '_blank')
							, style = ['<style>'
							, 'body{font-size: 12px; color: #666;}'
							, 'table{width: 100%; border-collapse: collapse; border-spacing: 0;}'
							, 'th,td{line-height: 20px; padding: 9px 15px; border: 1px solid #ccc; text-align: left; font-size: 12px; color: #666;}'
							, 'a{color: #666; text-decoration:none;}'
							, '*.e-hide{display: none}'
							, '</style>'].join('')
							, html = $(that.eTableHeader.html());

						html.append(that.eTableMain.find('table').html());

						html.find('th.e-table-patch').remove();
						html.find('.e-table-col-special').remove();

						printWin.document.write(style + html.prop('outerHTML'));
						printWin.document.close();
						printWin.print();
						printWin.close();
						break;
				}

				layui.event.call(this, MOD_NAME, 'toolbar(' + filter + ')', $.extend({
					event: events
					, config: options
				}, {}));
			});

			//拖拽调整宽度
			th.on('mousemove', function (e) {
				var othis = $(this)
					, oLeft = othis.offset().left
					, pLeft = e.clientX - oLeft;
				if (othis.data('unresize') || dict.resizeStart) {
					return;
				}
				dict.allowResize = othis.width() - pLeft <= 10; //是否处于拖拽允许区域
				_BODY.css('cursor', (dict.allowResize ? 'col-resize' : ''));
			}).on('mouseleave', function () {
				var othis = $(this);
				if (dict.resizeStart) return;
				_BODY.css('cursor', '');
			}).on('mousedown', function (e) {
				var othis = $(this);
				if (dict.allowResize) {
					var key = othis.data('key');
					e.preventDefault();
					dict.resizeStart = true; //开始拖拽
					dict.offset = [e.clientX, e.clientY]; //记录初始坐标

					that.getCssRule(key, function (item) {
						var width = item.style.width || othis.outerWidth();
						dict.rule = item;
						dict.ruleWidth = parseFloat(width);
						dict.minWidth = othis.data('minwidth') || options.cellMinWidth;
					});
				}
			});

			//拖拽中
			_DOC.on('mousemove', function (e) {
				if (dict.resizeStart) {
					e.preventDefault();
					if (dict.rule) {
						var setWidth = dict.ruleWidth + e.clientX - dict.offset[0];
						if (setWidth < dict.minWidth) setWidth = dict.minWidth;
						dict.rule.style.width = setWidth + 'px';
						layer.close(that.tipsIndex);
					}
					resizing = 1
				}
			}).on('mouseup', function (e) {
				if (dict.resizeStart) {
					dict = {};
					_BODY.css('cursor', '');
					that.scrollPatch();
				}
				if (resizing === 2) {
					resizing = null;
				}
			});

			//排序
			th.on('click', function (e) {
				var othis = $(this)
					, elemSort = othis.find(ELEM_SORT)
					, nowType = elemSort.attr('lay-sort')
					, type;

				if (!elemSort[0] || resizing === 1) return resizing = 2;

				if (nowType === 'asc') {
					type = 'desc';
				} else if (nowType === 'desc') {
					type = null;
				} else {
					type = 'asc';
				}
				that.sort(othis, type, null, true);
			}).find(ELEM_SORT + ' .e-edge ').on('click', function (e) {
				var othis = $(this)
					, index = othis.index()
					, field = othis.parents('th').eq(0).data('field')
				layui.stope(e);
				if (index === 0) {
					that.sort(field, 'asc', null, true);
				} else {
					that.sort(field, 'desc', null, true);
				}
			});

			//数据行中的事件监听返回的公共对象成员
			var commonMember = function (sets) {
				var othis = $(this)
					, index = othis.parents('tr').eq(0).data('index')
					, tr = that.eTableBody.find('tr[data-index="' + index + '"]')
					, data = table.cache[that.key][index];

				return $.extend({
					tr: tr //行元素
					, data: table.clearCacheKey(data) //当前行数据
					, del: function () { //删除行数据
						table.cache[that.key][index] = [];
						tr.remove();
						that.scrollPatch();
					}
					, update: function (fields) { //修改行数据
						fields = fields || {};
						webplus.each(fields, function (key, value) {
							if (key in data) {
								var templet, td = tr.children('td[data-field="' + key + '"]');
								data[key] = value;
								that.eachCols(function (i, item2) {
									if (item2.field == key && item2.templet) {
										templet = item2.templet;
									}
								});
								td.children(ELEM_CELL).html(function () {
									return templet ? function () {
										return typeof templet === 'function'
											? templet(data)
											: templ($(templet).html() || value).render(data)
									}() : value;
								}());
								td.data('content', value);
							}
						});
					}
				}, sets);
			};

			//表头复选框选择事件
			that.elem.on('click', '.e-table-header input[type="checkbox"]', function () { //替代元素的 click 事件
				var checkbox = $(this);
				var checkName = that.config.checkName;
				var checked = checkbox[0].checked
					, fieldName = checkbox.attr('name')
					, isAll = fieldName == that.config.checkName;//checkbox.attr('data-check') === 'selectAll';
				var rowCheckField = that.config.checkboxRender.rowCheckField;
				var isSelectOther = checkbox.attr('data-check') == "other";

				var fields = that.elem.find('.e-table-main').prev().find('input[type="checkbox"][data-check="selectColumn"]');
				var fieldList = [];
				for (var i = 0; i < fields.length; i++) {
					fieldList.push($(fields[i]).attr('name'));
				}

				//全选
				if (isAll) {
					var childs = that.elem.find('.e-table-body input[data-check="row"],[data-check="column"]:not([disabled])');
					that.setCheckboxStatus(childs, checked);

					for (var i = 0; i < fieldList.length; i++) {
						var field = fieldList[i];
						that.setRowCheckData(0, -1, checked, field, rowCheckField);
					}
					that.setCheckNameData(0, -1, fieldList, checkName, true);

					if (!checked) {
						var rows = that.elem.find('.e-table-body tr');
						var minIndex = parseInt($(rows[0]).attr("data-index"));
						var maxIndex = parseInt($(rows[rows.length - 1]).attr("data-index"));
						for (var ic = minIndex; ic <= maxIndex; ic++) {
							var result = that.setCheckNameData(ic, ic, fieldList, checkName, true);

							if (result) {
								var row = rows.closest('[data-index="' + ic + '"]').find('input[name=' + checkName + ']');
								that.setCheckboxStatus(row, true);
							}
						}
					}
				} else if (isSelectOther) {
					var thisData = table.cache[that.key];

					var rows = that.elem.find('.e-table-body tr');
					var minIndex = parseInt($(rows[0]).attr("data-index"));
					var maxIndex = parseInt($(rows[rows.length - 1]).attr("data-index"));
					for (var ic = minIndex; ic <= maxIndex; ic++) {
						var result = that.setCheckNameData(ic, ic, fieldList, checkName, true);

						if (result && checked) {
							var checkInput = rows.closest('[data-index="' + ic + '"]').find('input[name=' + fieldName + ']');
							that.setCheckboxStatus(checkInput, checked);
						} else {
							var checkInput = rows.closest('[data-index="' + ic + '"]').find('input[name=' + fieldName + ']');
							that.setCheckboxStatus(checkInput, false);
						}
					}
					that.setFieldNameData(0, -1, checkName, fieldName, checked);

				} else {
					childs = that.elem.find('.e-table-body [data-field="' + fieldName + '"] input:not([disabled])');
					childs.each(function (i, item) {
						item.checked = checked;
					});
					that.setRowCheckData(0, -1, checked, fieldName, null);

					var rows = that.elem.find('.e-table-body tr');
					var minIndex = parseInt($(rows[0]).attr("data-index"));
					var maxIndex = parseInt($(rows[rows.length - 1]).attr("data-index"));
					for (var ic = minIndex; ic <= maxIndex; ic++) {
						var result = that.setCheckNameData(ic, ic, fieldList, checkName, true);

						if ((result && checked) || (!result && !checked)) {
							var checkInput = rows.closest('[data-index="' + ic + '"]').find('input[name=' + checkName + ']');
							checkInput.each(function (i, item) {
								item.indeterminate = false;
							});
							that.setCheckboxStatus(checkInput, checked);
						} else if (result && !checked) {
							var checkInput = rows.closest('[data-index="' + ic + '"]').find('input[name=' + checkName + ']');
						}
					}
					that.setCheckNameData(0, -1, fieldList, checkName, true);
				}
			});
			//表格第一列的复选框选择，也就是行勾选。行勾选，同时自动勾选这一行的其他checkbox
			that.elem.on('click', '.e-table-body input[type="checkbox"]', function () { //替代元素的 click 事件
				var checkbox = $(this);
				var dataField = checkbox.closest('[data-field]').attr("data-field");
				var isSelectOther = checkbox.attr('data-check') == "other";
				var checkboxName = checkbox.attr('name');
				var isOtherField = checkboxName != dataField;
				var checkName = that.config.checkName;
				var index = checkbox.closest('[data-index]').attr("data-index")
					, checked = checkbox[0].checked
					, isSelectRow = checkboxName == checkName;//checkbox.attr('data-check') === 'selectAll';
				var rowCheckField = that.config.checkboxRender.rowCheckField;

				var thisData = table.cache[that.key];
				var rowData = thisData[index];
				index = parseInt(index);
				var level = rowData["level"];  //树深度

				var fields = that.elem.find('.e-table-main').prev().find('input[type="checkbox"][data-check="selectColumn"]');
				var fieldList = [];
				for (var i = 0; i < fields.length; i++) {
					fieldList.push($(fields[i]).attr('name'));
				}

				var rows = that.elem.find('.e-table-body tr');
				var maxIndex = index;
				if (rowData["leaf"] == false) { //如果是父节点，则子节点的行也要勾选
					for (var rowIndex = parseInt(index) + 1; rowIndex < thisData.length; rowIndex++) {
						if (parseInt(thisData[rowIndex]["level"]) > parseInt(level)) { //子节点的level一定大于父节点.
							maxIndex = rowIndex;
						} else {
							break;
						}
					}
				}
				if (isSelectRow) {
					for (var jj = index; jj <= maxIndex; jj++) {
						var row = rows.closest('[data-index="' + jj + '"]');

						var childs = row.find('input[data-check="row"],[data-check="column"],[data-check="column"]:not([disabled])');
						that.setCheckboxStatus(childs, checked);

						for (var fieldIndex = 0; fieldIndex < fieldList.length; fieldIndex++) {
							var field = fieldList[fieldIndex];
							that.setRowCheckData(jj, jj, checked, field, rowCheckField);
						}

						var result = that.setCheckNameData(jj, jj, fieldList, checkName, true);
						if (result) {
							var c = row.find('input[name=' + checkName + ']');
							if (checked) {
								c.each(function (i, item) {
									item.indeterminate = false;
								});
								that.setCheckboxStatus(c, true);
							} else {
								c.each(function (i, item) {
									item.indeterminate = true;
								});
							}
						} else {
							var c = row.find('input[name=' + checkName + ']');
							that.setCheckboxStatus(c, false);
						}
					}
				} else if (isOtherField) {
					for (var jj = index; jj <= maxIndex; jj++) {
						var row = rows.closest('[data-index="' + jj + '"]');

						var childs = row.find('[data-field="' + dataField + '"] input[name=' + checkboxName + ']:not([disabled])');
						that.setCheckboxStatus(childs, checked);

						that.setOtherCheckData(jj, checked, dataField, checkboxName, null);

						var result = that.setCheckNameData(jj, jj, fieldList, checkName, true);
						if (result) {
							var c = row.find('input[name=' + checkName + ']');
							that.setCheckboxStatus(c, true);
							c.each(function (i, item) {
								item.indeterminate = false;
							});
						} else {
							var c = row.find('input[name=' + checkName + ']');
							that.setCheckboxStatus(c, false);
						}
					}
				} else if (isSelectOther) {
					var result = that.setCheckNameData(index, index, fieldList, checkName, true);
					if (result && checked) {
						that.setCheckboxStatus(checkbox, true);
					} else {
						that.setCheckboxStatus(checkbox, false);
					}
					that.setFieldNameData(index, index, checkName, checkboxName, checked);

				} else {
					for (var jj = index; jj <= maxIndex; jj++) {
						var row = rows.closest('[data-index="' + jj + '"]');

						var childs = row.find('input[name=' + checkboxName + '][data-check="row"],[name=' + checkboxName + '][data-check="column"]:not([disabled])');
						that.setCheckboxStatus(childs, checked);
						if (jj == index) {
							that.setRowCheckData(jj, jj, checked, checkboxName, null);
						} else {
							that.setRowCheckData(jj, jj, checked, checkboxName, rowCheckField);
						}

						var result = that.setCheckNameData(jj, jj, fieldList, checkName, true);
						if (result) {
							var c = row.find('input[name=' + checkName + ']');
							that.setCheckboxStatus(c, true);
							c.each(function (i, item) {
								item.indeterminate = false;
							});
						} else {
							var c = row.find('input[name=' + checkName + ']');
							that.setCheckboxStatus(c, false);
						}

					}
				}

			});

			//单选框选择
			that.elem.on('click', 'input[data-type="eTableRadio"]', function () {
				var radio = $(this).prev()
					, checked = radio[0].checked
					, thisData = table.cache[that.key]
					, index = radio.parents('tr').eq(0).data('index');

				//重置数据单选属性
				webplus.each(thisData, function (i, item) {
					if (index === i) {
						item.E_CHECKED = true;
					} else {
						delete item.E_CHECKED;
					}
				});
				that.setThisRowChecked(index);

				layui.event.call(this, MOD_NAME, 'radio(' + filter + ')', commonMember.call(this, {
					checked: checked
				}));
			});

			//行事件
			that.eTableBody.on('mouseenter', 'tr', function () { //鼠标移入行
				var othis = $(this)
					, index = othis.index();
				that.eTableBody.find('tr:eq(' + index + ')').addClass(ELEM_HOVER)
			}).on('mouseleave', 'tr', function () { //鼠标移出行
				var othis = $(this)
					, index = othis.index();
				that.eTableBody.find('tr:eq(' + index + ')').removeClass(ELEM_HOVER)
			}).on('click', 'tr', function () { //单击行
				setRowEvent.call(this, 'row');
			}).on('dblclick', 'tr', function () { //双击行
				setRowEvent.call(this, 'rowDouble');
			});

			//创建行单击、双击事件监听
			var setRowEvent = function (eventType) {
				var othis = $(this);
				layui.event.call(this,
					MOD_NAME, eventType + '(' + filter + ')'
					, commonMember.call(othis.children('td')[0])
				);
			};

			//单元格编辑
			that.eTableBody.on('change', '.' + ELEM_EDIT, function () {
				var othis = $(this)
					, value = this.value
					, field = othis.parent().data('field')
					, index = othis.parents('tr').eq(0).data('index')
					, data = table.cache[that.key][index];

				data[field] = value; //更新缓存中的值

				layui.event.call(this, MOD_NAME, 'edit(' + filter + ')', commonMember.call(this, {
					value: value
					, field: field
				}));
			}).on('blur', '.' + ELEM_EDIT, function () {
				var templet
					, othis = $(this)
					, field = othis.parent().data('field')
					, index = othis.parents('tr').eq(0).data('index')
					, data = table.cache[that.key][index];
				that.eachCols(function (i, item) {
					if (item.field == field && item.templet) {
						templet = item.templet;
					}
				});
				othis.siblings(ELEM_CELL).html(function (value) {
					return templet ? function () {
						return typeof templet === 'function'
							? templet(data)
							: templ($(templet).html() || this.value).render(data)
					}() : value;
				}(this.value));
				othis.parent().data('content', this.value);
				othis.remove();
			});

			//单元格单击事件
			that.eTableBody.on('click', 'td', function (e) {
				var othis = $(this)
					, field = othis.data('field')
					, editType = othis.data('edit')
					, elemCell = othis.children(ELEM_CELL);

				if (othis.data('off')) return; //不触发事件

				//显示编辑表单
				if (editType) {
					var input = $('<input class="e-input ' + ELEM_EDIT + '">');
					input[0].value = othis.data('content') || elemCell.text();
					othis.find('.' + ELEM_EDIT)[0] || othis.append(input);
					input.focus();
					layui.stope(e);
					return;
				}
			}).on('mouseenter', 'td', function () {
				gridExpand.call(this)
			}).on('mouseleave', 'td', function () {
				gridExpand.call(this, 'hide');
			});

			//单元格展开图标
			var ELEM_GRID = 'e-table-grid', ELEM_GRID_DOWN = 'e-table-grid-down', ELEM_GRID_PANEL = 'e-table-grid-panel'
				, gridExpand = function (hide) {
				var othis = $(this)
					, elemCell = othis.children(ELEM_CELL);

				if (hide) {
					othis.find('.e-table-grid-down').remove();
				} else if (elemCell.prop('scrollWidth') > elemCell.outerWidth()) {
					if (elemCell.find('input').length > 0) return;
					if (elemCell.find('.' + ELEM_GRID_DOWN)[0]) return;
					othis.append('<div class="' + ELEM_GRID_DOWN + '"><i class="fa fa-angle-double-down"></i></div>');
				}
			};

			//单元格展开事件
			that.eTableBody.on('click', '.' + ELEM_GRID_DOWN, function (e) {
				var othis = $(this)
					, td = othis.parent()
					, elemCell = td.children(ELEM_CELL);

				that.tipsIndex = layer.tips([
					'<div class="e-table-tips-main" style="' + function () {
						if (options.size === 'sm') {
							return 'padding: 4px 15px; font-size: 12px;';
						}
						if (options.size === 'lg') {
							return 'padding: 14px 15px;';
						}
						return '';
					}() + '">'
					, elemCell.html()
					, '</div>'
					, '<i class="e-table-tips-c fa fa-close"></i>'
				].join(''), elemCell[0], {
					tips: [3, '']
					, time: -1
					, anim: -1
					, maxWidth: (device.ios || device.android) ? 300 : that.elem.width() / 2
					, isOutAnim: false
					, skin: 'e-table-tips'
					, success: function (layero, index) {
						layero.find('.e-table-tips-c').on('click', function () {
							layer.close(index);
						});
					}
				});

				layui.stope(e);
			});

			//行工具条操作事件
			that.eTableBody.on('click', '*[data-event]', function () {
				var othis = $(this)
					, index = othis.parents('tr').eq(0).data('index');
				layui.event.call(this, MOD_NAME, 'tool(' + filter + ')', commonMember.call(this, {
					event: othis.attr('data-event')
				}));
				that.setThisRowChecked(index);
			});

			//同步滚动条
			that.eTableMain.on('scroll', function () {
				var othis = $(this)
					, scrollLeft = othis.scrollLeft()
					, scrollTop = othis.scrollTop();

				that.eTableHeader.scrollLeft(scrollLeft);
				that.eTableTotalBar.scrollLeft(scrollLeft);
				that.eTableFixed.find(ELEM_BODY).scrollTop(scrollTop);

				layer.close(that.tipsIndex);
			});

			//全局点击
			_DOC.on('click', function () {
				_DOC.trigger('table.remove.tool.panel');
			});

			//工具面板移除事件
			_DOC.on('table.remove.tool.panel', function () {
				$('.e-table-tool-panel').remove();
			});

			//自适应
			_WIN.on('resize', function () {
				that.resize();
			});
		}
	};

	//初始化
	table.init = function (filter, settings) {
		var that = this;
		/*-
		settings = settings || {};
		var elemTable = filter ? $('table[data-filter="' + filter + '"]') : $(ELEM + '[lay-data]')
			, errorTips = 'Table element property lay-data configuration item has a syntax error: ';

		//遍历数据表格
		elemTable.each(function () {
			var othis = $(this), tableData = othis.attr('lay-data');

			try {
				tableData = new Function('return ' + tableData)();
			} catch (e) {
				hint.error(errorTips + tableData)
			}

			var cols = [], options = $.extend({
				elem: this
				, cols: []
				, data: []
				, skin: othis.attr('data-skin') //风格
				, size: othis.attr('lay-size') //尺寸
				, even: typeof othis.attr('lay-even') === 'string' //偶数行背景
			}, table.config, settings, tableData);

			filter && othis.hide();

			//获取表头数据
			othis.find('thead>tr').each(function (i) {
				options.cols[i] = [];
				$(this).children().each(function (ii) {
					var th = $(this), itemData = th.attr('lay-data');

					try {
						itemData = new Function('return ' + itemData)();
					} catch (e) {
						return hint.error(errorTips + itemData)
					}

					var row = $.extend({
						title: th.text()
						, colspan: th.attr('colspan') || 0 //列单元格
						, rowspan: th.attr('rowspan') || 0 //行单元格
					}, itemData);

					if (row.colspan < 2) cols.push(row);
					options.cols[i].push(row);
				});
			});

			//获取表体数据
			othis.find('tbody>tr').each(function (i1) {
				var tr = $(this), row = {};
				//如果定义了字段名
				tr.children('td').each(function (i2, item2) {
					var td = $(this)
						, field = td.data('field');
					if (field) {
						return row[field] = td.html();
					}
				});
				//如果未定义字段名
				webplus.each(cols, function (i3, item3) {
					var td = tr.children('td').eq(i3);
					row[item3.field] = td.html();
				});
				options.datas[i1] = row;
			});
			table.render(options);
		});
		*/
		return that;
	};

	//记录所有实例
	thisTable.that = {}; //记录所有实例对象
	thisTable.config = {}; //记录所有实例配置项

	//遍历表头
	table.eachCols = function (id, callback, cols) {
		var config = thisTable.config[id] || {}
			, arrs = [], index = 0;

		cols = $.extend(true, [], cols || config.cols);

		//重新整理表头结构
		webplus.each(cols, function (i1, item1) {
			webplus.each(item1, function (i2, item2) {

				//如果是组合列，则捕获对应的子列
				if (item2.colGroup) {
					var childIndex = 0;
					index++
					item2.CHILD_COLS = [];

					webplus.each(cols[i1 + 1], function (i22, item22) {
						//如果子列已经被标注为{PARENT_COL_INDEX}，或者子列累计 colspan 数等于父列定义的 colspan，则跳出当前子列循环
						if (item22.PARENT_COL_INDEX || (childIndex > 1 && childIndex == item2.colspan)) return;

						item22.PARENT_COL_INDEX = index;

						item2.CHILD_COLS.push(item22);
						childIndex = childIndex + parseInt(item22.colspan > 1 ? item22.colspan : 1);
					});
				}

				if (item2.PARENT_COL_INDEX) return; //如果是子列，则不进行追加，因为已经存储在父列中
				arrs.push(item2)
			});
		});

		//重新遍历列，如果有子列，则进入递归
		var eachArrs = function (obj) {
			webplus.each(obj || arrs, function (i, item) {
				if (item.CHILD_COLS) return eachArrs(item.CHILD_COLS);
				typeof callback === 'function' && callback(i, item);
			});
		};

		eachArrs();
	};

	//表格选中状态
	table.checkStatus = function (id) {
		var nums = 0
			, invalidNum = 0
			, arr = []
			, data = table.cache[id] || [];
		//计算全选个数
		webplus.each(data, function (i, item) {
			if (item.constructor === Array) {
				invalidNum++; //无效数据，或已删除的
				return;
			}
			if (item[table.config.checkName]) {
				nums++;
				arr.push(table.clearCacheKey(item));
			}
		});
		return {
			data: arr //选中的数据
			, isAll: data.length ? (nums === (data.length - invalidNum)) : false //是否全选
		};
	};

	//表格查询的结果集
	table.getResult = function (id) {
		var that = thisTable.that[id];
		return that.result;
	};

	//表格查询的结果集
	table.getTable = function (id) {
		return thisTable.that[id];
	};

	//表格导出
	table.exportFile = function (id, data, type) {
		data = data || table.clearCacheKey(table.cache[id]);
		type = type || 'csv';

		var config = thisTable.config[id] || {}
			, textType = ({
			csv: 'text/csv'
			, xls: 'application/vnd.ms-excel'
		})[type]
			, alink = document.createElement("a");

		if (device.ie) return hint.error('IE_NOT_SUPPORT_EXPORTS');

		alink.href = 'data:' + textType + ';charset=utf-8,\ufeff' + encodeURIComponent(function () {
			var dataTitle = [], dataMain = [];
			webplus.each(data, function (i1, item1) {
				var vals = [];
				if (typeof id === 'object') { //ID直接为表头数据
					webplus.each(id, function (i, item) {
						i1 == 0 && dataTitle.push(item || '');
					});
					webplus.each(table.clearCacheKey(item1), function (i2, item2) {
						vals.push(item2);
					});
				} else {
					table.eachCols(id, function (i3, item3) {
						if (item3.field && item3.type == 'normal' && !item3.hide) {
							i1 == 0 && dataTitle.push(item3.title || '');
							vals.push(item1[item3.field]);
						}
					});
				}
				dataMain.push(vals.join(','))
			});

			return dataTitle.join(',') + '\r\n' + dataMain.join('\r\n');
		}());

		alink.download = (config.title || 'table_' + (config.index || '')) + '.' + type;
		document.body.appendChild(alink);
		alink.click();
		document.body.removeChild(alink);
	};

	//重置表格尺寸结构
	table.resize = function (id) {
		//如果指定表格唯一 id，则只执行该 id 对应的表格实例
		if (id) {
			var config = getThisTableConfig(id); //获取当前实例配置项
			if (!config) return;

			thisTable.that[id].resize();

		} else { //否则重置所有表格实例尺寸
			webplus.each(thisTable.that, function () {
				this.resize();
			});
		}
	};

	//表格重载
	table.reload = function (id, options) {
		options = options || {};

		var config = getThisTableConfig(id); //获取当前实例配置项
		if (!config) return;

		if (options.datas && options.datas.constructor === Array) delete config.datas;
		return table.render($.extend(true, {}, config, options));
	};

	//核心入口
	table.render = function (options) {
		var inst = new Class(options);

		inst.render();

		inst.resize();

		inst.result = options.res;
		var that = thisTable.call(inst);

		inst.pullData(inst.page); //请求数据

		return that;
	};

	//清除临时Key
	table.clearCacheKey = function (data) {
		data = $.extend({}, data);
		delete data[table.config.checkName];
		delete data[table.config.indexName];
		return data;
	};
	webplus.table = table;

	var treetable = {
		// 渲染树形表格
		render: function (param) {
			// 检查参数
			if (!treetable.checkParam(param)) {
				return;
			}
			// 获取数据
			if (param.datas) {
				treetable.init(param, param.datas);
			} else {
				$.ajax({
					type: param.method || 'post'
					, url: param.url
					, contentType: "application/x-www-form-urlencoded; charset=UTF-8"
					, data: param.where
					, dataType: 'json'
					, success: function (res) {
						treetable.init(param, res);
					}
				});

			}
		},
		// 渲染表格
		init: function (param, res) {
			var mData = res.datas;
			var doneCallback = param.done;
			var tNodes = res.datas;
			// 补上id和pid字段
			for (var i = 0; i < tNodes.length; i++) {
				var tt = tNodes[i];
				if (!tt.id) {
					if (!param.treeIdName) {
						layer.msg('参数treeIdName不能为空', {icon: 5});
						return;
					}
					tt.id = tt[param.treeIdName];
				}
				if (!tt.pid) {
					if (!param.treePidName) {
						layer.msg('参数treePidName不能为空', {icon: 5});
						return;
					}
					tt.pid = tt[param.treePidName];
				}
			}

			// 对数据进行排序
			var sort = function (s_pid, datas) {
				for (var i = 0; i < datas.length; i++) {
					if (datas[i].pid == s_pid) {
						var len = mData.length;
						if (len > 0 && mData[len - 1].id == s_pid) {
							mData[len - 1].isParent = true;
						}
						mData.push(datas[i]);
						sort(datas[i].id, datas);
					}
				}
			};
			// sort(param.treeSpid, tNodes);

			// 重写参数
			param.url = undefined;
			param.datas = mData;
			param.res = res;
			param.page = {
				totalRecord: param.datas.length,
				pageSize: param.datas.length
			};
			param.cols[0][param.treeColIndex].templet = function (d) {
				var mId = d.id;
				var mPid = d.pid;
				var isDir = d.isParent || !d.leaf;
				var emptyNum = treetable.getEmptyNum(mPid, mData);
				var iconHtml = '';
				for (var i = 0; i < emptyNum; i++) {
					iconHtml += '<span class="treeTable-empty"></span>';
				}
				if (isDir) {
					iconHtml += '<i class="fa fa-folder-o"></i>';
					// iconHtml += '<i class="fa fa-minus-square-o"></i> <i class="fa fa-folder-o"></i>';
				} else {
					iconHtml += '<i class="fa fa-file-o"></i>';
				}
				iconHtml += '&nbsp;&nbsp;';
				var ttype = isDir ? 'dir' : 'file';
				var vg = '<span class="treeTable-icon open" lay-tid="' + mId + '" lay-tpid="' + mPid + '" lay-ttype="' + ttype + '">';
				return vg + iconHtml + d[param.cols[0][param.treeColIndex].field] + '</span>'
			};

			param.done = function (res, pageNo, totalRecord) {
				$(param.elem).next().addClass('treeTable');
				$('.treeTable .e-table-page').css('display', 'none');
				$(param.elem).next().attr('treeLinkage', param.treeLinkage);
				// 绑定事件换成对body绑定
				/*$('.treeTable .treeTable-icon').click(function () {
						treetable.toggleRows($(this), param.treeLinkage);
				});*/
				if (param.treeDefaultClose) {
					treetable.foldAll(param.elem);
				}
				if (doneCallback) {
					doneCallback(res, pageNo, totalRecord);
				}
			};

			// 渲染表格
			table.render(param);
		},
		// 计算缩进的数量
		getEmptyNum: function (pid, data) {
			var num = 0;
			if (!pid) {
				return num;
			}
			var tPid;
			for (var i = 0; i < data.length; i++) {
				if (pid == data[i].id) {
					num += 1;
					tPid = data[i].pid;
					break;
				}
			}
			return num + treetable.getEmptyNum(tPid, data);
		},
		// 展开/折叠行
		toggleRows: function ($dom, linkage) {
			var type = $dom.attr('lay-ttype');
			if ('file' == type) {
				return;
			}
			var mId = $dom.attr('lay-tid');
			var isOpen = $dom.hasClass('open');
			if (isOpen) {
				$dom.removeClass('open');
			} else {
				$dom.addClass('open');
			}
			$dom.closest('tbody').find('tr').each(function () {
				var $ti = $(this).find('.treeTable-icon');
				var pid = $ti.attr('lay-tpid');
				var ttype = $ti.attr('lay-ttype');
				var tOpen = $ti.hasClass('open');
				if (mId == pid) {
					if (isOpen) {
						$(this).hide();
						if ('dir' == ttype && tOpen == isOpen) {
							$ti.trigger('click');
						}
					} else {
						$(this).show();
						if (linkage && 'dir' == ttype && tOpen == isOpen) {
							$ti.trigger('click');
						}
					}
				}
			});
		},
		// 检查参数
		checkParam: function (param) {
			if (!param.treeSpid && param.treeSpid != 0) {
				layer.msg('参数treeSpid不能为空', {icon: 5});
				return false;
			}

			if (!param.treeColIndex && param.treeColIndex != 0) {
				layer.msg('参数treeColIndex不能为空', {icon: 5});
				return false;
			}
			return true;
		},
		// 展开所有
		expandAll: function (dom) {
			$(dom).next('.treeTable').find('.e-table-body tbody tr').each(function () {
				var $ti = $(this).find('.treeTable-icon');
				var ttype = $ti.attr('lay-ttype');
				var tOpen = $ti.hasClass('open');
				if ('dir' == ttype && !tOpen) {
					$ti.trigger('click');
				}
			});
		},
		// 折叠所有
		foldAll: function (dom) {
			$(dom).next('.treeTable').find('.e-table-body tbody tr').each(function () {
				var $ti = $(this).find('.treeTable-icon');
				var ttype = $ti.attr('lay-ttype');
				var tOpen = $ti.hasClass('open');
				if ('dir' == ttype && tOpen) {
					$ti.trigger('click');
				}
			});
		}
	};

	webplus.treetable = treetable;

	//自动完成渲染
	table.init();

})(jQuery, window, document);
