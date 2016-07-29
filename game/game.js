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
    var how_many = Math.random() * 20 + 10;
    var animalSprites = new PIXI.Container();
    var sheeps = [];
    stage.addChild(animalSprites);
    var dogs = [];

    var sheepSpawnPoint = new SpawnPoint({x: 1266 / 2, y:568 / 2}, 45);
    var dogSpawnPoint = new SpawnPoint({x:200, y:200}, 40);

    var gameDiv = document.getElementById('game_div');
    gameDiv.appendChild(renderer.view);

    PIXI.loader .add('whiteSheep', 'white-sheep.png')
                .add('whiteSheepPaws1', 'white-sheep-paws1.png')
                .add('whiteSheepPaws2', 'white-sheep-paws2.png')
                .add('deadWhiteSheep', 'dead-white-sheep.png')
                .add('blackSheep', 'black-sheep.png')
                .add('blackSheepPaws1', 'black-sheep-paws1.png')
                .add('blackSheepPaws2', 'black-sheep-paws2.png')
                .add('deadBlackSheep', 'dead-black-sheep.png')
                .add('skeletonSheep', 'skeleton-sheep.png')
                .add('dog', 'dog.png')
                .add('dogTailUp', 'dog-tail-up.png')
                .add('dogPawsClose', 'dog-paws-close.png')
                .add('spikes', 'spikes.png')
                .load(setup);

    gameLoop();

    function setup() {

      var dogWaiting = [
        PIXI.loader.resources.dog.texture,
        PIXI.loader.resources.dogTailUp.texture
      ];
      var dogWalking = [
        PIXI.loader.resources.dog.texture,
        PIXI.loader.resources.dogPawsClose.texture
      ];

      var whiteSheepWaiting = [
        PIXI.loader.resources.whiteSheep.texture
      ];

      var whiteSheepWalking = [
        PIXI.loader.resources.whiteSheepPaws1.texture,
        PIXI.loader.resources.whiteSheep.texture,
        PIXI.loader.resources.whiteSheepPaws2.texture,
        PIXI.loader.resources.whiteSheep.texture      ];

      var whiteSheepDead = [
        PIXI.loader.resources.deadWhiteSheep.texture,
        PIXI.loader.resources.skeletonSheep.texture
      ];

      var blackSheepWaiting = [
        PIXI.loader.resources.blackSheep.texture,
      ];

      var blackSheepWalking = [
        PIXI.loader.resources.blackSheepPaws1.texture,
        PIXI.loader.resources.blackSheep.texture,
        PIXI.loader.resources.blackSheepPaws2.texture,
        PIXI.loader.resources.blackSheep.texture
      ];

      var blackSheepDead = [
        PIXI.loader.resources.deadBlackSheep.texture,
        PIXI.loader.resources.skeletonSheep.texture
      ];

      var colors = Array('white', 'white', 'white', 'black');
      var color;
      for(var i = 0; i < how_many; i++){
        color = colors[Math.floor(Math.random()*colors.length)];
        if (color == 'white'){
          sheeps.push(new Sheep('white sheep',
          {idle: whiteSheepWaiting, walking: whiteSheepWalking, dead: whiteSheepDead},
          sheepSpawnPoint, animalSprites));
        }
        else if (color == 'black'){
          sheeps.push(new Sheep('black sheep',
          {idle: blackSheepWaiting, walking: blackSheepWalking, dead: blackSheepDead},
          sheepSpawnPoint, animalSprites));
        }
      }
      var dog = new Dog('dog', {idle: dogWaiting, walking: dogWalking}, dogSpawnPoint, animalSprites);
      dogs.push(dog);


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
      animalSprites.children.sort(function(a,b){return a.y - b.y});
      renderer.render(stage);
    }

    function updateGame(){
      for(var i = 0; i < sheeps.length; i++){
        sheeps[i].update();
      }

      for(var i = 0; i < dogs.length; i++){
        if (clicked) {
          dogs[i].rally_point = click_point.clone();
          dogs[i].state = dogs[i].startTraveling;
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
