function Level(levelString){
  this.running = new Running(this);
  this.state = this.running;
}

Level.prototype.update = function(){
  this.state.update();
};


function Running(level){
  this.level = level;
}

Running.prototype.update = function(){
  console.log(this.level.state.toString());
};

Running.prototype.toString = function(){
  'level is running';
};
