function getStyle(obj,attr)   //获取元素的样式
{                                 
   var od=obj.currentStyle||getComputedStyle(obj,false);
   return od[attr];
}

function css(){ //获取元素的样式或改变元素的样式 结合1
  if(arguments.length==2)
  {
  	return getStyle(arguments[0],arguments[1]);
  }
  else if(arguments.length===3)
  {
	arguments[0].style[arguments[1]]=arguments[2];
  }
}

function getByClass(oParent,sClass){ //获取父级下class为某一值的全部元素
  var aEle=oParent.getElementsByTagName('*');
  var arr=[];
  var re=new RegExp('\\b'+sClass+'\\b'/* ,'i' */);
  var i=0;

  for(i=0;i<aEle.length;i++)
  {
    if(re.test(aEle[i].className))
    {
      arr.push(aEle[i]);
    }
  }
    return arr;
}

function setCookie (name,value,iDate)                  //这是一个设置cookie获取cookie删除cookie的几个函数
{
  var oDate=new Date();

  oDate.setDate(oDate.getDate()+iDate);
  document.cookie=name+'='+value+';expires='+oDate;
}

function getCookie (name)
{
  var arr=document.cookie.split('; ');
  var i=0;

  for(i=0;i<arr.length;i++)
  {
    var arr2=arr[i].split('=');
    if(arr2[0]==name)
      return arr2[1];
  }
  return '';               //如果没有找到cookie也会返回一个空字符串回去
}

function removeCookie (name)
{
  setCookie(name,'1',-1);
}

function startMove(obj, json, fn)
{  
  var timer=null;
  clearInterval(obj.timer);
  obj.timer=setInterval(function (){
	var bStop=true;		
	for(var attr in json)
	{
		
		var iCur=0;
		
		if(attr=='opacity')
		{
			iCur=parseInt(parseFloat(getStyle(obj, attr))*100);
		}
		else
		{
			iCur=parseInt(getStyle(obj, attr));
		}
		
	
		var iSpeed=(json[attr]-iCur)/8;
		iSpeed=iSpeed>0?Math.ceil(iSpeed):Math.floor(iSpeed);
		
		
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
  }, 30);
}

function insertAfter(newElement,targetElement)               //  往一个函数后面添加一个新元素
{
    var parent = targetElement.parentNode;
    if(parent.lastChild == targetElement){
        parent.appendChild(newElement);
    } else {
        parent.insertBefore(newElement,targetElement.nextSibling);
    }
}

function myAddEvent(obj, sEvent, fn)
{
	if(obj.attachEvent)         // 兼容IE11之前版本和某些其他浏览器
	{
		obj.attachEvent('on'+sEvent, function(){
			fn.call(obj);
		});
	} else {
		obj.addEventListener(sEvent, fn ,false);
	}
}