import { Box } from '../objects/box';
import { Brick } from '../objects/brick';
import { Collectible } from '../objects/collectible';
import { Goomba } from '../objects/goomba';
import { Mario } from '../objects/mario';
import { Platform } from '../objects/platform';
import { Portal } from '../objects/portal';
import { Bullet } from '../objects/Bullet';

export class GameScene extends Phaser.Scene {
  // tilemap
  private map: Phaser.Tilemaps.Tilemap;
  private tileset: Phaser.Tilemaps.Tileset;
  private backgroundLayer: Phaser.Tilemaps.TilemapLayer;
  private foregroundLayer: Phaser.Tilemaps.TilemapLayer;
  private groundLayer : Phaser.Tilemaps.TilemapLayer;
  // game objects
  private boxes: Phaser.GameObjects.Group;
  private bricks: Phaser.GameObjects.Group;
  private collectibles: Phaser.GameObjects.Group;
  private enemies: Phaser.GameObjects.Group;
  private platforms: Phaser.GameObjects.Group;
  private player: Mario;
  private portals: Phaser.GameObjects.Group;
 

  constructor() {
    super({
      key: 'GameScene'
    });
  }

  init(): void {}

  create(): void {
    // *****************************************************************
    // SETUP TILEMAP
    // *****************************************************************

    // create our tilemap from Tiled JSON
    this.map = this.make.tilemap({ key: this.registry.get('level') });
    this.tileset = this.map.addTilesetImage('tiles','map');
    this.backgroundLayer = this.map.createLayer('background', this.tileset, 0, 0);
    this.groundLayer = this.map.createLayer('platform', this.tileset, 0, 0);
    this.groundLayer.setName('groundLayer');
    

    // // set collision for tiles with the property collide set to true
    this.groundLayer.setCollisionByProperty({ collide: true });
    
    // *****************************************************************
    // GAME OBJECTS
    // *****************************************************************
   
  

    this.portals = this.add.group({
      /*classType: Portal,*/
      runChildUpdate: true
    });

    this.boxes = this.add.group({
      /*classType: Box,*/
      runChildUpdate: true
    });

    this.bricks = this.add.group({
      /*classType: Brick,*/
      runChildUpdate: true
    });

    this.collectibles = this.add.group({
      /*classType: Collectible,*/
      runChildUpdate: true
    });
    
    this.enemies = this.add.group({
      runChildUpdate: true
    });

    this.platforms = this.add.group({
      /*classType: Platform,*/
      runChildUpdate: true
    });

    this.loadObjectsFromTilemap();

    // // *****************************************************************
    // // COLLIDERS
    // // *****************************************************************
    this.physics.add.collider(this.player, this.groundLayer);
    this.physics.add.collider(this.enemies, this.groundLayer);
    // this.physics.add.collider(this.bullet, this.groundLayer);
    // this.physics.add.collider(this.enemies, this.boxes);
    this.physics.add.collider(this.enemies, this.bricks);
    this.physics.add.collider(this.player, this.bricks);
    this.physics.add.collider(this.player.bullet, 
      this.enemies, 
      this.handleBulletCollideEnemy, 
      null, 
      this);
    this.physics.add.collider(this.player.bullet, this.groundLayer, this.handleBulletColliderPlatform ,null, this);
    this.physics.add.collider(this.player.bullet, this.bricks, this.handleBulletColliderBricks ,null, this);
    this.physics.add.collider(this.player.bullet, this.boxes, this.bulletHitBox ,null, this);
    this.physics.add.collider(this.player.bullet, this.platforms, this.handleBulletColliderGround ,null, this);
    this.physics.add.collider(
      this.player.bullet,
      this.collectibles,
      this.handleBulletCollideCollectibles,
      null,
      this
    );

    this.physics.add.collider(
      this.player,
      this.boxes,
      this.playerHitBox,
      null,
      this
    );

    this.physics.add.collider(
      this.player,
      this.enemies,
      this.handlePlayerEnemyOverlap,
      null,
      this
    );

    this.physics.add.overlap(
      this.player,
      this.portals,
      this.handlePlayerPortalOverlap,
      null,
      this
    );

    this.physics.add.collider(
      this.player,
      this.platforms,
      this.handlePlayerOnPlatform,
      null,
      this
    );

    this.physics.add.overlap(
      this.player,
      this.collectibles,
      this.handlePlayerCollectiblesOverlap,
      null,
      this
    );

    // // *****************************************************************
    // // CAMERA
    // // *****************************************************************
    this.cameras.main.startFollow(this.player);
    this.cameras.main.setBounds(
      0,
      0,
      this.map.widthInPixels,
      this.map.heightInPixels
    );
    this.cameras.main.setZoom(2);

  }

