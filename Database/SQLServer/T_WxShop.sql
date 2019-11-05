select * from AdminUser

create table Product(
	ID int primary key identity(1,1),
	Name nvarchar(600),
	ShortName nvarchar(20),
	Content nvarchar(max),
	Price decimal,
	ActPrice decimal,
	[level] float,
	isActive bit,
	[Timestamp] timestamp
);
go
alter table Product add isActive bit
alter table Product add [Timestamp] timestamp
insert into Product(Name,ShortName,Content,Price,ActPrice,[level]) values
('Proin nunc nibh, adipiscing eu nisi id, ultrices suscipit augue. Sed rhoncus hendrerit lacus, et venenatis felis. Donec ut fringilla magna ultrices suscipit augue. Proin nunc nibh, adipiscing eu nisi id, ultrices suscipit augue. Sed rhoncus hendrerit lacus, et venenatis felis. Donec ut fringilla magna ultrices suscipit augue.', 'Turkey Qui', 'Proident adipisicing laborum beef ribs tri-tip dolore meatball tempor rump flank prosciutto elit do. Duis tenderloin culpa excepteur. Fugiat irure est cupim dolor, ut nulla id andouille chicken spare ribs eiusmod brisket biltong. Eiusmod minim tail cupim labore ad filet mignon, andouille esse enim. Sausage salami dolor ex adipisicing consequat. Ground round nostrud ut fatback voluptate consequat in minim drumstick culpa dolore. Ea beef prosciutto in sirloin fatback enim velit consectetur in pork belly pancetta culpa shank.
<br/><br/>Shank quis in duis, id officia nulla. Pancetta sunt filet mignon porchetta doner turkey occaecat. Meatball corned beef elit ut fugiat. Hamburger biltong tail beef in cupim proident turducken picanha. Sausage chicken incididunt ad occaecat porchetta pancetta corned beef ham hock laborum nisi ullamco pork loin kielbasa aliqua.
<br/><br/>In jerky minim chicken duis ground round nostrud pork belly occaecat pastrami commodo adipisicing tongue doner short loin. Officia est do, filet mignon shank pork loin anim esse quis kevin corned beef enim. Magna sint sirloin ham hock cupidatat laboris. Boudin spare ribs kevin meatloaf id short loin swine flank brisket aute. Reprehenderit turkey qui, boudin swine voluptate ipsum fugiat.
<br/><br/>Salami in ball tip pig eiusmod occaecat pork chop, consequat excepteur incididunt. Ground round picanha ut boudin exercitation jerky meatball strip steak ipsum labore spare ribs turducken ribeye ut aliquip. Id ipsum esse nisi ball tip chuck adipisicing sint culpa t-bone brisket bresaola mollit. Enim eu kevin, tail in nisi nulla sirloin adipisicing veniam dolore.', 300.00, 300.00, 5)

select * from Product

select * from ProductType
insert into ProductType(Name, ParentID) values
(N'坚果', 0),
(N'零食', 0),
(N'点心', 0),
(N'生活用品', 0)

select * from ProductImage