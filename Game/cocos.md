# cocos

## 目录

## cocos2d

Cocos2d-x-->CCSprite动画

帧动画是我们见得最多的，电视、电影等，如果印象深刻的话，小时候的那种老款照相机的胶卷...大小相同的一张一张的底片....哈哈！其实如果对游戏要求不高，游戏的图片也不多，咋们就可以采用这种方式来制作动画，不过好游戏一般都不是这样做的....那是什么呢？...动作编辑器，先讲讲最基础的制作动画方式（其实利用动作编辑器，其实也是切割图片,如果还没有接触过动作编辑器的，可以学着用下SpriteX）...好了，就此开始吧！

1. 先用texturePacker制作我们的素材

   找一组动画图片，我直接test里面那个大叔的一组图片...

   由于用直接用test里面的图片有点问题，所以我直接把组图，用ps切出每帧然后导出，然后用texturePacker打包，导出role.plist和role.png

2. 上传代码：...老样子（我没有新建工程，直接用的原来的工程）

   红色框出来的就是我基于上讲工程新添加的文件：（因为我特别怕乱，所以单独创建和场景和层）

ActionScene.h：

```C
#pragma once
#include "cocos2d.h"
using namespace cocos2d;
class ActionScene :public CCScene
{
public:
    ActionScene(void);
    ~ActionScene(void);
    static CCScene* scene();
};

ActionScen.cpp
#include "ActionScene.h"
#include "ActionLayer.h"

ActionScene::ActionScene(void)
{
}
ActionScene::~ActionScene(void)
{
}

CCScene* ActionScene::scene()
{
    CCScene* scene=CCScene::create();
    CCLayer* layer=ActionLayer::layer(0);
    scene->addChild(layer);
    scene->scheduleUpdate();
    return scene;
}

ActionLayer.h
#pragma once
#include "cocos2d.h"
using namespace cocos2d;
enum
{
    ACTION_ANIMATION_LAYER=0
};
class ActionLayer :public CCLayer
{
public:
    ActionLayer(void);
    ~ActionLayer(void);
    static CCLayer* layer(int id);
protected:
    CCSprite* grossini;
};
ActionLayer.cpp
#include "ActionLayer.h"
#include "ActionAnimationLayer.h"
ActionLayer::ActionLayer(void)
{
}

ActionLayer::~ActionLayer(void)
{
}
CCLayer* ActionLayer::layer(int id)
{
    CCLayer* pLayer=NULL;
    switch(id)
    {
    case ACTION_ANIMATION_LAYER:
        pLayer=new ActionAnimationLayer();
        break;
    }
    return pLayer;
}
ActionAnimationLayer.h
#pragma once
#include "actionlayer.h"
class ActionAnimationLayer :public ActionLayer
{
public:
    ActionAnimationLayer(void);
    ~ActionAnimationLayer(void);
    virtual void onEnter();
    void frameAnimation(CCSpriteFrameCache *cache);
    void jumpAnimation();
    void fadeAnimation();
    void sequenceAnimation(CCSize s);
    void followAnimation(CCSize s);
};


ActionAnimationLayer.cpp
#include "ActionAnimationLayer.h"
ActionAnimationLayer::ActionAnimationLayer(void)
{
}
ActionAnimationLayer::~ActionAnimationLayer(void)
{
}
void ActionAnimationLayer::onEnter()
{
    //【注意:】此句话千万不要漏了，漏了是不会有动画效果的，底层包含了动画的刷新，
    //我就是这个地方啊！搞得我多搞了几个小时，还好这个工程熟悉了一下底层的代码
    CCLayer::onEnter();

    CCSize s=CCDirector::sharedDirector()->getWinSize();

    CCSpriteFrameCache *cache=CCSpriteFrameCache::sharedSpriteFrameCache();
    cache->addSpriteFramesWithFile("role.plist","role.png");

    grossini=CCSprite::spriteWithSpriteFrameName("role2.png");
    grossini->setPosition(ccp(s.width/2,s.height/2));

    this->addChild(grossini);

    //播放帧动画
    //this->frameAnimation(cache);
    //播放跳动画
    //this->jumpAnimation();
    //浅入浅出
    //this->fadeAnimation();
    //组动画：move+rotate
    //this->sequenceAnimation(s);
    //拉屏幕效果
    this->followAnimation(s);
}

void ActionAnimationLayer::frameAnimation(CCSpriteFrameCache *cache)
{
    //第一种方式：
    CCAnimation* animation = CCAnimation::create();
    for( int i=1;i<5;i++)
    {
        char szName[100] = {0};
        sprintf(szName, "role%1d.png", i);
        //animation->addSpriteFrameWithFileName(szName);

        animation->addSpriteFrame(cache->spriteFrameByName(szName));
    }
    // 每针停留2.8/14f秒
    animation->setDelayPerUnit(2.8f / 14.0f);
    //设置恢复初始针
    animation->setRestoreOriginalFrame(true);
    //设置循环次数
    animation->setLoops(4);
    //创建动画
    CCAnimate* action = CCAnimate::create(animation);
    //运行动画
    grossini->runAction(CCSequence::create(action, action->reverse(), NULL));
    //第二种方式：
    /*CCArray* animFrames=CCArray::create(4);
    char str[100]={0};
    for(int i=1;i<5;i++)
    {
        sprintf(str, "role%1d.png", i);
        CCSpriteFrame* frame=cache2->spriteFrameByName(str);
        animFrames->addObject(frame);
    }
     CCAnimation* animation = CCAnimation::create(animFrames,0.3f);
     grossini->runAction(CCRepeatForever::create(CCAnimate::create(animation)));*/
}

void ActionAnimationLayer::jumpAnimation()
{
    //参数说明：时间秒，移动点，高度，步数
    CCActionInterval*  actionTo = CCJumpTo::create(2, CCPointMake(300,300), 50, 4);
    CCActionInterval*  actionBy = CCJumpBy::create(2, CCPointMake(300,0), 50, 4);
    CCActionInterval*  actionByBack = actionBy->reverse();//让动作回到actionBy之前的地方
    grossini->runAction( actionTo);
    grossini->runAction( CCSequence::create(actionBy, actionByBack, NULL));
}
void ActionAnimationLayer::fadeAnimation()
{
    grossini->setOpacity(0);//设置透明度0为完全透明，1不透明
    CCActionInterval*  action1 = CCFadeIn::create(1.0f);
    CCActionInterval*  action1Back = action1->reverse();//同上

    grossini->runAction( CCSequence::create( action1, action1Back, NULL));
}
void ActionAnimationLayer::sequenceAnimation(CCSize s)
{
    grossini->setPosition(ccp(60, s.height/2));
    //移动到(240,0)然后旋转540度
    CCFiniteTimeAction*  action = CCSequence::create(
        CCMoveBy::create( 2, CCPointMake(240,0)),
        CCRotateBy::create( 2,  540),
        NULL);

    grossini->runAction(action);
}

void ActionAnimationLayer::followAnimation(CCSize s)
{
    //这个效果我喜欢,以后游戏中可以用到...
    grossini->setPosition(CCPointMake(-200, s.height / 2));
    CCActionInterval* move= CCMoveBy::create(2, CCPointMake(s.width * 3, 0));
    CCActionInterval* move_back = move->reverse();
    CCFiniteTimeAction* seq = CCSequence::create(move, move_back, NULL);//来回移动
    CCAction* rep = CCRepeatForever::create((CCActionInterval*)seq);//设置成永远循环
    grossini->runAction(rep);
    this->runAction(CCFollow::create(grossini, CCRectMake(0, 0, s.width * 2 - 100, s.height)));//设定一个拉动层区域动画
}
```

