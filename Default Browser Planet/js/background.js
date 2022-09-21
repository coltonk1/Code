//Creates particles that circle the planet.

part = document.getElementById('particle')
p_container = document.getElementById('particle_container')

speed_modifier = 1;

class Particle {
    constructor(){
        this.speed = Math.random(100)/100
        this.lvalue = 0
        this.tvalue = 0
    }

    init(){
        this.p = part.cloneNode(true)
        this.new_s = document.createElement('script');
        p_container.appendChild(this.p)
        this.p.appendChild(this.new_s)
        this.new_s.innerHTML = "";

        this.p.lvalue = 0
        this.p.tvalue = 0
        this.p.speed = Math.random()/75
        this.p.skew = 1 - Math.random()/5
        this.p.time = Math.random()*100
        this.p.scaleSpeed = .4
        this.p.topspeed = this.p.scaleSpeed/1
        this.p.leftspeed = this.p.scaleSpeed/1
    }
}
// {/* <script>
// {/* this.parent = document.currentScript.parentNode;
// this.parent.lvalue = 0
// this.parent.tvalue = 0
// this.parent.speed = Math.random(100)/100

// this.int = setInterval(function(){
//     console.log(this.parent.speed)

// }, 1000) */}
// </script> */}

function createParticle(){
    this.particle = new Particle()
    this.particle.init()
}

for(i = 0; i < 150; i++){
    createParticle()
}

for(i = 0; i < 3; i++){
    p_container.childNodes[0].remove()
}

degrees = 0

window.addEventListener("resize", changeSize)

function changeSize(){
    widthSize = window.innerWidth
}
changeSize()

function move(){
    degrees += .05*speed_modifier
    document.getElementById('planet').style.transform = `rotate(${Math.sin(degrees+5)-198}deg)`
    document.getElementById('planet').style.left = 5*Math.sin(degrees).toString() + "px"
    document.getElementById('planet').style.top = 5*Math.cos(degrees).toString() + "px"
    for(i = 0; i < p_container.childNodes.length; i++){
        p = p_container.childNodes[i]
        p.tvalue += p.topspeed*p.speed*speed_modifier
        p.lvalue += p.leftspeed*p.speed*speed_modifier
        p.style.top = ((Math.sin((p.tvalue+p.time*p.topspeed)*Math.PI)*150*p.skew+400).toString())+"px"
        p.style.left = ((Math.cos((p.lvalue+p.time*p.leftspeed)*Math.PI)*widthSize/2.1+widthSize/2.04).toString())+"px"
    }
}


setInterval(move, 20)
