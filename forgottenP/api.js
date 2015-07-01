var express = require('express');
var Bourne = require('bourne');
var bodyParser = require('body-parser');

var db = new Bourne('data.json');

// 注意这种写法，体会；
// 返回的是 rounter对象
var router = express.Router();


// 注册中间件bodyParser
router.use(bodyParser.json());

// 设计路由
router.route('/record')
	// 获取全部记录
	.get(function(req, res){
		db.find(function(err, data){
			res.json(data);
		});
	})
	// 新建一条记录
	.post(function(req, res){
		var record = req.body;

		db.insert(record, function(err, data){
			res.json(data);
		});
	})

router
	// 处理参数
	.param('id', function(req, res, next){
		// 有可能是post形式，也有可能是get形式
		req.dbQuery = {'id': parseInt(req.params.id, 10)};
		next();
	})

	.route('/record/:id')
	
	// 获取单条记录
	.get(function(req, res){
		db.findOne(req.dbQuery, function(err, data){
			res.json(data);
		})
	})
	
	// 更新单条记录
	.put(function(req, res){
		var record = req.body;

		// 这两个参数是angular带来的
		delete record.$promise;
		delete record.$resolved;

		db.update(req.dbQuery, record, function(err, data){
			res.json(data[0]);
		});
	})
	
	// 删除单条记录
	.delete(function(req, res){
		db.delete(req.dbQuery, function(){
			res.json(null)
		})
	})

// 下载文件
router.route('/download')
	.get(function(req, res){
		db.find(function(err, data){
			var result = [];
			var val;

			for (var i = 0; i < data.length; i++) {
				val = data[i];
				result.push({
					id: val.id,
					name: val.name[0],
					password: val.password[0],
					category: val.category[0],
					level: val.level && val.level[0] || '',
					desc: val.desc[0]
				})
			};
			res.attachment('data.json');
			res.send(result)
		});
	})


// 导出
module.exports = router;

