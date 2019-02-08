

const document_routers = (routers_json, top_level_route) => {
  const api_package = {}
  routers = []
  router_names = []
  for (let key in routers_json){
    routers.push(routers_json[key])
    router_names.push(key)
  }

  for(let i=0; i<routers.length; i++){
    router = routers[i];
    api_package[router_names[i]] = document_router(router, top_level_route)
  }
  return api_package
}



const document_router = (router, top_level_route) => {
  let route_obj;
  let path;
  const api_package = []
  for(let i=0; i<router.stack.length; i++){
      route_obj = router.stack[i].route;
      path = top_level_route + route_obj.path;
      method = route_obj.stack[0].method
      api_package.push({path, method})
  }
  return api_package
}

module.exports = document_routers;

