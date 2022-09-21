//Not used

part = document.getElementById('particle')
p_container = document.getElementById('particle_container')

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
        this.p.speed = Math.random(100)/100
        this.p.skew = 1
        this.p.time = Math.random()*100

        this.move(this.p)
    }

    move(parent){
        setInterval(function(){
            console.log('hi')
            this.p = parent
            this.scaleSpeed = .25
            this.topspeed = this.scaleSpeed/1
            this.leftspeed = this.scaleSpeed/1
            this.p.tvalue += this.topspeed*this.p.speed
            this.p.lvalue += this.leftspeed*this.p.speed
            this.p.style.top = ((Math.sin((this.p.tvalue+this.p.time*this.topspeed)*Math.PI)*150*this.p.skew+400).toString())+"px"
            this.p.style.left = ((Math.cos((this.p.lvalue+this.p.time*this.leftspeed)*Math.PI)*725+750).toString())+"px"
        }, 10)
        
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

for(i = 0; i < 100; i++){
    createParticle()
}
