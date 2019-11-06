<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html>
<html lang="zh-cn">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- 上述3个meta标签*必须*放在最前面，任何其他内容都*必须*跟随其后！ -->
	<title><?php echo ($title); ?></title>
	<link href="/wxdh2/Public/Css/bootstrap.min.css" rel="stylesheet">
	<style type="text/css">
		body {
            color: #5a5a5a;
        }
		/* 轮播广告 */
        .carousel {
            height: 300px;
            margin-bottom: 60px;
        }
		.carousel .item {
            height: 300px;
            background-color: #000;
        }
        .carousel .item img {
            width: 100%;
        }
		.carousel-caption {
            z-index: 10;
        }
        .carousel-caption p {
            margin-bottom: 20px;
            font-size: 20px;
            line-height: 1.8;
        }
        /* 简介 */
        .summary {
            padding-right: 15px;
            padding-left: 15px;
        }
        .summary .col-md-4 {
            margin-bottom: 20px;
            text-align: center;
        }
        /* 特性 */
        .feature-divider {
            margin: 40px 0;
        }
        .feature {
            padding: 30px 0;
        }
        .feature-heading {
            font-size: 50px;
            color: #2a6496;
        }
        .feature-heading .text-muted {
            font-size: 28px;
        }
        /* 响应式布局 */
        @media (max-width: 768px) {
            .summary {
                padding-right: 3px;
                padding-left: 3px;
            }
            .carousel {
                height: 300px;
                margin-bottom: 30px;
            }
            .carousel .item {
                height: 300px;
            }
            .carousel img {
                min-height: 300px;
            }
            .carousel-caption p {
                font-size: 16px;
                line-height: 1.4;
            }
            .feature-heading {
                font-size: 34px;
            }
            .feature-heading .text-muted {
                font-size: 22px;
            }
        }
        @media (min-width: 992px) {
            .feature-heading {
                margin-top: 120px;
            }
        }
	</style>
