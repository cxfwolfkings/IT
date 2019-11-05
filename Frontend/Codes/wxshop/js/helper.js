var helper = {};
/**
 * 是否手机端访问
 */
helper.isMobile = function() {
    var ua = navigator.userAgent;
    var ipad = ua.match(/(iPad).*OS\s([\d_]+)/),
    isIphone =!ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/),
    isAndroid = ua.match(/(Android)\s+([\d.]+)/),
    isMobile = isIphone || isAndroid;
	//判断
	return isMobile;
};
/**
 * 商城信息
 */
helper.shop = {
	shop1: helper.isMobile() ? 'https://shop125499407.m.taobao.com/' : 'https://shop125499407.taobao.com/',
	shop2: '',
	shop3: ''
};
/**
 * 产品信息
 */
helper.products = [
    { 
		id: 1,
		name: '80短割炬',
		type: '割炬',
		description: `
			1. M12-6 束接螺母（正）；
			2. 1/4-M12 双丝接头（正）<br/>
			3. 1/4-M12 活络接头（正）；
			4. M12F型短牙进气接头（正）<br/>
			5. M16-M12双丝接头（正）；
			6. M16-6 束接螺母（正）<br/>
			7. M12-6 束接螺母（反）；
			8. 1/4-M12 双丝接头（反）<br/>
			9. 1/4-M12 活络接头（反）；
			10. M12L型短牙进气接头（反）<br/>
			11. M16-M12双丝接头（反）；
			12. M16-6 束接螺母（反）<br/>
			13. ARL-80直条割炬
		`,
		newPrice: '320.00',
		link: 'spm=a1z10.5-c.w4002-18630172100.17.e79a2201ymBAXY&id=528654192418',
		imgCount: 10
	},
	{ 
		id: 2,
		name: '大流量割炬',
		type: '割炬',
		description: '',
		newPrice: '0.00',
		imgCount: 5
	},
	{ 
		id: 3,
		name: '六角割炬',
		type: '割炬',
		description: '',
		newPrice: '0.00',
		imgCount: 14
	},
	{ 
		id: 4,
		name: '数控割炬',
		type: '割炬',
		description: `
	        <span style="font-weight:bold">结构特点</span><br>
	        整体采用优质锻造铜制造。<br>
	        采用等压式结构设计。<br>
	        采用银焊，可有效防止泄漏。<br>
	        套管外径为30mm和32mm。<br>
	        套管长度有180mm、250mm、370mm三种。<br>
	        齿条可在四个不同位置进行安装（每个位置相隔90度）。<br>
			适用锥面为30o的等压式割咀。<br>
			<br>
			<table border=1>
				<tr>
					<td>型号</td>
					<td>套管长度（mm）</td>
					<td>切割厚度（mm）</td>
					<td>齿条长度/模数</td>
					<td>适用乙炔割咀</td>
					<td>适用于丙烷割咀</td>
					<td>进气螺纹</td>
				</tr>
				<tr>
					<td>GJ</td>
					<td>180</td>
					<td>300</td>
					<td>/</td>
					<td>G02#0-#5</td>
					<td>G02#0-#5</td>
					<td>M12×1.25</td>
				</tr>
				<tr>
					<td>GJ</td>
					<td>250</td>
					<td>300</td>
					<td>210/1</td>
					<td>G02#0-#5</td>
					<td>G02#0-#5</td>
					<td>M12×1.25</td>
				</tr>
				<tr>
					<td>GJ</td>
					<td>370</td>
					<td>300</td>
					<td>210/1</td>
					<td>G02#0-#5</td>
					<td>G02#0-#5</td>
					<td>M12×1.25</td>
				</tr>
			</table>
		`,
		newPrice: '260.00',
		link: 'spm=a1z10.3-c.w4002-18630168171.72.779b18ddZ9lPtr&id=520374093930',
		imgCount: 11
	},
	{ 
		id: 5,
		name: '直条割炬',
		type: '割炬',
		description: `
		    <span style="font-weight:bold">结构特点</span><br>
			整体采用优质段造铜制造。<br>
			采用等压式结构设计。<br>
			采用银焊，可有效防止泄漏。<br>
			套管外径为30mm。<br>
			套管长度有180mm、250mm、370mm、450mm四种。<br>
			齿条可在四个不同位置进行安装（每个位置相隔90度）。<br>
			使用锥面为30o的等压式割咀。<br>
		`,
		newPrice: '438.00',
		link: 'spm=a1z10.3-c.w4002-18630168171.72.779b18ddZ9lPtr&id=520374093930',
		imgCount: 8
	},
	{ 
		id: 6,
		name: 'M12',
		type: '回火器',
		description: '',
		newPrice: '10.00',
		link: 'spm=a1z10.3-c.w4002-18630168171.12.49e218ddechrGA&id=520381632851',
		imgCount: 5
	},
	{ 
		id: 7,
		name: 'M16',
		type: '回火器',
		description: '',
		newPrice: '30.00',
		link: 'spm=a1z10.3-c.w4002-18630168171.15.49e218ddechrGA&id=520377885703',
		imgCount: 4
	},
	{ 
		id: 8,
		name: '大流量回火器',
		type: '回火器',
		description: '',
		newPrice: '0.00',
		link: '',
		imgCount: 5
	},
	{ 
		id: 9,
		name: '三型回火器',
		type: '回火器',
		description: '',
		newPrice: '0.00',
		link: '',
		imgCount: 5
	},
	{ 
		id: 10,
		name: '定点夹持器',
		type: '火焰夹持器',
		description: '',
		newPrice: '120.00',
		link: 'spm=a1z10.3-c.w4002-18630168171.10.40ad18ddd951S4&id=526169186856',
		imgCount: 5
	},
	{ 
		id: 11,
		name: '仿形夹持器',
		type: '火焰夹持器',
		description: '',
		newPrice: '0.00',
		link: '',
		imgCount: 4
	},
	{ 
		id: 12,
		name: '加长定点夹持器',
		type: '火焰夹持器',
		description: '',
		newPrice: '0.00',
		link: '',
		imgCount: 4
	},
	{ 
		id: 13,
		name: '可调夹持器',
		type: '火焰夹持器',
		description: `
			<span style="font-weight:bold">可调夹持器</span><br>
			适用于需要前后上下调节的割炬固定装置。<br>
			Ø30mm/Ø32mm<br><br>
			<span style="font-weight:bold">结构特点</span><br>
			适用于WLX型机用割炬<br>
			手轮调节升降<br>
			手轮调节水平移动距离<br>
			角度标尺可显示机用割炬的角度<br>
		`,
		newPrice: '225.00',
		link: 'spm=a1z10.3-c.w4002-18630168171.25.40ad18ddd951S4&id=520378149437',
		imgCount: 7
	},
	{ 
		id: 14,
		name: '普通定点夹持器',
		type: '火焰夹持器',
		description: '',
		newPrice: '0.00',
		link: '',
		imgCount: 5
	},
	{ 
		id: 15,
		name: '双头火焰夹持器',
		type: '火焰夹持器',
		description: '',
		newPrice: '0.00',
		link: '',
		imgCount: 4
	},
	{ 
		id: 16,
		name: '铜脚板夹持器',
		type: '火焰夹持器',
		description: '',
		newPrice: '0.00',
		link: '',
		imgCount: 5
	},
	{ 
		id: 17,
		name: '万向夹持器',
		type: '火焰夹持器',
		description: `
			<span style="font-weight:bold">可调夹持器</span><br>
			适用于需要前后上下调节的割炬固定装置。<br>
			Ø30mm/Ø32mm<br><br>
			<span style="font-weight:bold">结构特点</span><br>
			适用于WLX型机用割炬<br>
			手轮调节升降<br>
			手轮调节水平移动距离<br>
			角度标尺可显示机用割炬的角度<br>
		`,
		newPrice: '120.00',
		link: 'spm=a1z10.3-c.w4002-18630168171.31.40ad18ddlJWkIa&id=520377905943',
		imgCount: 3
	},
	{ 
		id: 18,
		name: '型材定点夹持器',
		type: '火焰夹持器',
		description: '',
		newPrice: '0.00',
		link: '',
		imgCount: 10
	},
	{ 
		id: 19,
		name: '型材可调夹持器',
		type: '火焰夹持器',
		description: '',
		newPrice: '0.00',
		link: '',
		imgCount: 8
	},
	{ 
		id: 20,
		name: '一字夹持器',
		type: '火焰夹持器',
		description: `
		    <span style="font-weight:bold">可调夹持器</span><br>
			适用于需要前后上下调节的割炬固定装置。<br>
			Ø30mm/Ø32mm<br><br>
			<span style="font-weight:bold">结构特点</span><br>
			适用于WLX型机用割炬<br>
			手轮调节升降<br>
			手轮调节水平移动距离<br>
			角度标尺可显示机用割炬的角度<br>
		`,
		newPrice: '120.00',
		link: 'spm=a1z10.3-c.w4002-18630168171.29.40ad18ddlJWkIa&id=520377977773',
		imgCount: 3
	},
	{ 
		id: 21,
		name: '等离子夹持器',
		type: '等离子夹持器',
		description: '',
		newPrice: '500.00',
		link: 'spm=a1z10.3-c.w4002-18630168171.37.40ad18ddlJWkIa&id=526133463741',
		imgCount: 5
	},
	{ 
		id: 22,
		name: '简易一火一等',
		type: '等离子夹持器',
		description: '',
		newPrice: '0.00',
		link: '',
		imgCount: 7
	},
	{ 
		id: 23,
		name: '一火一等',
		type: '等离子夹持器',
		description: '',
		newPrice: '0.00',
		link: '',
		imgCount: 6
	},
	{ 
		id: 24,
		name: '燃气汇流排',
		type: '汇流排',
		description: '',
		newPrice: '2500.00',
		link: 'spm=a1z10.3-c.w4002-18630168171.42.6ddb18ddoTusK6&id=520373777191',
		imgCount: 11
	},
	{ 
		id: 25,
		name: '氧气汇流排',
		type: '汇流排',
		description: '',
		newPrice: '6600.00',
		link: 'spm=a1z10.3-c.w4002-18630168171.27.6ddb18ddoTusK6&id=520377188687',
		imgCount: 8
	},
	{ 
		id: 26,
		name: '200升降体',
		type: '电动升降体',
		description: '',
		newPrice: '0.00',
		link: '',
		imgCount: 9
	},
	{ 
		id: 27,
		name: '小数控升降体',
		type: '电动升降体',
		description: '',
		newPrice: '650.00',
		link: 'spm=a1z10.3-c.w4002-18630168171.12.706618ddbq3zzQ&id=526008630241',
		imgCount: 6
	},
	{ 
		id: 28,
		name: '分流排',
		type: '分流排',
		description: `
			<span style="font-weight:bold">气体分流排</span><br>
			气体分流排用于多头火焰直条或数控切割机，通过分流排接头和机用割炬连接后进行使用。<br><br>
			<span style="font-weight:bold">结构特点</span><br>
			管理系统采用银焊，可有效防止泄漏<br>
			进气端采用可换式接头，可根据用户要求更换<br>
			分流出气端在标准配置下，可采用闷头控制所需气路数量<br>
			分流排组数可根据用户需要进行个性化制作。<br>
		`,
		newPrice: '850.00',
		link: 'spm=a1z10.3-c.w4002-18630168171.18.2dbd18ddFRQwAj&id=520380046149',
		imgCount: 6
	},
	{ 
		id: 29,
		name: 'AR4000减压阀',
		type: '减压器',
		description: '',
		newPrice: '0.00',
		link: '',
		imgCount: 6
	},
	{ 
		id: 30,
		name: '燃气减压器',
		type: '减压器',
		description: '',
		newPrice: '550.00',
		link: 'spm=a1z10.3-c.w4002-18630168171.24.2d6a18ddvmyb5a&id=520374153469',
		imgCount: 7
	},
	{ 
		id: 31,
		name: '燃气面板减压阀',
		type: '减压器',
		description: '',
		newPrice: '0.00',
		link: '',
		imgCount: 4
	},
	{ 
		id: 32,
		name: '氧气减压器',
		type: '减压器',
		description: '',
		newPrice: '550.00',
		link: 'spm=a1z10.3-c.w4002-18630168171.21.2d6a18ddvmyb5a&id=520375926811',
		imgCount: 7
	},
	{ 
		id: 33,
		name: '氧气面板减压阀',
		type: '减压器',
		description: '',
		newPrice: '0.00',
		link: '',
		imgCount: 3
	},
	{ 
		id: 34,
		name: 'F型移动体',
		type: '横梁移动体',
		description: `
			<span style="font-weight:bold">移动体</span><br>
			移动体安装在多头火焰直条切割机的横梁上，用来固定割炬夹持器，夹持器另一端将机用割炬固定，根据切割工件要求的宽度尺寸，调整好移动架在横梁上的位置，工作时随同机台运行进行切割。
		`,
		newPrice: '150.00',
		link: 'spm=a1z10.3-c.w4002-18630168171.9.5aca18dddDdvY1&id=520374757479',
		imgCount: 5
	},
	{ 
		id: 35,
		name: '型材移动体',
		type: '横梁移动体',
		description: '',
		newPrice: '0.00',
		link: '',
		imgCount: 4
	},
	{ 
		id: 36,
		name: '铸铝移动体',
		type: '横梁移动体',
		description: '',
		newPrice: '0.00',
		link: '',
		imgCount: 6
	},
	{ 
		id: 37,
		name: '割嘴',
		type: '割嘴',
		description: '',
		newPrice: '0.00',
		link: '',
		imgCount: 11
	},
	{ 
		id: 38,
		name: '点火装置',
		type: '点火装置',
		description: '',
		newPrice: '0.00',
		link: '',
		imgCount: 12
	},
	{ 
		id: 39,
		name: '燃气阀门',
		type: '阀门',
		description: '',
		newPrice: '0.00',
		link: '',
		imgCount: 6
	},
	{ 
		id: 40,
		name: '小气阀',
		type: '阀门',
		description: '',
		newPrice: '0.00',
		link: '',
		imgCount: 5
	},
	{ 
		id: 41,
		name: '氧气阀门',
		type: '阀门',
		description: '',
		newPrice: '0.00',
		link: '',
		imgCount: 6
	},
	{ 
		id: 42,
		name: '总阀',
		type: '阀门',
		description: '',
		newPrice: '0.00',
		link: '',
		imgCount: 7
	},
	{ 
		id: 43,
		name: '丙烷接头',
		type: '各种铜件',
		description: '',
		newPrice: '0.00',
		link: '',
		imgCount: 5
	},
	{ 
		id: 44,
		name: '气源箱接头',
		type: '各种铜件',
		description: '',
		newPrice: '0.00',
		link: '',
		imgCount: 3
	},
	{ 
		id: 45,
		name: '挂线小车',
		type: '挂线小车',
		description: '',
		newPrice: '0.00',
		link: '',
		imgCount: 3
	},
	{ 
		id: 46,
		name: '划线笔',
		type: '划线笔',
		description: '',
		newPrice: '0.00',
		link: '',
		imgCount: 5
	},
	{ 
		id: 47,
		name: '燃气金属软管',
		type: '金属软管',
		description: '',
		newPrice: '0.00',
		link: '',
		imgCount: 8
	},
	{ 
		id: 48,
		name: '氧气金属软管',
		type: '金属软管',
		description: '',
		newPrice: '0.00',
		link: '',
		imgCount: 8
	},
	{ 
		id: 49,
		name: '气源箱',
		type: '气源箱',
		description: '',
		newPrice: '0.00',
		link: '',
		imgCount: 7
	},
	{ 
		id: 50,
		name: '压力表',
		type: '压力表',
		description: '',
		newPrice: '0.00',
		link: '',
		imgCount: 5
	}
];

