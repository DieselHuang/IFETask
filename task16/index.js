/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
  var city = document.getElementById("aqi-city-input").value.trim();
  var num = document.getElementById("aqi-value-input").value.trim();

  if(!/^[a-zA-Z\u4E00-\u9FA5]+$/.test(city)) {
		alert("请按规范输入城市名：必须为中英文字符且内不含空格！");
		return;
  }
  if(!/\d+/.test(num)) {
		alert("空气质量指数必须为整数！");
		return;
  }
  num = Number(num);
  aqiData[city] = num;
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
	var table = document.getElementById("aqi-table");
	var items = "<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>";
	var flag = false;
	for(var key in aqiData) {
		if(aqiData.hasOwnProperty(key)) {
			items += ("<tr><td>" + key + "</td><td>" + aqiData[key] + "</td><td><button>删除</button></td></tr>");
			if(!flag) {
				flag = true;
			}
		}
	}
	if(flag) {
		table.innerHTML = items;
	}
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
  addAqiData();
  renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(event) {
  // do sth.
	var city = event.target.parentElement.parentElement.children[0].innerHTML;
	delete aqiData[city];
  renderAqiList();
}

function init() {
	// 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
	var addBtn = document.getElementById("add-btn");
	addBtn.onclick = addBtnHandle;
	// 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
	var table = document.getElementById("aqi-table");
	table.addEventListener("click", function(e) {
		if (e.target && e.target.nodeName === "BUTTON") {
			delBtnHandle(e);
		}
	});
}

init();