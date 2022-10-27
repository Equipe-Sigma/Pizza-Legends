class OverworldMap {
    constructor(config) {
      this.overworld = null;
      this.gameObjects = config.gameObjects;
      this.cutsceneSpaces = config.cutsceneSpaces || {};
      this.walls = config.walls || {};
  
      this.lowerImage = new Image();
      this.lowerImage.src = config.lowerSrc;
  
      this.upperImage = new Image();
      this.upperImage.src = config.upperSrc;
    
      this.isCutscenePlaying = false;
    }
  
    drawLowerImage(ctx, cameraPerson) {
      ctx.drawImage(
        this.lowerImage, 
        utils.withGrid(10.5) - cameraPerson.x, 
        utils.withGrid(6) - cameraPerson.y
        )
    }
    
    drawLowerimage(ctx, cameraPerson) {
        ctx.drawImage(
            this.lowerImage,
            utils.withGrid(10.5) - cameraPerson.x,
            utils.withGrid(6) - cameraPerson.y,
        )
    }

    drawUpperImage(ctx, cameraPerson) {
        ctx.drawImage(
            this.upperImage,
            utils.withGrid(10.5) - cameraPerson.x,
            utils.withGrid(6) - cameraPerson.y,
        )
    }

    isSpaceTaken(currentX, currentY, direction) {
      const {x,y} = utils.nextPosition(currentX, currentY, direction);
      return this.walls[`${x},${y}`] || false;
    }

    mountObjects() {
      Object.keys(this.gameObjects).forEach(key => {

        let object = this.gameObjects[key];
        object.id = key;

        //TODO: determine if this object should actually mount
        object.mount(this);
        
      })
    }

    async startCutscene(events) {
      this.isCutscenePlaying = true;
  
      for (let i=0; i<events.length; i++) {
        const eventHandler = new OverworldEvent({
          event: events[i],
          map: this,
        })
        await eventHandler.init();
      }
  
      this.isCutscenePlaying = false;
  
      //Reset NPCs to do their idle behavior
      Object.values(this.gameObjects).forEach(object => object.doBehaviorEvent(this))
    }

    checkForActionCutscene() {
      const hero = this.gameObjects["hero"];
      const nextCoords = utils.nextPosition(hero.x, hero.y, hero.direction);
      const match = Object.values(this.gameObjects).find(object => {
        return `${object.x},${object.y}` === `${nextCoords.x},${nextCoords.y}`
      });
      if (!this.isCutscenePlaying && match && match.talking.length) {
        this.startCutscene(match.talking[0].events)
      }
    }

    checkForFootstepCutscene() {
      const hero = this.gameObjects["hero"];
      const match = this.cutsceneSpaces[ `${hero.x},${hero.y}` ];
      if (!this.isCutscenePlaying && match) {
        this.startCutscene( match[0].events )
      }
    }

    addWall(x,y) {
      this.walls[`${x},${y}`] = true;
    }

    removeWall(x,y) {
      delete this.walls[`${x},${y}`]
    }

    moveWall(wasX, wasY, direction) {
      this.removeWall(wasX, wasY);
      const {x,y} = utils.nextPosition(wasX, wasY, direction);
      this.addWall(x,y);
    }
}

