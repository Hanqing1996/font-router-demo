const div1=document.createElement('div');
div1.innerHTML='1'
const div2=document.createElement('div');
div2.innerHTML='2'
const div3=document.createElement('div');
div3.innerHTML='3'
const div4=document.createElement('div');
div4.innerHTML='4'
const div5=document.createElement('div');
div5.innerHTML='5'

const routeTable={
  '/1':div1,
  '/2':div2,
  '/3':div3,
  '/4':div4,
  '/5':div5
}

const app=document.querySelector('#app');

const allA=document.querySelectorAll('a.link');
for(let a of allA){
  a.addEventListener('click',e=>{
    e.preventDefault();
    const href=a.getAttribute('href');
    window.history.pushState(null,`page ${href}`,href);
    window.localStorage.setItem('xxx',href)
    // 通知
    onStateChange(route);
  })
}

route();

function route(){

  // 默认路由
  let num=window.localStorage.getItem('xxx')
  console.log(num)

  if(num=='/')
    num=1;

  let div=routeTable[num];
  // 404路由('#90'为404情况,'#'为默认路由,注意区别)
  div=div||document.querySelector('#div404');
  div.style.display='block';

  app.innerHTML=null;
  app.appendChild(div)
}

function onStateChange(callback){
  callback();
}