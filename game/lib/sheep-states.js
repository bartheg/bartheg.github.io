function Dead(sheep){
  this.sheep = sheep;
}

Dead.prototype.update = function(){

};

function Traveling(sheep){
  this.sheep = sheep;
}

Traveling.prototype.update = function(){
  if (this.sheep.rally_point) {
    var tx = this.sheep.rally_point.x - this.sheep.sprite.x;
    var ty = this.sheep.rally_point.y - this.sheep.sprite.y;
    var dist = Math.sqrt(tx * tx + ty * ty);
    var velX = (tx / dist) * this.sheep.speed;
    var velY = (ty / dist) * this.sheep.speed;
    if (dist >= 1.50001) {
      this.sheep.sprite.x += velX;
      this.sheep.sprite.y += velY;
    }
    else {
      if (this.sheep instanceof Dog){
        this.sheep.state = this.sheep.waiting;
      }
      else if (this.sheep instanceof Sheep) {
        this.sheep.state = this.sheep.eating;
      }
      console.log(this.sheep.state.toString());
    }
  }
};
Traveling.prototype.toString = function(){
  return 'traveling';
};

function Eating(sheep){
  this.sheep = sheep;
}

Eating.prototype.update = function(){
  var random = Math.random();
  if (random <= 0.005) {
    this.sheep.state = this.sheep.lookingForFood;
    console.log(this.sheep.state.toString());
  }
};
Eating.prototype.toString = function(){
  return 'eating';
};
function LookingForFood(sheep){
  this.maxDistance = 50;
  this.sheep = sheep;
}

LookingForFood.prototype.update = function(){
  var xMod = (Math.random() * this.maxDistance * 2) - this.maxDistance;
  var yMod = (Math.random() * this.maxDistance * 2) - this.maxDistance;
  this.sheep.rally_point.set(this.sheep.rally_point.x+= xMod, this.sheep.rally_point.y+=yMod);
  this.sheep.state = this.sheep.traveling;
  console.log(this.sheep.state.toString());
};
LookingForFood.prototype.toString = function(){
  return 'looking for food';
};

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
