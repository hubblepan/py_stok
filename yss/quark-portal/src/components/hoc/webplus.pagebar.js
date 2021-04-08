(function () {
	"use strict";

	var doc = document
		, id = 'getElementById'
		, tag = 'getElementsByTagName'

		//字符常量
		, MOD_NAME = 'pagebar', DISABLED = 'e-disabled'

		//构造器
		, Class = function (options) {
			var that = this;
			that.config = options || {};
			that.config.index = ++pagebar.index;
			that.render(true);
		};

	//判断传入的容器类型
	Class.prototype.type = function () {
		var config = this.config;
		if (typeof config.elem === 'object') {
			return config.elem.length === undefined ? 2 : 3;
		}
	};

	//分页视图
	Class.prototype.view = function () {
		var that = this
			, config = that.config
			, groups = config.groups = 'groups' in config ? (config.groups | 0) : 5; //连续页码个数

		//排版
		config.layout = typeof config.layout === 'object'
			? config.layout
			: ['prev', 'pageNo', 'next'];

		config.totalRecord = config.totalRecord | 0; //数据总数
		config.pageNo = (config.pageNo | 0) || 1; //当前页

		//每页条数的选择项
		config.limits = typeof config.limits === 'object'
			? config.limits
			: [5, 10, 15, 20, 30, 50, 100, 200, 500, 1000];
		config.pageSize = (config.pageSize | 0) || 10; //默认条数

		//总页数
		config.totalPage = Math.ceil(config.totalRecord / config.pageSize) || 1;

		//当前页不能超过总页数
		if (config.pageNo > config.totalPage) {
			config.pageNo = config.totalPage;
		}

		//连续分页个数不能低于0且不能大于总页数
		if (groups < 0) {
			groups = 1;
		} else if (groups > config.totalPage) {
			groups = config.totalPage;
		}

		config.prev = 'prev' in config ? config.prev : '&#x4E0A;&#x4E00;&#x9875;'; //上一页文本
		config.next = 'next' in config ? config.next : '&#x4E0B;&#x4E00;&#x9875;'; //下一页文本

		//计算当前组
		var index = config.totalPage > groups
			? Math.ceil((config.pageNo + (groups > 1 ? 1 : 0)) / (groups > 0 ? groups : 1))
			: 1

			//视图片段
			, views = {
				//上一页
				prev: function () {
					return config.prev
						? '<a href="javascript:;" class="e-pagebar-prev' + (config.pageNo == 1 ? (' ' + DISABLED) : '') + '" data-page="' + (config.pageNo - 1) + '">' + config.prev + '</a>'
						: '';
				}()

				//页码
				, pageNo: function () {
					var pager = [];

					//数据量为0时，不输出页码
					if (config.totalRecord < 1) {
						return '';
					}

					//首页
					if (index > 1 && config.first !== false && groups !== 0) {
						pager.push('<a href="javascript:;" class="e-pagebar-first" data-page="1"  title="&#x9996;&#x9875;">' + (config.first || 1) + '</a>');
					}

					//计算当前页码组的起始页
					var halve = Math.floor((groups - 1) / 2) //页码数等分
						, start = index > 1 ? config.pageNo - halve : 1
						, end = index > 1 ? (function () {
						var max = config.pageNo + (groups - halve - 1);
						return max > config.totalPage ? config.totalPage : max;
					}()) : groups;

					//防止最后一组出现“不规定”的连续页码数
					if (end - start < groups - 1) {
						start = end - groups + 1;
					}

					//输出左分割符
					if (config.first !== false && start > 2) {
						pager.push('<span class="e-pagebar-spr">&#x2026;</span>')
					}

					//输出连续页码
					for (; start <= end; start++) {
						if (start === config.pageNo) {
							//当前页
							pager.push('<span class="e-pagebar-pageNo"><em class="e-pagebar-em" ' + (/^#/.test(config.theme) ? 'style="background-color:' + config.theme + ';"' : '') + '></em><em>' + start + '</em></span>');
						} else {
							pager.push('<a href="javascript:;" data-page="' + start + '">' + start + '</a>');
						}
					}

					//输出输出右分隔符 & 末页
					if (config.totalPage > groups && config.totalPage > end && config.last !== false) {
						if (end + 1 < config.totalPage) {
							pager.push('<span class="e-pagebar-spr">&#x2026;</span>');
						}
						if (groups !== 0) {
							pager.push('<a href="javascript:;" class="e-pagebar-last" title="&#x5C3E;&#x9875;"  data-page="' + config.totalPage + '">' + (config.last || config.totalPage) + '</a>');
						}
					}

					return pager.join('');
				}()

				//下一页
				, next: function () {
					return config.next
						? '<a href="javascript:;" class="e-pagebar-next' + (config.pageNo == config.totalPage ? (' ' + DISABLED) : '') + '" data-page="' + (config.pageNo + 1) + '">' + config.next + '</a>'
						: '';
				}()

				//数据总数
				, totalRecord: '<span class="e-pagebar-count">共 ' + config.totalRecord + ' 条</span>'

				//每页条数
				, pageSize: function () {
					var options = ['<span class="e-pagebar-limits"><select data-ignore>'];
					webplus.each(config.limits, function (index, item) {
						options.push(
							'<option value="' + item + '"'
							+ (item === config.pageSize ? 'selected' : '')
							+ '>' + item + '</option>'
						);
					});
					return options.join('') + '</select></span>';
				}()

				//刷新当前页
				, refresh: ['<a href="javascript:;" data-page="' + config.pageNo + '" class="e-pagebar-refresh">'
					, '<i class="fa fa-refresh"></i>'
					, '</a>'].join('')

				//跳页区域
				, skip: function () {
					return ['<span class="e-pagebar-skip"><span class="e-pagebar-count">共 ' + config.totalPage + ' 页</span>'
						, '<input type="text" min="1" value="' + config.pageNo + '" class="e-input">'
						// , '&#x9875;<button type="button" class="e-pagebar-btn">&#x786e;&#x5b9a;</button>'
						, '</span>'].join('');
				}()
			};

		return ['<div class="e-box e-pagebar e-pagebar-' + (config.theme ? (
			/^#/.test(config.theme) ? 'molv' : config.theme
		) : 'default') + '" id="e-pagebar-' + config.index + '">'
			, function () {
				var plate = [];
				webplus.each(config.layout, function (index, item) {
					if (views[item]) {
						plate.push(views[item])
					}
				});
				return plate.join('');
			}()
			, '</div>'].join('');
	};

	//跳页的回调
	Class.prototype.jump = function (elem, isskip) {
		if (!elem) return;
		var that = this
			, config = that.config
			, childs = elem.children
			, btn = elem[tag]('button')[0]
			, input = elem[tag]('input')[0]
			, select = elem[tag]('select')[0]
			, skip = function () {
			var pageNo = input.value.replace(/\s|\D/g, '') | 0;
			if (pageNo) {
				config.pageNo = pageNo;
				that.render();
			}
		};

		if (isskip) return skip();

		//页码
		for (var i = 0, len = childs.length; i < len; i++) {
			if (childs[i].nodeName.toLowerCase() === 'a') {
				pagebar.on(childs[i], 'click', function () {
					var pageNo = this.getAttribute('data-page') | 0;
					if (pageNo < 1 || pageNo > config.totalPage) return;
					config.pageNo = pageNo;
					that.render();
				});
			}
		}

		//条数
		if (select) {
			pagebar.on(select, 'change', function () {
				var value = this.value;
				if (config.pageNo * value > config.totalRecord) {
					config.pageNo = Math.ceil(config.totalRecord / value);
				}
				config.pageSize = value;
				that.render();
			});
		}

		//确定
		if (btn) {
			pagebar.on(btn, 'click', function () {
				skip();
			});
		}
	};

	//输入页数字控制
	Class.prototype.skip = function (elem) {
		if (!elem) return;
		var that = this, input = elem[tag]('input')[0];
		if (!input) return;
		pagebar.on(input, 'keyup', function (e) {
			var value = this.value
				, keyCode = e.keyCode;
			if (/^(37|38|39|40)$/.test(keyCode)) return;
			if (/\D/.test(value)) {
				this.value = value.replace(/\D/, '');
			}
			if (keyCode === 13) {
				that.jump(elem, true)
			}
		});
	};

	//渲染分页
	Class.prototype.render = function (load) {
		var that = this
			, config = that.config
			, type = that.type()
			, view = that.view();

		if (type === 2) {
			config.elem && (config.elem.innerHTML = view);
		} else if (type === 3) {
			config.elem.html(view);
		} else {
			if (doc[id](config.elem)) {
				doc[id](config.elem).innerHTML = view;
			}
		}

		config.jump && config.jump(config, load);

		var elem = doc[id]('e-pagebar-' + config.index);
		that.jump(elem);

		if (config.hash && !load) {
			location.hash = '!' + config.hash + '=' + config.pageNo;
		}

		that.skip(elem);
	};

	//外部接口
	var pagebar = {
		//分页渲染
		render: function (options) {
			var o = new Class(options);
			return o.index;
		}
		, index: webplus.pagebar ? (webplus.pagebar.index + 10000) : 0
		, on: function (elem, even, fn) {
			elem.attachEvent ? elem.attachEvent('on' + even, function (e) { //for ie
				e.target = e.srcElement;
				fn.call(elem, e);
			}) : elem.addEventListener(even, fn, false);
			return this;
		}
	}


	webplus.pagebar = pagebar;
})();