</head>
<body>
	<!-- 顶部导航 -->
	<div class="navbar navbar-inverse navbar-default" role="navigation" id="menu-nav">
	    <div class="container">
	        <div class="navbar-header">
	            <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
	                <span class="sr-only">切换导航</span>
	                <span class="icon-bar"></span>
	                <span class="icon-bar"></span>
	                <span class="icon-bar"></span>
	            </button>
	            <a class="navbar-brand" href="#">无锡大昊化工容器设备厂</a>
	        </div>
	        <div class="navbar-collapse collapse">
	            <ul class="nav navbar-nav">
	                <li class="active"><a href="#">网站首页</a></li>
	                <li><a href="#">公司简介</a></li>
	                <li><a href="#">产品展示</a></li>
	                <li><a href="#">新闻动态</a></li>
	                <li><a href="#">生产车间</a></li>
	                <li><a href="#">企业荣誉</a></li>
	                <li><a href="#">成功案例</a></li>
	                <li><a href="#">销售网络</a></li>
	                <li><a href="#">在线留言</a></li>
	                <li><a href="#">联系我们</a></li>
	            </ul>
	        </div>
	    </div>
	</div>
	<!-- 广告轮播 -->
	<div id="ad-carousel" class="carousel slide" data-ride="carousel">
	    <ol class="carousel-indicators">
	        <li data-target="#ad-carousel" data-slide-to="0" class="active"></li>
	        <li data-target="#ad-carousel" data-slide-to="1"></li>
	        <li data-target="#ad-carousel" data-slide-to="2"></li>
	        <li data-target="#ad-carousel" data-slide-to="3"></li>
	        <li data-target="#ad-carousel" data-slide-to="4"></li>
	    </ol>
	    <div class="carousel-inner">
	        <div class="item active">
	            <img src="/wxdh2/Public/Images/logo.jpg" alt="1 slide">
	
	            <div class="container">
	                <div class="carousel-caption">
	                    <h1>大昊</h1>
	                    <p>无锡大昊化工容器设备厂</p>
	                    <p><a class="btn btn-lg btn-primary" href="http://www.google.cn/intl/zh-CN/chrome/browser/"
	                          role="button" target="_blank">公司简介</a></p>
	                </div>
	            </div>
	        </div>
	        <div class="item">
	            <img src="/wxdh2/Public/Images/logo.jpg" alt="1 slide">
	            <div class="container">
	                <div class="carousel-caption">
	                    <h1>产品</h1>
	                    <p>本厂提供产品</p>
	                    <p><a class="btn btn-lg btn-primary" href="http://www.firefox.com.cn/download/" target="_blank"
	                          role="button">点此查看</a></p>
	                </div>
	            </div>
	        </div>
	        <div class="item">
	            <img src="/wxdh2/Public/Images/logo.jpg" alt="1 slide">
	            <div class="container">
	                <div class="carousel-caption">
	                    <h1>联系</h1>
	                    <p>本厂联系方式</p>
	                    <p><a class="btn btn-lg btn-primary" href="http://www.apple.com/cn/safari/" target="_blank"
	                          role="button">点此查看</a></p>
	                </div>
	            </div>
	        </div>
	        <div class="item">
	            <img src="/wxdh2/Public/Images/logo.jpg" alt="1 slide">
	            <div class="container">
	                <div class="carousel-caption">
	                    <h1>留言</h1>
	                    <p>若有建议，请给我们留言</p>
	                    <p><a class="btn btn-lg btn-primary" href="http://www.opera.com/zh-cn" target="_blank"
	                          role="button">点此留言</a></p>
	                </div>
	            </div>
	        </div>
	    </div>
	    <a class="left carousel-control" href="#ad-carousel" data-slide="prev"><span
	            class="glyphicon glyphicon-chevron-left"></span></a>
	    <a class="right carousel-control" href="#ad-carousel" data-slide="next"><span
	            class="glyphicon glyphicon-chevron-right"></span></a>
	</div>
	<div class="jumbotron">
      <div class="container">
        <h1>公司简介</h1>
        <p>无锡市大昊化工容器设备厂是不饱和树脂全套设备，多功能分散反应釜，热熔胶反应釜，白乳胶全套设备，导热油加热釜，结片机干燥机等石化容器的专业厂家。产品广泛应用于化工，树脂，造漆，涂料，染料，食品等行业。本厂拥有一支高素质的技术队伍，从设计、审核、生产加工至验收配套服务， 工厂具有精良的加工设备，先进的制作工艺及完善的检测手段，为产品的出厂提供优良的售后服务。 本厂从事新产品的研制与开发，生产出高品位高质量的产品，以满市场的需求。其工厂宗旨：“以质量求生存，以品质求发展，以服务求信誉。”为此，工厂愿同社会各界同仁共同开拓更广泛的领域，为社会创造美好的空间。愿与您精诚合作，共同繁荣。让我们的产品伴随您的事业走向明天的辉煌。</p>
        <p><a class="btn btn-primary btn-lg" href="#" role="button">Learn more »</a></p>
      </div>
    </div>
    <div class="container">
      <!-- Example row of columns -->
      <div class="row">
        <div class="col-md-4">
          <h2>Heading</h2>
          <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. </p>
          <p><a class="btn btn-default" href="#" role="button">View details »</a></p>
        </div>
        <div class="col-md-4">
          <h2>Heading</h2>
          <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. </p>
          <p><a class="btn btn-default" href="#" role="button">View details »</a></p>
       </div>
        <div class="col-md-4">
          <h2>Heading</h2>
          <p>Donec sed odio dui. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Vestibulum id ligula porta felis euismod semper. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.</p>
          <p><a class="btn btn-default" href="#" role="button">View details »</a></p>
        </div>
      </div>
      <hr>
      <footer>
        <p>© 无锡大昊化工容器设备厂</p>
      </footer>
    </div>
	<!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <script src="/wxdh2/Public/Js/jquery.min.js"></script>
    <!-- Include all compiled plugins (below), or include individual files as needed -->
    <script src="/wxdh2/Public/Js/bootstrap.min.js"></script>
	<script type="text/javascript">
        $(function() {
            $('.navbar-nav li').click(function() {
                $(".navbar-nav").find("li").not(this).removeClass("active");
                $(this).addClass("active");
            });
        });
	</script>
</body>
</html>