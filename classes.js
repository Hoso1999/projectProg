class LivingCreature {
    constructor(x, y, index){
      this.x = x;
      this.y = y;
      this.index = index;
      this.multiply = Math.round(Math.random() * 8);
      this.speed = 8;
      matrix[this.y][this.x] = this.index;
      this.directions = [
          [this.x - 1, this.y - 1],
          [this.x, this.y - 1],
          [this.x + 1, this.y - 1],
          [this.x - 1, this.y],
          [this.x + 1, this.y],
          [this.x - 1, this.y + 1],
          [this.x, this.y + 1],
          [this.x + 1, this.y + 1]
      ];
    }
    
    chooseCell(character) {
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
}

class Grass extends LivingCreature {

  mul() {
      this.multiply++;
      this.direction = random(this.chooseCell(0));
      if (this.multiply >= this.speed && this.direction) {
          var newGrass = new Grass(this.direction[0], this.direction[1], this.index);
          newGrass.parentX = this.x;
          newGrass.parentY = this.y;
          grassArr.push(newGrass);
          matrix[this.direction[1]][this.direction[0]] = this.index;
          this.multiply = 0;
      }
  }
}
class GrassEater extends LivingCreature {
    constructor(x, y, index){
        super(x, y, index);
        this.energy = Math.round(Math.random() * 8);
    }

   getNewCoordinates() {
     this.directions = [
         [this.x - 1, this.y - 1],
         [this.x, this.y - 1],
         [this.x + 1, this.y - 1],
         [this.x - 1, this.y],
         [this.x + 1, this.y],
         [this.x - 1, this.y + 1],
         [this.x, this.y + 1],
         [this.x + 1, this.y + 1]
     ];
   }

   chooseCell(character) {
       this.getNewCoordinates();
       return super.chooseCell(character);
   }

   move() {
       var cell = random(this.chooseCell(0));
       if (cell && this.multiply >= this.speed / 4) {
           this.energy--;
           matrix[this.y][this.x] = 0;
           this.x = cell[0]; this.y = cell[1];
           matrix[this.y][this.x] = 2;
           this.multiply = 0;
       }
   }

   eat() {
       this.energy--;
       this.multiply++;
       var cell = random(this.chooseCell(1));
       if (cell && this.multiply >= this.speed / 4) {
           this.energy += this.speed;
           matrix[this.y][this.x] = 0;
           this.x = cell[0]; this.y = cell[1];
           matrix[this.y][this.x] = 2;
           for (var i in grassArr) {
               if (grassArr[i].x == this.x && grassArr[i].y == this.y) {
                   grassArr.splice(i, 1);
               }
           }
       }
       else this.move();
   }

   mul() {
       var cell = random(this.chooseCell(0));
       if (cell && this.energy >= this.speed) {
           this.energy = 1;
           var newGrassEater = new GrassEater(cell[0], cell[1], 2);
           grassEaterArr.push(newGrassEater);
       }
   }

   die() {
       if (this.energy <= -(this.speed / 2)) {
           matrix[this.y][this.x] = 0;
           for (var i in grassEaterArr) {
               if (grassEaterArr[i].x == this.x && grassEaterArr[i].y == this.y) {
                   grassEaterArr.splice(i, 1);
               }
           }
       }
   }
}
class Predator extends LivingCreature{
  constructor(x,y,index) {
    super(x, y, index);
    this.energy = Math.round(Math.random() * 16);
    this.speed = 24;
    this.multiply = Math.round(Math.random() * 16);
  }

  getNewCoordinates() {
      this.directions = [
          [this.x - 1, this.y - 1],
          [this.x, this.y - 1],
          [this.x + 1, this.y - 1],
          [this.x - 1, this.y],
          [this.x + 1, this.y],
          [this.x - 1, this.y + 1],
          [this.x, this.y + 1],
          [this.x + 1, this.y + 1]
      ];
  }

  move() {
      var cell = random(this.chooseCell(0));
      if (cell && this.multiply >= this.speed / 2) {
          this.energy--;
          matrix[this.y][this.x] = 0;
          this.x = cell[0]; this.y = cell[1];
          matrix[this.y][this.x] = 3;
      }
  }

  eat() {
      this.energy--;
      var cell = random(this.chooseCell(2));
      if (cell && this.multiply >= this.speed / 2) {
          this.energy += this.speed/2;
          matrix[this.y][this.x] = 0;
          this.x = cell[0]; this.y = cell[1];
          matrix[this.y][this.x] = 3;
          for (var i in grassEaterArr) {
              if (grassEaterArr[i].x == this.x && grassEaterArr[i].y == this.y) {
                  grassEaterArr.splice(i, 1);
              }
          }
      }
      else this.move();
  }

  mul() {
      var cell = random(this.chooseCell(0));
      if (cell && this.energy >= this.speed) {
          this.energy = 1;
          var newPredator = new Predator(cell[0], cell[1], 3);
          predatorArr.push(newPredator);
      }
  }

  die() {
      if (this.energy <= -(this.speed / 2)) {
          matrix[this.y][this.x] = 0;
          for (var i in predatorArr) {
              if (predatorArr[i].x == this.x && predatorArr[i].y == this.y) {
                  predatorArr.splice(i, 1);
              }
          }
      }
  }
}
