# 深度学习



## 目录

1. 理论
2. 实战
3. 总结
4. 升华



## 理论

深度学习，是人工智能领域的一个突出的话题，被众人关注已经有相当长的一段时间了。它备受关注是因为在计算机视觉（Computer Vision）和游戏（Alpha GO）等领域有超越人类能力的突破 。自上一次调查（查看调查：https://www.analyticsvidhya.com/blog/2014/06/deep-learning-attention/）以来，对于深度学习的关注又出现了大幅增加的趋势。

如果你对这个话题感兴趣的话，本文是一个很好的非技术性的介绍。如果你有兴趣了解关于深度学习的最新趋势，本文是一个很全面的汇总。

在这里，我们的目标是为新手和想进一步探索深度学习的人们提供一个学习路径。那么，你准备好踏上征服深度学习的征程了吗？我们上路吧。



**步骤0：出征准备**

建议在进入深入学习领域之前，应该了解机器学习的基本知识。“机器学习的学习路径”（https://www.analyticsvidhya.com/learning-path-learn-machine-learning/）是一个完整的资源，让你开始了解该领域。

**如果你想要一个较短的版本，请看下面：**

- 基础数学，资源1：“数学|可汗学院（Khan academy，https://www.khanacademy.org/math）”（尤其是微积分、概率论和线性代数）
- Python基础，资源：“计算机科学入门”（https://www.datacamp.com/community/open-courses/introduction-to-python-machine-learning-with-analytics-vidhya-hackathons#gs.），EDX课程
- 统计学基础，资源：“统计入门”（https://www.udacity.com/course/intro-to-statistics--st101），Udacity的课程
- 机器学习基础，资源：“机器学习入门”（https://www.udacity.com/course/intro-to-machine-learning--ud120），Udacity的课程

> 时间：建议2-6个月



**步骤1：设置好你的机器**

在继续下一步之前，请确保有支撑硬件。一般建议应该至少有：

- 一个足够好的GPU（4+ GB），最好是Nvidia的
- 一个够用的CPU（如英特尔酷睿i3可以，而英特尔Pentium 不行）

- 4GB 内存或取决于数据集。

> PS：如果你是一个铁杆游戏玩家（当然不只是糖果粉碎机玩家！），你可能已经有了所需硬件。
>
> 如果没有所需硬件，可以购买或租用一个亚马逊网页服务（AWS，https://aws.amazon.com）。这里有个利用 AWS 进行深度学习的好指南：http://cs231n.github.io/aws-tutorial/。
>
> 注意：在这个阶段不用安装任何深度学习的学习库，这些在步骤3中做。



**步骤2：尝试一下**

现在有了足够的预备知识，可以进一步了解深度学习了。

按照个人喜好，可以关注：

- 博客：（资源1：“深度学习的基础”https://www.analyticsvidhya.com/blog/2016/03/introduction-deep-learning-fundamentals-neural-networks/，资源2：“黑客的神经网络指南” http://karpathy.github.io/neuralnets/）

- 视频：“简化的深度学习”https://www.youtube.com/watch?v=b99UVkWzYTQ&list=PLjJh1vlSEYgvGod9wWiydumYl8hOXixNu

- 教科书：《神经网络和深度学习》http://neuralnetworksanddeeplearning.com

除了这些先决条件，还应该知道流行的深度学习程序库和运行它们的语言。这是一个（非全面）列表（更全面的列表请查看维基页面）：

- Caffe ：http://caffe.berkeleyvision.org
- DeepLearning4j：http://deeplearning4j.org
- Tensorflow：https://www.tensorflow.org
- Theano：http://www.deeplearning.net/software/theano/
- Torch：http://torch.ch

其他一些著名的库包括：

这里有一个根据语言分类的深度学习库列表：http://www.teglor.com/b/deep-learning-libraries-language-cm569/

> 时间：建议1-3周



**步骤3：选择你自己的探险之路**

现在有趣的部分来了！深度学习已被应用在各个领域并带来了最先进成果。为了进入到这个领域，你，读者，需要选择一条合适自己的路走。这应该是个实践经验，那样你就可以在目前所理解的之上获得一个合适的基础。

