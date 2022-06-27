import { BootScene } from './scenes/boot-scene';
import { GameScene } from './scenes/game-scene';
import { HUDScene } from './scenes/hud-scene';
import { MenuScene } from './scenes/menu-scene';

export const GameConfig: Phaser.Types.Core.GameConfig = {
  title: 'Super Mario Land',
  version: '2.0',
  width: 1200,
  height: 700,
  zoom: 1,
  type: Phaser.AUTO,
  parent: 'game',
  scene: [BootScene,HUDScene, MenuScene, GameScene],
  input: {
    keyboard: true
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 475 },
      debug: true
    }
  },
  backgroundColor: '#FF0000,',
  render: { pixelArt: true, antialias: false }
};