helper.products.forEach(p => {
	p.imgs = [];
	for (var i = 0; i < p.imgCount; i++) {
		var strFix = '';
		if (i != 0) {
			strFix = '-' + (i + 1);
		}
		p.imgs.push('images/1903/' + p.id + strFix);
	}
	if (p.link) {
		if (helper.isMobile()) {
			p.link = 'https://h5.m.taobao.com/awp/core/detail.htm?' + p.link;
		} else {
			p.link = 'https://item.taobao.com/item.htm?' + p.link;
		}
	} else {
		p.link = helper.shop.shop1;
	}
	if (p.newPrice === '0.00') {
		p.newPrice = '面议';
		p.oldPrice = '0.00';
	} else {
		p.oldPrice = (parseFloat(p.newPrice) + parseFloat(p.newPrice) * 0.1).toFixed(2);
	}
});

helper.comments = [
	{
		id: 1,
		name: '王**',
		job: '商场管理',
		word: '产品不错！老板态度也很好，下次有需要的话还来这里买。'
	},
	{
		id: 2,
		name: '陈**',
		job: '企业家',
		word: '使用起来蛮不错的，看上去做工也比较好，老板介绍得很详细，好评！'
	},
	{
		id: 3,
		name: '朱**',
		job: '商场管理',
		word: '产品不错！'
	},
	{
		id: 4,
		name: '张*',
		job: '商场管理',
		word: '产品不错！'
	},
	{
		id: 5,
		name: '姚**',
		job: '商场管理',
		word: '产品不错！'
	},
	{
		id: 6,
		name: '华**',
		job: '商场管理',
		word: '产品不错！'
	}
];

