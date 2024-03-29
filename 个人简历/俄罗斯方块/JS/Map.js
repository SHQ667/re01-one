//地图类
(function () {
    window.Map = function () {
      //地图矩阵
      this.mapCode = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
      ];
    }
    Map.prototype.render=function(mapGame){
        //渲染地图
        for (var i = 0; i < mapGame.row; i++){
            for (var j = 0; j < mapGame.col; j++){
                if (this.mapCode[i][j] != 0) {
                    game.setColor(i,j,this.mapCode[i][j])
                }
            }
        }
    }
    Map.prototype.checkRemove = function () {
        //判断当前的mapCode是否该消行
        //消行规则：当前的mapCode数组的每一项如果不是0了，就说明该消行了
        for (var i = 0; i < 20; i++){
            //遍历地图数组进行判断
            if (this.mapCode[i].indexOf(0) == -1) {
                //删除这一行
                this.mapCode.splice(i, 1)
                //删除一行补一行
                this.mapCode.unshift([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
                //分数增加,根据不同速度决定加多少分数
                game.score += 0;
                if (game.during <= 30 && game.during >= 20) {
                  game.score += 10;
                } else if (game.during <20 && game.during >= 10) {
                      game.score+=20
                } else {
                    game.score+=30
                }
                  
                  //渲染分数
                  document.getElementById("score").innerHTML =
                    "分数：" + game.score;
                if (game.score % 100 == 0) {
                    game.during -= 5
                    if (game.during <= 0) {
                        game.during=1
                    }
                }
            }
        }
    }
})()