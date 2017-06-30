function getStyle(obj, attr)
{
	if(obj.currentStyle)
	{
		return obj.currentStyle[attr];
	}
	else
	{
		return getComputedStyle(obj, false)[attr];
	}
}
function myAddEvent(obj, sEvent, fn)
{
	if(obj.attachEvent)
	{
		obj.attachEvent('on'+sEvent, fn);
	}
	else
	{
		obj.addEventListener(sEvent, fn, false);
	}
}

function startMove(obj, json, fn)
{
	clearInterval(obj.timer);
	obj.timer=setInterval(function (){
		var bStop=true;		//这一次运动就结束了――所有的值都到达了
		for(var attr in json)
		{
			//1.取当前的值
			var iCur=0;
			
			if(attr=='opacity')
			{
				iCur=parseInt(parseFloat(getStyle(obj, attr))*100);
			}
			else
			{
				iCur=parseInt(getStyle(obj, attr));
			}
			
			//2.算速度
			var iSpeed=(json[attr]-iCur)/8;
			iSpeed=iSpeed>0?Math.ceil(iSpeed):Math.floor(iSpeed);
			
			//3.检测停止
			if(iCur!=json[attr])
			{
				bStop=false;
			}
			
			if(attr=='opacity')
			{
				obj.style.filter='alpha(opacity:'+(iCur+iSpeed)+')';
				obj.style.opacity=(iCur+iSpeed)/100;
			}
			else
			{
				obj.style[attr]=iCur+iSpeed+'px';
			}
		}
		
		if(bStop)
		{
			clearInterval(obj.timer);
			
			if(fn)
			{
				fn();
			}
		}
	}, 30)
}
// 页面滚动效果
// 滚动时拉滚动条会有bug，目前无力解决
function scrollTo(tiger,fn){
	var iSpeed = 0, iNowTop = 0;
	var isStop = false;

	clearTimer();                                        // 加载时清除定时器
	myAddEvent(document, 'mousewheel', clearTimer);
	myAddEvent(document, 'DOMMouseScroll', clearTimer);
	
    document.scrollTimer = setInterval(function(){
    	// 滚动效果
    	iNowTop = document.body.scrollTop || document.documentElement.scrollTop;
    	iSpeed = (tiger-iNowTop)/8;
    	iSpeed = iSpeed>0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
   		document.body.scrollTop = document.documentElement.scrollTop = iNowTop+iSpeed;
   		// 判断是否结束，结束关闭定时器并执行fn（如果fn存在的话）
   		isStop = iNowTop==tiger;
   		if(isStop)
   		{
   			clearTimer();
   			if(fn)
   			{
   				fn();
   			}
   		}
    },20);

	function clearTimer(){									// 清除定时器的函数
		clearInterval(document.scrollTimer);		
	}
}