helper.header = `
    <div class="header-top clearfix">
        <div class="container">
            <div class="rows">
                <!-- SIDEBAR TOP MENU -->
                <div class="pull-left top1">
                    <div class="widget text-2 widget_text pull-left">
                        <div class="widget-inner">
                            <div class="textwidget">
                                <div class="call-us"><span>现在关注我们: </span><a>星辰之间</a></div>
                            </div>
                        </div>
					</div>
					<div class="widget text-3 widget_text pull-left">
						<div class="widget-inner">
							<div class="textwidget">
								<div id="lang_sel">
									<ul class="nav">
										<li>
											<a class="lang_sel_sel icl-en">
												<img class="iclflag" title="English" alt="en" src="images/icons/en.png" width="18" height="12" /> English
											</a>
											<ul>
												<li class="icl-en">
													<a href="#">
														<img class="iclflag" title="English" alt="en" src="images/icons/en.png" width="18" height="12" /> English
													</a>
												</li>
												<li class="icl-ar">
													<a href="#">
														<img class="iclflag" title="Arabic" alt="ar" src="images/icons/ar.png" width="18" height="12" /> Arabic
													</a>
												</li>
											</ul>
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
					<div class="widget woocommerce_currency_converter-2 widget_currency_converter pull-left">
						<div class="widget-inner">
							<form method="post" class="currency_converter" action="">
								<ul class="currency_w">
									<li>
										<a href="#" class="">USD</a>
										<ul class="currency_switcher">
											<li><a href="#" class="reset default active" data-currencycode="USD">USD</a></li>
											<li><a href="#" class="" data-currencycode="EUR">EUR</a></li>
										</ul>
									</li>
								</ul>
							</form>
						</div>
					</div>
                </div>

				<div class="wrap-myacc pull-right">
				    <div class="sidebar-account pull-left">
						<div class="account-title">My account</div>
						<div id="my-account" class="my-account">
							<div class="widget-1 widget-first widget nav_menu-4 widget_nav_menu">
								<div class="widget-inner">
									<ul id="menu-my-account" class="menu">
										<li class="menu-my-account">
											<a class="item-link" href="my_account.html">
												<span class="menu-title">My Account</span>
											</a>
										</li>
										<li class="menu-cart">
											<a class="item-link" href="cart.html">
												<span class="menu-title">Cart</span>
											</a>
										</li>
										<li class="menu-checkout">
											<a class="item-link" href="checkout.html">
												<span class="menu-title">Checkout</span>
											</a>
										</li>		
										<li class="menu-wishlist">
											<a class="item-link" href="#">
												<span class="menu-title">Wishlist</span>
											</a>
										</li>
									</ul>
								</div>
							</div>
							<div class="widget-2 widget-last widget sw_top-4 sw_top">
								<div class="widget-inner">
									<div class="top-login">
										<div class="div-logined">
											<ul>
												<li>
													<a href="javascript:void(0);" data-toggle="modal" data-target="#login_form">
													    <span>Login</span>
												    </a>
													<span class="wg">Welcome Guest</span>
												</li>
											</ul>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
                    <div class="pull-left top2">
                        <div class="widget-1 widget-first widget nav_menu-2 widget_nav_menu">
                            <div class="widget-inner">
                                <ul id="menu-checkout" class="menu">
                                    <li class="menu-checkout">
                                        <a class="item-link" href="#">
                                            <span class="menu-title">您好，欢迎光临</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="header-mid clearfix">
        <div class="container">
            <div class="rows">
                <!-- LOGO -->
                <div class="etrostore-logo pull-left">
                    <a href="#">
                        <img src="images/icons/logo-orange.png" alt="Shoopy">
                    </a>
                </div>

                <div class="mid-header pull-right">
                    <div class="widget-1 widget-first widget sw_top-2 sw_top">
                        <div class="widget-inner">
                            <div class="top-form top-search">
                                <div class="topsearch-entry">
                                    <form method="get" action="">
                                        <div>
											<input type="text" value="" name="s" placeholder="请输入关键字...">
											<div class="cat-wrapper">
												<label class="label-search">
													<select name="search_category" class="s1_option">
														<option value="">全部分类</option>
														<option value="8">Computers & Laptops</option>
														<option value="13">Computers & Networking</option>
														<option value="14">Smartphones & Tablet</option>
														<option value="15">Home Furniture</option>
														<option value="16">Home Appliances</option>
														<option value="17">Electronic Component</option>
														<option value="18">Household Goods</option>
														<option value="32">Appliances</option>
														<option value="49">Accessories</option>
														<option value="51">Electronics</option>
														<option value="78">Televisions</option>
														<option value="80">Cameras & Accessories</option>
													</select>
												</label>
											</div>
                                            <button type="submit" title="Search" class="fa fa-search button-search-pro form-button"></button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
					</div>
					<div class="widget sw_top-3 sw_top pull-left">
						<div class="widget-inner">
							<div class="top-form top-form-minicart etrostore-minicart pull-right">
								<div class="top-minicart-icon pull-right">
									<i class="fa fa-shopping-cart"></i>
									<a class="cart-contents" href="cart.html" title="View your shopping cart">
										<span class="minicart-number">2</span>
									</a>
								</div>
								<div class="wrapp-minicart">
									<div class="minicart-padding">
										<div class="number-item">
											There are <span>items</span> in your cart
										</div>
										<ul class="minicart-content">
											<li>
												<a href="simple_product.html" class="product-image">
													<img width="100" height="100"
														    src="images/1903/45-150x150.jpg"
														    class="attachment-100x100 size-100x100 wp-post-image"
															alt=""
															srcset="images/1903/45-150x150.jpg 150w, images/1903/45-300x300.jpg 300w, images/1903/45-180x180.jpg 180w, images/1903/45.jpg 600w"
															sizes="(max-width: 100px) 100vw, 100px" />
												</a>
												<div class="detail-item">
													<div class="product-details">
														<h4>
															<a class="title-item" href="simple_product.html">Veniam Dolore</a>
														</h4>
														<div class="product-price">
															<span class="price">
																<span class="woocommerce-Price-amount amount">
																	<span class="woocommerce-Price-currencySymbol">$</span>190.00
																</span>
															</span>
															<div class="qty">
																<span class="qty-number">1</span>
															</div>
														</div>
														<div class="product-action clearfix">
															<a href="#" class="btn-remove" title="Remove this item">
																<span class="fa fa-trash-o"></span>
															</a>
															<a class="btn-edit" href="cart.html" title="View your shopping cart">
																<span class="fa fa-pencil"></span>
															</a>
														</div>
													</div>
												</div>
											</li>
											<li>
												<a href="simple_product.html" class="product-image">
													<img width="100" height="100"
															src="images/1903/22-150x150.jpg"
															class="attachment-100x100 size-100x100 wp-post-image"
															alt=""
															srcset="images/1903/22-150x150.jpg 150w, images/1903/22-300x300.jpg 300w, images/1903/22-180x180.jpg 180w, images/1903/22.jpg 600w"
															sizes="(max-width: 100px) 100vw, 100px" />
												</a>
												<div class="detail-item">
													<div class="product-details">
														<h4>
															<a class="title-item" href="simple_product.html">Cleaner with bag</a>
														</h4>
														<div class="product-price">
															<span class="price">
																<span class="woocommerce-Price-amount amount">
																	<span class="woocommerce-Price-currencySymbol">$</span>350.00
																</span>
															</span>
															<div class="qty">
																<span class="qty-number">1</span>
															</div>
														</div>
														<div class="product-action clearfix">
															<a href="#" class="btn-remove" title="Remove this item">
																<span class="fa fa-trash-o"></span>
															</a>
															<a class="btn-edit" href="cart.html" title="View your shopping cart">
																<span class="fa fa-pencil"></span>
															</a>
														</div>
													</div>
												</div>
											</li>
										</ul>
										<div class="cart-checkout">
											<div class="price-total">
												<span class="label-price-total">Total</span>
												<span class="price-total-w">
													<span class="price">
														<span class="woocommerce-Price-amount amount">
															<span class="woocommerce-Price-currencySymbol">$</span>540.00
														</span>
													</span>
												</span>
											</div>
											<div class="cart-links clearfix">
												<div class="cart-link">
													<a href="cart.html" title="Cart">View Cart</a>
												</div>
												<div class="checkout-link">
													<a href="checkout.html" title="Check Out">Check Out</a>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
                    <!-- PC端右侧购物车、收藏 -->
                    <div class="widget nav_menu-3 widget_nav_menu pull-left">
                        <div class="widget-inner">
                            <ul id="menu-wishlist" class="menu">
                                <li class="menu-wishlist">
                                    <a id="like_a" class="item-link" href="javascript:;" title="喜欢这个网站" onclick="layer.tips('谢谢老板，恭喜发财！', '#like_a', {tips: [4, '#78BA32']});">
                                        <span class="menu-title">Wishlist</span>
                                    </a>
								</li>
								<li class="yith-woocompare-open menu-compare">
									<a class="item-link compare" href="#">
										<span class="menu-title">Compare</span>
									</a>
								</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="header-bottom clearfix">
        <div class="container">
            <div class="rows">
                <!-- Primary navbar -->
                <div id="main-menu" class="main-menu">
                    <nav id="primary-menu" class="primary-menu">
                        <div class="navbar-inner navbar-inverse">
                            <div class="resmenu-container">
                                <button class="navbar-toggle" type="button" data-toggle="collapse" data-target="#ResMenuprimary_menu">
                                    <span class="sr-only">全部分类</span>
                                    <span class="icon-bar"></span>
                                    <span class="icon-bar"></span>
                                    <span class="icon-bar"></span>
                                </button>
                                <div id="ResMenuprimary_menu" class="collapse menu-responsive-wrapper">
                                    <ul id="menu-primary-menu" class="etrostore_resmenu">
                                        <li><a href="index.html">主页</a></li>
                                        <li><a href="${helper.shop.shop1}">店铺1</a></li>
                                        <li><a href="${helper.shop.shop2}">店铺2</a></li>
                                        <li><a href="${helper.shop.shop3}">店铺3</a></li>
                                        <li><a href="shop.html">产品</a></li>
                                        <li><a href="about_us.html">关于我们</a></li>
                                    </ul>
                                </div>
                            </div>
                            <ul id="menu-primary-menu-1"
                                class="nav nav-pills nav-mega etrostore-mega etrostore-menures">
                                <li><a href="index.html">我们的主页</a></li>
                                <li><a href="${helper.shop.shop1}">我们的店铺1</a></li>
                                <li><a href="${helper.shop.shop2}">我们的店铺2</a></li>
                                <li><a href="${helper.shop.shop3}">我们的店铺3</a></li>
                                <li><a href="shop.html">我们的产品</a></li>
                                <li><a href="about_us.html">关于我们</a></li>
                            </ul>
                        </div>
                    </nav>
                </div>
				<!-- /Primary navbar -->
				
				<div class="top-form top-form-minicart etrostore-minicart pull-right">
					<div class="top-minicart-icon pull-right">
						<i class="fa fa-shopping-cart"></i>
						<a class="cart-contents" href="cart.html" title="View your shopping cart">
							<span class="minicart-number">2</span>
						</a>
					</div>
					<div class="wrapp-minicart">
						<div class="minicart-padding">
							<div class="number-item">There are <span>items</span> in your cart</div>
							<ul class="minicart-content">
								<li>
									<a href="simple_product.html" class="product-image">
										<img width="100" height="100" src="images/1903/45-150x150.jpg"
												class="attachment-100x100 size-100x100 wp-post-image" alt=""
												srcset="images/1903/45-150x150.jpg 150w, images/1903/45-300x300.jpg 300w, images/1903/45-180x180.jpg 180w, images/1903/45.jpg 600w"
												sizes="(max-width: 100px) 100vw, 100px" />
									</a>
									<div class="detail-item">
										<div class="product-details">
											<h4>
												<a class="title-item" href="simple_product.html">Veniam Dolore</a>
											</h4>
											<div class="product-price">
												<span class="price">
													<span class="woocommerce-Price-amount amount">
														<span class="woocommerce-Price-currencySymbol">$</span>190.00
													</span>
												</span>
												<div class="qty">
													<span class="qty-number">1</span>
												</div>
											</div>
											<div class="product-action clearfix">
												<a href="#" class="btn-remove" title="Remove this item">
													<span class="fa fa-trash-o"></span>
												</a>
												<a class="btn-edit" href="cart.html" title="View your shopping cart">
													<span class="fa fa-pencil"></span>
												</a>
											</div>
										</div>
									</div>
								</li>
								<li>
									<a href="simple_product.html" class="product-image">
										<img width="100" height="100" src="images/1903/22-150x150.jpg"
												class="attachment-100x100 size-100x100 wp-post-image" alt=""
												srcset="images/1903/22-150x150.jpg 150w, images/1903/22-300x300.jpg 300w, images/1903/22-180x180.jpg 180w, images/1903/22.jpg 600w"
												sizes="(max-width: 100px) 100vw, 100px" />
									</a>
									<div class="detail-item">
										<div class="product-details">
											<h4>
												<a class="title-item" href="simple_product.html">Cleaner with bag</a>
											</h4>
											<div class="product-price">
												<span class="price">
													<span class="woocommerce-Price-amount amount">
														<span class="woocommerce-Price-currencySymbol">$</span>350.00
													</span>
												</span>
												<div class="qty">
													<span class="qty-number">1</span>
												</div>
											</div>
											<div class="product-action clearfix">
												<a href="#" class="btn-remove" title="Remove this item">
													<span class="fa fa-trash-o"></span>
												</a>
												<a class="btn-edit" href="cart.html" title="View your shopping cart">
													<span class="fa fa-pencil"></span>
												</a>
											</div>
										</div>
									</div>
								</li>
							</ul>
							<div class="cart-checkout">
								<div class="price-total">
									<span class="label-price-total">Total</span>
									<span class="price-total-w">
										<span class="price">
											<span class="woocommerce-Price-amount amount">
												<span class="woocommerce-Price-currencySymbol">$</span>540.00
											</span>
										</span>
									</span>
								</div>
								<div class="cart-links clearfix">
									<div class="cart-link">
										<a href="cart.html" title="Cart">View Cart</a>
									</div>
									<div class="checkout-link">
										<a href="checkout.html" title="Check Out">Check Out</a>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
                <div class="mid-header pull-right">
                    <div class="widget sw_top">
                        <span class="stick-sr">
                            <i class="fa fa-search" aria-hidden="true"></i>
                        </span>
                        <div class="top-form top-search">
                            <div class="topsearch-entry">
                                <form role="search" method="get" class="form-search searchform" action="">
                                    <label class="hide"></label>
                                    <input type="text" value="" name="s" class="search-query" placeholder="Keyword here..." />
                                    <button type="submit" class="button-search-pro form-button">Search</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
`;

