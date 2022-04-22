/* eslint-disable */

/**
 * rem 相关的工具
 * @param {*}  
 */
export const remUtil = {
  // 调整窗口或者翻转屏幕事件
  resizeEvent: 'orientationchange' in window ? 'orientationchange' : 'resize',
  // 事件句柄
  handlers: [],
  // 添加设置rem的事件
  addRemHandler: function(designWith){
    function recalc(){
      const docEl = document.documentElement;
      const clientWidth = docEl.clientWidth;
      if (!clientWidth) return;
      docEl.style.fontSize = 100 * (clientWidth / Number(designWith))+ 'px';
    };
      
    if (!document.addEventListener) return;
    const handler = throttle(recalc,500);
    remUtil.handlers.push(handler);
    window.addEventListener(remUtil.resizeEvent, handler, false);
    document.addEventListener('DOMContentLoaded', recalc, false);       
  },
  // 移除设置rem的事件
  removeRemHandler:function(){
    remUtil.handlers.forEach((handler)=>{
      window.removeEventListener(remUtil.resizeEvent, handler);
    })
  },
};
export const parseQuery=function (url){
    var arr;
    var res = {};
    //#符号之后的值称为hash，都不会加到request请求中去
    url = url.split('#')[0];
    //获取queryString 第一个？号后面的全是查询字符串
    arr = url.split('?');
    arr.shift();
    var queryStr = arr.join('?');
    //查询字符串为空直接返回 避免出现这样的返回值{"":""}
    if (queryStr.trim().length == 0){
        return res;
    }

    //获取参数
    arr = queryStr.split('&');
    for (var i = 0; i <  arr.length; i++) {
        var itemArr = arr[i].split('=');
        //第一个=号之前的是name 后面的全是值
        var name = itemArr.shift();
        var value = itemArr.join('=');
        res[name] = value;
    }
    return res;
}
/**
 * 删除html上的行内style
 */
export function removeAttributeOfHtml(){
  const docEl = document.documentElement;
  if(!docEl) return;
  docEl.removeAttribute('style');
}

/**
 * viewport的宽度是否比某个值大
 * @param {*} width 
 */
export function isWider(width){
  const viewPortSize = getViewportSize();
  if(viewPortSize.width>width){
    return true;
  }
  return false;
}

/**
 * 获取viewport的宽高
 */
export function getViewportSize () {
  return {
      width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
      height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
  };
}

/**
 * 设置样式
 * @param {*} href 
 */
export function setLink(className) {
  let heads = document.getElementsByTagName('head');
  let htmlTags = document.getElementsByTagName('html');
  let htmlTag = htmlTags ? htmlTags[0] : null;
  htmlTag.setAttribute('class',className);
}

/**
 * 节流函数，你懂的。
 */
export function throttle(action,delay){
  let timeout = null;
  let lastRun = 0 ;
  return function(){
    if(timeout) return;
    let elapsed = Date.now()- lastRun
    let context = this;
    let args = arguments;
    let runCallback = function(){
      lastRun = Date.now();
      timeout = false;
      action.apply(context,args);
    }
    if(elapsed>=delay){
      runCallback();
    } else {
      timeout = setTimeout(runCallback,delay);
    }
  }
}
// 获取元素的绝对位置坐标（像对于页面左上角）
export function getElementPagePosition(element){
  
  var actualLeft = element.offsetLeft;
  var current = element.offsetParent;
  while (current !== null){
    actualLeft += current.offsetLeft;
    current = current.offsetParent;
  }
  var actualTop = element.offsetTop;
  var current = element.offsetParent;
  while (current !== null){
    actualTop += (current.offsetTop+current.clientTop);
    current = current.offsetParent;
  }
  return {x: actualLeft, y: actualTop}
}

   
export function randomStr(length){
 	return new Array(length).join().replace(/(.|$)/g, function(){return ((Math.random()*36)|0).toString(36);})
 }
 export function debounce(fn){
	 let id;
	 return function(){
		 console.log(id)
		 clearTimeout(id);
		  id=setTimeout(fn,1000)
	 }
	
 }
 export async function copyText(text){
	 if(isMobile()){
		 const input = document.createElement('input');
		 	document.body.appendChild(input);
		  	input.setAttribute('value', text);
		 	input.select();
		 	if (document.execCommand('copy')) {
		 		document.execCommand('copy');
		 	}
		     document.body.removeChild(input);
			 return true
	 }
	 const clipboard = await navigator.clipboard;
	 clipboard.writeText(text);
	 return true;
 }
 export function fileSize(size){
	 if (size <= 1024) return size + "B"
	 if (size <= 1024 * 1024) return _getFloat(size / 1024) + "KB"
	 if (size <= 1024 * 1024 * 1024) return _getFloat(size / 1024 / 1024) + "M"
	 return _getFloat(size / 1024 / 1024 / 1024) + "G"
 }

export function isMobile(){
if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
	  return true;
	}else{
	   return false;
	}
}
export function supportDownload(){
 return isMobile()&&navigator.userAgent.includes("EdgA")
}
 function _getFloat(num) {
 	return Number(Number(num).toFixed(2))
 }

export function getQuery(variable)
{
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(false);
}


export function is_weixn(){
	var ua = navigator.userAgent.toLowerCase();
	if(ua.match(/MicroMessenger/i)=="micromessenger") {
		return true;
	} else {
		return false;
	}
}
export function getParent(el,str){
	
	let parentEl=el;
	while((parentEl=parentEl.parentElement)&&!parentEl.classList.contains(str)){};
	
	return parentEl
}