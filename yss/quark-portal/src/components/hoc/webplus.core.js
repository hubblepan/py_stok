(function (window) {

	var config = {
		modules: {} //记录模块物理路径
		, status: {} //记录模块加载状态
		, timeout: 10 //符合规范的模块请求最长等待秒数
		, event: {} //记录模块自定义事件
	}

	var WebPlus = function () {
		this.v = '1.0.0'; //版本号
	}

	var error = function (msg) {
		window.console && console.error && console.error('WebPlus hint: ' + msg);
	}

		, isOpera = typeof opera !== 'undefined' && opera.toString() === '[object Opera]'

	var class2type = {};
	var toString = class2type.toString;
	var hasOwn = class2type.hasOwnProperty;

	function isPlainObject(obj) {
		var proto, Ctor;
		if (!obj || toString.call(obj) !== "[object Object]") {
			return false;
		}
		proto = Object.getPrototypeOf(obj);
		if (!proto) {
			return true;
		}
		Ctor = hasOwn.call(proto, "constructor") && proto.constructor;
		return typeof Ctor === "function" && hasOwn.toString.call(Ctor) === hasOwn.toString.call(Object);
	}

	//记录基础数据
	WebPlus.prototype = {
		constructor: WebPlus,

		cache: config,


		//全局配置
		config: function (options) {
			options = options || {};
			for (var key in options) {
				config[key] = options[key];
			}
			return this;
		},

		//路由解析
		router: function (hash) {
			var that = this
				, hash = hash || location.hash
				, data = {
				path: []
				, search: {}
				, hash: (hash.match(/[^#](#.*$)/) || [])[1] || ''
			};

			if (!/^#\//.test(hash)) return data; //禁止非路由规范
			hash = hash.replace(/^#\//, '');
			data.href = '/' + hash;
			hash = hash.replace(/([^#])(#.*$)/, '$1').split('/') || [];

			//提取Hash结构
			that.each(hash, function (index, item) {
				/^\w+=/.test(item) ? function () {
					item = item.split('=');
					data.search[item[0]] = item[1];
				}() : data.path.push(item);
			});

			return data;
		},

		//本地持久性存储
		data: function (table, settings, storage) {
			table = table || 'webplus';
			storage = storage || localStorage;

			if (!window.JSON || !window.JSON.parse) return;

			//如果settings为null，则删除表
			if (settings === null) {
				return delete storage[table];
			}

			settings = typeof settings === 'object' ? settings : {key: settings};

			try {
				var data = JSON.parse(storage[table]);
			} catch (e) {
				var data = {};
			}

			if ('value' in settings) data[settings.key] = settings.value;
			if (settings.remove) delete data[settings.key];
			storage[table] = JSON.stringify(data);

			return settings.key ? data[settings.key] : data;
		},

		//本地会话性存储
		sessionData: function (table, settings) {
			return this.data(table, settings, sessionStorage);
		},
		//本地会话性存储
		session: {
			put: function (key, value) {
				var settings = {key: key, value: value};
				return webplus.data("session", settings, sessionStorage);
			},
			get: function (key) {
				var settings = {key: key};
				return webplus.data("session", settings, sessionStorage);
			},
			del: function (key) {
				var settings = {key: key, remove: true};
				return webplus.data("session", settings, sessionStorage);
			},
			userCode: function (value) {
				var settings = {key: 'userCode'};
				if (value) {
					settings.value = value;
				}
				return webplus.data("session", settings, sessionStorage);
			},
			dataSecurity: function (value) {
				var settings = {key: 'dataSecurity'};
				if (value) {
					settings.value = value;
				}
				return webplus.data("session", settings, sessionStorage);
			}


		},

		//提示
		hint: function () {
			return {
				error: error
			}
		},

		//遍历
		each: function (obj, fn) {
			var key
				, that = this;
			if (typeof fn !== 'function') return that;
			obj = obj || [];
			if (obj.constructor === Object) {
				for (key in obj) {
					if (fn.call(obj[key], key, obj[key])) break;
				}
			} else {
				for (key = 0; key < obj.length; key++) {
					if (fn.call(obj[key], key, obj[key])) break;
				}
			}
			return that;
		},

		//将数组中的对象按其某个成员排序
		sort: function (obj, key, desc) {
			var clone = JSON.parse(
				JSON.stringify(obj || [])
			);

			if (!key) return clone;

			//如果是数字，按大小排序，如果是非数字，按字典序排序
			clone.sort(function (o1, o2) {
				var isNum = /^-?\d+$/
					, v1 = o1[key]
					, v2 = o2[key];

				if (isNum.test(v1)) v1 = parseFloat(v1);
				if (isNum.test(v2)) v2 = parseFloat(v2);

				if (v1 && !v2) {
					return 1;
				} else if (!v1 && v2) {
					return -1;
				}

				if (v1 > v2) {
					return 1;
				} else if (v1 < v2) {
					return -1;
				} else {
					return 0;
				}
			});

			desc && clone.reverse(); //倒序
			return clone;
		},

		//阻止事件冒泡
		stope: function (thisEvent) {
			thisEvent = thisEvent || win.event;
			try {
				thisEvent.stopPropagation()
			} catch (e) {
				thisEvent.cancelBubble = true;
			}
		},

		/**
		 * 查找父元素中满足选择器条件的元素，parentElem不为空时查找到该元素停止查找，不存在元素返回null
		 * @param elem
		 * @param selector
		 * @param parentElem 在字段的元素内查找
		 * @returns {*}
		 */
		closest: function (elem, selector, parentElem) {
			if (elem && selector) {
				var matches = elem.matches || elem.webkitMatchesSelector || elem.mozMatchesSelector || elem.msMatchesSelector;
				while (elem) {
					if (matches.call(elem, selector)) {
						return elem;
					}
					elem = elem.parentElement;
					if (parentElem && parentElem == elem) {
						return;
					}
				}
			}
			return;
		},

		/**
		 * 添加事件，在元素内满足选择器条件的元素触发事件。
		 * @param elem
		 * @param type
		 * @param selector
		 * @param handle
		 * @returns {WebPlus|*}
		 */
		addEvent: function (elem, type, selector, handle) {
			function eventHandle(event) {
				event = event || window.event;
				var target = event.target;
				if (selector) {
					if (webplus.closest(target, selector, elem)) {
						return handle(event);
					}
				} else {
					return handle(event);
				}
			}

			if (type === "mousewheel" && document.mozFullScreen !== undefined) {
				type = "DOMMouseScroll";
			}
			if (elem.addEventListener) {
				elem.addEventListener(type, eventHandle, false);
			} else if (elem.attachEvent) {
				elem.attachEvent('on' + type, eventHandle);
			} else {
				elem['on' + type] = eventHandle;
			}

			return webplus;
		},

		/**
		 * 删除元素，在元素内满足选择器
		 * @param elem
		 * @param type
		 * @param handle
		 */
		removeEvent: function (elem, type, handle) {
			if (elem.removeEventListener) {
				elem.removeEventListener(type, handle);
			} else if (elem.detachEvent) {
				elem.detachEvent('on' + type, handle);
			} else {
				elem['on' + type] = null;
			}
		},

		/**
		 * 初始化事件绑定方法
		 * @param options
		 */
		initListener: function (options, that) {
			if (!that) {
				that = options;
			}
			var $element = $(options.selector);
			$.each(options.listener, function (name, item) {
				item.name = name;
				$.each(item.events, function (key, method) {
					var btnFun = function (handle) {
						return function (event) {
							var _method = handle[method];
							if (_method) {
								_method.call(that, that, event, item);
							} else {
								console.error('未找到实现方法！')
							}
							return true;
						}
					};
					$element.on(key, item.selector, btnFun(options.handle));
				});
			});
		},

		extend: function () {
			// 默认不进行深拷贝
			var deep = false;
			var name, options, src, copy, clone, copyIsArray;
			var length = arguments.length;
			// 记录要复制的对象的下标
			var i = 1;
			// 第一个参数不传布尔值的情况下，target 默认是第一个参数
			var target = arguments[0] || {};
			// 如果第一个参数是布尔值，第二个参数是 target
			if (typeof target == 'boolean') {
				deep = target;
				target = arguments[i] || {};
				i++;
			}
			// 如果target不是对象，我们是无法进行复制的，所以设为 {}
			if (typeof target !== "object" && !isFunction(target)) {
				target = {};
			}

			// 循环遍历要复制的对象们
			for (; i < length; i++) {
				// 获取当前对象
				options = arguments[i];
				// 要求不能为空 避免 extend(a,,b) 这种情况
				if (options != null) {
					for (name in options) {
						// 目标属性值
						src = target[name];
						// 要复制的对象的属性值
						copy = options[name];

						// 解决循环引用
						if (target === copy) {
							continue;
						}

						// 要递归的对象必须是 plainObject 或者数组
						if (deep && copy && (isPlainObject(copy) ||
							(copyIsArray = Array.isArray(copy)))) {
							// 要复制的对象属性值类型需要与目标属性值相同
							if (copyIsArray) {
								copyIsArray = false;
								clone = src && Array.isArray(src) ? src : [];

							} else {
								clone = src && isPlainObject(src) ? src : {};
							}

							target[name] = webplus.extend(deep, clone, copy);

						} else if (copy !== undefined) {
							target[name] = copy;
						}
					}
				}
			}

			return target;

		},

		/**
		 * 自定义ajax请求，默认实现成功、错误处理方法。
		 * @param options ajax选项，label表示提示的操作名称。
		 * @returns {boolean}
		 */
		ajax: function (options) {
			var label = options.label || '操作';
			var defaultHandle = {
				contentType: "application/x-www-form-urlencoded; charset=UTF-8",
				dataType: 'json',
				type: "post",
				success: function (result) {
					if (result && result.success) {
						layer.msg(label + '成功！');
					} else {
						layer.alert(label + '失败：<br>' + result.message, {title: '错误', icon: 2});
					}
				},
				error: function (req, textStatus, errorThrown) {
					layer.alert(label + '失败：<br>' + req.responseText, {title: '错误', icon: 2});
				}
			};
			var _options = webplus.extend(true, {}, defaultHandle, options);

			$.ajax(_options);
			return true;
		},
		/**
		 * 处理页面自动高度
		 */
		autoHeight: function () {
			var containers = document.querySelectorAll('[data-auto-height="container"]');
			if (containers) {
				each(containers, function () {
					webplus.handleAutoHeight.call(webplus, this);
				});
			}
		},

		handleAutoHeight: function ($container) {
			if ($container && $container.length > 0) {
				var containerHeight = $container.innerHeight() == null ? 0 : $container.innerHeight();
				var publicHeight = 0;
				// 当前全局区域固定高度
				var $publicItems = $('[data-auto-height="public"]', $container);
				$publicItems.each(function () {
					publicHeight += $(this).outerHeight();
				});
				// 当前激活区域固定高度
				var $tabItems = $('.active[data-auto-height="tabPane"]', $container);
				if ($tabItems.length > 0) {
					$tabItems.each(function () {
						webplus.resizeHeight($(this), containerHeight, publicHeight);
					});
				} else {
					webplus.resizeHeight($container, containerHeight, publicHeight);
				}
				return;
			}
		},

		resizeHeight: function ($parentItem, containerHeight, publicHeight) {
			var $fixedItems = $('[data-auto-height="private"]', $parentItem);
			var fixedHeight = publicHeight;
			$fixedItems.each(function () {
				fixedHeight += $(this).outerHeight();
			});
			var $item = $('[data-auto-height="body"]', $parentItem);
			var offset = parseInt($item.attr('data-auto-height-offset') ? $item.attr('data-auto-height-offset') : 0);
			fixedHeight += offset;
			$item.height(containerHeight - fixedHeight);
		}

	}

	window.webplus = new WebPlus();
})(window);
