<?php
class apiAction extends baseAction {
	private $page_size=10;	
	public function index() {	
		//index.php?a=index&m=api&method=itemsSearchGet&timestamp=1375436073&sign=5cb85c3eed22c1908e05c584813c8dd2
		//index.php?a=index&m=api&method=itemsSearchGet&timestamp=1375436073&sign=5cb85c3eed22c1908e05c584813c8dd2				
		//$this->check();		
		$method=$this->_get('method');
		//执行请求的方法
		$this->$method();
		exit();
	}
	//检测请求是否合法
	private function check(){
		$method_array=array('itemsSearchGet','itemsCateGet','itemsListGet','itemGet','itemLikes');		
		//签名方式
		//http://域名/index.php?a=index&m=api&method=itemsSearchGet&timestamp=1375436073&sign=5cb85c3eed22c1908e05c584813c8dd2		
		$method=$this->_get('method');     //method
		$timestamp=$this->_get('timestamp');   //timestamp
		$key='123456';	//双方约定的一个key		
		$sign=$this->_get('sign');  //签名	
			
		$my_sign=md5(strtoupper($method.$timestamp.$key));		
		if(!in_array($method, $method_array)){
			exit('请求的方法不存在');
		}
		if($my_sign!=$sign){
			exit('签名不正确');
		}	
		return true;	
	}
	//获取商品列表
	private function itemsSearchGet(){
		$keyword=urldecode($this->_get('keyword'));
		$page=$this->_get('p');
		$order=$this->_get('order');
		$page=isset($page)?$page:1;  //当前的页数
		$sql_where='status=1';		
		$sql_where.= !empty($keyword) ? " AND title LIKE '%" . trim($keyword) . "%' AND sid=1" :'';		
		$item_mod=$this->items_mod;		
		
		import("ORG.Util.Page");
		$count = $item_mod->where($sql_where)->count();
		$totalPage=ceil($count/$this->page_size); //总页数
		
		$p = new Page($count,$this->page_size);
		if(empty($order)){
			$order='sort_order ASC,id DESC';
		}else{
			$order=str_replace('_', ' ', $order);
		}	
		$itemsSearchRel = $item_mod->field('id,cid,title,bimg,url,likes')->where($sql_where)->limit($p->firstRow.','.$p->listRows)->order($order)->select();
     	$itemsSearchRel=array(
			'result'=>$itemsSearchRel,
			'page'=>$page,
			'totalPage'=>$totalPage
		);
		
		$itemsSearchRel=json_encode($itemsSearchRel);
		
		$callback=$_GET['callback'];	

		echo $callback."($itemsSearchRel)";    
		exit;		
	}	
	
}