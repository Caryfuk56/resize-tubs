/* *****************

BLOCK RESIZER 0.1

******************** */
// Defalut drageble are settings
    var da_set = {
        horizontal: {
            width: "100%",
            height: "6px",
            pos_horis: "-5",
            pos_vert: ""
        },
        vertikal: {
            width: "6px",
            height: "100%",
            pos_horis: "right: 0",
            pos_vert: "bottom: 0"
        }
    }


var resizer = resizer || {};

(function(p){
    "use strict";

    var idCounter = 1;

    p.add = function(element) {
        if(!element) element = [{}];

        // check if id is set
        check_ID_TYPE(element);

        for(var i=0; i<element.length;i++) {
            createDragArea(element[i])
            console.log(element[i])
        }


    }

    // Check valid settings on the begining
    function check_ID_TYPE(el) {
        for(var i=0; i<el.length; i++) {
            if(!el[i].id)console.error("BLOCK RESIZER\n Element id not set. ");
        }
    }

    // Create drageble area
    function createDragArea(element) {
        // where on the div
        console.log("CRETE " + type()[0])
        console.log(element.resizeble)
        if(element.resizeble === "top" || type()[0] == 1) {
            console.log("TOP")
            addToDom(new DragArea(), element)
        }
        if(element.resizeble === "right" || type()[1] == 1) {
            console.log("RIGHT");
            addToDom(new DragArea(false), element);
        }
        if (element.resizeble === "bottom" || type()[2] == 1) {
            console.log("BOTTOM");
            addToDom(new DragArea(), element);
        }
        if (element.resizeble === "left" || type()[3] == 1) {
            console.log("LEFT");
            addToDom(new DragArea(false), element);
        }


        function type() {
            var splitRes = element.resizeble.split(" ");
            return splitRes;
        }
    }

    // Drag area constructor
    function DragArea(horiz, width, height, pos) {
        this.horizontal = typeof horiz !== "undefined"? horiz:true;
        this.width = typeof width !=="undefined"?width:
            this.horizontal?this.width=da_set.horizontal.width:this.width=da_set.vertikal.width;
        this.height = typeof height !=="undefined"?height:
            this.horizontal?this.height=da_set.horizontal.height:this.height=da_set.vertikal.height;
        this.position = typeof pos !=="undefined"?pos:
            this.horizontal?this.position=da_set.horizontal.pos_horis:this.position=da_set.vertikal.pos_vert;
    }

    // Add drag area div to the DOM
    function addToDom(obj, element) {
        console.log(obj.height)
        console.log(document.getElementById("left"))
        console.log(getPosition(document.getElementById("left")))

        var p = document.getElementById(element.id);
        var div = document.createElement("div");
        div.setAttribute("id", getID());
        div.setAttribute("class", obj.horizontal?"horizontal":"vertical");
        div.setAttribute("style", "width: " + obj.width + "; height: " + obj.height + "; " + obj.position);
        p.appendChild(div);
    }

    function parentHeight(element) {
        var p_h = window.getComputedStyle(element.id, null).getPropertyValue("height");
    }

    function calcPosition(res, element) {
        var el, result;
        var elSt = window.getComputedStyle(element.id, null);
        
        switch (res) {
            case 0:
            result = getPosition(element).y;
            break;
            case 1:
            result = getPosition(element).x;
            break;
            case 2:
            el = elSt.getPropertyValue("height");
            result = getPosition(element.y) + el;
            break;
            case 3:
            el = elSt.getPropertyValue("height");
            result = getPosition(element.y) + el;
            break;
        }
    }

    function getPosition(el) {

        console.log(el)
        var xPos = 0;
        var yPos = 0;

        while (el) {
            if(el.tagName == "BODY"){
                var xScroll = el.scrollLeft || document.documentElement.scrollLeft;
                var yScroll = el.scrollTop || document.documentElement.scrollTop;

                xPos += (el.offsetLeft - xScroll + el.clientLeft);
                yPos += (el.offsetTop - yScroll + el.clientTop);
            } else {
                xPos += (el.offsetLeft - el.scrollLeft + el.clientLeft);
                yPos += (el.offsetTop - el.scrollTop + el.clientTop);

            }

            el = el.offsetParent;
        }

        return {
            x: xPos, y: yPos
        };
    }

    
    

    // Get id of resizer div
    function getID() {
        var _id = "resizer_" + idCounter;
        idCounter++;
        return _id;
    }

    var test = new DragArea();
    var test2 = new DragArea(false);
    console.log(test)
    console.log(test2);


})(resizer);