helper.renderComments = function() {
	var html = '';
	for (var i = 0; i < helper.comments.length; i++) {
		var item = `
		<div class="item-inner">
		    <div class="image-client pull-left">
			    <a href="#" title="">
				    <img width="127" height="127" src="images/1903/tm${helper.comments[i].id}.png" class="attachment-thumbnail size-thumbnail wp-post-image" alt=""/>
				</a>
			</div>
            <div class="client-say-info">
				<div class="client-comment">${helper.comments[i].word}</div>
                <div class="name-client">
				    <h2><a href="#" title="">${helper.comments[i].name}</a></h2>
                    <p>${helper.comments[i].job}</p>
				</div>
			</div>
		</div>
		`;
		if (i%2 === 0) {
			var active = '';
			if (i === 0) {
				active = 'active';
			}
			html += `<div class="item ${active}">` + item;
		} else {
			html += item + '</div>';
		}
	}
    return html;
};

helper.footer = `
<div class="container">
    <div class="vc_row wpb_row vc_row-fluid">
        <div class="wpb_column vc_column_container vc_col-sm-12">
		    <div class="vc_column-inner ">
			    <div class="wpb_wrapper">
					<div id="sw_testimonial01" class="testimonial-slider client-wrapper-b carousel slide" data-interval="0">
					    <div class="carousel-cl nav-custom">
						    <a class="prev-test fa fa-angle-left" href="#sw_testimonial01" role="button" data-slide="prev"><span></span></a>
							<a class="next-test fa fa-angle-right" href="#sw_testimonial01" role="button" data-slide="next"><span></span></a>
					    </div>
						<div class="carousel-inner">
						    ${helper.renderComments()}
                        </div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div data-vc-full-width="true" data-vc-full-width-init="false" data-vc-stretch-content="true" class="vc_row wpb_row vc_row-fluid footer-style1 vc_row-no-padding">
		<div class="container float wpb_column vc_column_container vc_col-sm-12">
			<div class="vc_column-inner ">
				<div class="wpb_wrapper">
					<div class="vc_row wpb_row vc_inner vc_row-fluid footer-top">
						<div class="wpb_column vc_column_container vc_col-sm-8">
							<div class="vc_column-inner">
								<div class="wpb_wrapper">
									<div class="wpb_text_column wpb_content_element">
										<div class="wpb_wrapper">
											<div class="wrap-newletter">
												<h3>NEWSLETTER SIGNUP</h3>
												<form id="mc4wp-form-1" class="mc4wp-form mc4wp-form-275"
														method="post" data-id="275" data-name="">
													<div class="mc4wp-form-fields">
														<div class="newsletter-content">
															<input type="email" class="newsletter-email"
																	name="EMAIL" placeholder="Your email"
																	required="" />
															<input class="newsletter-submit" type="submit"
																	value="Subscribe" />
														</div>
													</div>
													<div class="mc4wp-response"></div>
												</form>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="wpb_column vc_column_container vc_col-sm-4">
							<div class="vc_column-inner ">
								<div class="wpb_wrapper">
									<div class="wpb_raw_code wpb_content_element wpb_raw_html">
										<div class="wpb_wrapper">
											<div class="shop-social">
												<ul>
													<li>
														<a href="#">
															<i class="fa fa-facebook"></i>
														</a>
													</li>
													<li>
														<a href="#">
															<i class="fa fa-twitter"></i>
														</a>
													</li>
													<li>
														<a href="#">
															<i class="fa fa-google-plus"></i>
														</a>
													</li>
													<li>
														<a href="#">
															<i class="fa fa-linkedin"></i>
														</a>
													</li>
													<li>
														<a href="#">
															<i class="fa fa-pinterest-p"></i>
														</a>
													</li>
												</ul>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				    <div class="vc_row wpb_row vc_inner vc_row-fluid footer-bottom">
						<div class="item-res wpb_column vc_column_container vc_col-sm-6 vc_col-lg-4 vc_col-md-4 vc_col-xs-12">
							<div class="vc_column-inner ">
								<div class="wpb_wrapper">
									<div class="wpb_text_column wpb_content_element">
										<div class="wpb_wrapper">
											<div class="ya-logo">
												<a href="javascript:;"><img src="images/icons/logo-footer.png" alt="logo" /></a>
											</div>
										</div>
									</div>
                                    <div class="wpb_raw_code wpb_content_element wpb_raw_html">
									    <div class="wpb_wrapper">
										    <div class="infomation">
												<p>
													唯懿科技在线商城，欢迎各位客户选购<br/>
													联系电话：15806192407，6:00 ~ 22:00
												</p>
                                                <div class="info-support">
													<ul>
														<li>地址：江苏省无锡市滨湖区</li>
														<li>邮编：214131</li>
														<li>邮箱：228784169@qq.com</a></li>
													</ul>
												</div>
												<div class="store">
													<a href="#">
														<img src="images/1903/app-store.png" alt="store" title="store" />
													</a>
													<a href="#">
														<img src="images/1903/google-store.png" alt="store" title="store" />
													</a>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
                        <div class="item-res wpb_column vc_column_container vc_col-sm-6 vc_col-lg-2 vc_col-md-2 vc_col-xs-12">
							<div class="vc_column-inner ">
								<div class="wpb_wrapper">
									<div class="vc_wp_custommenu wpb_content_element">
										<div class="widget widget_nav_menu">
											<h2 class="widgettitle">在线服务</h2>
                                            <ul id="menu-support" class="menu">
												<li class="menu-product-support">
													<a class="item-link" href="#">
														<span class="menu-title">产品介绍</span>
													</a>
												</li>
                                                <li class="menu-pc-setup-support-services">
													<a class="item-link" href="#">
														<span class="menu-title">产品安装</span>
													</a>
												</li>
                                                <li class="menu-extended-service-plans">
													<a class="item-link" href="#">
														<span class="menu-title">产品手册</span>
													</a>
												</li>
                                                <li class="menu-community">
													<a class="item-link" href="#">
														<span class="menu-title">产品视频</span>
													</a>
												</li>
                                                <li class="menu-product-manuals">
													<a class="item-link" href="#">
														<span class="menu-title">社区</span>
													</a>
												</li>
												<li class="menu-product-manuals">
													<a class="item-link" href="#">
														<span class="menu-title">合作</span>
													</a>
												</li>
											</ul>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="item-res wpb_column vc_column_container vc_col-sm-6 vc_col-lg-2 vc_col-md-2 vc_col-xs-12">
							<div class="vc_column-inner ">
								<div class="wpb_wrapper">
									<div class="vc_wp_custommenu wpb_content_element">
										<div class="widget widget_nav_menu">
											<h2 class="widgettitle">合作单位</h2>
										    <ul id="menu-your-links" class="menu">
												<li class="menu-my-account">
													<a class="item-link" href="#">
														<span class="menu-title">奥瑞焊割</span>
													</a>
												</li>
												<li class="menu-order-tracking">
													<a class="item-link" href="#">
														<span class="menu-title">大昊化工</span>
													</a>
												</li>
												<li class="menu-watch-list">
													<a class="item-link" href="#">
														<span class="menu-title">合作单位</span>
													</a>
												</li>
												<li class="menu-customer-service">
													<a class="item-link" href="#">
														<span class="menu-title">合作单位</span>
													</a>
												</li>
												<li class="menu-returns-exchanges">
													<a class="item-link" href="#">
														<span class="menu-title">合作单位</span>
													</a>
												</li>
												<li class="menu-faqs">
													<a class="item-link" href="#">
														<span class="menu-title">合作单位</span>
													</a>
												</li>
											</ul>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="item-res wpb_column vc_column_container vc_col-sm-6 vc_col-lg-4 vc_col-md-4 vc_col-xs-12">
							<div class="vc_column-inner ">
								<div class="wpb_wrapper">
									<div class="wpb_raw_code wpb_content_element wpb_raw_html">
										<div class="wpb_wrapper">
											<div class="sp-map">
												<div class="title">
													<h2>我的位置</h2>
												</div>
												<img src="images/1903/map.jpg" alt="map" title="map" />
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="vc_wp_custommenu wpb_content_element wrap-cus">
						<div class="widget widget_nav_menu">
							<ul id="menu-infomation" class="menu">
								<li class="menu-about-us">
									<a class="item-link" href="about_us.html">
										<span class="menu-title">关于我们</span>
									</a>
								</li>
								<li class="menu-customer-service">
									<a class="item-link" href="${helper.shop.shop1}">
										<span class="menu-title">我们的店铺1</span>
									</a>
							    </li>
								<li class="menu-privacy-policy">
									<a class="item-link" href="${helper.shop.shop2}">
										<span class="menu-title">我们的店铺2</span>
									</a>
								</li>
								<li class="menu-site-map">
									<a class="item-link" href="${helper.shop.shop3}">
										<span class="menu-title">我们的店铺3</span>
									</a>
								</li>
								<li class="menu-orders-and-returns">
									<a class="item-link" href="shop.html">
										<span class="menu-title">我们的产品</span>
									</a>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="vc_row-full-width vc_clearfix"></div>
</div>
<div class="footer-copyright style1">
	<div class="container">
		<!-- Copyright text -->
		<div class="copyright-text">
			<p style="text-align:center">Copyright &copy; 2017.Company name All rights reserved.
			</p>
		</div>
		<div class="sidebar-copyright pull-right">
			<div class="widget-1 widget-first widget text-4 widget_text">
				<div class="widget-inner">
					<div class="textwidget">
						<div class="payment">
							<a href="#">
								<img src="images/1903/paypal.png" alt="payment" title="payment" />
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
`;

