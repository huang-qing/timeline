/*!
 * timeline v1.1.0 - jQuery plug 
 *
 * Includes jquery.js
 * Includes raphael.js
 * 
 * Copyright © 2016-2016 huangqing
 * Released under the MIT license
 *
 * Date: 2016-11-15
 */

(function ($) {

    'use strict';
    $.fn.extend({
        timeline: function (opt) {

            var container = this,
                paper = Raphael(container[0]),
                pagerHeight = 0,
                pagerWidth = 0,
                ViewBoxX = 0,
                ViewBoxY = 0,
                startX = 0,
                startY = 0,
                nextX = startX,
                nextY = startY,
                endX = 0,
                endY = 0,
                currentBranchCount = 0,
                legend = {},
                legendHeight = 60,
                data = [];

            //计算下一节点的X轴起始位置
            function getNextX(offsetWidth) {
                nextX += offsetWidth;
            }

            ///计算下一节点的Y轴起始位置：用于分支节点的高度计算
            function getNextY() {
                var r = 10,
                    lineHeight = 0,
                    operator = +1,
                    baseLineHeight = 6 * r,
                    offsetHeight = 4 * r;
                //Y轴坐标为初始坐标，根据子节点的数量计算高度
                //第一个子节点首先定位在Y轴反向位置，第二个子节点定位在Y轴正向与第一个节点对称的位置
                if (nextY === startY) {
                    operator = -1;
                    lineHeight = baseLineHeight + Math.floor(currentBranchCount / 2) * offsetHeight;
                    lineHeight = operator * (Math.abs(lineHeight) - offsetHeight);
                    nextY = startY + lineHeight;
                    setEndY(lineHeight);

                }
                //定位Y轴正向节点
                else if (nextY < startY) {
                    operator = +1;
                    nextY = Math.abs(nextY);
                }
                //递减定位下一个节点
                else {
                    operator = -1;
                    lineHeight = operator * (Math.abs(nextY) - offsetHeight);
                    nextY = startY + lineHeight;
                }
            }

            //计算图形最高高度
            function setEndY(offsetHeight) {
                if (Math.abs(endY) < Math.abs(offsetHeight)) {
                    endY = Math.abs(offsetHeight);
                }
            }

            //获取图片url
            function getImageUrl(imageUrl, legendType) {
                var url = "",
                    host;

                if (imageUrl) {
                    url = imageUrl;
                }
                else if (legend[legendType] && legend[legendType].icon) {
                    url = legend[legendType].icon;
                }

                if (url.indexOf("~") === 0) {
                    host = location.protocol + "//" + location.hostname + (location.port ? ":" + location.port : "");
                    url = url.replace(/~/, host);
                }

                return url;
            }

            //创建开始节点
            function createStartNode(x, y) {
                var r = 10,
                    bgColor = "#7E899D",
                    lineWidth = 80;

                x += r;

                paper.circle(x, y, r).attr({
                    fill: bgColor,
                    "stroke-width": 0,
                    stroke: bgColor
                });

                paper.path("M" + x + " " + y + "L" + (x + lineWidth) + " " + y).attr({
                    "stroke-width": 2,
                    stroke: bgColor,
                    "stroke-dasharray": ["-"]
                });

                getNextX(lineWidth);
            }

            //创建结束节点
            function createEndNode(x, y) {
                var r = 10,
                    bgColor = "#7E899D",
                    lineWidth = 60,
                    pathStr = "";

                pathStr = "M" + x + " " + y + "L" + (x + lineWidth) + " " + y;
                paper.path(pathStr).attr({
                    "stroke-width": 2,
                    stroke: bgColor,
                    "stroke-dasharray": ["-"]
                });

                pathStr = ["M", x + lineWidth, " ", y,
                    "L", x + lineWidth, " ", y + r,
                    "L", x + lineWidth + r, " ", y,
                    "L", x + lineWidth, " ", y - r,
                    "L", x + lineWidth, " ", y,
                    "z"].join("");
                paper.path(pathStr).attr({
                    fill: bgColor,
                    "stroke-width": 0,
                    stroke: bgColor
                });

                getNextX(lineWidth + r);
            }

            //创建中轴线上的主节点
            function createCentralAxisNode(x, y, text) {
                var width = 100,
                    height = 16,
                    innerRectElement,
                    outRectElement,
                    textElement,
                    paddingSize = 4,
                    radius = 4,
                    bgColor = "#1A84CE",
                    textFillColor = "#ffffff",
                    position,
                    lineWidth;

                x = x + 3 * paddingSize;
                textElement = paper.text(x, y, text).attr({
                    "font-size": 12,
                    fill: textFillColor,
                    "text-anchor": "start"
                });


                position = textElement.getBBox();
                width = position.width;
                y = position.y;

                innerRectElement = paper.rect(x - 2 * paddingSize, y - paddingSize, width + 4 * paddingSize, height + 2 * paddingSize, radius).attr({
                    fill: bgColor,
                    "stroke-width": 0,
                    stroke: bgColor
                });
                outRectElement = paper.rect(x - 3 * paddingSize, y - 2 * paddingSize, width + 6 * paddingSize, height + 4 * paddingSize, radius).attr({
                    stroke: bgColor,
                    "stroke-width": 3
                });

                textElement.toFront();

                position = outRectElement.getBBox();
                lineWidth = position.width;

                getNextX(lineWidth);
                endY === 0 ? endY = Math.ceil(position.height / 2) + 6 : null;
            }

            //创建中轴线上的线
            function createCentralAxisLine(x, y, radius) {

                var r = 10,
                    bgColor = "#7E899D",
                    lineWidth = 4 * r,
                    pathStr = "";

                pathStr = "M" + x + " " + y + "L" + (x + lineWidth) + " " + y;
                paper.path(pathStr).attr({
                    "stroke-width": 2,
                    stroke: bgColor,
                    "stroke-dasharray": ["-"]
                });

                getNextX(lineWidth);
            }

            //创建中轴线上的分支节点
            function createCentralAxisBranchNode(x, y) {
                var r = 10,
                    bgColor = "#F9BF3B";

                paper.circle(x, y, r - 2).attr({
                    "stroke-width": 2,
                    stroke: bgColor
                });

                paper.circle(x, y, r - 6).attr({
                    fill: bgColor,
                    "stroke-width": 0,
                    stroke: bgColor
                });

            }

            //创建中轴线上分支节点的内容
            function createCentralAxisContent(x, y, text, imageUrl) {
                var r = 10,
                    r_bottom = 2,
                    bgColor = "#F9BF3B",
                    textFillColor = "#ffffff",
                    pathStr = "",
                    height = 24,
                    width = 0,
                    index = index || 1,
                    offsetLineHeight = 2 * r,
                    operator = +1,
                    _endX = 0,
                    _endY = 0,
                    textElement,
                    imageSize = 14,
                    position;

                getNextY();
                nextY > 0 ? operator = +1 : operator = -1;
                _endX = x;
                _endY = nextY;


                pathStr = "M" + x + " " + y + "L" + x + " " + _endY;
                paper.path(pathStr).attr({
                    "stroke-width": 1,
                    stroke: bgColor
                });

                paper.circle(x, _endY - operator * r_bottom, r_bottom).attr({
                    fill: bgColor,
                    "stroke-width": 0,
                    stroke: bgColor
                });

                _endX = x - 2 * r;
                _endY = operator > 0 ? _endY - operator * (height * 1.2 + 6) :
                    _endY - operator * (height + 6);

                textElement = paper.text(_endX + 2 * r, _endY + operator * r * 1.5, text).attr({
                    "font-size": 12,
                    fill: textFillColor,
                    "text-anchor": "start"
                });

                position = textElement.getBBox();
                width = position.width;
                height = position.height + 5;
                _endY = position.y - 2;

                paper.rect(_endX, _endY, position.width + 4 * r, height, 8).attr({
                    fill: bgColor,
                    stroke: bgColor,
                    "stroke-width": 0
                });

                paper.image(imageUrl, _endX + r / 2, _endY + 2, imageSize, imageSize);

                textElement.toFront();
            }

            //创建中轴线上的分支节点
            function createBranchNode(x, y, text, imageUrl, radius) {
                var r = radius;
                createCentralAxisLine(x, y, r);
                //中间位置
                x += r * 2;
                createCentralAxisBranchNode(x, y);
                createCentralAxisContent(x, y, text, imageUrl);
            }

            //创建图例
            function createLegend() {
                var item,
                    text,
                    name,
                    imageUrl,
                    r = 5,
                    imageSize = 14,
                    position,
                    _startX = startX + 2 * r,
                    _startY = 0,
                    textElement;

                _startY = -(endY + legendHeight) + 4 * r;

                for (var i in legend) {
                    item = legend[i];
                    text = item.text;
                    imageUrl = getImageUrl(item.icon);

                    paper.image(imageUrl, _startX - 6, _startY - 6, imageSize, imageSize);

                    _startX += imageSize;
                    textElement = paper.text(_startX, _startY, text).attr({
                        "font-size": 12,
                        fill: "#000000",
                        "text-anchor": "start"
                    });

                    position = textElement.getBBox();
                    _startX += position.width + 4 * r;

                }

            }

            function init(opt) {
                var _legend,
                    children = [],
                    item,
                    text,
                    type,
                    imageUrl,
                    r;

                _legend = opt.legend || [];
                data = opt.data || [];

                //将图例数据格式转换为以name类型为键值的对象
                for (var i = 0, len = _legend.length; i < len; i++) {
                    item = _legend[i];
                    legend[item.name] = item;
                }

                //创建开始节点
                createStartNode(startX, startY);
                //创建内容节点
                for (var i = 0, len = data.length; i < len; i++) {
                    item = data[i];
                    text = item.text;
                    imageUrl = item.name;
                    children = item.children || [];
                    r = 10;
                    //创建主节点
                    createCentralAxisNode(nextX, startY, text);
                    //创建分支节点
                    if (children.length === 0 && i !== len - 1) {
                        //不存在分支节点，只创建中轴线
                        createCentralAxisLine(nextX, startY, r);
                    }
                    else if (children.length > 0) {
                        //重置nextY,新的主节点下的分支节点Y轴位置回复为初始位置
                        nextY = startY;
                        currentBranchCount = children.length;
                        //存在分支节点，创建分支内容节点
                        for (var j = 0, lenj = children.length; j < lenj; j++) {
                            item = children[j];
                            text = item.text;
                            imageUrl = getImageUrl(item.imageUrl, item.legendName);
                            createBranchNode(nextX, startY, text, imageUrl, r);
                        }
                    }
                }
                //创建结束节点
                createEndNode(nextX, startY);
                //创建图例
                createLegend();
                //设置画布大小
                pagerWidth = nextX + ViewBoxX;
                pagerHeight = Math.abs(endY * 2) + legendHeight;
                paper.setSize(pagerWidth, pagerHeight);
                //设置ViewBox偏移量
                ViewBoxY = Math.abs(endY * 2) / 2 + legendHeight;
                paper.setViewBox(-ViewBoxX, -ViewBoxY, pagerWidth, pagerHeight, false);
            }

            init(opt);
            return container.addClass("timeline");
        }
    });

})(jQuery);

