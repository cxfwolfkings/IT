var hkey_root = "HKEY_CURRENT_USER";
var hkey_path = "\\Software\\Microsoft\\Internet Explorer\\PageSetup\\";
var hkey_key;
// 页面设置
function setupPage() {
	try {
		// 设置打印页的边距和页眉页脚
		var RegWsh = new ActiveXObject("WScript.Shell");
		hkey_key = "header";
		RegWsh.RegWrite(hkey_root + hkey_path + hkey_key, "");
		hkey_key = "footer";
		RegWsh.RegWrite(hkey_root + hkey_path + hkey_key, "");
		hkey_key = "margin_left";
		RegWsh.RegWrite(hkey_root + hkey_path + hkey_key, "0"); //0.39相当于页边距设置为9.91
		hkey_key = "margin_right";
		RegWsh.RegWrite(hkey_root + hkey_path + hkey_key, "0");
		hkey_key = "margin_top";
		RegWsh.RegWrite(hkey_root + hkey_path + hkey_key, "0.39");
		hkey_key = "margin_bottom";
		RegWsh.RegWrite(hkey_root + hkey_path + hkey_key, "0.39");
	$("input[type=text]").each(function(){
		var objTextBox=$(this);
		objTextBox.removeClass("addborder").addClass("removeborder");
	})
	} catch(e) {
		alert("打印设置失败!");
	}
}
/**
 * 打印预览
 */
function doPrintView() {

	document.getElementById('webrowser').ExecWB(7, 1);
}


// var currrentUrl = location.href;
//var formName = currrentUrl.substring(currrentUrl.indexOf('?x=')+3);
//$('iframe').attr('src', '../form/'+formName+'.html');

$('#btnPrint').click(function() {
	$('.footer').hide();
	window.doPrint();
	$('.footer').show();
	
});
$('#btnPrint1').click(function() {
	$('.footer').hide();
	window.doPrint1();
	$('.footer').show();
	
});
$('#btnSign').click(function() {
	//var height = $('iframe').height()*$('.signature').length;
	//$('iframe').height(height);
	//window.doSign();
	//$('#btnSign').attr('disabled', true);
	//setFrameHeight();
});

$('#btnClear').click(function() {
	window.doClear();
});
$('#btnClear1').click(function() {
	window.doClear1();
});
$('#btnReturn').click(function(){
	window.location.href='../index.html';
})
function doPrint() {
	try {
		// 设置打印页的边距和页眉页脚
		//setupPage();
		$("input[type='text']").each(function(){
			var objTextBox=$(this);
			objTextBox.removeClass("addborder").addClass("removeborder");
			//objTextBox.css("background","#CCC");
		});
		$("body").css({"margin-left":"10px","margin-right":"10px"});
				$(".signature img").hide();
				$("#split").hide();

		//by Jackie 
		$('.jSignature').width('150px');
		$('.Signature').css('width','150px');
		$('.jSignature').height('37.5px');
		$('.Signature').css('height','37.5px');
		$('.left').css('margin-top','6px');
		//by Jackie
				
		doPrintView();
		$("body").css({"margin-left":"100px","margin-right":"100px"});
		$("input[type=text]").each(function(){
			var objTextBox=$(this);
			objTextBox.removeClass("removeborder").addClass("addborder");
		});
		$("#split").show();
		$("#signature").show();
		$(".signature img").css("bottom","20px");
		
		//by Jackie
		$('.jSignature').width('400px');
		$('.jSignature').height('100px');
		$('.left').css('margin-top','62px');
		//by Jackie
	} catch(e) {
		alert("打印失败!");
	}
}
function doPrint1() {
	try {
		// 设置打印页的边距和页眉页脚
		//setupPage();
		$("input[type='text']").each(function(){
			var objTextBox=$(this);
			objTextBox.removeClass("addborder").addClass("removeborder");
			//objTextBox.css("background","#CCC");
		});
		$("body").css({"margin-left":"0px","margin-right":"0px"});
				$(".signature img").hide();
				$("#split").hide();

		//by Jackie 
		$('.jSignature').width('150px');
		$(".signature").css("width","150px");
		//$(".signature").css("margin-left","60px");
		$('.jSignature').height('37.5px');
		$('.Signature').css('height','37.5px');
		$('.left').css('margin-top','6px');
		// $('.w100t1').css('width','fit-content');
		// $('.w100t2').css('width','fit-content');
		//by Jackie
				
		doPrintView();
		$("body").css({"margin-left":"100px","margin-right":"100px"});
		$("input[type=text]").each(function(){
			var objTextBox=$(this);
			objTextBox.removeClass("removeborder").addClass("addborder");
		});
		$("#split").show();
		$("#signature").show();
		$(".signature img").css("bottom","20px");
		
		//by Jackie
		$('.jSignature').width('300px');
		$('.jSignature').height('75px');
		//$('.left').css('margin-top','62px');
		//by Jackie
	} catch(e) {
		alert("打印失败!");
	}
}

//签名
function doSign() {
	$.each($(".signature"), function(idx, val) {
		var targetID = val.getAttribute("id");
		var bwidth=$(".signature").width();
		$("#" + targetID).jSignature({
			color: "#00f",
			lineWidth: 0.5,
			width:bwidth
		});
	});
	$(".signature img").css("bottom","25px");
	$(".signature img").css("left","40px");
	
}

function doClear() {
	$(".signature").empty();
	$(".signature").jSignature({
		color: "#00f",
		lineWidth: 0.5
	});
	//$("#signature").css("width","350px");
	$(".signature img").css("bottom","25px");
	$(".signature img").css("left","40px");
	

}
function doClear1() {
	$(".signature").empty();
	$(".signature").css("width","300px");
	$(".signature").jSignature({
		color: "#00f",
		lineWidth: 0.5,
		width: "300px"}
	);
	$(".signature img").css("bottom","25px");
	$(".signature img").css("left","40px");
	
}
$(document).ready(function(){
	window.doSign();
})
