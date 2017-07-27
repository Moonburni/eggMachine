var move =false;
function moveChange() {
    this.img1 = new Image();
    this.img1.src = './images/egg/EMO-01.png';
    this.img2 = new Image();
    this.img2.src = './images/egg/EMO-02.png';
    this.img3 = new Image();
    this.img3.src = './images/egg/EMO-03.png';
    this.img4 = new Image();
    this.img4.src = './images/egg/EMO-04.png';
    this.img5 = new Image();
    this.img5.src = './images/egg/EMO-05.png';
    this.img = [this.img1,this.img2,this.img3,this.img4,this.img5];
    let num= parseInt(Math.random()*5,10);
    if(move === false){
        move = true;
        setTimeout(()=>{
            move=false;
        var ballBody = document.getElementById('ball_body');
        var ball = document.createElement('div');
        ball.id='ball';
        ball.className = 'ball';
        ball.style.backgroundImage = `url(${this.img[num].src})`;
        ballBody.appendChild(ball);
        setTimeout(()=>{
            var ballGet = document.getElementById('ball');
        ballGet.parentNode.removeChild(ballGet);
        if(num<3){
            let showPresent = new ShowPresent('ShowPresent');
            showPresent.add({text:'123',type:false,adage:'XXXXXX',content:[{color:'blue',text:'123',number:5},{color:'red',text:'1235',number:'4'}]})
        }else{
            let showPresent = new ShowPresent('ShowPresent');
            showPresent.add({text:'123',type:true,adage:'XXXXXX',content:[{color:'blue',text:'123',number:5},{color:'red',text:'1235',number:'4'}]})
        }
    },2000)
    },3000)
    }
}
var RENDERER = {
    init : function(){
        this.setParameters();
        this.reconstructMethods();
        this.createParticles();
        this.render();
    },
    setParameters : function(){
        this.$container = $('#ball_body');
        this.width = this.$container.width()*0.9;
        this.height = this.$container.height()*0.6;
        this.context = $('<canvas />').attr({width : this.width, height : this.height
            , style :'border-radius:50%;overflow:hidden'
        }).appendTo(this.$container).get(0).getContext('2d');
        this.particles = [];
        this.img1 = new Image();
        this.img1.src = './images/egg/EMO-01.png';
        this.img2 = new Image();
        this.img2.src = './images/egg/EMO-02.png';
        this.img3 = new Image();
        this.img3.src = './images/egg/EMO-03.png';
        this.img4 = new Image();
        this.img4.src = './images/egg/EMO-04.png';
        this.img5 = new Image();
        this.img5.src = './images/egg/EMO-05.png';
        this.img = [this.img1,this.img2,this.img3,this.img4,this.img5];
        this.lenght = 34;
        this.localPosition = {
            x:this.width*0.45,y:this.height*0.85
        }
    },
    reconstructMethods : function(){
        this.render = this.render.bind(this);
    },
    createParticles : function(){
        for(let i = 1, length = this.lenght; i <= length; i++){
            let num= parseInt(Math.random()*5,10);
            if(i<2){
                this.particles.push(new PARTICLE(this.width, this.height,this.img[num],this.localPosition));
            }else if(i<15){
                let position = {
                    x:this.localPosition.x+Math.pow(-1,i)*(i+1)*this.width*0.03,
                    y:this.localPosition.y-(i+1)*this.height*0.005*Math.pow(0.14*i,2)
                };
                this.particles.push(new PARTICLE(this.width, this.height,this.img[num],position));

            }else if(i<26){
                let position = {
                    x:this.localPosition.x+Math.pow(-1,i-15)*(i+1-15)*this.width*0.03,
                    y:this.localPosition.y-(i-10)*this.height*0.005*Math.pow(0.14*(i-15),2)-this.height/10
                };
                this.particles.push(new PARTICLE(this.width, this.height,this.img[num],position));
            }else if(i<31){
                let position = {
                    x:this.localPosition.x+Math.pow(-1,i-26)*(i+1-26)*this.width*0.03,
                    y:this.localPosition.y-(i-20)*this.height*0.005*Math.pow(0.14*(i-26),2)-2*this.height/10
                };
                this.particles.push(new PARTICLE(this.width, this.height,this.img[num],position));
            }else if(i<34){
                let position = {
                    x:this.localPosition.x+Math.pow(-1,i-31)*(i+1-31)*this.width*0.04,
                    y:this.localPosition.y-(i-23)*this.height*0.005*Math.pow(0.14*(i-31),2)-3*this.height/10
                };
                this.particles.push(new PARTICLE(this.width, this.height,this.img[num],position));
            }
        }
    },
    render : function(){
        requestAnimationFrame(this.render);
        this.context.clearRect(0, 0, this.width, this.height);
        for(var i = 0, length = this.particles.length; i < length; i++){
            this.particles[i].render(this.context);
        }
        this.checkCollision();
    },
    checkCollision : function(){
        for(var i = 0, particleCount = this.particles.length; i < particleCount; i++){
            var particle = this.particles[i];

            for(var j = i + 1; j < particleCount; j++){
                this.particles[j].checkCollision(particle);
            }
        }
    }
};
var PARTICLE = function(width, height,img,position){
    this.width = width;
    this.height = height;
    this.img = img;
    this.position = position;
    this.init();
};
PARTICLE.prototype = {
    RADIUS : {MIN : 16, MAX : 16},
    MASS_RATE : 1,
    VELOCITY : {MIN : 8, MAX : 12},
    WALL_RESTITUTION : 1,
    PARTICLE_RESTITUTION : 1,

    DELTA_RADIAN : {MIN : 4, MAX : 8},

    init : function(){
        this.radius = this.createRandomValue(this.RADIUS);
        this.mass = Math.round(Math.pow(this.radius, 3) * this.MASS_RATE);
        this.x = this.createRandomValue({MIN : this.radius, MAX : this.width - this.radius});
        this.y = this.createRandomValue({MIN : this.radius, MAX : this.height - this.radius});
        this.previousX = this.x;
        this.previousY = this.y;
        this.deltaRadian = this.createRandomValue(this.DELTA_RADIAN) | 0;
        this.vx =  this.createRandomValue(this.VELOCITY) * ((Math.random() > 0.5) ? 1 : -1);
        this.vy =  this.createRandomValue(this.VELOCITY) * ((Math.random() > 0.5) ? 1 : -1);
    },
    createRandomValue : function(range){
        return range.MIN + Math.round((range.MAX - range.MIN) * Math.random());
    },
    moveParticle : function(){
        this.previousX = this.x;
        this.previousY = this.y;
        this.x += this.vx;
        this.y += this.vy;

        if(this.x <= this.radius){
            this.x = this.radius;
            this.vx *= -this.WALL_RESTITUTION;
        }else if(this.x >= this.width - this.radius){
            this.x = this.width - this.radius;
            this.vx *= -this.WALL_RESTITUTION;
        }
        if(this.y <= this.radius){
            this.y = this.radius;
            this.vy *= -this.WALL_RESTITUTION;
        }else if(this.y > this.height - this.radius){
            this.y = this.height - this.radius;
            this.vy *= -this.WALL_RESTITUTION;
        }
    },
    getParticleInfo : function(){
        return {
            x : this.x,
            y : this.y,
            previousX : this.previousX,
            previousY : this.previousY,
            vx : this.vx,
            vy : this.vy,
            radius : this.radius,
            mass : this.mass,
        };
    },
    setParticleInfo : function(x, y, vx, vy){
        this.previousX = this.x;
        this.previousY = this.y;
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;

        if(this.radian > 0){
            this.radian = Math.max(0, this.radian - this.deltaRadian);
        }
    },
    checkCollision : function(particle){
        if(this.radian === 0){
            return;
        }
        var particle1 = this.getParticleInfo(),
            particle2 = particle.getParticleInfo(),
            dx = particle2.x - particle1.x,
            dy = particle2.y - particle1.y,
            distance = Math.sqrt(dx * dx + dy * dy);

        if(distance > particle1.radius + particle2.radius){
            return;
        }
        var angle = Math.atan2(dy, dx),
            axis1 = {x : 0, y : 0},
            axis2 = this.rotate(dx, dy, angle),
            v1 = this.rotate(particle1.vx, particle1.vy, angle),
            v2 = this.rotate(particle2.vx, particle2.vy, angle),
            vSum = (v1.x - v2.x) * this.PARTICLE_RESTITUTION;

        v1.x = ((particle1.radius - particle2.radius * this.PARTICLE_RESTITUTION) * v1.x + particle2.radius * v2.x * (1 + this.PARTICLE_RESTITUTION)) / (particle1.radius + particle2.radius);
        v2.x = v1.x + vSum;

        var vAbs = Math.abs(v1.x) + Math.abs(v2.x),
            overlap = (particle1.radius + particle2.radius) - Math.abs(axis1.x - axis2.x);

        if(axis1.x >= axis2.x){
            axis1.x += Math.abs(overlap * v1.x / vAbs);
            axis2.x -= Math.abs(overlap * v2.x / vAbs);
        }else{
            axis1.x -= Math.abs(overlap * v1.x / vAbs);
            axis2.x += Math.abs(overlap * v2.x / vAbs);
        }
        axis1 = this.rotate(axis1.x, axis1.y, -angle);
        axis2 = this.rotate(axis2.x, axis2.y, -angle);
        v1 = this.rotate(v1.x, v1.y, -angle);
        v2 = this.rotate(v2.x, v2.y, -angle);

        this.setParticleInfo(particle1.x + axis1.x, particle1.y + axis1.y, v1.x, v1.y);
        particle.setParticleInfo(particle1.x + axis2.x, particle1.y + axis2.y, v2.x, v2.y);
    },
    rotate : function(x, y, angle){
        var sin = Math.sin(angle),
            cos = Math.cos(angle);
        return {x : x * cos + y * sin, y : y * cos - x * sin};
    },
    render : function(context){
        if(move === true){
            this.moveParticle();
        }
        context.save();
        var axis = this.getParticleInfo();
        context.beginPath();
        if(move === true){
            context.drawImage(this.img,axis.x, axis.y,this.width/6.5,(this.height*3)/13);
        }else{
            context.drawImage(this.img,this.position.x,this.position.y,this.width/6.5,(this.height*3)/13);
        }
    }
};
$(function(){
    RENDERER.init();
});


