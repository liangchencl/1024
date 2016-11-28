/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-11-28 10:18:29
 * @version $Id$
 */
// 获取距离顶部的距离，可以根据规律看出：
// id="grid-container-1-0" 距离顶部的距离是20px + 100px + 20px
// id="grid-container-2-0" 距离顶部的距离是20px + 100px + 20px + 100px + 20px
// 所以 规律就是 20 + 120*i
// 同样 距离左边的距离也是20 + 120*j 
function getPosTop(i,j){
	return 20 + i * 120
}

function getPosLeft(i,j){
	return 20 + j * 120
}

// 获取背景颜色 数字不同背景颜色也不同
function getBgColor(n){
	switch (n){
		case 2 :return "#eee4da";break;
		case 4:return "#ede0c8";break;
		case 8:return "#f2b179";break;
		case 16:return "#f59563";break;
		case 32:return "#f67c5f";break;
		case 64:return "#f65e3b";break;
		case 128:return "#edcf72";break;
		case 256:return "#edcc61";break;
		case 512:return "#9c0";break;
		case 1024:return "#33b5e5";break;
		case 2048:return "#09c";break;
		case 4096:return "#a6c";break;
		case 8192:return "#93c";break;
	}
	return "#000"
}

// 设置文字颜色
function getNumClolr(n){
	if(n <=4){
		return "#776e65"
	}else{
		return "#fff"
	}
}

// 移动的动画
function showAnimate(formx,formy,tox,toy){
	var NumberCell = $("#number-cell-"+formx+"-"+formy);
	NumberCell.animate({
		left:getPosLeft(tox,toy),
		top:getPosTop(tox,toy)
	},200)
}

// 判断随机生成的数字的位置是否重合了。
function nospace(board){
	for( var i = 0 ; i < 4 ; i ++ )
		for( var j = 0 ; j < 4 ; j ++ )
			if( board[i][j] == 0 )
			return false;
	return true;
}

// 随机生成数字
function generateOneNumber(){
	if(nospace(board)){
		return false
	}else{
		// 随机位置 二维数组 board[i][j] i和j的取值范围都是0到3
		var randx = parseInt(Math.floor(Math.random()*4)); // 先是随机数*4 就是0到4之间但小于4，然后向下取整范围是0--3;然后转换成数字类型
		var randy = parseInt(Math.floor(Math.random()*4));

		while(true){
			if(board[randx][randy] == 0){
				break;
			}else{
				randx = parseInt(Math.floor(Math.random()*4));
				randy = parseInt(Math.floor(Math.random()*4));
			}
		}
		// 取随机数
		var randnumber = Math.random() < 0.5 ? 2 : 4;
		var theNumberCell = $("#number-cell-"+randx+"-"+randy);

		// 随机数
		board[randx][randy] = randnumber ;
		// 赋值
		theNumberCell.text(randnumber);
		// 给样式
		theNumberCell.css("background",getBgColor(randnumber));
		theNumberCell.css("color",getNumClolr(randnumber));
		theNumberCell.animate({
			width:"100px",
			height:"100PX",
			top:getPosTop(randx,randy),
			left:getPosLeft(randx,randy)
		},50)
		return true;
	}
}


// 判断列的左面是否有障碍物 最左边的第0列是不能左移动的 所以i的值是从col1+1 开始的
function noBlock(row,col1,col2,board){
	for(var i = col1+1;i<col2;i++){
		// 判断第row行的第i列是不是为空，如果不为空，则表示有障碍物，则不能左移动
		if(board[row][i] != 0){
			return false;
		}
	}
	return true;
}

