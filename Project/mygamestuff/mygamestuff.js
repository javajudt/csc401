"use strict";

var Board = function () {
//Board is a constructor for a crate board. Each Board object has
// methods  move(dir), getScore,    and toString() 

    var b=[];   //the 2 dim board of crates
    var bobR,bobC, bobDir;    //position and direction of bobcat  (nesw)
    var tgtR,tgtC;              //position of target crate
    var n;   //num rows and cols
    var score = 0;
    var startC;   //column where bob starts, and the goal for end of game
    var state = 0;  //1 means completed target to goal
    
    // constructor initializes
    n = Math.floor( 8 + Math.random()*5 );
    for(var r=0; r<n; r++){   //for each row
        b[r] = [];
        for(var c=0; c<n; c++){   //for each col
            b[r][c] = weight();   //Math.randomized board
        }
    }
    startC = bobC = Math.floor( Math.random()*n );   bobR = n-1;  bobDir = 0;  //north
    b[bobR][bobC] = 0;    //bob can't be on a crate!
    
    tgtR = Math.floor(1 + Math.random()*(n-2));
    tgtC = Math.floor(1 + Math.random()*(n-2));
    while( b[tgtR][tgtC] ===0 ) b[tgtR][tgtC] = weight();
    
    function weight(){  //calc Math.random wt of a crate
        var wt = [.6,.7,.9];   //cumulative dist of wt=0 =1 =2  else 3
        var ran = Math.random();  //[0.0 - 1.0)
        for(var i=0; i<3; i=i+1) if(ran<wt[i]) return i;
        return i;
    }
    function okRC(r,c){ return 0<=r && r<n && 0<=c && c<n; }
    function count(dr,dc,maxWt){ //find space in this direction to push onto      
        var r = bobR + dr; var c = bobC + dc;
        var tot=0;  //total push weight
        var q = 0;  //num crates being pushed
        while( okRC(r,c) ){
            tot = tot +b[r][c];
            if(tot>maxWt) return -1;
            if(b[r][c]===0) return q;
            q = q+1;
            r=r+dr; c=c+dc;
        }
        return -1;
    }
    
    Board.prototype.move = function (dirch){ 
    //dirch is converted to  01234 meaning NESW explode. 
    //returns an object:  kind:illegal,explode,push,back,turn    
    //    (if push,  amt is also returned.
    
        var ret = this.getData();    ret.kind = "illegal";   
        
        if(this.hasWon()) return ret;     //moving not allowed
        var d=-1;
        if(dirch===120) d=4;   //x  (explode
        if(dirch===119) d=0;   //w
        if(dirch===97) d=3;   //a
        if(dirch===115) d=2;   //s
        if(dirch===100) d=1;   //d
        if(d<0) return ret;
        
        var dr = [-1,0,1,  0];    //nesw
        var dc = [ 0, 1,0,-1];
        if(d===4){  //explode         
            var r = bobR + dr[bobDir], c = bobC + dc[bobDir];
            if( okRC(r,c) && b[r][c]>0 && !(tgtR===r && tgtC===c)){
                b[r][c] = 0; score += 100; 
                ret.kind="explode"; return ret;
            }else{
                return ret;
            }            
        }else if(d===bobDir || (4+d-bobDir) %4 ===2){
            var maxWt = (d===bobDir) ? 3 : 0;    //can push crates backing up
            var ct = count(dr[d],dc[d],maxWt);   //returns 0 if just bob, up to 3 for bob&3 crates, -1
            if(ct<0) return {"illegal":true};
            var amt = ct;
            while(ct>=0){
                var r = bobR+ct*dr[d];  var c = bobC+ct*dc[d];
                if(r===tgtR && c===tgtC){ tgtR += dr[d]; tgtC += dc[d]; }
                b[r+dr[d]][c+dc[d]] = b[r][c];
                ct=ct-1;
            }
            bobR += dr[d]; bobC += dc[d]; score=score+1;
            if(tgtR===n-1 && tgtC===startC) state = 1; //victory
            if(d===bobDir){
                ret.kind="push"; ret.amt=amt; return ret;
            }else{
                ret.kind="back"; return ret;
            }
        }else{
            bobDir = d; score = score+1;
            ret.kind="turn"; return ret;            
        }
    };
    //access methods
    Board.prototype.hasWon    = function(){ return state===1; }; 
    Board.prototype.getScore = function (){ return score; };
    Board.prototype.getWt = function(r,c){return b[r][c];};
    Board.prototype.getData = function (){ 
        return {  "bobR":bobR, "bobC":bobC, "bobDir":bobDir,
                     "tgtR":tgtR, "tgtC":tgtC,
                     "startC":startC, "n":n };
    };
};
    
    //=========================== viewing stuff =======================
function viewText(brd){

    var bobText = ["^",">","v","<"];
    var q = brd.getData();
    var inner = "";  
    for(var r=0; r<q.n; r++){
        for(var c=0; c<q.n; c++){
            if(r===q.bobR && c===q.bobC) inner = inner+bobText[q.bobDir];
            else if(r===q.tgtR && c===q.tgtC) inner = inner + (brd.getWt(r,c)+6);
            else inner = inner + brd.getWt(r,c);
        }
        inner = inner + "<br>";
    }
    document.getElementById("myText").innerHTML = inner;
}
            
window.onload = function(){    
    var brd = new Board();  
    //var canvasView = new CanvasView(brd);  //initializes, storing canvas and images.
    
    document.onkeypress =  function (ev){  //keypress event        
        var key = ev.keyCode;         
        var ret = brd.move(key);        
        //canvasView.draw();   //draws entire board on canvas
        //viewHTML(brd);
        viewText(brd);
    };
 
    viewText(brd);
    //viewHTML(brd);    

};