window.OverworldMaps = {
    DemoRoom: {
      lowerSrc: "/images/maps/DemoLower.png",
      upperSrc: "/images/maps/DemoUpper.png",
      gameObjects: {
        hero: new Person({
          isPlayerControlled: true,
          x: utils.withGrid(5),
          y: utils.withGrid(6),
        }),
        npcA: new Person({
          x: utils.withGrid(7),
          y: utils.withGrid(9),
          src: "/images/characters/people/npc1.png",
          behaviorLoop: [
            { type: "stand", direction: "left", time: 800},
            { type: "stand", direction: "up", time: 800},
            { type: "stand", direction: "right", time: 800},
            { type: "stand", direction: "down", time: 800},
          ],
          talking: [
            {
              events: [
                {type: "textMessage", text: "GET OUT OF HERE!", faceHero: "npcA"}
              ]
            }
          ]
        }),
        npcB: new Person({
          x: utils.withGrid(8),
          y: utils.withGrid(5),
          src: "/images/characters/people/npc2.png",
          behaviorLoop: [
            /*
            { type: "walk", direction: "left"},
            { type: "walk", direction: "up"},
            { type: "walk", direction: "right"},
            { type: "walk", direction: "down"},
            */
          ]
        }),
      },
      walls: {

        //Delimitação do cenário
        [utils.asGridCoord(0,4)] : true,
        [utils.asGridCoord(0,5)] : true,
        [utils.asGridCoord(0,6)] : true,
        [utils.asGridCoord(0,7)] : true,
        [utils.asGridCoord(0,8)] : true,
        [utils.asGridCoord(0,9)] : true,
        [utils.asGridCoord(11,4)] : true,
        [utils.asGridCoord(11,5)] : true,
        [utils.asGridCoord(11,6)] : true,
        [utils.asGridCoord(11,7)] : true,
        [utils.asGridCoord(11,8)] : true,
        [utils.asGridCoord(11,9)] : true,
        [utils.asGridCoord(1,10)] : true,
        [utils.asGridCoord(2,10)] : true,
        [utils.asGridCoord(3,10)] : true,
        [utils.asGridCoord(4,10)] : true,
        [utils.asGridCoord(6,10)] : true,
        [utils.asGridCoord(7,10)] : true,
        [utils.asGridCoord(8,10)] : true,
        [utils.asGridCoord(9,10)] : true,
        [utils.asGridCoord(10,10)] : true,
        [utils.asGridCoord(9,3)] : true,
        [utils.asGridCoord(10,3)] : true,
        [utils.asGridCoord(1,3)] : true,
        [utils.asGridCoord(2,3)] : true,
        [utils.asGridCoord(3,3)] : true,
        [utils.asGridCoord(4,3)] : true,
        [utils.asGridCoord(5,3)] : true,
        [utils.asGridCoord(6,4)] : true,
        [utils.asGridCoord(8,4)] : true,

        //Objetos
        [utils.asGridCoord(7,6)] : true,
        [utils.asGridCoord(8,6)] : true,
        [utils.asGridCoord(7,7)] : true,
        [utils.asGridCoord(8,7)] : true,
      },
      cutsceneSpaces: {
        [utils.asGridCoord(7,4)]: [
          {
            events: [
              { who: "npcB", type: "walk",  direction: "left" },
              { who: "npcB", type: "stand",  direction: "up", time: 500 },
              { type: "textMessage", text:"You can't be in there!"},
              { who: "npcB", type: "walk",  direction: "right" },
              { who: "npcB", type: "stand",  direction: "left", time: 100 },
              { who: "hero", type: "walk",  direction: "down" },
              { who: "hero", type: "walk",  direction: "left" },
            ]
          }
        ],
        [utils.asGridCoord(5,10)]: [
          {
            events: [
              { type: "changeMap", map: "Kitchen" }
            ]
          }
        ]
      }
    },
    Kitchen: {
      lowerSrc: "/images/maps/KitchenLower.png",
      upperSrc: "/images/maps/KitchenUpper.png",
      gameObjects: {
        hero: new Person({
          isPlayerControlled: true,
          x: utils.withGrid(5),
          y: utils.withGrid(5),
        }),
        npcA: new Person({
          x: utils.withGrid(9),
          y: utils.withGrid(6),
          src: "/images/characters/people/npc2.png"
        }),
        npcB: new Person({
          x: utils.withGrid(10),
          y: utils.withGrid(8),
          src: "/images/characters/people/npc3.png"
        })
      },
      walls: {

        //Delimitação do cenário
        [utils.asGridCoord(1,3)] : true,
        [utils.asGridCoord(2,3)] : true,
        [utils.asGridCoord(3,3)] : true,
        [utils.asGridCoord(4,3)] : true,
        [utils.asGridCoord(5,3)] : true,
        [utils.asGridCoord(6,3)] : true,
        [utils.asGridCoord(7,3)] : true,
        [utils.asGridCoord(8,3)] : true,
        [utils.asGridCoord(9,3)] : true,
        [utils.asGridCoord(10,3)] : true,
        [utils.asGridCoord(11,3)] : true,
        [utils.asGridCoord(12,3)] : true,
        [utils.asGridCoord(11,4)] : true,
        [utils.asGridCoord(12,4)] : true,
        [utils.asGridCoord(0,4)] : true,
        [utils.asGridCoord(0,5)] : true,
        [utils.asGridCoord(0,6)] : true,
        [utils.asGridCoord(0,7)] : true,
        [utils.asGridCoord(0,8)] : true,
        [utils.asGridCoord(0,9)] : true,
        [utils.asGridCoord(1,10)] : true,
        [utils.asGridCoord(2,10)] : true,
        [utils.asGridCoord(3,10)] : true,
        [utils.asGridCoord(4,10)] : true,
        [utils.asGridCoord(6,10)] : true,
        [utils.asGridCoord(7,10)] : true,
        [utils.asGridCoord(8,10)] : true,
        [utils.asGridCoord(9,10)] : true,
        [utils.asGridCoord(10,10)] : true,
        [utils.asGridCoord(11,10)] : true,
        [utils.asGridCoord(12,10)] : true,
        [utils.asGridCoord(13,5)] : true,
        [utils.asGridCoord(13,6)] : true,
        [utils.asGridCoord(13,7)] : true,
        [utils.asGridCoord(13,8)] : true,
        [utils.asGridCoord(13,9)] : true,

        //Objetos
        [utils.asGridCoord(1,5)] : true,
        [utils.asGridCoord(1,6)] : true,
        [utils.asGridCoord(1,7)] : true,
        [utils.asGridCoord(1,9)] : true,
        [utils.asGridCoord(2,9)] : true,
        [utils.asGridCoord(6,7)] : true,
        [utils.asGridCoord(7,7)] : true,
        [utils.asGridCoord(9,7)] : true,
        [utils.asGridCoord(10,7)] : true,
        [utils.asGridCoord(9,9)] : true,
        [utils.asGridCoord(10,9)] : true,
      },
      cutsceneSpaces: {
        [utils.asGridCoord(5,10)]: [
          {
            events: [
              { type: "changeMap", map: "Street" }
            ]
          }
        ]
      }
    },
    Street: {
      lowerSrc: "/images/maps/StreetLower.png",
      upperSrc: "/images/maps/StreetUpper.png",
      gameObjects: {
        hero: new Person({
          isPlayerControlled: true,
          x: utils.withGrid(5),
          y: utils.withGrid(10),
        })
      },
      walls: {

      },
      cutsceneSpaces: {
        [utils.asGridCoord(5,9)]: [
          {
            events: [
              { type: "changeMap", map: "Kitchen" }
            ]
          }
        ]
      }
    },
  }