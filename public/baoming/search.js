/**
 * ���ܣ�������Ԥ��+������ʾ 33
 * author��liu.xianggui@zol.com.cn
 * ���÷�ʽ��$('selector').zsuggest({offsetX:-35, offsetY:7, width: 500, sourse: 'article', isSuggest: true})
 * selector ������ѡ����
 * offsetX��offsetY ����΢�������Ҿ����
 * width ��ʾ��Ŀ��
 * sourse �������ͣ���Ѷ����̳�����ء���Ʒ�ȣ�
 * isSuggest �Ƿ���Ҫ������ʾ����
**/
(function($) {
	
	$.fn.zsuggest = function(settings) {
		
		var defaults = {
			offsetX: 0,                //ˮƽ�����ƫ��������Ҫ���������������
			offsetY: 0,                //��ֱ�����ƫ��������Ҫ���������������
			cssUrl: 'http://icon.zol-img.com.cn/public/css/suggest20150320.css',     //������CSS
			source: 'article',         //ҵ����Դ���� article ��ʾ����
			defaultUrl: 'http://search.zol.com.cn/new/autoComplatePresetNew.php', //Ĭ����ʾ����Դ
			suggestUrl: 'http://search.zol.com.cn/new/autoComplateZolNew.php',    //��������Դ
			isSuggest: true,  // �Ƿ���Ҫ������ʾ����
			isFixed: false    // �Ƿ�������
		}
		
		var self = $(this)
		
		var settings = $.extend({
				suggestLock: false,//�Ƿ��Ѿ�����������ʾ
				zSuggest: '#zSearchSuggest',
				sResultList: '#searchResultList'	
			}, defaults, settings)

		//˽�з���
		var privateFunction = {
			// ��ȡλ��
			getPosition: function(){
				return {
					'width': self.width(),
					'height': self.height(),
					'left': self.offset().left,
					'top': self.offset().top
				}
			},
			
			//��ȡCSS
			loadCSS: function() {
				var cssLoaded = $('#zSearchSuggestCSS').length > 0 ? true : false
				if (cssLoaded) { return }
				$('<link id="zSearchSuggestCSS" href="'+settings.cssUrl + '?v=' + new Date().getTime()+'" rel="stylesheet">').appendTo("head");
			},
			
			//�ر���ʾ
			closeSuggest: function() {
				if(!settings.keyword){
					settings.suggestLock = false
				} else {
					settings.suggestLock = true
				}
				var role = settings.isFixed ? 'fixed' : 'absolute'
				var zSuggest = $(settings.zSuggest + '[data-role=' + role + ']')
				if(zSuggest.length > 0) {
					setTimeout(function(){
						zSuggest.hide()
					}, 100)
				}
			},   
			
			//����������ʾ��
			createHTML: function(data){ 
				var that = this
				var pos = that.getPosition()
				var left = pos.left + settings.offsetX
				var top = pos.top + settings.offsetY + pos.height
				var width = settings.width != 'undefined' ? settings.width : 'auto'
				var position = settings.isFixed ? 'fixed' : 'absolute'
				var scrollTop = $(window).scrollTop()
				top = settings.isFixed ? top - scrollTop : top
				var css = {'position': position, 'width': width, 'left': left, 'top': top, 'z-index': 100000}
				
				var zSuggest = $(settings.zSuggest)
				if(zSuggest.length > 0){
					zSuggest.css(css).html(data).show()
				} else {
					var zSuggestNew = $('<div id="zSearchSuggest" data-role="'+ position +'"></div>')
					zSuggestNew.css(css).html(data).appendTo($('body'))
				}
				
				that.resizePos()
				
				$(document).bind('click', function(){
					that.closeSuggest()
				})
				
				$('#zSearchSuggest').click(function(e){
					e.stopPropagation()
					self.focus()
				})
				
				$('#zSearchSuggestClose').click(function(e){
					e.stopPropagation()
					that.closeSuggest()
				})
				
			},
			
			//������ʾ��
			getSuggest: function(){
				
				var methods = this
				var type = self.attr('data-source') == '' ? settings.source : self.attr('data-source')
				
				var zsearchSuggestLink = [
					'<div class="zsearch-suggest-link">',
					'<a class="search-home" href="http://search.zol.com.cn/s/" target="_blank">\u8fdb\u5165\u641c\u7d22\u9996\u9875&gt;&gt;</a>',
					'<a href="http://top.zol.com.cn/" target="_blank">\u70ed\u95e8\u4ea7\u54c1\u6392\u884c\u699c&gt;&gt;</a>',
					'</div>'
				].join('')
				
				// ��̳��������
				if(type === 'bbs'){
					zsearchSuggestLink = [
						'<div class="zsearch-suggest-link zsearch-suggest-link-forbbs">',
						'<span id="zSearchSuggestClose">\u5173\u95ED</span>',
						'<a href="http://bbs.zol.com.cn/top/" target="_blank">ZOL\u8BBA\u575B\u6392\u884C\u699C&gt;&gt;</a>',
						'</div>'
					].join('')
				}
				
				if (arguments.length != 0){
					var searchSuggestUrl = settings.suggestUrl + '?callback=?&m=' + type + '&key=' + arguments[0]
					if(typeof settings.bbsid !== 'undefined') {
						userLikeUrl += '&bbsid=' + settings.bbsid
					}
					$.getJSON(searchSuggestUrl, function(data){
						if(data && data.length != 0){
							var result = '<ul id="searchResultList" class="talk-about-search-suggest">'
							$.each(data, function(i){
								var resultArr = data[i].split('@#');
								var resultList = '<li><em>'+ resultArr[1] +'</em><span>'+ resultArr[0] +'</span></li>';
								result += resultList
							})
							result += '</ul>' + zsearchSuggestLink
							methods.createHTML(result)
							methods.bindSearchResultEvent()
						} else {
							$(settings.zSuggest).hide()
						}
					})
				} else {
					var host = location.host
					
					if(type=='all')type='pro' //*add by huangjialin 2015-03-17*/
						
					var userLikeUrl = settings.defaultUrl + '?callback=?&m=' + type + '&hostname=' + host
					if(typeof settings.bbsid !== 'undefined') {
						userLikeUrl += '&bbsid=' + settings.bbsid
					}
					$.getJSON(userLikeUrl, function(result){
						if(result[type]!='null'){
							var html = result[type].replace(/\<a/g, '\<a target=\"_blank\"')
							methods.createHTML(html + zsearchSuggestLink)
							settings.suggestLock = false
						}
					})
				}
			},
			
			//���ⰴ����������û����ã�
			keyEvent: function(keyCode){
				switch (keyCode){
					case 38 : //UP
						this.prevResult();
						break;
					case 40 : //DOWN
						this.nextResult();
						break;
				}
			},
			
			//�����¼�ͷ
			nextResult: function() {
	            var sResultList = $(settings.sResultList)
				if (sResultList.length == 0) { return }
				var current = sResultList.find('li.active')
				if (current.length > 0){
					var value = current.next().length == 0 ? settings.keyword : current.next().find('span').html().replace(/<[^>].*?>/g,"")
                	current.removeClass().next().addClass('active')
                	self.val(value)
            	} else {
               		sResultList.find('li:first').addClass('active')
                	self.val(sResultList.find('li:first span').html().replace(/<[^>].*?>/g,""));
            	}
	        },
			
			//�����ϼ�ͷ
			prevResult: function() {
	            var sResultList = $(settings.sResultList)
				if (sResultList.length == 0) { return }
				var current = sResultList.find('li.active')
				if (current.length > 0){
					var value = current.prev().length == 0 ? settings.keyword : current.prev().find('span').html().replace(/<[^>].*?>/g,"")
					current.removeClass().prev().addClass('active')
					self.val(value)
            	} else {
               		sResultList.find('li:last').addClass('active')
                	self.val(sResultList.find('li:last span').html().replace(/<[^>].*?>/g,""));
            	}
	        },
			
			//��������ʾ���¼�
			bindSearchResultEvent: function(){
				var that = this
				var sResultItem = $(settings.sResultList).find('li')
				sResultItem.hover(function(){
					$(this).addClass('active')
				},function(){
					$(this).removeClass('active')
				})
				sResultItem.click(function(){
					self.val($(this).find('span').html().replace(/<[^>].*?>/g,"")).focus()
					that.closeSuggest()
					/*add by huangjialin 2015-03-17*/
					 if(self.attr('data-source')!='undefined'&&self.attr('data-source')!=''){
						 self.parent().parent('form').submit();
					 }else{
						 self.parent('form').submit();
					 }
				})
			},
			
			resizePos: function(){
				var that = this
				$(window).resize(function(){
					var resizeLeft = that.getPosition().left + settings.offsetX
					$(settings.zSuggest).css('left',resizeLeft)
				})	
			}
		}
		
		//���ȼ���CSS
 		privateFunction.loadCSS()
	
		return this.each(function() {	
			var isIE6 = !-[1,] && !window.XMLHttpRequest;
		    if (isIE6) return;
			self.attr({
				'data-source':'',
				'autocomplete':'off'
			})
			
			self.click(function(e){
				e.stopPropagation()	
			})
			
			var focusTimer = null;
			self.bind('focus', function(){
				if(settings.suggestLock) {return}
				if(focusTimer) {clearTimeout(focusTimer)}
				focusTimer = setTimeout(function(){
					privateFunction.getSuggest()
				},200)
			})
			self.bind('blur', function(){
				//privateFunction.closeSuggest()
			})

			var timer = null
			self.bind('keyup', function(e){
				var keyCode = e.keyCode
				if ((/38$|40$|13$|108$/.test(e.keyCode))) {
					e.preventDefault()
					e.stopPropagation()
					privateFunction.keyEvent(keyCode) //���̲������¼����س�
				} else {
					var keyword = $.trim(self.val())
					settings.keyword = keyword
					if(keyword == ''){
						if(settings.suggestLock){
							setTimeout(function(){
								privateFunction.getSuggest()
							},100)
						}
						return
					}
					if(!settings.isSuggest && keyword != ''){
						privateFunction.closeSuggest()
						return
					}
					if (timer) {
						clearTimeout(timer)
					}
					timer = setTimeout(function(){
						privateFunction.getSuggest(keyword)
						settings.suggestLock = true
					},200)
				}
			})
		})
	}
})(jQuery);