/**
 * 数组去重
 */
Array.prototype.distinct = function() {
    var base = this;
    return this.filter((element, index) => {
	    return base.indexOf(element) === index;
    });
};
/**
 * 渲染全部分类
 */
helper.renderCategories_shop = function() {
	var html = '';
	var productTypes = helper.products.map(_ => _.type).distinct();
	for (var i = 0; i < productTypes.length; i++) {
		var count = helper.products.filter(_ => _.type === productTypes[i]).length;
		html += `<li class="cat-item"><a href="shop.html?page=1&type=${productTypes[i]}">${productTypes[i]}</a> <span class="count">(${count})</span></li>`;
	}
	return html;
}

/**
 * 渲染页码
 */
helper.renderPage_shop = function(curPage, totalPage) {
	var html = '';
	for (var i = 1; i <= totalPage; i++) {
		if (curPage === i) {
			html += `<li><span class="page-numbers current">${i}</span></li>`;
		} else {
		    html += `<li><a class="page-numbers" href="shop.html?page=${i}">${i}</a></li>`;
		}
	}
	return html;
};

/**
 * 渲染“最受欢迎”商品
 */
helper.renderBestSeller_shop = function(type) {
	var html = '';
	var products = helper.products;
	if (type) {
		products = helper.products.filter(_ => _.type === type);
	}
	for (var i = 0; i < 8 && i < products.length; i++) {
		html += `
			<li class="clearfix">
			    <div class="item-img">
				    <a href="simple_product.html?id=${products[i].id}" title="${products[i].name}">
					    <img width="180" height="180" src="${products[i].imgs[0]}.jpg" class="attachment-shop_thumbnail size-shop_thumbnail wp-post-image" alt="">
					</a>
				</div>									
				<div class="item-content">
					<div class="reviews-content">
						<div class="star"><span style="width: 63px"></div>
						<div class="item-number-rating">4.9</div>
					</div>
					<h4><a href="simple_product.html?id=${products[i].id}" title="${products[i].name}">${products[i].name}</a></h4>
					<div class="price"><span class="woocommerce-Price-amount amount"><span class="woocommerce-Price-currencySymbol">￥</span>${products[i].newPrice}</span></div>
				</div>
			</li>
		`;
	}
	return html;
}

