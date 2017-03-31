# timeline 时间轴插件

#### 简介

timeline 基于 raphael.js 开发，支持时间轴上主节点和分支节点的展示方式。

#### 示例
~~~javascript
$(function () {
    var opt = {
        //图例数据
        legend: [
            {
                text: "图例1-测试-images/compact_disc.png",
                name: "1",
                icon: "images/compact_disc.png"
            }, {
                text: "图例2",
                name: "2",
                icon: "images/compose.png"
            }, {
                text: "图例3",
                name: "3",
                icon: "images/computer-keyboard.png"
            }, {
                text: "图例4-测试-abcdefg",
                name: "4",
                icon: "images/contacts.png"
            }, {
                text: "图例5",
                name: "5",
                icon: "images/contacts-alt.png"
            }, {
                text: "legend6",
                name: "6",
                icon: "images/counter.png"
            }],
        //节点数据
        data: [
            {
                text: "主节点1",
                //子节点
                children: [
                    {
                        text: "1-1:图例1-测试-images/compact_disc.png",
                        legendName: "1",
                        imageUrl: ""
                    }, {
                        text: "1-2",
                        legendName: "2",
                        imageUrl: ""
                    }, {
                        text: "1-3",
                        legendName: "3",
                        imageUrl: ""
                    }, {
                        text: "1-4:test",
                        legendName: "4",
                        imageUrl: ""
                    }, {
                        text: "1-5",
                        legendName: "5",
                        imageUrl: ""
                    }, {
                        text: "1-6",
                        legendName: "6",
                        imageUrl: ""
                    }]
            },
            {
                text: "主节点2"
            },
            {
                text: "主节点3",
                children: [
                    {
                        text: "1-1:图例1-测试-images/compact_disc.png",
                        legendName: "1",
                        imageUrl: ""
                    }, {
                        text: "1-2",
                        legendName: "2",
                        imageUrl: ""
                    }, {
                        text: "1-3",
                        legendName: "3",
                        imageUrl: ""
                    }, {
                        text: "1-4:test",
                        legendName: "4",
                        imageUrl: ""
                    }, {
                        text: "1-5",
                        legendName: "5",
                        imageUrl: ""
                    }, {
                        text: "1-6",
                        legendName: "6",
                        imageUrl: ""
                    }]
            },
            {
                text: "主节点4"
            },
            {
                text: "主节点5"
            },
            {
                text: "主节点6"
            }

        ]
    }
    $("#demo").timeline(opt);

});
~~~

![示例效果](https://github.com/huang-qing/timeline/raw/master/timeline-demo.png)


## 启动Web服务

~~~
cnpm install http-server -g
~~~

terminal:
~~
http-server
~~

