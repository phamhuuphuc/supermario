var position = 0;
var bb : boolean ;

export class Bullet extends Phaser.Physics.Arcade.Sprite
{
    body: Phaser.Physics.Arcade.Body;

    constructor (scene : Phaser.Scene, x : number = 0, y : number = 0)
    {
        super(scene, x, y, 'bullet');
    }

    fire (x : number, y : number, b : boolean)
    {   
        position = x;
        bb = b;
        this.body.reset(x, y);
        this.body.setSize(10,10);
        this.body.setAllowGravity(false);
        // this.setDisplaySize(10,10);
        this.setActive(true);
        this.setVisible(true);
        if(b)
        {
        this.setVelocityX(100);
        }else{
            this.setVelocityX(-100);
        }
    }
    reVelocity()
    {
        if(bb)
        {
        this.setVelocityX(100);
        }else{
            this.setVelocityX(-100);
        }
    }
    preUpdate (time : number, delta : number)
    {
        super.preUpdate(time, delta);

        if (this.x > position + 400 || this.x < 0)
        {
            this.setActive(false);
            this.setVisible(false);
        }
    }
}

class Bullets extends Phaser.Physics.Arcade.Group
{   
    scene : Phaser.Scene;

    constructor (scene : Phaser.Scene)
    {
        super(scene.physics.world, scene);
        this.scene = scene;
        this.createMultiple({
            frameQuantity: 1,
            key: 'bullet',
            active: false,
            visible: false,
            classType: Bullet
        });
    }

    fireBullet (x : number , y : number , b : boolean)
    {  
        
        let bullet = this.getFirstDead(false);
       
        if (bullet)
        {
            if(this.scene.registry.get('star') > 0)
        {
            bullet.fire(x, y, b);
           this.scene.registry.set('star', this.scene.registry.get('star') -1);
           this.scene.events.emit('starChanged');
        }
            // bullet.fire(x, y, b);
        }
    
    }
}

export default Bullets;