注意：每条路径包含一个入门简介的博客，一个实践项目，项目所需的深度学习的程序库和辅助课程。首先理解简介，然后安装所需的程序库，开始项目工作。如果你在这其中遇到任何困难，利用相关的课程以获得支持。

**深度学习之计算机视觉**

- 入门简介：“DL forComputer Vision”电脑视觉博客https://www.analyticsvidhya.com/blog/2016/04/deep-learning-computer-vision-introduction-convolution-neural-networks/

- 所需程序库：Nolearn，https://github.com/dnouri/nolearn#installation

- 相关课程：“cs231n： 卷积神经网络视觉识别”http://cs231n.stanford.edu

**深度学习之自然语言处理**

- 入门简介：“DeepLearning, NLP, and Representations”（“深度学习，自然语言处理与呈现”博客，http://colah.github.io/posts/2014-07-NLP-RNNs-Representations/）

- 所需程序库：tensorflow，https://github.com/dennybritz/chatbot-retrieval/#setup

- 相关课程：“cs224d：深度学习在自然语言处理方面的应用” http://cs224d.stanford.edu

**深度学习之语音/音频识别**

- 入门简介：“深度演讲：深度学习的经验教训”新闻和相应的视频。http://usa.baidu.com/deep-speech-lessons-from-deep-learning/

- 项目：“用Magenta生成音乐（tensorflow）”https://magenta.tensorflow.org/2016/06/10/recurrent-neural-network-generation-tutorial/

- 所需程序库：Magenta，https://github.com/tensorflow/magenta#installation

- 相关课程：“深度学习（2016春季），cilvr实验室@纽约http://cilvr.cs.nyu.edu/doku.php?id=courses:deeplearning2016:start

**深度学习之强化学习**

- 入门介绍与项目：“深度强化学习：来自Pixels的乒乓球游戏” http://karpathy.github.io/2016/05/31/rl/

- 所需程序库：没有要求。但是需要openAI gym（https://github.com/openai/gym#installation）来测试你的模型。

- 相关课程：“cs294：深度强化学习”http://rll.berkeley.edu/deeprlcourse/

> 时间：建议1-2个月



**步骤4：深入深度学习**

现在（几乎）能够在深度学习名人堂上占一个坑！前面的道路是漫长的和深刻的（双关语），其实主要是还未探索过的。现在是靠你自己熟悉和使用这个新技能的时候。这里有一些技巧，可以提升你的技能。

- 选择一个不同的路径重复上述步骤。
- 深度学习之以上没提到的！（例如：交易的深度学习，为优化能源效率的深度学习https://deepmind.com/blog/?t=1）
- 使用你新学到的技能来创建一个东西（请记得，力量越大，责任越大，https://xkcd.com/1613/）
- 测试你的深度学习技能（如Kaggle， https://www.kaggle.com/competitions）
- 参与深度学习社区（如谷歌群 https://plus.google.com/u/0/communities/112866381580457264725，DL subreddithttps://www.reddit.com/r/deeplearning/）
- 关注最新的研究成果及研究人员。（如“RE.WORK DL Summit ”，https://www.re-work.co/events/deep-learning-sanfran-2016”）

 

原网站：http://www.toutiao.com/i6376712652361564673/



如果你对深度学习和卷积神经网络感兴趣，但是并不知道从哪里开始，也不知道使用哪种库，那么这里就为你提供了许多帮助。

在这篇文章里，我详细解读了9个我最喜欢的Python深度学习库。这个名单并不详尽，它只是我在计算机视觉的职业生涯中使用并在某个时间段发现特别有用的一个库的列表。这其中的一些库我比别人用的多很多，尤其是Keras、mxnet和sklearn-theano。其他的一些我是间接的使用，比如 Theano 和 TensorFlow（库包括Keras、deepy和Blocks等）。另外的我只是在一些特别的任务中用过（比如nolearn和他们的Deep Belief Network implementation）。

