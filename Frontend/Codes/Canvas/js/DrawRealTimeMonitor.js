function DrawRealTimeMonitor(canvas) {
	this.ctx = canvas.getContext("2d");
	this.lineStartOffect = 20;
	this.rotateAngle1 = 0;
	this.rotateAngle2 = 0;

	this.bottleValue = {
		Values: [
			{
				Value: 0,
				IsOpen: false,
				Text: '炭黑',
			},
			{
				Value: 0,
				IsOpen: false,
				Text: '炭黑',
			},
			{
				Value: 0,
				IsOpen: false,
				Text: '炭黑',
			},
			{
				Value: 15,
				IsOpen: true,
				Text: '炭黑',
			},
			{
				Value: 0,
				IsOpen: false,
				Text: '炭黑',
			},
			{
				Value: 0,
				IsOpen: false,
				Text: '炭黑',
			},
			{
				Value: 0,
				IsOpen: false,
				Text: '炭黑',
			},
			{
				Value: 0,
				IsOpen: false,
				Text: '炭黑',
			},
			{
				Value: 0,
				IsOpen: false,
				Text: '炭黑',
			},
			{
				Value: 0,
				IsOpen: false,
				Text: '炭黑',
			},
			{
				Value: 0,
				IsOpen: false,
				Text: '炭黑',
			},
			{
				Value: 0,
				IsOpen: false,
				Text: '炭黑',
			},
			{
				Value: 0,
				IsOpen: false,
				Text: '炭黑',
			},
			{
				Value: 0,
				IsOpen: false,
				Text: '炭黑',
			},
			{
				Value: 0,
				IsOpen: false,
				Text: '炭黑',
			},
			{
				Value: 0,
				IsOpen: false,
				Text: '炭黑',
			},
			{
				Value: 0,
				IsOpen: false,
				Text: '炭黑',
			},
			{
				Value: 0,
				IsOpen: false,
				Text: '炭黑',
			},
			{
				Value: 0,
				IsOpen: false,
				Text: '炭黑',
			},
			{
				Value: 0,
				IsOpen: false,
				Text: '炭黑',
			},
			{
				Value: 0,
				IsOpen: false,
				Text: '炭黑',
			},
			{
				Value: 0,
				IsOpen: false,
				Text: '炭黑',
			},
			{
				Value: 0,
				IsOpen: false,
				Text: '炭黑',
			},
			{
				Value: 0,
				IsOpen: false,
				Text: '炭黑',
			},
			{
				Value: 0,
				IsOpen: false,
				Text: '炭黑',
			},
			{
				Value: 0,
				IsOpen: false,
				Text: '炭黑',
			},
			{
				Value: 0,
				IsOpen: false,
				Text: '炭黑',
			},
			{
				Value: 0,
				IsOpen: false,
				Text: '炭黑',
			},
			{
				Value: 0,
				IsOpen: false,
				Text: '炭黑',
			},
			{
				Value: 0,
				IsOpen: false,
				Text: '炭黑',
			},
			{
				Value: 0,
				IsOpen: false,
				Text: '炭黑',
			},
			{
				Value: 0,
				IsOpen: false,
				Text: '炭黑',
			},
			{
				Value: 0,
				IsOpen: false,
				Text: '炭黑',
			},
			{
				Value: 0,
				IsOpen: false,
				Text: '炭黑',
			},
			{
				Value: 10,
				IsOpen: true,
				Text: '物料',
			},
			{
				Value: 0,
				IsOpen: false,
				Text: '炭黑',
			},
			{
				Value: 0,
				IsOpen: false,
				Text: '炭黑',
			},
			{
				Value: 0,
				IsOpen: false,
				Text: '炭黑',
			},
			{
				Value: 0,
				IsOpen: false,
				Text: '炭黑',
			},
			{
				Value: 20,
				IsOpen: true,
				Text: '炭黑',
			},
		],
		Plate1: 100,
		Plate2: 0,
		Fan1: true,
		Fan2: false,
	};


	this.Ellipse = function (context, x, y, a, b) {
		context.save();
		var r = (a > b) ? a : b;
		var ratioX = a / r;
		var ratioY = b / r;
		context.scale(ratioX, ratioY);
		context.beginPath();
		context.arc(x / ratioX, y / ratioY, r, 0, 2 * Math.PI, false);
		context.closePath();
		context.fill();
		context.restore();
	}
	this.DrawBottle = function (x, y, width, number, value) {
		var gradient = this.ctx.createLinearGradient(x, y, x + width, y);
		gradient.addColorStop(0, 'rgb(142,196,216)');
		gradient.addColorStop(0.5, 'rgb(240,240,240)');
		gradient.addColorStop(1, 'rgb(142,196,216)');

		this.ctx.beginPath();
		this.ctx.moveTo(x, y);
		this.ctx.lineTo(x, y + 70);
		this.ctx.lineTo(x + width / 2, y + 100);
		this.ctx.lineTo(x + width, y + 70);
		this.ctx.lineTo(x + width, y);
		this.ctx.closePath();
		this.ctx.fillStyle = gradient;
		this.ctx.fill();

		// 绘制物料信息
		var gradient = this.ctx.createLinearGradient(x, y, x + width, y);
		gradient.addColorStop(0, 'rgb(194,190,77)');
		gradient.addColorStop(0.5, 'rgb(226,221,98)');
		gradient.addColorStop(1, 'rgb(194,190,77)');
		this.ctx.fillStyle = gradient;
		var material_y = 70 - value.Value / 100 * 70 + y;
		this.ctx.beginPath();
		this.ctx.moveTo(x, material_y);
		this.ctx.lineTo(x, y + 70);
		this.ctx.lineTo(x + width / 2, y + 100);
		this.ctx.lineTo(x + width, y + 70);
		this.ctx.lineTo(x + width, material_y);
		this.ctx.closePath();
		this.ctx.fill();
		// 绘制物料顶部信息
		this.ctx.fillStyle = 'rgb(243,245,139)';
		this.Ellipse(this.ctx, x + width / 2, material_y, width / 2, 2);

		// 绘制瓶子编号
		this.ctx.font = "10px '微软雅黑'";
		this.ctx.fillStyle = 'rgb(120,120,120)';
		this.ctx.textAlign = 'center';
		this.ctx.fillText(number, x + width / 2, y + 15);

		// 绘制文本
		this.ctx.font = "normal normal 13px 'Arial'";
		this.ctx.fillStyle = 'rgb(50,50,50)';
		this.ctx.textAlign = 'center';
		this.ctx.fillText(value.Text, x + width / 2, y - 7);

		// 绘制小圆圈
		if ((width / 2 - 5) > 0) {
			this.ctx.fillStyle = "rgb(255,255,255)";
			this.ctx.beginPath();
			this.ctx.arc(x + width / 2, y + 90, width / 2 - 3, 0, Math.PI * 2, true);
			this.ctx.closePath();
			this.ctx.fill();
			if (value.IsOpen) {
				this.ctx.strokeStyle = 'rgb(69,140,10)';
			}
			else {
				this.ctx.strokeStyle = 'rgb(180,180,180)';
			}
			this.ctx.lineWidth = 2;
			this.ctx.stroke();
			if ((width / 2 - 10) > 0) {
				this.ctx.beginPath();
				if (value.IsOpen) {
					this.ctx.fillStyle = 'rgb(69,140,10)';
				}
				else {
					this.ctx.fillStyle = 'rgb(180,180,180)';
				}
				this.ctx.arc(x + width / 2, y + 90, width / 2 - 7, 0, Math.PI * 2, true);
				this.ctx.closePath();
				this.ctx.fill();
			}
		}

		// 绘制瓶子顶部信息
		this.ctx.lineWidth = 1;
		this.ctx.fillStyle = "rgb(151,232,244)";
		this.Ellipse(this.ctx, x + width / 2, y, width / 2, 2);

		//ctx.fillRect(x, y, width, 80);
	}

	this.DrawBottleLine = function (x, y, width, outX, left) {
		this.ctx.save();
		this.ctx.lineWidth = 3;
		// 绘制20条线的静态情况
		for (var jj = 0; jj < 20; jj++) {
			this.ctx.beginPath();
			this.ctx.save();
			this.ctx.strokeStyle = 'rgb(190,190,190)';
			this.ctx.moveTo(x + width / 2 + jj * width, y - this.lineStartOffect);
			this.ctx.lineTo(x + width / 2 + jj * width, 250);

			this.ctx.lineTo(x + width * 10, 250);
			this.ctx.lineTo(x + width * 10, 350);
			this.ctx.lineTo(x + width * 10, 450);
			this.ctx.lineTo(outX, 450);
			this.ctx.lineTo(outX, 480);
			this.ctx.stroke();
			this.ctx.restore();
		}
		// 绘制20条线的动态情况
		for (var jj = 0; jj < 20; jj++) {
			var isMoving = false;
			if (left) {
				isMoving = this.bottleValue.Values[jj].IsOpen;
			}
			else {
				isMoving = this.bottleValue.Values[jj + 20].IsOpen;
			}

			this.ctx.beginPath();
			this.ctx.save();
			this.ctx.strokeStyle = 'rgb(190,190,190)';
			this.ctx.moveTo(x + width / 2 + jj * width, y - this.lineStartOffect);
			this.ctx.lineTo(x + width / 2 + jj * width, 250);

			this.ctx.lineTo(x + width * 10, 250);
			this.ctx.lineTo(x + width * 10, 350);
			this.ctx.lineTo(x + width * 10, 450);
			this.ctx.lineTo(outX, 450);
			this.ctx.lineTo(outX, 480);
			if (isMoving) {
				this.ctx.setLineDash([10, 10]);
				this.ctx.strokeStyle = 'rgb(0,0,0)';
				this.ctx.stroke();
				this.ctx.restore();
			}
		}

		this.ctx.restore();
		this.ctx.save();
		gradient = this.ctx.createLinearGradient(x + width * 10 - 50, 350, x + width * 10 + 50, 350);
		gradient.addColorStop(0, 'rgb(6,187,205)');
		gradient.addColorStop(0.5, 'rgb(92,233,251)');
		gradient.addColorStop(1, 'rgb(6,187,205)');
		this.ctx.fillStyle = gradient;
		this.ctx.fillRect(x + width * 10 - 50, 350, 100, 15);
		this.ctx.fillStyle = 'rgb(173,241,253)';
		this.Ellipse(this.ctx, x + width * 10, 350 - 1, 50, 2);

		this.ctx.fillStyle = 'rgb(0,179,213)';
		this.ctx.beginPath();
		this.ctx.moveTo(x + width * 10 - 45, 365);
		this.ctx.lineTo(x + width * 10 + 45, 365);
		this.ctx.lineTo(x + width * 10, 400);
		this.ctx.closePath();
		this.ctx.fill();
		this.ctx.restore();

		this.ctx.lineWidth = 1;
		this.ctx.fillStyle = 'rgb(50,50,50)';
		this.ctx.textAlign = 'center';
		if (left) {
			this.ctx.fillText(this.bottleValue.Plate1.toString(), x + width * 10, 380);
		}
		else {
			this.ctx.fillText(this.bottleValue.Plate2.toString(), x + width * 10, 380);
		}

		this.ctx.restore();
	}

	this.DrawFans = function (x, y, rotateAngle) {
		this.ctx.save();
		this.ctx.translate(x, y);
		this.ctx.fillStyle = 'rgb(6,187,205)';
		this.ctx.rotate(rotateAngle);
		for (var j = 0; j < 4; j++) {
			this.ctx.rotate(Math.PI / 2);
			this.ctx.beginPath();
			this.ctx.moveTo(-2, 0);
			this.ctx.lineTo(2, 0);
			this.ctx.lineTo(2, -15);
			this.ctx.lineTo(7, -15);
			this.ctx.lineTo(7, -35);
			this.ctx.lineTo(-7, -35);
			this.ctx.lineTo(-7, -15);
			this.ctx.lineTo(-2, -15);
			this.ctx.closePath();
			this.ctx.fill();
		}

		this.ctx.resetTransform();
		this.ctx.restore();
	}

	this.DrawCrock = function (x, y) {
		this.ctx.save();
		var gradient = this.ctx.createLinearGradient(x, y, x + 100, y);
		gradient.addColorStop(0, 'rgb(6,187,205)');
		gradient.addColorStop(0.5, 'rgb(92,233,251)');
		gradient.addColorStop(1, 'rgb(6,187,205)');
		this.ctx.fillStyle = gradient;
		this.ctx.fillRect(x, y, 100, 20);
		this.ctx.fillStyle = 'rgb(173,241,253)';
		this.Ellipse(this.ctx, x + 50, y - 1, 50, 2);
		this.ctx.restore();

		this.ctx.save();
		this.ctx.strokeStyle = 'rgb(0,179,213)';
		this.ctx.beginPath();
		this.ctx.lineWidth = 8;
		this.ctx.moveTo(x + 2, y + 20);
		this.ctx.lineTo(x + 2, y + 25);
		this.ctx.lineTo(x - 50, y + 45);
		this.ctx.lineTo(x - 50, y + 125);
		this.ctx.lineTo(x + 150, y + 125);
		this.ctx.lineTo(x + 150, y + 45);
		this.ctx.lineTo(x + 98, y + 25);
		this.ctx.lineTo(x + 98, y + 20);
		this.ctx.stroke();
		this.ctx.restore();
	}

	this.RefreshUI = function () {
		var canvasWidth = canvas.clientWidth;
		var canvasHeight = canvas.clientHeight;
		this.ctx.clearRect(0, 0, canvasWidth, canvasHeight);
		var everyBottonWidth = (canvasWidth - 20) / 40;


		// 绘制动态的虚线信息
		this.DrawBottleLine(10, 110, everyBottonWidth, 10 + everyBottonWidth * 20 - 20, true);
		this.DrawBottleLine(10 + everyBottonWidth * 20, 110, everyBottonWidth, 10 + everyBottonWidth * 20 + 20, false);

		// 绘制40个小罐子
		for (var i = 0; i < 40; i++) {
			this.DrawBottle(i * everyBottonWidth + 10, 20, everyBottonWidth - 2, i.toString(), this.bottleValue.Values[i]);
		}

		this.DrawCrock(10 + everyBottonWidth * 20 - 50, 480);
		// 绘制小风扇
		this.DrawFans(10 + everyBottonWidth * 20 - 40, 550, this.rotateAngle1);
		this.DrawFans(10 + everyBottonWidth * 20 + 40, 550, this.rotateAngle2);
	}

	this.TimerCheck = function () {
		this.lineStartOffect--;
		if (this.lineStartOffect <= 0) {
			this.lineStartOffect = 20;
		}
		if (this.bottleValue.Fan1) {
			this.rotateAngle1 += Math.PI * 2 / 180;
			if (this.rotateAngle1 >= Math.PI * 2) {
				this.rotateAngle1 = 0;
			}
		}
		if (this.bottleValue.Fan2) {
			this.rotateAngle2 += Math.PI * 2 / 180;
			if (this.rotateAngle2 >= Math.PI * 2) {
				this.rotateAngle2 = 0;
			}
		}
	}
}