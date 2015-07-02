# 说明

非常简单的一个记录密码的应用，基本功能：

- 新增一条密码记录；
- 查看全部密码；
- 搜索与排序；
- 设置显示的列；
- 导出密码列表文件。


# 启动

－ `npm install`, `bower install` 下载完相关依赖；
－ `node server.js`

# 说明

数据存储是使用 Bourne 模拟数据库； JSON 格式；

导出功能，暂只支持导出 JSON 形式； 

关于中英切换功能，做了个简单版本，比较傻的实现，但可用。

单元测试仅能跑得通，没有怎么写测试用例... 

涉及： Angular, Bootstrap, LESS, Karma, Jquery, Nodejs, Express, Bourne;

# Bug

第一次使用时候的第一条记录可能有问题，id 为 null, 手动改了它；