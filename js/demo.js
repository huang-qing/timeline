$(function () {
    var opt1 = {
        legend: [{
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
        data: [{
                text: "item0405/item0405/A.001",
                imageUrl: "images/counter.png",
                children: [{
                    text: "测试：一个分支时定位不正确",
                    legendName: "1",
                    imageUrl: ""
                }]
            },
            {
                text: "主节点1",
                imageUrl: ["images/counter.png", "images/counter.png"],
                children: [{
                    text: "1-1:图例1-测试-images/compact_disc.png",
                    legendName: "1",
                    imageUrl: ""
                }, {
                    text: "1-2",
                    legendName: "2",
                    imageUrl: "images/contacts-alt.png"
                }, {
                    text: "1-3",
                    legendName: "3",
                    imageUrl: ["images/contacts-alt.png", "images/computer-keyboard.png"]
                }, {
                    text: "1-4:test",
                    legendName: "4",
                    imageUrl: ""
                }, {
                    text: "1-5",
                    legendName: "5",
                    imageUrl: ["images/counter.png", "images/counter.png", "images/counter.png"]
                }, {
                    text: "1-6",
                    legendName: "6",
                    imageUrl: ""
                }]
            },
            {
                text: "主节点2",
                imageUrl: ["images/counter.png", "images/counter.png", "images/counter.png"]
            },
            {
                text: "主节点3",
                children: [{
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
                text: "主节点4",
                children: [{
                    text: "1-1:图例1-测试-images/compact_disc.png",
                    legendName: "1",
                    imageUrl: ""
                }]
            },
            {
                text: "主节点5",
                children: [{
                        text: "1-1:图例1-测试-images/compact_disc.png",
                        legendName: "1",
                        imageUrl: ""
                    },
                    {
                        text: "1-1:图例1-测试-images/compact_disc.png",
                        legendName: "1",
                        imageUrl: ""
                    }
                ]
            },
            {
                text: "主节点6"
            }
        ]
    };

    var opt2 = {
        legend: [{
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
        }],
        data: [{
                text: "主节点1",
                children: [{
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
                children: [{
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
            }

        ]
    };
    opt2.theme = {
        lengend: {
            fill: "#000000",
        },
        startNode: {
            radius: 10,
            fill: "#7E899D"
        },
        endNode: {
            radius: 10,
            fill: "#7E899D"
        },
        centralAxisNode: {
            height: 21,
            radius: 4,
            fill: "#1A84CE",
            color: "#ffffff",
            inner: {
                fill: "#1A84CE",
                "stroke-width": 0,
                stroke: "#1A84CE"
            },
            outer: {
                fill: "#1A84CE",
                "stroke-width": 3,
                stroke: "#1A84CE"
            }
        },
        centralAxisLine: {
            fill: "#7E899D"
        },
        centralAxisBranchNode: {
            fill: "#F9BF3B",
            radius: 10
        },
        centralAxisBranchLine: {
            stroke: '#F9BF3B',
            fill: "#F9BF3B"
        },
        centralAxisBranchContent: {
            fill: "#F9BF3B",
            color: "#ffffff",
            stroke: '#ffffff',
            height: 24
        }
    }

    var theme = 'default';

    $("#demo").timeline(opt1);

    $("#reload").click(function () {

        if (theme === 'default') {
            theme = 'custom';
        } else {
            theme = 'default';
        }

        theme === 'default' ? $("#demo").timeline(opt2) : $("#demo").timeline(opt1);
    });




});