帧动画，跳动画，组合动画，浅入浅出动画，拉屏幕动画，对于这些了解了，然后如果还有其他需求，相对就简单很多了。好了。明天讲menu,Label等，也就是游戏常用的一些ui...

Cocos2d-x初入学堂->TexturePacker非常棒的图像处理工具

1、为什么要用这个工具呢？有什么好处？

第一点：内存问题, OpenGL ES  纹理的宽和高都要是2次幂数, 以刚才的例子来说, 假如 start.png 本身是 480x320, 但在载入内存後, 它其实会被变成一张 512x512 的纹理, 而start.png 则由 101x131 变成 128x256, 默认情况下面，当你在cocos2d里面加载一张图片的时候，对于每一个像素点使用４个byte来表示--１个byte（８位）代表red，另外３个byte分别代表green、blue和alpha透明通道。这个就简称RGBA8888。

因此，如果你使用默认的像素格式来加载图片的话，你可以通过下面的公式来计算出将要消耗多少内存来加载：

图像宽度（width）×图像高度（height）×每一个像素的位数（bytes　per　pixel）　=　内存大小

此时，如果你有一张５１２×５１２的图片，那么当你使用默认的像素格式去加载它的话，那么将耗费５１２×５１２×４=１MB（好多啊！）

第二点：再看看关於渲染速度方面, OpenGL ES 上来说我们应该尽量减少渲染时切换纹理和 glDrawArray 的呼叫,刚才的例子每画一个图像都会切换一次纹理并呼叫一次 glDrawArray , 我们这里只画3样东西, 所以不会看到有什麽问题, 但如果我们要渲染几十个甚至几百个图像 , 速度上就会被拖慢. 很明显这并不是我们所想要的..

2、认识TexturePacker的界面

Data Format:导出什么引擎数据，默认cocos2d,下拉列表中有很多，基本常用的引擎都支持了

Data File :导出文件位置(后缀名.plist)

Texture Format:纹理格式,默认png

Image format:图片像素格式，默认RGBA8888...根据对图片质量的需求导出不同的格式

Dithering:抖动,默认NearestNeighbour,(如果图像上面有许许多多的“条条”和颜色梯度变化)将其修改成FloydSteinberg＋Alpha;

