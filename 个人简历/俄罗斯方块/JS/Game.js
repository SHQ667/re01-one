(function () {
  window.Game = function () {
    //设置行和列数
    this.row = 20;
    this.col = 12;
    //初始化
    this.init();
    //实例方块
    this.block = new Block();
    //实例下一个方块
    this.nextBlock = new Block();
    //实例地图
    this.map=new Map(this)
    //启动定时器
    this.start()
    //事件监听
    this.bindEvent()
    //分数
    this.score = 0
    //速度
    this.during=30
  };
  Game.prototype.init = function () {
    //初始化大表格
    
    var $table = $("<table></table>");
    $table.addClass("tab1")
    //渲染表格
    for (var i = 0; i < this.row; i++) {
      //创建tr
      var $tr = $("<tr></tr>");
      for (var j = 0; j < this.col; j++) {
        //创建td
        var $td = $("<td></td>");
        $td.appendTo($tr);
      }
      $tr.appendTo($table);
    }
    //初始化预览窗口
    var $table2 = $("<table></table>");
    $table2.addClass("tab2");
    for (var i = 0; i < 4; i++){
      //创建tr
      var $tr2 = $("<tr></tr>");
     
      for (var j = 0; j < 4; j++){
           //创建td
        var $td2 = $("<td></td>");
        $td2.appendTo($tr2);
        }
         $tr2.appendTo($table2);
    }
    
    $($table).appendTo("body");
    $($table2).appendTo("body");
 
    
  };
  Game.prototype.setColor = function (row, col, num) {
    //给对应的有颜色的方块添加类名
    $("tr").eq(row).children("td").eq(col).addClass("c" + num);
  };
  Game.prototype.setNextColor = function (row,col,num) {
    //给对应的有颜色的方块添加类名
    for (var i = 0; i < 4; i++){
      for (var j = 0; j < 4; j++){
        if (this.nextBlock.code[i][j] != 0) {
          $(".tab2")
            .find("tr")
            .eq(i)
            .children("td")
            .eq(j)
            .addClass("c" + this.nextBlock.code[i][j]);
        }
      }
    }
    $(".tab2")
      .find("tr")
      .eq(row)
      .children("td")
      .eq(col)
      .addClass("c" + num);
  }
  //清屏功能
  Game.prototype.clear = function () {
    for (var i = 0; i < this.row; i++) {
      for (var j = 0; j < this.col; j++) {
      $(".tab1").find("tr").eq(i).children("td").eq(j).removeClass();
      }
    }
    for (var i = 0; i <4; i++) {
      for (var j = 0; j < 4; j++) {
        $(".tab2").find("tr").eq(i).children("td").eq(j).removeClass();
      }
    }
  };
  Game.prototype.bindEvent = function () {
    //备份
    var self = this;
    $(document).keydown(function (event) {
      if (event.keyCode == 37) {//37代表左键
        //判断是否有向左移动的能力
        self.block.checkLeft()
      } else if (event.keyCode == 39) {//39代表右键
        //判断是否有向右移动的能力
        self.block.checkRight();
      } else if (event.keyCode == 32) {//32代表空格
        //一键到底，空格到底
        self.block.checkBlockEnd()
      } else if (event.keyCode == 38) {//38代表键盘上,用来切换方向
        self.block.checkRot()
      }
    })
}
  Game.prototype.start = function () {
    var self = this;
    //帧编号
    this.f=0
    this.timer = setInterval(function () {
      self.f++
      //渲染帧编号
      document.getElementById("f").innerHTML=("帧编号：")+self.f
      //清屏
      self.clear();
      //渲染方块
      self.block.render();
      //渲染预览方块
      self.setNextColor();
      //渲染地图
      self.map.render(self);
      //下落
      self.f % self.during == 0 && self.block.checkDown();
    },20)
  }
})()
