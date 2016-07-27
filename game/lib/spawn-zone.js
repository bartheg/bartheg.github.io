function SpawnPoint(localization, distance){
  this.distance = distance;
  this.x = localization.x;
  this.y = localization.y;
  this.elementCounter = 0;
  this.parkingPlaces = [];
}

SpawnPoint.prototype.addElement = function(element){
  var getNumberOfFullCycles = function(numberOfElements){
    return Math.round(Math.sqrt(numberOfElements)/2);
  };
  var getNumberOfElementsInFullCycle = function(cycle){
    if (cycle == 1) { return 1; }
    else { return (cycle - 1) * 8; }
  };
  var getPositionsForCycle = function(cycle){
    var result = Array();
    if (cycle == 1) {
      return [{x:0,y:0}];
    }
    else {
      var counter = getNumberOfElementsInFullCycle(cycle) / 4;
      var eastStart =  {x: cycle - 1, y: 0};
      var westStart =  {x:-cycle + 1, y: 0};
      var northStart = {x: 0, y:-cycle + 1};
      var southStart = {x: 0, y: cycle - 1};
      var step = function(num) {
        return Math.round(num/2)
      };
      result.push({x: eastStart.x, y: eastStart.y});
      result.push({x: westStart.x, y: westStart.y});
      result.push({x: northStart.x, y: northStart.y});
      result.push({x: southStart.x, y: southStart.y});
      for (var i = 1; i < counter; i++) {
        if ((i%2) == 1) {
          result.push( {x: eastStart.x, y: eastStart.y-step(i)} );
          result.push( {x: westStart.x, y: westStart.y+step(i)} );
          result.push( {x: northStart.x-step(i), y: northStart.y} );
          result.push( {x: southStart.x+step(i), y: southStart.y} );
        }
        else {
          result.push( {x: eastStart.x, y: eastStart.y+step(i)} );
          result.push( {x: westStart.x, y: westStart.y-step(i)} );
          result.push( {x: northStart.x+step(i), y: northStart.y} );
          result.push( {x: southStart.x-step(i), y: southStart.y} );
        }
      }
    }
    return result;
  };
  var inWhichCycle = function(elementIndex){
    var fullCycles = getNumberOfFullCycles(elementIndex+1);
    var sqrt = Math.sqrt(elementIndex+1);
    if ( (Math.round(sqrt) == sqrt) && ((sqrt % 2) == 1) ) {
      return fullCycles;
    }
    else {
      return fullCycles + 1;
    }
  };
  var getIndexInCycle = function(elementIndex){
    var fullCycles = getNumberOfFullCycles(elementIndex);
    var elementsInFullCycles = 0;
    for (var i = 0; i < fullCycles; i++) {
      elementsInFullCycles += getNumberOfElementsInFullCycle(i+1);
    }
    return (elementIndex - elementsInFullCycles);
  };
  var getRelativePosition = function(elementIndex){
    var whichCycle = inWhichCycle(elementIndex);
    var cyclePositions = getPositionsForCycle(whichCycle);
    return cyclePositions[getIndexInCycle(elementIndex)];
  };
  var shiftedPosition = function(position, offset, distance){
    return {x: position.x * distance + offset.x, y: position.y * distance + offset.y};
  };
  element.parkingIndex = this.elementCounter;
  this.elementCounter++;
  this.parkingPlaces.push( shiftedPosition(getRelativePosition(element.parkingIndex), {x:this.x, y:this.y}, this.distance) );
};

SpawnPoint.prototype.getParkingPlace = function(element){
  return this.parkingPlaces[element.parkingIndex];
}