这篇文章的目的是向你介绍这些库。我建议你认真了解这里的每一个库，然后在某个具体工作情境中你就可以确定一个最适用的库。

我想再次重申，这份名单并不详尽。此外，由于我是计算机视觉研究人员并长期活跃在这个领域，对卷积神经网络（细胞神经网络）方面的库会关注更多。



我把这个深度学习库的列表分为三个部分：

1. 第一部分是比较流行的库，你可能已经很熟悉了。对于这些库，我提供了一个通俗的、高层次的概述。然后，针对每个库我详细解说了我的喜欢之处和不喜欢之处，并列举了一些适当的应用案例。
2. 第二部分进入到我个人最喜欢的深度学习库，也是我日常工作中使用最多的，包括：Keras、mxnet和sklearn-theano等。
3. 最后，我对第一部分中不经常使用的库做了一个“福利”板块，你或许还会从中发现有用的或者是在第二板块中我还没有尝试过但看起来很有趣的库。



接下来就让我们继续探索。

针对初学者：

1. Caffe

   提到“深度学习库”就不可能不说到Caffe。事实上，自从你打开这个页面学习深度学习库，我就敢打保票你肯定听说Caffe。那么，究竟Caffe是什么呢？

   Caffe是由Berkeley Vision and Learning Center（BVLC）建立的深度学习框架。它是模块化的，速度极快。而且被应用于学术界和产业界的start-of-the-art应用程序中。

   事实上，如果你去翻阅最新的深度学习出版物（也提供源代码），你就很可能会在它们相关的GitHub库中找到Caffe模型。

   虽然Caffe本身并不是一个Python库，但它提供绑定到Python上的编程语言。我们通常在新领域开拓网络的时候使用这些绑定。

   我把Caffe放在这个列表的原因是它几乎被应用在各个方面。你可以在一个空白文档里定义你的模型架构和解决方案，建立一个JSON文件类型的.prototxt配置文件。Caffe二进制文件提取这些.prototxt文件并培训你的网络。Caffe完成培训之后，你可以把你的网络和经过分类的新图像通过Caffe二进制文件，更好的就直接通过Python或MATLAB的API。

   虽然我很喜欢Caffe的性能（它每天可以在K40 GPU上处理60万张图片），但相比之下我更喜欢Keras和mxnet。

   主要的原因是，在.prototxt文件内部构建架构可能会变得相当乏味和无聊。更重要的是， Caffe不能用编程方式调整超参数！由于这两个原因，在基于Python的API中我倾向于对允许我实现终端到终端联播网的库倾斜（包括交叉验证和调整超参数）。

   

2. Theano

   在最开始我想说Theano是美丽的。如果没有Theano，我们根本不会达到现有的深度学习库的数量（特别是在Python）。同样的，如果没有numpy，我们就不会有SciPy、scikit-learn和 scikit-image,，同样可以说是关于Theano和深度学习更高级别的抽象。

   非常核心的是，Theano是一个Python库，用来定义、优化和评估涉及多维数组的数学表达式。 Theano通过与numpy的紧密集成，透明地使用GPU来完成这些工作。

   虽然可以利用Theano建立深度学习网络，但我倾向于认为Theano是神经网络的基石，同样的numpy是作为科学计算的基石。事实上，大多数我在文章中提到的库都是围绕着Theano，使自己变得更加便利。

   不要误会我的意思，我爱Theano，我只是不喜欢用Theano编写代码。

   在Theano建设卷积神经网络就像只用本机Python中的numpy写一个定制的支持向量机（SVM），当然这个对比并不是很完美。

   你可以做到吗？

   当然可以。

   它值得花费您的时间和精力吗？

   嗯，也许吧。这取决于你是否想摆脱低级别或你的应用是否需要。

   就个人而言，我宁愿使用像Keras这样的库，它把Theano包装成更有人性化的API，同样的方式，scikit-learn使机器学习算法工作变得更加容易。

   