var Modal = function (id,parent) {
    this.id = id;
    this.parent = parent||'box';
};
Modal.prototype = {
    init: function (value) {
        var rulerBox = document.createElement('div');
        var rulerBody = document.createElement('div');
        var rulerMain = document.createElement('div');
        var rulerBtn = document.createElement('div');
        rulerBox.id = this.id;
        rulerBox.className = '_box';
        rulerBody.className = 'ruler_body state';
        rulerMain.className = '_main';
        rulerBtn.className = '_btn';
        rulerBtn.onclick = this.deleteThis;
        rulerBody.innerHTML = value.text;
        rulerBtn.innerText = '我再等等';
        rulerBody.appendChild(rulerBtn);
        rulerBox.appendChild(rulerMain);
        rulerMain.appendChild(rulerBody);
        return rulerBox;
    },
    add: function (value) {
        var parent = document.getElementById(this.parent);
        parent.appendChild(this.init(value))
    },
    deleteThis: function () {
        this.parentNode.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode.parentNode);
    }
};

var Ruler = function () {
    Modal.apply(this,arguments);
};
Ruler.prototype = Object.create(Modal.prototype);
Ruler.prototype.init = function (value) {
    var rulerBox = document.createElement('div');
    var rulerBody = document.createElement('div');
    var rulerMain = document.createElement('div');
    var rulerBtn = document.createElement('div');
    rulerBox.id = this.id;
    rulerBox.className = '_box';
    rulerBody.className = 'ruler_body';
    rulerMain.className = '_main';
    rulerBtn.className = '_btn';
    rulerBtn.onclick = this.deleteThis;
    rulerBody.innerHTML = value.text;
    rulerBtn.innerText = '我知道了';
    rulerBody.appendChild(rulerBtn);
    rulerBox.appendChild(rulerMain);
    rulerMain.appendChild(rulerBody);
    return rulerBox;
};

