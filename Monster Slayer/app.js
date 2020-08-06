new Vue({
    el: "#app",
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        gameIsRunning: false,
        turns: []
    },
    methods: {
        startGame: function (event) {
            this.gameIsRunning = true
        },
        reset: function (event) {
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.gameIsRunning = false;
            this.turns = [];
        },
        monsterMove: function () {
            var result = Math.round(Math.random());
            if (result == 1) {
                var damage = Math.floor(Math.random() * (13 - 7) + 7);
                this.playerHealth -= damage;
                this.turns.unshift({
                    isPlayer: false,
                    text: "Monster hits Player for " + damage
                })
            }
            else if (result == 0) {
                if (this.monsterHealth === 100) {
                    this.monsterMove();
                } else {
                    var heal = Math.floor(Math.random() * (10 - 5) + 5);
                    this.monsterHealth += heal;
                    this.turns.unshift({
                        isPlayer: false,
                        text: "Monster heals for " + heal
                    });
                }
            }
        },
        postAttack: function () {
            this.monsterMove();

            if (this.monsterHealth <= 0) {
                alert("You Win!")
                this.reset();
            }
            else if (this.playerHealth <= 0) {
                alert("You Lose!");
                this.reset();
            }
        },
        attack: function (attack) {
            var damage = Math.floor(Math.random() * (10 - 5) + 5);
            this.monsterHealth -= damage;
            this.turns.unshift({
                isPlayer: true,
                text: "Player hits Monster for " + damage
            })
            this.postAttack();
        },
        specialAttack: function () {
            var damage = Math.floor(Math.random() * (7 - 4) + 4);
            this.monsterHealth -= damage;
            var freeze = Math.floor(Math.random() * (3 - 1) + 1);
            if (freeze == 1) {
                if (this.monsterHealth <= 0) {
                    alert("You Win!");
                }
                else if (this.playerHealth <= 0) {
                    alert("You Lose!");
                } else {
                    this.turns.unshift({
                        isPlayer: true,
                        text: "Player hits Monster for " + damage + " and froze it!"
                    })
                }
            }
            else {
                //MONSTERS TURN
                this.turns.unshift({
                    isPlayer: true,
                    text: "Player hits Monster for " + damage
                })
                this.postAttack();
            }
        },
        heal: function () {
            if (this.playerHealth === 100.) {
                return (0);
            } else {
                var heal = Math.floor(Math.random() * (10 - 4) + 4);
                this.playerHealth += heal;
                this.turns.unshift({
                    isPlayer:true,
                    text: "Player heals for " + heal
                });
            }
            this.postAttack();

        },

    }
})