3. TensorFlow

   与Theano类似，TensorFlow是使用数据流图进行数值计算的开源库（这是所有神经网络固有的特征）。最初由谷歌的机器智能研究机构内的Google Brain Team研究人员开发，此后库一直开源，并提供给公众。

   相比于Theano ，TensorFlow的主要优点是分布式计算，特别是在多GPU的环境中（虽然这是Theano正在攻克的项目）。

   除了用TensorFlow而不是Theano替换Keras后端，对于TensorFlow库我并没有太多的经验。然而在接下来的几个月里，我希望这有所改变。

 

4. Lasagne

   Lasagne是Theano中用于构建和训练网络的轻量级库。这里的关键词是轻量级的，也就意味着它不是一个像Keras一样围绕着Theano的重包装的库。虽然这会导致你的代码更加繁琐，但它会把你从各种限制中解脱出来，同时还可以让您根据Theano进行模块化的构建。

   简而言之：Lasagne的功能是Theano的低级编程和Keras的高级抽象之间的一个折中。

 

5. Keras

   如果我必须选出一个最喜欢的深度学习Python库，我将很难在Keras和mxnet中做出抉择——但最后，我想我会选Keras。

   说真的，Keras的好处我说都说不完。

   Keras是一个最低限度的、模块化的神经网络库，可以使用Theano或TensorFlow作为后端。Keras最主要的用户体验是，从构思到产生结果将会是一个非常迅速的过程。

   在Keras中架构网络设计是十分轻松自然的。它包括一些state-of-the-art中针对优化（Adam，RMSProp）、标准化（BatchNorm）和激活层（PReLU，ELU，LeakyReLU）最新的算法。

   Keras也非常注重卷积神经网络，这也是我十分需要的。无论它是有意还是无意的，我觉得从计算机视觉的角度来看这是非常有价值的。

   更重要的是，你既可以轻松地构建基于序列的网络（其中输入线性流经网络）又可以创建基于图形的网络（输入可以“跳过”某些层直接和后面对接）。这使得创建像GoogLeNet和SqueezeNet这样复杂的网络结构变得容易得多。

   我认为Keras唯一的问题是它不支持多GPU环境中并行地训练网络。这可能会也可能不会成为你的大忌。

   如果我想尽快地训练网络，那么我可能会使用mxnet。但是如果我需要调整超参数，我就会用Keras设置四个独立的实验（分别在我的Titan X GPUs上运行）并评估结果。

 

6. mxnet

   我第二喜欢的深度学习Python库无疑就是mxnet（重点也是训练图像分类网络）。虽然在mxnet中站立一个网络可能需要较多的代码，但它会提供给你惊人数量的语言绑定（C ++、Python、R、JavaScript等）。

   Mxnet库真正出色的是分布式计算，它支持在多个CPU / GPU机训练你的网络，甚至可以在AWS、Azure以及YARN集群。

   它确实需要更多的代码来设立一个实验并在mxnet上运行（与Keras相比），但如果你需要跨多个GPU或系统分配训练，我推荐mxnet。

 

7. sklearn-theano

   有时候你并不需要终端到终端的培养一个卷积神经网络。相反，你需要把CNN看作一个特征提取器。当你没有足够的数据来从头培养一个完整的CNN时它就会变得特别有用。仅仅需要把你的输入图像放入流行的预先训练架构，如OverFeat、AlexNet、VGGNet或GoogLeNet，然后从FC层提取特征（或任何您要使用的层）。

   总之，这就是sklearn-theano的功能所在。你不能用它从头到尾的训练一个模型，但它的神奇之处就是可以把网络作为特征提取器。当需要评估一个特定的问题是否适合使用深度学习来解决时，我倾向于使用这个库作为我的第一手判断。

 

8. nolearn

   我在PyImageSearch博客上用过几次nolearn，主要是在我的MacBook Pro上进行一些初步的GPU实验和在Amazon EC2 GPU实例中进行深度学习。

   Keras把 Theano和TensorFlow包装成了更具人性化的API，而nolearn也为Lasagne做了相同的事。此外，nolearn中所有的代码都是与scikit-learn兼容的，这对我来说绝对是个超级的福利。

   我个人不使用nolearn做卷积神经网络（CNNs），但你当然也可以用（我更喜欢用Keras和mxnet来做CNNs）。我主要用nolearn来制作Deep Belief Networks (DBNs)。

 

