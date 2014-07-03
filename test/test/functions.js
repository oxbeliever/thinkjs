var should = require('should');
var assert = require('assert');
var muk = require('muk');
process.argv[2] = '/'; //命中命令行模式
require('../www/index.js');

describe('getThinkRequirePath', function(){
  it('getThinkRequirePath("Model")', function(){
    var path = getThinkRequirePath('Model');
    assert.equal(path.indexOf('lib/Lib/Core/Model.js') > -1, true);
  })
  it('getThinkRequirePath("notExistModule")', function(){
    var path = getThinkRequirePath('notExistModule');
    assert.equal(path, undefined);
  })
})

describe('thinkRequire', function(){
  it('thinkRequire is function', function(){
    assert.equal(isFunction(thinkRequire), true)
  })
  it('thinkRequire(function(){})', function(){
    var fn = thinkRequire(function(){});
    assert.equal(isFunction(fn), true);
  })
  it('thinkRequire("modulenotexist")', function(){
    var module = '';
    try{
      module = thinkRequire('modulenotexist');
    }catch(e){}
    assert.equal(module, '')
  })
  var list = [
    'Controller', 'App', 'Behavior', 'Cache', 'Db', 
    'Dispatcher', 'Filter', 'Http', 'Model', 
    'Session', 'Think', 'Valid', 'View', 'Cookie', 'WebSocket',
    'AdvModel', 'CheckResourceBehavior', 'CheckRouteBehavior',
    'DenyIpBehavior', 'LocationTemplateBehavior', 'ParseTemplateBehavior',
    'ReadHtmlCacheBehavior', 'WriteHtmlCacheBehavior', 'FileCache',
    'MemcacheCache', 'MysqlDb', 'DbSession', 'FileSession', 'MemcacheSocket',
    'MysqlSocket', 'EjsTemplate', 'RestController'
  ];
  list.forEach(function(item){
    it(item + ' is module', function(){
      var module = thinkRequire(item);
      assert.equal(isFunction(module) || isObject(module), true)
    })
  })
})

describe('inherits from base Class', function(){
  it('inherits from FileCache', function(){
    var fileCache = thinkRequire('FileCache');
    var cls = Cache('FileCache', function(){})
    assert.equal(cls.super_ === fileCache, true)
  })
  it('inherits from Cache', function(){
    var cache = thinkRequire('Cache');
    var cls = Cache(function(){})
    assert.equal(cls.super_ === cache, true)
  })
})


describe('B', function(){
  it('B(function(){})', function(){
    var fn = function(){
      return 'welefen';
    }
    assert.equal(B(fn), 'welefen')
  })
  it('B("DenyIpBehavior") = true', function(){
    assert.equal(B('DenyIp'), true)
  })
  it('B("DenyIpBehavior"), promise', function(){
    C('deny_ip', ['127.0.0.1']);
    var result = B('DenyIp', {
      ip: function(){
        return '127.0.0.1';
      },
      res: {
        end: function(){}
      }
    });
    assert.equal(isFunction(result.then), true)
  })
})

describe('C', function(){
  it('C("db_host") = "localhost"', function(){
    var host = C('db_host');
    assert.equal(host, 'localhost');
  })
  it('C("one.two") = undefined', function(){
    assert.equal(C('one.two'), undefined)
  })
  it('C("one") = undefined', function(){
    assert.equal(C('one'), undefined);
  })
  it('C("one", "welefen")', function(){
    C('one', 'welefen');
    assert.equal(C('one'), 'welefen');
  })
  it('C("one1.two", "welefen")', function(){
    C('one1.two', 'welefen');
    assert.equal(C('one1.two'), 'welefen');
    assert.equal(JSON.stringify(C('one1')), '{"two":"welefen"}')
  })
  it('C()', function(){
    var data = C();
    assert.equal(data.db_host, 'localhost');
    assert.equal(data.db_type, 'mysql');
    assert.equal(data.port, 8360)
  })
  it('C(null)', function(){
    data = C();
    C(null);
    assert.equal(C('db_host'), undefined)
    assert.equal(C('db_type'), undefined);
    assert.equal(C('port'), undefined)
    C(data);
    assert.equal(C('db_type'), 'mysql')
  })
})

describe('F', function(){
  it('F("welefen", "suredy")', function(){
    F('welefen', 'suredy');
    var value = F('welefen');
    assert.equal(value, 'suredy')
  })
  it('F("welefen", null)', function(){
    F('welefen', null);
    assert.equal(F('welefen'), null)
  })
  it('F("welefen", {})', function(){
    var data = {name: 'welefen', value: 'suredy'};
    F('welefen', data);
    assert.equal(JSON.stringify(F('welefen')), JSON.stringify(data))
  })
  it('F("welefen", "suredy", tmpPath)', function(){
    var tmp = require('os').tmpdir();
    F('welefen', 'suredy', tmp);
    var value = F('welefen', undefined, tmp);
    assert.equal(value, 'suredy')
  })
})

describe('tag', function(){
  it('all tags', function(){
    var tags = C('tag');
    assert.equal(JSON.stringify(tags), '{"app_init":[],"form_parse":[null],"path_info":[],"resource_check":["CheckResource"],"route_check":["CheckRoute"],"app_begin":["ReadHtmlCache"],"action_init":[],"view_init":[],"view_template":["LocationTemplate"],"view_parse":["ParseTemplate"],"view_filter":[],"view_end":["WriteHtmlCache"],"action_end":[],"app_end":[null]}')
  })
})


describe('A', function(){

})

describe('D', function(){

})

describe('M', function(){

})

describe('S', function(){

})

describe('L', function(){
  it('L("welefen") = welefen', function(){
    assert.equal(L('welefen'), 'welefen')
  })
  it('L() = undefined', function(){
    assert.equal(L(), undefined)
  })
})

