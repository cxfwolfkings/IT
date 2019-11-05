<?php
/**
  * wechat php test
  */
  
//define your token
define("TOKEN", "CharlesAndStar");
$wechatObj = new WechatCallbackapiTest();
//$wechatObj->valid();

if (!isset ($_GET["echostr"])) {
	$wechatObj->responseMsg();
} else {
	$wechatObj->valid();
}

class WechatCallbackapiTest {
	
	public function valid() {
		$echoStr = $_GET["echostr"];
		//valid signature, option
		if ($this->checkSignature()) {
			echo $echoStr;
			exit;
		}
	}

	public function responseMsg() {
		//get post data, May be due to the different environments
		$postStr = $GLOBALS["HTTP_RAW_POST_DATA"];

		//extract post data
		if (!empty ($postStr)) {

			$postObj = simplexml_load_string($postStr, 'SimpleXMLElement', LIBXML_NOCDATA);
			$fromUsername = $postObj->FromUserName;
			$toUsername = $postObj->ToUserName;
			$keyword = trim($postObj->Content);
			$type = trim($postObj->Event);
			$time = time();
			$textTpl = "";
			if ($type == "subscribe") {
				$textTpl = "";
				$resultStr = sprintf($textTpl, $fromUsername, $toUsername, $time);
				echo $resultStr;
			}
			if (!empty ($keyword)) {
				$msgType = "text";
				if (mb_substr($keyword, 0, 2, 'utf-8') == "天气") {
					$cityname = mb_substr($keyword, 2, 5, 'utf-8');
					$url = "http://v.juhe.cn/weather/index?format=2&cityname=" . $cityname . "&key=9b60ca79ae84f056ebafe2c07b5a17f3";
					$str = file_get_contents($url);
					$de_json = json_decode($str, true);
					$resultcode = $de_json['resultcode'];
					settype($resultcode, "integer");
					if ($resultcode == 200) {
						$contentStr = "城市:" . $cityname . "\n日期:" . $de_json['result']['today']['date_y'] . " " .
						$de_json['result']['today']['week'] . "\n当前温度:" .
						$de_json['result']['sk']['temp'] . "度\n今日天气:" .
						$de_json['result']['today']['weather'] . "\n今日温度:" .
						$de_json['result']['today']['temperature'] . "\n穿衣指数:" .
						$de_json['result']['today']['dressing_index'] . "\n穿衣建议:" .
						$de_json['result']['today']['dressing_advice'] . "\n紫外线强度:" .
						$de_json['result']['today']['uv_index'] . "\n洗车指数:" .
						$de_json['result']['today']['wash_index'] . "\n晨练指数:" .
						$de_json['result']['today']['exercise_index'];
					} else {
						$contentStr = $de_json['reason'];
					}

				} else {
					$contentStr = "Welcome to Charles' world!";
				}
				$resultStr = sprintf($textTpl, $fromUsername, $toUsername, $time, $msgType, $contentStr);
				echo $resultStr;
			} else {
				echo "Input something...";
			}

		} else {
			echo "";
			exit;
		}
	}

	/**
	 * 开发者通过检验signature对请求进行校验。
	 * 若确认此次GET请求来自微信服务器，就原样返回echostr参数内容，则接入生效，成为开发者成功，否则接入失败。
	 * 1）将token、timestamp、nonce三个参数进行字典序排序
	 * 2）将三个参数字符串拼接成一个字符串进行sha1加密
	 * 3）开发者获得加密后的字符串可与signature对比，标识该请求来源于微信
	 */
	private function checkSignature() {
		$signature = $_GET["signature"];
		$timestamp = $_GET["timestamp"];
		$nonce = $_GET["nonce"];

		$token = TOKEN;
		$tmpArr = array (
			$token,
			$timestamp,
			$nonce
		);
		sort($tmpArr);
		$tmpStr = implode($tmpArr);
		$tmpStr = sha1($tmpStr);

		if ($tmpStr == $signature) {
			return true;
		} else {
			return false;
		}
	}
}
?>