<%@ Page Language="C#" MasterPageFile="~/Master.master" AutoEventWireup="true" CodeFile="index.aspx.cs" Inherits="index" Title="星辰之间" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <style type="text/css">
        .carousel-inner .item {
        }

        .carousel-inner img {
            margin: 0 auto;
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div class="carousel slide" id="carousel-example-generic" data-ride="carousel">
        <!-- Indicators -->
        <ol class="carousel-indicators">
            <li data-target="#carousel-example-generic" data-slide-to="0"></li>
            <li data-target="#carousel-example-generic" data-slide-to="1" class="active"></li>
            <li data-target="#carousel-example-generic" data-slide-to="2"></li>
        </ol>
        <!-- Wrapper for slides -->
        <div class="carousel-inner" role="listbox">
            <div class="item">
                <img alt="..." src="Public/Image/1.jpg" style="width: 100%; height: 450px">
                <div class="carousel-caption">
                </div>
            </div>
            <div class="item active">
                <img alt="..." src="Public/Image/2.gif" style="width: 100%; height: 450px">
                <div class="carousel-caption">
                </div>
            </div>
            <div class="item">
                <img alt="..." src="Public/Image/3.jpg" style="width: 100%; height: 450px">
                <div class="carousel-caption">
                </div>
            </div>
        </div>
        <!-- Controls -->
        <a class="left carousel-control" role="button" href="#carousel-example-generic" data-slide="prev">
            <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
        </a>
        <a class="right carousel-control" role="button" href="#carousel-example-generic" data-slide="next">
            <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
        </a>
    </div>
    <div class="container">

        <div class="row row-offcanvas row-offcanvas-right">

            <div class="col-xs-12 col-sm-9">
                <p class="pull-right visible-xs">
                    <button class="btn btn-primary btn-xs" type="button" data-toggle="offcanvas">Toggle nav</button>
                </p>
                <div class="jumbotron">
                    <h1>Hello, world!</h1>
                    <p>This is an example to show the potential of an offcanvas layout pattern in Bootstrap. Try some responsive-range viewport sizes to see it in action.</p>
                </div>
                <div class="row">
                    <div class="col-xs-6 col-lg-4">
                        <h2>商城系统</h2>
                        <p>一个简单的在线商城系统的Demo，主要使用vs2015提供的服务器控件实现。</p>
                        <p><a class="btn btn-default" role="button" href="#">点此查看 »</a></p>
                    </div>
                    <!--/.col-xs-6.col-lg-4-->
                    <div class="col-xs-6 col-lg-4">
                        <h2>在线论坛</h2>
                        <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. </p>
                        <p><a class="btn btn-default" role="button" href="#">View details »</a></p>
                    </div>
                    <!--/.col-xs-6.col-lg-4-->
                    <div class="col-xs-6 col-lg-4">
                        <h2>客户关系管理</h2>
                        <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. </p>
                        <p><a class="btn btn-default" role="button" href="#">View details »</a></p>
                    </div>
                    <!--/.col-xs-6.col-lg-4-->
                    <div class="col-xs-6 col-lg-4">
                        <h2>供应链管理</h2>
                        <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. </p>
                        <p><a class="btn btn-default" role="button" href="#">View details »</a></p>
                    </div>
                    <!--/.col-xs-6.col-lg-4-->
                    <div class="col-xs-6 col-lg-4">
                        <h2>项目管理</h2>
                        <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. </p>
                        <p><a class="btn btn-default" role="button" href="#">View details »</a></p>
                    </div>
                    <!--/.col-xs-6.col-lg-4-->
                    <div class="col-xs-6 col-lg-4">
                        <h2>产品生命周期管理</h2>
                        <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. </p>
                        <p><a class="btn btn-default" role="button" href="#">View details »</a></p>
                    </div>
                    <!--/.col-xs-6.col-lg-4-->
                </div>
                <!--/row-->
            </div>
            <!--/.col-xs-12.col-sm-9-->

            <div class="col-xs-6 col-sm-3 sidebar-offcanvas" id="sidebar">
                <div class="list-group">
                    <a class="list-group-item active" href="#">智能时代</a>
                    <a class="list-group-item" href="#">金融世界</a>
                    <a class="list-group-item" href="#">生活百科</a>
                    <a class="list-group-item" href="#">数学奥秘</a>
                    <a class="list-group-item" href="#">科学探索</a>
                    <a class="list-group-item" href="#">宇宙自然</a>
                    <a class="list-group-item" href="#">人文地理</a>
                    <a class="list-group-item" href="#">历史政治</a>
                    <a class="list-group-item" href="#">艺术殿堂</a>
                    <a class="list-group-item" href="#">棋行天下</a>
                </div>
            </div>
            <!--/.sidebar-offcanvas-->
        </div>
        <!--/row-->

        <hr>
    </div>
</asp:Content>

