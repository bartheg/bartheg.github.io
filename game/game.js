(function(){

  var runGame = function(){
    // console.log(PIXI);
    var clicked = false;
    var click_point = new PIXI.Point(0,0);
    //
    var stage = new PIXI.Container();
    // var fence_area =
    stage.interactive = true;

    stage.hitArea = new PIXI.Rectangle(0, 0, 1266, 568);
    // stage.hitArea.interactive = true;
    stage.on('mousedown', onShitStage);

    var renderer = new PIXI.WebGLRenderer(1266, 568);
    // var renderer = new PIXI.CanvasRenderer(1266, 568);
    renderer.backgroundColor = 0x116611;

    var white_sheep;
    var green_sheep;
    var how_many = 50;
    var sheepSprites = new PIXI.Container();
    var sheeps = [];
    stage.addChild(sheepSprites);
    var dogSprites = new PIXI.Container();
    var dogs = [];
    stage.addChild(dogSprites);

    var sheepSpawnPoint = new SpawnPoint({x: 1266 / 2, y:568 / 2}, 8);
    var dogSpawnPoint = new SpawnPoint({x:200, y:200}, 40);

    var gameDiv = document.getElementById('game_div');
    gameDiv.appendChild(renderer.view);

    PIXI.loader.add('white-sheep.png').add('black-sheep.png').add('dog.png').add('spikes.png').load(setup);

    gameLoop();

    function setup() {
      var colors = Array('white', 'black');
      var color;
      for(var i = 0; i < how_many; i++){
        color = colors[Math.floor(Math.random()*colors.length)];
        sheeps.push(new Sheep(color, sheepSpawnPoint, sheepSprites));
      }
      var dog = new Dog('dog.png', dogSpawnPoint, dogSprites);
      dogs.push(dog);
      console.log(dogs);
      console.log(dogs.length);
      console.log(dogs[0]);
    }


    function onShitStage(event){
      var tempPoint = event.data.getLocalPosition(this);
      click_point = new PIXI.Point(tempPoint.x, tempPoint.y);
      clicked = true;

      // console.log("on stage: x: " + click_point.x + ' , y: ' + click_point.y);
    }

    function gameLoop(){
      requestAnimationFrame(gameLoop);
      updateGame();
      clicked = false;
      renderer.render(stage);
    }

    function updateGame(){
      for(var i = 0; i < sheeps.length; i++){
        sheeps[i].update();
      }

      for(var i = 0; i < dogs.length; i++){
        if (clicked) {
          dogs[i].rally_point = click_point.clone();
          dogs[i].state = dogs[i].traveling;
        }
        dogs[i].update();
      }
    }

    function shiftsheep(sheep){
      var mov_tab = [[ 3, 3], [-3,-3], [ 0, 0], [ 3,-3], [-3, 3],
                          [ 1, 1], [-1,-1], [ 0, 0], [ 1,-1], [-1, 1],
                          [ 2, 2], [-2,-2], [ 0, 0], [ 2,-2], [-2, 2]];
      var move = mov_tab[Math.floor(Math.random()*mov_tab.length)];
      sheep.x += move[0];
      sheep.y += move[1];
    }

  };

  window.addEventListener('load', runGame);

})();