helper.getLinkedProducts = function(productId) {
	var products = helper.products.filter(_ => _.id != productId);
	var linkedProducts = '';
	for (var i = 0; i < products.length; i++) {
		var product = products[i];
		linkedProducts += `
		<div class="item ">
		    <div class="item-wrap">
				<div class="item-detail">
					<div class="item-img products-thumb">
						<a href="simple_product.html?id=${product.id}">
							<div class="product-thumb-hover">
								<img width="300" height="300" src="${product.imgs[0]}.jpg" class="attachment-shop_catalog size-shop_catalog wp-post-image" alt="">
							</div>
						</a>																
					</div>
					<div class="item-content">
						<!-- rating  -->
						<div class="reviews-content">
							<div class="star"><span style="width: 63px"></div>
							<div class="item-number-rating">4.9</div>
						</div>
						<!-- end rating  -->
						<h4><a href="simple_product.html?id=${product.id}" title="${product.name}">${product.name}</a></h4>
						<!-- price -->
						<div class="item-price">
							<span>
								<span class="woocommerce-Price-amount amount">
									<span class="woocommerce-Price-currencySymbol">￥</span>${product.newPrice}
								</span>
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>`;
	}
	return linkedProducts;
}

helper.getImgDiv = function(product) {
	var productResponsive = '';
	var productResponsiveThumbnail = '';
	for (var i = 0; i < product.imgs.length; i++) {
        productResponsive += `
		<div class="item-img-slider">
			<div class="images">					
				<a href="${product.imgs[i]}.jpg " data-rel="prettyPhoto[product-gallery]" class="zoom">
					<img width="600" height="600" src="${product.imgs[i]}.jpg" class="attachment-shop_single size-shop_single" alt="">
				</a>
			</div>
		</div>
		`;
		productResponsiveThumbnail += `
		<div class="item-thumbnail-product">
			<div class="thumbnail-wrapper">
				<img width="180" height="180" src="${product.imgs[i]}.jpg" class="attachment-shop_thumbnail size-shop_thumbnail" alt="">
			</div>
		</div>
		`;
	}
	return `
	<div class="slider product-responsive">${productResponsive}</div>
	<div class="slider product-responsive-thumbnail" id="product_thumbnail_247">${productResponsiveThumbnail}</div>
	`;
}