var Present = function () {
    Modal.apply(this,arguments)
};
Present.prototype = Object.create(Modal.prototype);
Present.prototype.init = function (value) {
    var presentBox = document.createElement('div');
    var presentBody = document.createElement('div');
    var presentMain = document.createElement('div');
    var presentBtn = document.createElement('div');
    var presentSelectBox = document.createElement('div');
    var presentTitle = document.createElement('div');
    var presentContent = document.createElement('div');
    presentBox.id = this.id;
    presentBox.className = '_box';
    presentBody.className = `present_body ${value.type}`;
    presentMain.className = '_main';
    presentBtn.className = '_btn';
    presentSelectBox.className = 'present_select_box';
    presentBtn.onclick = this.deleteThis;
    presentTitle.innerHTML = value.type === 'purple'?'超级玩家专享宝盒包含奖品':'包含奖品';
    presentContent.innerText = value.text;
    presentBtn.innerText = '打开';
    presentSelectBox.innerText = `收集进度:${value.process}`;
    presentBody.appendChild(presentTitle);
    presentBody.appendChild(presentContent);
    presentBody.appendChild(presentSelectBox);
    presentBody.appendChild(presentBtn);
    presentBox.appendChild(presentMain);
    presentMain.appendChild(presentBody);
    return presentBox;
};
Present.prototype.deleteThis = function () {
    this.parentNode.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode.parentNode);
    var gift = new Gift('gift');
    gift.add({address:'',adage:'XXXXXXXXXX',school:'华南理工大学',rank:999,boxType:'黄金宝箱',present:'500M流量'});
    var modal = new Modal('nomad');
    //modal.add({text:'123456'})
};

