const div1=document.createElement('div');
div1.innerHTML='1'
const div2=document.createElement('div');
div2.innerHTML='2'
const div3=document.createElement('div');
div3.innerHTML='3'
const div4=document.createElement('div');
div4.innerHTML='4'

const routeTable={
  '1':div1,
  '2':div2,
  '3':div3,
  '4':div4,
}

const app=document.querySelector('#app');

route();

function route(){
  // 默认路由
  let num=window.location.pathname.substr(1);
  console.log(num);
  num=num||1;

  let div=routeTable[num];

  // 404路由('#90'为404情况,'#'为默认路由,注意区别)
  div=div||document.querySelector('#div404');
  div.style.display='block';

  app.innerHTML=null;
  app.appendChild(div)
}

window.addEventListener('hashchange',route)