Scale: 让你可以保存一个比原始图片尺寸要大一点、或者小一点的spritesheet。比如，如果你想在spritesheet中加载“@2x"的图片（也即为Retina-display设备或者ipad创建的）。但是你同时也想为不支持高清显示的iphone和touch制作spritesheet，这时候只需要设置scale为 1.0,同时勾选autoSD就可以了。也就是说，只需要美工提供高清显示的图片，用这个软件可以自己为你生成高清和普清的图片。

Algorithm TexturePacker:里面目前唯一支持的算法就是MaxRects，即按精灵尺寸大小排列，但是这个算法效果非常好，因此你不用管它。

Border/shape padding: 即在spritesheet里面，设置精灵与精灵之间的间隔。如果你在你的游戏当中看到精灵的旁边有一些“杂图”的时候，你就可以增加这个精灵之间的间隔。

Extrude: 精灵边界的重复像素个数. 这个与间隔是相对应的--如果你在你的精灵的边边上看到一些透明的小点点，你就可以通过把这个值设设置大一点。

Trim: 通过移除精灵四周的透明区域使之更好地放在spritesheet中去。不要担心，这些透明的区域仅仅是为了使spritesheet里面的精灵紧凑一点。--当你从cocos2d里面去读取这些精灵的时候，这些透明区域仍然在寻里。（因为，有些情况下，你可能需要这些信息来确定精灵的位置）

Shape outlines: 把这个选项打开，那么就能看到精灵的边边。这在调试的时候非常有用。

AddSprite:添加图片Add Folder:根据文件夹添加图片

Publish：导出资源文件（.plist和png）

3、程序中更改资源加载方式

我就是用的上一个例子，

然后将start.png,grossinis.png,grossinis_sister1.png,grossinis_sister2.png打包成一个image.plist和image.png.

SpriteTestLayer.cpp（就只改了这个这个文件）

```C
#include "SpriteTestLayer.h"

SpriteTestLayer::SpriteTestLayer(void)
{
}

bool SpriteTestLayer::init()
{
    CCSize s=CCDirector::sharedDirector()->getWinSize();
    //第一种加载资源方式
    //CCSprite* sprite=CCSprite::create("start.png");
    //第二种加载资源方式
    CCSpriteFrameCache *cache=CCSpriteFrameCache::sharedSpriteFrameCache();
    cache->addSpriteFramesWithFile("image.plist","image.png");
    CCTexture2D *texture = CCTextureCache::sharedTextureCache()->textureForKey("image.png"); 
    CCSpriteBatchNode *spriteBatch = CCSpriteBatchNode::batchNodeWithTexture(texture); 
    addChild(spriteBatch); 
    CCSprite* sprite=CCSprite::spriteWithSpriteFrameName("start.png");
    /*
        加载pvr压缩格式文件方式：注意此种方法不可以像上面打成一个文件，然后根据名字来索引对应的图片
        如果在AndEngine中使用，然后利用TexturePacker是可以导出三个文件格式的，就是多出来了一个xml文件
        保存着索引子图片的索引，已经图片位置等信息，cocos2dx的test也没有找到相应的例子，只有单独一个
        精灵才用到了加载pvr这种格式，可能cocos2dx却没有导出这个xml,也可能是这个原因吧！
        //第一种方式:
        CCSprite* sprite=CCSprite::create("image.pvr.ccz");
        //第二种方式：
        CCTexture2D *texture;
        CCTextureCache *cache=CCTextureCache::sharedTextureCache();
        texture=cache->addImage("image.pvr.ccz");
        CCSprite* sprite=CCSprite::create(texture);*/

    sprite->setAnchorPoint(ccp(0,1));//设置sprite的描点,(0,1)也就是图片的左上角
    sprite->setPosition(ccp(0,s.height));//设置sprite位置
    this->addChild(sprite);

    //sprite的一些基本的操作:缩放、旋转、混色
    m_tamara=CCSprite::spriteWithSpriteFrameName("grossini.png");
    m_tamara->setScaleX( 2.5f);
    m_tamara->setScaleY( -1.0f);
    m_tamara->setPosition(ccp(100,70) );
    m_tamara->setOpacity( 255);//RGBA值RGB+透明度值
    this->addChild(m_tamara);

    m_grossini=CCSprite::spriteWithSpriteFrameName("grossinis_sister1.png");
    m_grossini->setRotation( 120);
    m_grossini->setPosition( ccp(s.width/2, s.height/2));
    m_grossini->setColor( ccc3( 255,0,0));
    this->addChild(m_grossini);

    m_kathia=CCSprite::spriteWithSpriteFrameName("grossinis_sister2.png");
    m_kathia->setPosition( ccp(s.width-100, s.height/2));
    m_kathia->setColor( ccBLUE);
    this->addChild(m_kathia);
    return true;
}
SpriteTestLayer::~SpriteTestLayer(void)
{
}
```

哈哈！ 效果一样，没问题了，以后就用这种方法加载资源图片吧！

如果讲述得有误，或者不对的地方，还望各位指出！
