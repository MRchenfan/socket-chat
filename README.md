# socket.io 聊天

## 原理和逻辑
1. 登录和new一个客户端服务
2. 登录聊天系统 => 连接服务器 => 拉取自己和好友信息、聊天纪录到本地


## api(events)

### Server => Client
disconnect => 
login => info.login
logout => info.logout
message => message, info.message

### Client => Server


## log

### 2017/3/2
1. 早上起床后进行了一些修改和完善


### 2017/3/1
2月只有28天。。。。

1. 调试的时候遇到两个问题
 - localhost 和 127.0.0.1属于跨域
 - $.ajax当跨域的时候有严格的限制，一是crossoriginallow不能直接设置为*，而是需要添加额外的设置

 ```js
 	// Client =>
	$.ajaxSetup({
			crossDomain: true,
			xhrFields: {
				withCredentials: true
			}
		});

	// Server =>
	app.use('*', function (req, res, next) {

	  res.header("Access-Control-Allow-Origin", config.devHost);
	  res.header("Access-Control-Allow-Credentials", true);
	  res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
	  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
	  res.header("X-Powered-By",' 3.2.1');
	  if(req.method == "OPTIONS") res.send(200);/*让options请求快速返回*/
	  else  next();
	});
 ```

2. 用户登录和注册功能基本完成
3. 添加好友后台部分完成，前端页面需要刷新？
4. 认为这样添加好友不行，需要通过socket给对方发送一个特殊的消息，然后等待对方确认后才能添加成功
当然也就是陷入越来越复杂的情况下了，我目前在浏览器端只是为了实现基本功能，还要写移动端，全部功能先到移动端实现

bug: 
1. mongodb unique关键字实效？
2. 页面卡顿

### 2017/2/28
1. 搞定好友和历史消息的问题
2. 将好友列表和主要逻辑分开
3. 学会拆分组件，简化逻辑

### 2017/2/25
1. 用户登录系统
	因为本地开发使用bs建立的一个端口和后台端口不同，所以需要跨域访问。
2. 想写个简单的demo，但是越来越复杂
3. ui应该和我要写的客户端分离开，也就是说m-v分离
4. 越想越乱，都不知道从何起步

### 2017/2/24
1. 聊天简单界面
2. 点击好友列表可以刷新聊天面板
	- 如何刷新？每次都要重新刷新消息记录？每次刷新20条，然后上拉刷新，分页的形式？
3. 

### 2017/2/23
1. 基本的聊天后端功能写完了
2. 前端测试页面

### 2017/2/22
1. 搭建开发环境
2. 简单通讯，用户注册