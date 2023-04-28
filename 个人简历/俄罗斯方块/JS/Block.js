(function () {
  window.Block = function () {
    //得到随机的方块
    //第一步罗列所有的类型
    var allType = ["S", "T", "O", "L", "J", "I", "Z"];
    //第二步从所有的类型中随机得到一种
    this.type = allType[parseInt(Math.random() * allType.length)];
    //第三步得到随机的类型方块，然后通过这个类型获取当前类型所有形状的总数量，因为不同的类型，形状数量不同。比如o只有一种i有两种，L有四种
    this.allDir = fangkuai[this.type].length;
    //第四步通过当前的allDir的length随机得到不同的数字
    this.dir = parseInt(Math.random() * this.allDir);
    //第五步得到随机方块
    this.code = fangkuai[this.type][this.dir];
    //当前初始行
    this.row = 0;
    //当前初始列,因为要居中显示，所以列要为4
    this.col = 4;
  };
  Block.prototype.render = function () {
    //reder函数渲染四行四列的方块
    for (i = 0; i < 4; i++) {
      for (var j = 0; j < 4; j++) {
        //如果4*4的矩形阵中某一项不是0，就说明有颜色，渲染这个颜色
        if (this.code[i][j] != 0) {
          game.setColor(i + this.row, j + this.col, this.code[i][j]); //要加上当前的row和col，因为当前4*4矩形要渲染在中间
 
        }
      }
    }
  };
  Block.prototype.check = function (row, col) {
    //check函数的roe,col代表你要校验地图的位置
    //判断能力方法，判读的是对应位置的方块和地图是否有都为0的情况如果有则true如果没有则false，false代表没有重合
    for (var i = 0; i < 4; i++) {
      for (var j = 0; j < 4; j++) {
        if (this.code[i][j] != 0 && game.map.mapCode[i + row][j + col] !== 0) {
          return false;
        }
      }
    }
    return true;
  };
  //方块下落，判断当前方块能否下落
  Block.prototype.checkDown = function () {
    //判断当前地图位置和自己方块位置是否有重合，this.row+1指的是预判断
    //预判断就是在下一次方块将要到达的位置是否有对应的地图不为0
    if (this.check(this.row + 1, this.col)) {
      this.row++;
    } else {
      //下落倒地的状态，渲染预览框的方块
      game.block = game.nextBlock;
      //让预览框的方块渲染新的
      game.nextBlock=new Block()
      //方块到底了，然后渲染到地图的code中
      this.renderMap();
      //判断是否可以消行
      game.map.checkRemove();
      //进行判断是否游戏结束
      this.checkOver();
    }
  };
  //判断是否能够向左移动，如果可以则移动
  Block.prototype.checkLeft = function () {
    //判断是否可以向左
    if (this.check(this.row, this.col - 1)) {
      this.col--;
    }
  };
  //判断是否能够向右移动，如果可以则移动
  Block.prototype.checkRight = function () {
    //判断是否可以向右
    if (this.check(this.row, this.col + 1)) {
      this.col++;
    }
  };
  Block.prototype.checkBlockEnd = function () {
    //使用while循环,如果当前的check返回的是true则代表能够下移，继续让row++
    while (this.check(this.row + 1, this.col)) {
      //改变方向
      this.row++;
    }
  };
  //方块的旋转
  Block.prototype.checkRot = function () {
    //备份旧的形状方向
    var oldDir = this.dir;
    //改变新的

    this.dir++;
    //判断如果当前dir大于了最后一种方向，回到第1种状态
    if (this.dir > this.allDir - 1) {
      this.dir = 0;
    }
    //改变方向之后，渲染新的方块方向
    this.code = fangkuai[this.type][this.dir];
    //渲染之后的存放快需要判断，是否有能力进行渲染
    if (!this.check(this.row, this.col)) {
      //如果非
      //进入这里说明重合，违规了，打回原形
      this.dir = oldDir;
      //在此渲染方块
      this.code = fangkuai[this.type][this.dir];
    }
  };
  //将已经到底的方块渲染到地图中
  Block.prototype.renderMap = function () {
    for (var i = 0; i < 4; i++) {
      for (var j = 0; j < 4; j++) {
        //将已有的方块渲染到Map类的mapCode上
        if (this.code[i][j] !== 0) {
          //改变地图上的mapCode数据
          game.map.mapCode[this.row + i][this.col + j] = this.code[i][j];
        }
      }
    }
  };
  Block.prototype.checkOver = function () {
    for (var i = 0; i < 12; i++) {
      if (game.map.mapCode[0][i] != 0) {
        clearInterval(game.timer);
        alert("游戏结束！当前您的得分为："+game.score);
      }
    }
  };
})();
