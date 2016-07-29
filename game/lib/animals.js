function Animal(kind, textures, spawnPoint, container){
  this.kind = kind;
  this.direction = 1; // -1 is left, 1 is right
  if (textures.idle){
    this.idleSprite = new PIXI.extras.MovieClip(textures.idle);
  }
  if (textures.walking){
    this.walkingSprite = new PIXI.extras.MovieClip(textures.walking);
  }
  if (textures.dead){
    this.deadSprite = new PIXI.extras.MovieClip(textures.dead);
  }
  this.sprite = this.idleSprite;
  this.sprite.play();
  this.speed = 1;
  this.sprite.anchor.x = 0.5;
  this.sprite.anchor.y = 0.5;
  this.spawnPoint = spawnPoint;
  this.parkingIndex = null;
  this.spawnPoint.addElement(this);
  this.sprite.position = new PIXI.Point(
              this.spawnPoint.getParkingPlace(this).x,
              this.spawnPoint.getParkingPlace(this).y    );
  this.rally_point = new PIXI.Point(this.sprite.x, this.sprite.y);
  this.container = container;
  this.container.addChild(this.sprite);
  this.traveling = new Traveling(this);
  this.startTraveling = new StartTraveling(this);
  this.waiting = new Waiting(this);
  this.dying = new Dying(this);
  this.dead = new Dead(this);
  this.state = this.traveling;


}

Animal.prototype.changeSprite = function(newSprite) {
  var currentX = this.sprite.x;
  var currentY = this.sprite.y;
  this.container.removeChild(this.sprite);
  this.sprite = newSprite;
  this.sprite.x = currentX;
  this.sprite.y = currentY;
  this.sprite.anchor.x = 0.5;
  this.sprite.anchor.y = 0.5;
  this.container.addChild(this.sprite);
  if (this.sprite.scale.x > 0 && this.direction < 0) {
    this.sprite.scale.x *= this.direction;
  }
  else if (this.sprite.scale.x < 0 && this.direction > 0){
    this.sprite.scale.x *= -this.direction;
  }

};

// Animal.prototype.turn = function() {
//   this.sprite.scale.x *= -1;
//   this.direction *= -1;
// };

Animal.prototype.update = function() {
  this.state.update();
};

function Sheep(kind, textures, spawnPoint, container){
  Animal.call(this, kind, textures, spawnPoint, container);
  this.speed = 0.5;
  this.sprite.interactive = true;
  this.sprite.buttonMode = true;
  this.traveling = new Traveling(this);
  this.eating = new Eating(this);
  this.lookingForFood = new LookingForFood(this);
  this.state = this.eating;
  // this.sprite.click = function(event){ event.stopPropagation(); console.log("on sheep"); };
  this.sprite.on('mousedown', function(event){ event.stopPropagation(); console.log("on sheep"); });
}

Sheep.prototype = Object.create(Animal.prototype);
Sheep.prototype.constructor = Sheep;

function Dog(kind, textures, spawnPoint, container){
  Animal.call(this, kind, textures, spawnPoint, container);
  this.speed = 3;
  this.sprite.interactive = true;


}

Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;
