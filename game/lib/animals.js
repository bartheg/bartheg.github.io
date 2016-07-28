function Animal(texture, spawnPoint, container){
  this.sprite = new PIXI.Sprite(PIXI.loader.resources[texture].texture);
  this.speed = 1;
  this.sprite.anchor.x = 0.5;
  this.sprite.anchor.y = 0.5;
  this.spawnPoint = spawnPoint;
  this.parkingIndex = null;
  this.spawnPoint.addElement(this);
  this.sprite.x = this.spawnPoint.getParkingPlace(this).x;
  this.sprite.y = this.spawnPoint.getParkingPlace(this).y;
  this.rally_point = new PIXI.Point(this.sprite.x, this.sprite.y);
  container.addChild(this.sprite);
  this.traveling = new Traveling(this);
  this.startTraveling = new StartTraveling(this);
  this.waiting = new Waiting(this);
  this.state = this.traveling;
}


Animal.prototype.turn = function() {
  this.sprite.scale.x *= -1;
};

Animal.prototype.update = function() {
  this.state.update();
};

function Sheep(color, spawnPoint, container){
  this.color = color;
  var pickTexture = function(color){
    switch (color) {
      case 'white':
        return 'white-sheep.png';
      break;
      case 'black':
        return 'black-sheep.png';
      break;
    }
  };
  var textu = pickTexture(this.color);
  Animal.call(this, textu, spawnPoint, container);
  this.speed = 0.5;
  this.sprite.scale = new PIXI.Point(0.7, 0.7);
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

function Dog(texture, spawnPoint, container){
  Animal.call(this, texture, spawnPoint, container);
  this.speed = 3;
  this.sprite.interactive = true;
  // this.sprite.scale = new PIXI.Point(1, 1);
}

Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;