helper.getProductLi = function (product) {
    return `
	<li class="item col-lg-4 col-md-4 col-sm-6 col-xs-6 post-255 product type-product status-publish has-post-thumbnail product_cat-electronics product_cat-home-appliances product_cat-vacuum-cleaner product_brand-apoteket first instock sale featured shipping-taxable purchasable product-type-simple">
		<div class="products-entry item-wrap clearfix">
			<div class="item-detail">
				<div class="item-img products-thumb">
					<span class="onsale">Sale!</span>
					<a href="simple_product.html?id=${product.id}">
						<div class="product-thumb-hover">
							<img width="300" height="300" src="${product.imgs[0]}.jpg" class="attachment-shop_catalog size-shop_catalog wp-post-image" alt="">
						</div>
					</a>
				</div>
				<div class="item-content products-content">
					<div class="reviews-content">
						<div class="star"><span style="width: 63px"></span></div>
					</div>
					<h4><a href="simple_product.html?id=${product.id}" title="${product.name}">${product.name}</a></h4>
					<span class="item-price">
						<del>
							<span class="woocommerce-Price-amount amount">
								<span class="woocommerce-Price-currencySymbol">￥</span>
								${product.oldPrice}
							</span>
						</del> 
						<ins>
							<span class="woocommerce-Price-amount amount">
								<span class="woocommerce-Price-currencySymbol">￥</span>
								${product.newPrice}
							</span>
						</ins>
					</span>
					<div class="item-description">
						${product.description}
					</div>
				</div>
			</div>	
		</div>
	</li>
	`;
}