9. DIGITS

   DIGITS并不是一个真正的深度学习库（虽然它是用Python写的）。DIGITS（深度学习GPU培训系统）实际上是用于培训Caffe深度学习模式的web应用程序（虽然我认为你可以破解源代码然后使用Caffe以外其他的后端进行工作，但这听起来就像一场噩梦）。

   如果你曾经用过Caffe，那么你就会知道通过它的终端来定义.prototxt文件、生成图像数据、运行网络并监管你的网络训练是相当繁琐的。 DIGITS旨在通过让你在浏览器中执行这些任务来解决这个问题。

   此外，DIGITS的用户界面非常出色，它可以为你提供有价值的统计数据和图表作为你的模型训练。另外，你可以通过各种输入轻松地可视化网络中的激活层。最后，如果您想测试一个特定的图像，您可以把图片上传到你的DIGITS服务器或进入图片的URL，然后你的Caffe模型将会自动分类图像并把结果显示在浏览器中。干净利落！

 

福利：



- Blocks

  说实话，虽然我一直想尝试，但截至目前我的确从来没用过Blocks（这也是我把它包括在这个列表里的原因）。就像许多个在这个列表中的其他库一样，Blocks建立在Theano之上，呈现出一个用户友好型的API。

  

- deepy

  如果让你猜deepy是围绕哪个库建立的，你会猜什么？

  没错，就是Theano。

  我记得在前一段时间用过deepy（做了初始提交），但在接下里的大概6-8个月我都没有碰它了。我打算在接下来的博客文章里再尝试一下。

 

- pylearn2

  虽然我从没有主动地使用pylearn2，但由于历史原因，我觉得很有必要把它包括在这个列表里。 Pylearn2不仅仅是一般的机器学习库（地位类似于scikit-learn），也包含了深度学习算法的实现。

  对于pylearn2我最大的担忧就是（在撰写本文时），它没有一个活跃的开发者。正因为如此，相比于像Keras和mxnet这样的有积极维护的库，推荐pylearn2我还有些犹豫。

 

- Deeplearning4j

  这本应是一个基于Python的列表，但我想我会把Deeplearning4j包括在这里，主要是出于对他们所做事迹的无比崇敬——Deeplearning4j为JVM建立了一个开源的、分布式的深度学习库。

  如果您在企业工作，你可能会有一个塞满了用过的Hadoop和MapReduce服务器的储存器。也许这些你还在用，也许早就不用了。

  你怎样才能把这些相同的服务器应用到深度学习里？

  事实证明是可以的——你只需要Deeplearning4j。

 

深入研究深度学习和卷积神经网络

对深度学习好奇吗？我会在这里提供帮助。

在PyImageSearch大师的课程中，我创建了21节课包括256页的神经网络、深度信念网络和卷积神经网络教程，可以让你轻松快速的学到这些内容。

想要了解更多关于PyImageSearch大师课程的内容（抢10个免费课程样本），只需点击下面的链接：

https://www.pyimagesearch.com/pyimagesearch-gurus/?src=post-deep-learning-libs

 

总结

在这篇文章中，我回顾了一些我最喜爱的深度学习和卷积神经网络库。但这个列表决不是详尽的，而且专注于计算机视觉和卷积神经网络的深度学习库肯定是有失偏颇的。

尽管这样说，但对于一个刚刚进入深度学习领域，并在寻找一个合适的库的人，我认为这确实是一个伟大的列表。

我个人认为打败 Keras 和 mxne 是很难的事。Keras 库位于计算的龙头地位，如 Theano 和 TensorFlow，可以让您只需几行 Python 代码就可以构建深度学习架构。

虽然 mxnet 可能需要更多一点的代码来构建和培养网络，但它能够轻松高效地将培养任务分配到多个 GPU 中。如果你在一个多 GPU 系统或环境中，并希望充分利用这个环境，那就肯定要试一试 mxnet。

 

舆情系统



## 实战





## 总结





## 升华







