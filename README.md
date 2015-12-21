### 可运行在浏览器，require JS和Node JS下的可自定义的常用工具函数库iUtils

### Auther: BE-FE


#### 安装: npm install -g iutils 

#### 打包: Usage: iutils [options]

##### Options:

       -h, --help               output usage information
       -V, --version            output the version number
       -a, --all                不读取配置文件,读取目录打包全部
       -p, --package <package>  填写需要构建的合法模块名进行打包,模块名之间逗号分隔
       -b, --browser            打开浏览器,可查看各个包的文档,勾选需要的模块名进行打包
       -m, --min                是否启用压缩
       -c, --config             打开配置文件,通过修改配置文件进行打包
       -o, --output <output>    指定打包文件输出目录
       -l, --list               列出所有模块

注:默认读取配置文件,默认不打开浏览器,默认构建全部模块,默认不压缩,默认打包到当前目录下,有需求请在iutils命令后添加选项.






#### 欢迎贡献代码,基本开发规则如下:
##### 1.所有的模块格式要符合要求,开发完提交到src/modules文件夹,提交模块前应该先进行测试,并附带一个测试到test文件夹,一个实例到exeample文件夹
##### 2.每个文件夹视作一个包,包含同类操作函数,每个包需要README.md文档,列出函数列表及功能
##### 3.模块单一功能原则,每个模块实现一个单独的功能,降低耦合,增加复用概率
##### 4.唯一的命名空间为iutils,所有模块均在此命名空间下.因此所有的函数命名不能冲突,已有函数列表请查看各包文档,添加了函数需要在包文档更新函数索引.
##### 5.在包内不要使用简短的依赖模块命名,比如:get,set,parse等等,用getCookie,setTime,parseDate等来代替.
##### 6.每个函数请添加如下DOC:
       /**
        * @file 文件名
        * @auther 作者,或者收集整理者
        * @date 添加日期
        * @from 来源,是自己开发还是参考了开源代码,若有参考请注明来源
        * @api 是以函数还是以对象对外提供接口
        * @return 返回值
        * @params 参数
        * @runtime 支持的运行时:浏览器 windows, RequireJS, 或者Node.js
        * @dependencies 是否有依赖,这里的依赖指的是Node.js依赖,因为浏览器端的依赖会直接引入.
        */