helper.setHeight = function($items, actor, low) {
	var setHeightInterval = setInterval(function() {
		if ($items.height() > 0) {
			clearInterval(setHeightInterval);
			var heights = [];
			$items.each(function(index, item) {
				heights.push($(item).height());
			});
			heights = heights.filter(_ => _ > 0);
			var minHeight = Math.min.apply(null, heights);
			//var maxHeight = Math.max.apply(null, heights);
			var height = minHeight;//(minHeight + maxHeight) / 2;
			if (actor) {
				height *= actor;
			}
			if (height < low) {
				height = low;
			}
			// const d = {};
			// heights.forEach(k => !d[k] ? d[k] = 1 : d[k]++);
			// const max = Object.keys(d).sort((a, b) => d[b] - d[a])[0];
			$items.each(function(index, item) {
				$(item).height(height);
			});
		}
	}, 100);
};

helper.colors = ['#7ac143', '#efc73a', "#fe9901", '#f03442', "#f034ca", "#7745bc", "#42b8d1", "#3f5eca", "#13528c", "#2f2e2e", "#e93434"];

helper.getProductDiv = function() {
	var html = '';
	var productTypes = helper.products.map(_ => _.type).distinct();
	for (var i = 0; i < productTypes.length; i++) {
		var products = helper.products.filter(_ => _.type === productTypes[i]);
		var productNames = '';
		var productItem = '';
		var bestSeller = '';
		if (products.length < 2) {
			continue;
		}
		products.forEach((_, index) => {
			if (index < 6) {
			    productNames += `<li><a href="simple_product.html?id=${_.id}">${_.name}</a></li>`;
			}
			var item = `
				<div class="item-wrap">
					<div class="item-detail">
						<div class="item-content">
							<!-- rating  -->
							<div class="reviews-content">
								<div class="star"><span style="width: 63px"></div>
								<div class="item-number-rating">4.9</div>
							</div>
							<!-- end rating  -->
							<h4><a href="simple_product.html?id=${_.id}" title="${_.name}">${_.name}</a></h4>
							<!-- Price -->
							<div class="item-price">
								<span>
									<span class="woocommerce-Price-amount amount">
										<span class="woocommerce-Price-currencySymbol">￥</span>${_.newPrice}
									</span>
								</span>
							</div>
						</div>
						<div class="item-img products-thumb">
							<a href="simple_product.html?id=${_.id}">
								<div class="product-thumb-hover">
									<img width="300" height="300"
											src="${_.imgs[0]}.jpg"
											class="attachment-shop_catalog size-shop_catalog wp-post-image"/>
								</div>
							</a>
						</div>
					</div>
				</div>`;
			if (products.length >= 6) {
				if (index < 6) { 
					if (index % 2 === 0) {
						productItem += `<div class="item product">${item}`;
					} else {
						productItem += `${item}</div>`;
					}				
				}
				if (index < 7) {
					bestSeller += `
					<div class="item">
						<div class="item-inner">
							<div class="item-img">
								<a href="simple_product.html?id=${_.id}" title="Sony BRAVIA 4K">
									<img width="180" height="180"
											src="${_.imgs[0]}.jpg"
											class="attachment-shop_thumbnail size-shop_thumbnail wp-post-image"/>
								</a>
							</div>
							<div class="item-sl pull-left">${index+1}</div>
							<div class="item-content">
								<!-- rating  -->
								<div class="reviews-content">
									<div class="star"><span style="width: 63px"></div>
									<div class="item-number-rating">4.9</div>
								</div>
								<!-- end rating  -->
								<h4><a href="simple_product.html?id=${_.id}" title="${_.name}">${_.name}</a></h4>
								<div class="item-price">
									<span class="woocommerce-Price-amount amount">
										<span class="woocommerce-Price-currencySymbol">￥</span>${_.newPrice}
									</span>
								</div>
							</div>
						</div>
					</div>`;
				}
			} else {
				if (index < 3) {
					productItem += `<div class="item product">${item}</div>`;
					bestSeller += `
					<div class="item">
						<div class="item-inner">
							<div class="item-img">
								<a href="simple_product.html?id=${_.id}" title="Sony BRAVIA 4K">
									<img width="180" height="180"
											src="${_.imgs[0]}.jpg"
											class="attachment-shop_thumbnail size-shop_thumbnail wp-post-image"/>
								</a>
							</div>
							<div class="item-sl pull-left">${index+1}</div>
							<div class="item-content">
								<!-- rating  -->
								<div class="reviews-content">
									<div class="star"><span style="width: 63px"></div>
									<div class="item-number-rating">4.9</div>
								</div>
								<!-- end rating  -->
								<h4><a href="simple_product.html?id=${_.id}" title="${_.name}">${_.name}</a></h4>
								<div class="item-price">
									<span class="woocommerce-Price-amount amount">
										<span class="woocommerce-Price-currencySymbol">￥</span>${_.newPrice}
									</span>
								</div>
							</div>
						</div>
					</div>`;
				}
			}
		});
		html += `
	    <div class="vc_row wpb_row vc_row-fluid margin-bottom-60">
			<div class="wpb_column vc_column_container vc_col-sm-12">
				<div class="vc_column-inner ">
					<div class="wpb_wrapper">
						<div id="slider_sw_woo_slider_widget_1" class="responsive-slider woo-slider-default sw-child-cat clearfix"
							    data-lg="3" data-md="3" data-sm="2" data-xs="2" data-mobile="1" data-speed="1000" data-scroll="1" 
							    data-interval="5000" data-autoplay="false">
							<div class="child-top clearfix" data-color="${helper.colors[i%helper.colors.length]}">
								<div class="box-title pull-left">
									<h3>${productTypes[i]}</h3>
									<button class="navbar-toggle" type="button" data-toggle="collapse"
											data-target="#child_sw_woo_slider_widget_1" aria-expanded="false">
										<span class="icon-bar"></span>
										<span class="icon-bar"></span>
										<span class="icon-bar"></span>
									</button>
								</div>
								<div class="box-title-right clearfix">
									<div class="childcat-content pull-left" id="child_sw_woo_slider_widget_1">
										<ul>${productNames}</ul>
									</div>
								    <div class="view-all">
										<a href="shop.html?page=1&type=${productTypes[i]}">全部<i class="fa  fa-caret-right"></i></a>
									</div>
								</div>
							</div>
							<div class="content-slider">
								<div class="childcat-slider-content clearfix">
									<!-- slider content -->
									<div class="resp-slider-container">
										<div class="slider responsive">${productItem}</div>
									</div>
								</div>     
								<div class="best-seller-product">
									<div class="box-slider-title">
										<h2 class="page-title-slider">销量最好</h2>
									</div>
									<div class="wrap-content">${bestSeller}</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	`;
	}
	return html;
}
