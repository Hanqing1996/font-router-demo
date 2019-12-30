let app2=document.querySelector("#app");

let children=app2.children
let arr=[]
let keys=Object.keys(children)
for(let key in keys)
  arr.push(children[key])

route();

function route(){
  // 默认路由
  let num=window.location.hash.substr(1);
  num=num||1;

  arr.forEach((item)=>{
    item.style.display='none';
  })
  document.querySelector('#div404').style.display='none';

  let div2=document.querySelector(`#div${num}`);

  // 404路由('#90'为404情况,'#'为默认路由,注意区别)
  div2=div2||document.querySelector('#div404');
  div2.style.display='block';
}

window.addEventListener('hashchange',route)