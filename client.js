(function() {
  var dep;
  dep = {
    map: {},
    loaded: {}
  };
  dep.defineMap = function(map) {
    return dep.map = map;
  };
  dep.provide = function(module) {
    return dep.loaded[module] = true;
  };
  dep.require = function(module) {
    var req, request, script;
    if (dep.loaded[module]) {
      return;
    }
    if (!(dep.map[module] != null)) {
      throw "No mapped module named " + module;
    }
    request = new XMLHttpRequest();
    request.open('GET', dep.map[module]);
    req = new XMLHttpRequest();
    req.open('GET', dep.map[module], false);
    req.send();
    if (req.status === 200) {
      script = document.createElement('script');
      script.text = req.responseText;
      return document.head.appendChild(script);
    } else {
      throw "module " + module + " cannot be loaded from " + dep.map[module];
    }
  };
  window.dep = dep;
}).call(this);
