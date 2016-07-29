function Dying(sheep){
  this.sheep = sheep;
}

Dying.prototype.update = function(){
  this.sheep.changeSprite(this.sheep.deadSprite);
  this.sheep.sprite.animationSpeed = 0.001;
  this.sheep.sprite.loop = false;
  this.sheep.sprite.play();
  this.sheep.state = this.sheep.dead;
};

Dying.prototype.toString = function(){
  return 'dying';
};

////////////////////

function Dead(sheep){
  this.sheep = sheep;
}

Dead.prototype.update = function(){

};
Dead.prototype.toString = function(){
  return 'dead';
};

////////////////////

function StartTraveling(animal){
  this.animal = animal;
}

StartTraveling.prototype.update = function(){
  if (this.animal.rally_point.x > this.animal.sprite.x){
    this.animal.direction = 1;
  }
  else if (this.animal.rally_point.x < this.animal.sprite.x) {
    this.animal.direction = -1;
  }
  this.animal.changeSprite(this.animal.walkingSprite);
  this.animal.sprite.animationSpeed = 0.1;
  this.animal.sprite.loop = true;
  this.animal.sprite.play();
  this.animal.state = this.animal.traveling;
  // console.log(this.animal.state.toString());
};

StartTraveling.prototype.toString = function(){
  return 'start traveling';
};

///////////////

function Traveling(animal){
  this.animal = animal;
}

Traveling.prototype.update = function(){
  if (this.animal.rally_point) {
    var tx = this.animal.rally_point.x - this.animal.sprite.x;
    var ty = this.animal.rally_point.y - this.animal.sprite.y;
    var dist = Math.sqrt(tx * tx + ty * ty);
    var velX = (tx / dist) * this.animal.speed;
    var velY = (ty / dist) * this.animal.speed;
    if (dist >= 1.50001) {
      this.animal.sprite.x += velX;
      this.animal.sprite.y += velY;
    }
    else {
      if (this.animal instanceof Dog){
        this.animal.changeSprite(this.animal.idleSprite);
        this.animal.sprite.animationSpeed = 0.12;
        this.animal.sprite.loop = true;
        this.animal.sprite.play();
        this.animal.state = this.animal.waiting;
      }
      else if (this.animal instanceof Sheep) {
        this.animal.changeSprite(this.animal.idleSprite);
        this.animal.sprite.animationSpeed = 0.12;
        this.animal.sprite.loop = true;
        this.animal.sprite.play();
        this.animal.state = this.animal.eating;
      }
      // console.log(this.sheep.state.toString());
    }
  }
};
Traveling.prototype.toString = function(){
  return 'traveling';
};

////////////////////////////////////////////////

function Eating(sheep){
  this.sheep = sheep;
}

Eating.prototype.update = function(){
  var random = Math.random();
  if (random <= 0.005) {
    this.sheep.state = this.sheep.lookingForFood;
    console.log(this.sheep.state.toString());
  }
  else if (random <= 0.00509) {
    this.sheep.state = this.sheep.dying;
    console.log(this.sheep.state.toString());

  }
};
Eating.prototype.toString = function(){
  return 'eating';
};

///////////////////////////////////////////////////

function LookingForFood(sheep){
  this.maxDistance = 50;
  this.sheep = sheep;
}

LookingForFood.prototype.update = function(){
  var xMod = (Math.random() * this.maxDistance * 2) - this.maxDistance;
  var yMod = (Math.random() * this.maxDistance * 2) - this.maxDistance;
  this.sheep.rally_point.set(this.sheep.rally_point.x+= xMod, this.sheep.rally_point.y+=yMod);
  this.sheep.state = this.sheep.startTraveling;
  // console.log(this.sheep.state.toString());
};
LookingForFood.prototype.toString = function(){
  return 'looking for food';
};

/////////////////////////////////////////////////////////////

function Waiting(animal){
  this.animal = animal;
}

Waiting.prototype.update = function(){

};
Waiting.prototype.toString = function(){
  return 'waiting';
};

function Scared(sheep){
  this.sheep = sheep;
}

Scared.prototype.update = function(){

};
