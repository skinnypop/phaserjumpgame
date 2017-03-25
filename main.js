// Initialize Phaser
var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload(){ 
        game.load.image('ground', 'assets/PNG/Environment/ground_grass.png');
        game.load.image('bunny', 'assets/PNG/Players/bunny1_ready.png');
    }

var platforms;
var player;
var cursors;
var score = 0;
var scoreText;



function create() { 
        game.stage.backgroundColor = '479cde';
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        platforms = game.add.group();
        
        //  Enable physics for any object that is created in this group
        platforms.enableBody = true;
        
         // Here we create the ground.
        var ground = platforms.create(0, game.world.height - 64, 'ground');

        //  Scale it to fit the width of the game
        ground.scale.setTo(2, 0.5);
        
        //  This stops it from falling away when you jump on it
        ground.body.immovable = true;
        
        //  Now let's create two ledges
        var ledge = platforms.create(400, 350, 'ground');
        ledge.scale.setTo(1,0.5);
        ledge.body.immovable = true;

        ledge = platforms.create(-150, 150, 'ground');
        ledge.scale.setTo(1,0.5);
        ledge.body.immovable = true;
        
        
        // Add player
        player = game.add.sprite(32, game.world.height - 300, 'bunny');
        player.scale.setTo(0.5, 0.5);
        
        
        //  We need to enable physics on the player
        game.physics.arcade.enable(player);
        game.camera.follow(player);
        
        //  Player physics properties. Give the little guy a slight bounce.
        player.body.bounce.y = 0.2;
        player.body.gravity.y = 300;
        player.body.collideWorldBounds = true;
        
        //  The score
        scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

        //  Our controls.
        cursors = game.input.keyboard.createCursorKeys();
        
}

function update() {
    // This function is called 60 times per second    
        
    //  Collide the player with the platforms
    var hitPlatform = game.physics.arcade.collide(player, platforms);
        
    //  Reset the players velocity (movement)
    player.body.velocity.x = 0;
    
    if (cursors.left.isDown)
    {
        //  Move to the left
        player.body.velocity.x = -150;

        //player.animations.play('left');           TODO Add animation
    }
    else if (cursors.right.isDown)
    {
        //  Move to the right
        player.body.velocity.x = 150;

        //player.animations.play('right');          TODO Add animation
    }
    else
    {
        //  Stand still
        player.animations.stop();

        player.frame = 4;
    }
        
    //  Allow the player to jump if they are touching the ground.
    if (cursors.up.isDown && player.body.touching.down){
        player.body.velocity.y = -350;
    }

    game.world.wrap(player, 0, true);
  
}