var Gift = function () {
    Modal.apply(this,arguments)
};
Gift.prototype = Object.create(Modal.prototype);
Gift.prototype.init = function (value) {
    var giftBox = document.createElement('div');
    var giftBody = document.createElement('div');
    var giftBody_1 = document.createElement('div');
    var giftBody_2 = document.createElement('div');
    var giftBody_3 = document.createElement('img');
    var giftHeader = document.createElement('div');
    var giftHeader_1 = document.createElement('div');
    var giftHeader_2 = document.createElement('div');
    var giftMain = document.createElement('div');
    var giftBtn = document.createElement('div');
    giftBox.id = this.id;
    giftBox.className = '_box';
    giftBody.className = 'gift_body';
    giftHeader.className = 'gift_header';
    giftMain.className = 'gift_main';
    giftBtn.className = 'gift_btn';
    giftHeader_1.innerHTML = `恭喜你是今天<br/><span>${value.school}</span>`;
    giftHeader_2.innerHTML = `第${value.rank}位开启<br/><span>${value.boxType}</span>的玩家`;
    giftBody_1.innerHTML = `抽中的<span>${value.present}</span>已经放入你的奖品，<br/>进入个人中心——点击奖品<br/>即可找到兑换哦!`
    giftBody_2.innerHTML = value.adage;
    giftBody_3.src = value.address;
    giftBtn.innerText = 'x';
    giftBtn.onclick = this.deleteThis;
    giftBody.appendChild(giftBody_1);
    giftBody.appendChild(giftBody_2);
    giftBody.appendChild(giftBody_3);
    giftBody.appendChild(giftBtn);
    giftBox.appendChild(giftMain);
    giftMain.appendChild(giftHeader);
    giftHeader.appendChild(giftHeader_1);
    giftHeader.appendChild(giftHeader_2);
    giftMain.appendChild(giftBody);
    return giftBox;
};

var ShowPresent = function () {
    Modal.apply(this,arguments)
};
ShowPresent.prototype = Object.create(Modal.prototype);
ShowPresent.prototype.init = function (value) {
    var showPresentBox = document.createElement('div');
    var showPresentMain = document.createElement('div');
    var showPresent = document.createElement('div');
    var showPresentBody = document.createElement('div');
    var showPresentAd = document.createElement('div');
    var showPresentText = document.createElement('div');
    var showPresentBtn = document.createElement('div');
    showPresentBox.id = this.id;
    showPresentBox.className = '_box';
    showPresentBody.className = value.type === true?'showPresent_body':'showPresent_body nothing';
    showPresentMain.className = '_main';
    showPresentBtn.className = '_btn';
    showPresentBtn.onclick = this.deleteThis;
    showPresentText.innerText = value.adage;
    showPresentBtn.innerText = value.type === true?'我真棒':'我要坚持';
    var domText = '';
    value.type === true?
        value.content.forEach(function (item) {
            domText += `<div><div class="type${item.color}"></div><div class="showPresent_text">${item.text}</div><div>1/${item.number}</div></div>`
        }):
        value.content.forEach(function (item) {
            domText += `<div><div class="typeblack"></div><div class="showPresent_text">${item.text}</div><div class="typeno"></div></div>`
        });
    showPresent.innerHTML = domText;
    showPresentBox.appendChild(showPresentMain);
    showPresentMain.appendChild(showPresentBody);
    showPresentBody.appendChild(showPresent);
    showPresentBody.appendChild(showPresentAd);
    showPresentBody.appendChild(showPresentText);
    showPresentBody.appendChild(showPresentBtn);
    return showPresentBox;
};