  update(): void {
    this.player.update();
  }

  private loadObjectsFromTilemap(): void {
  
  //   // get the object layer in the tilemap named 'objects'
  const objects = this.map.getObjectLayer('Objects').objects as any[];
    objects.forEach((object) => {
          
      if (object.type === 'player') {
              this.player = new Mario({
                scene: this,
                x: this.registry.get('spawn').x,
                y: this.registry.get('spawn').y,
                texture: 'mario'
              })
            }
      if (object.type === 'collectible') {
              this.collectibles.add(
                new Collectible({
                  scene: this,
                  x: object.x,
                  y: object.y,
                  texture: object.properties[0].value,
                  points: 100
                })
              );
          }
      if (object.type === 'goomba') {
              this.enemies.add(
                new Goomba({
                  scene: this,
                  x: object.x,
                  y: object.y,
                  texture: 'goomba'
                })
              );
          }
      if (object.type === 'brick') {
              this.bricks.add(
                new Brick({
                  scene: this,
                  x: object.x,
                  y: object.y,
                  texture: 'brick',
                  value: 50
                })
              );
          }
      if (object.type === 'box') {
              this.boxes.add(
                new Box({
                  scene: this,
                  content: object.properties[0].value,
                  x: object.x,
                  y: object.y,
                  texture: 'box'
                })
              );
          }
      if (object.type === 'platformMovingUpAndDown') {
              this.platforms.add(
                new Platform({
                  scene: this,
                  x: object.x,
                  y: object.y,
                  texture: 'platform',
                  tweenProps: {
                    y: {
                      value: 150,
                      duration: 1500,
                      ease: 'Power0'
                    }
                  }
                })
              );
          }
      if (object.type === 'platformMovingLeftAndRight') {
              this.platforms.add(
                new Platform({
                  scene: this,
                  x: object.x,
                  y: object.y,
                  texture: 'platform',
                  tweenProps: {
                    x: {
                      value: object.x + 50,
                      duration: 1200,
                      ease: 'Power0'
                    }
                  }
                })
              );
          }
      if (object.type === 'portal') {
        this.portals.add(
          new Portal({
            scene: this,
            x: object.x,
            y: object.y,
            height: object.width,
            width: object.height,
            spawn: {
              x: object.properties[1].value,
              y: object.properties[2].value,
              dir: object.properties[0].value
            }
          }).setName(object.name)
        );
      }
    })
  }
  



  

  // /**
  //  * Player <-> Enemy Overlap
  //  * @param _player [Mario]
  //  * @param _enemy  [Enemy]
  //  */
  private handleBulletColliderPlatform (_bullet : Bullet) : any {
    this.player.bullet.killAndHide(_bullet);
  }
  private handleBulletColliderGround (platform : Platform, _bullet : Bullet) : any {
    this.player.bullet.killAndHide(_bullet);
  }
  private handleBulletColliderBricks ( brick : Brick, _bullet : Bullet) : any {
    this.player.bullet.killAndHide(_bullet);
  }
  private handleBulletCollideEnemy( _enemy: Goomba, _bullet : Bullet) : any {
    _bullet.reVelocity();
    _enemy.gotHitFromBulletOrMarioHasStar();
  }
private bulletHitBox(_box : Box, _bullet : Bullet) : any {
  this.player.bullet.killAndHide(_bullet);
}
  private handlePlayerEnemyOverlap(_player: Mario, _enemy: Goomba): void {
    if( this.player.marioSize === 'big')
    {
      this.player.shrinkMario();
    }
    if (_player.body.touching.down && _enemy.body.touching.up) {
      // player hit enemy on top
      _player.bounceUpAfterHitEnemyOnHead();
      _enemy.gotHitOnHead();
      this.add.tween({
        targets: _enemy,
        props: { alpha: 0 },
        duration: 1000,
        ease: 'Power0',
        yoyo: false,
        onComplete: function () {
          _enemy.isDead();
        }
      });
    } else {
      // player got hit from the side or on the head
      if(this.registry.get('lives') == 0)
      {
      if (_player.getVulnerable()) {
        _player.gotHit();
      }
    }else{
      this.registry.set('lives', this.registry.get('lives') - 1);
      this.events.emit('livesChanged');
      this.player.bounceUpAfterHitEnemyOnHead();
      _enemy.gotHitButPlayerAlive(this.player.x);
    }
    }
  }

  // /**
  //  * Player <-> Box Collision
  //  * @param _player [Mario]
  //  * @param _box    [Box]
  //  */
  private playerHitBox(_player: Mario, _box: Box): void {
    if (_box.body.touching.down && _box.active) {
      // ok, mario has really hit a box on the downside
      _box.yoyoTheBoxUpAndDown();
      this.collectibles.add(_box.spawnBoxContent());

      switch (_box.getBoxContentString()) {
        // have a look what is inside the box! Christmas time!
        case 'coin': {
          _box.tweenBoxContent({ y: _box.y - 40, alpha: 0 }, 700, function () {
            _box.getContent().destroy();
          });

          _box.addCoinAndScore(1, 100);
          break;
        }
        case 'rotatingCoin': {
          _box.tweenBoxContent({ y: _box.y - 40, alpha: 0 }, 700, function () {
            _box.getContent().destroy();
          });

          _box.addCoinAndScore(1, 100);
          break;
        }
        case 'flower': {
          _box.tweenBoxContent({ y: _box.y - 8 }, 200, function () {
            _box.getContent().anims.play('flower');
          });

          break;
        }
        case 'mushroom': {
          _box.popUpCollectible();
          break;
        }
        case 'star': {
          this.registry.set('star', this.registry.get('star') + 1);
          _box.popUpCollectible();
          break;
        }
        default: {
          break;
        }
      }
      _box.startHitTimeline();
    }
  }

  private handlePlayerPortalOverlap(_player: Mario, _portal: Portal): void {
    if (
      (_player.getKeys().get('DOWN').isDown &&
        _portal.getPortalDestination().dir === 'down') ||
      (_player.getKeys().get('RIGHT').isDown &&
        _portal.getPortalDestination().dir === 'right')
    ) {
      // set new level and new destination for mario
    
      this.registry.set('level', _portal.name);
      this.registry.set('spawn', {
        x: _portal.getPortalDestination().x,
        y: _portal.getPortalDestination().y,
        dir: _portal.getPortalDestination().dir
      });
      // restart the game scene
      this.scene.restart();
      
    } else if (_portal.name === 'exit') {
      this.scene.stop('GameScene');
      this.scene.stop('HUDScene');
      this.scene.start('MenuScene');
    }
    
  }
  private handleBulletCollideCollectibles(_collectible : Collectible, _bullet : Bullet)
  {
    this.player.bullet.killAndHide(_bullet);
    _collectible.destroy();
  }
  private handlePlayerCollectiblesOverlap(
    _player: Mario,
    _collectible: Collectible
  ): void {
    switch (_collectible.texture.key) {
      case 'flower': {
        break;
      }
      case 'heart': {
        this.registry.set('lives', this.registry.get('lives') + 1); 
        break;
      }
      case 'mushroom': {
        _player.growMario();
        break;
      }
      case 'star': {
        this.registry.set('star', this.registry.get('star') + 1);
        this.events.emit('starChanged');
        break;
      }
      default: {
        break;
      }
    }
    _collectible.collected();
  }

  // // TODO!!!
  private handlePlayerOnPlatform(player: Mario, platform: Platform): void {
    if (
      platform.body.moves &&
      platform.body.touching.up &&
      player.body.touching.down
    ) {
    }
  }
}
