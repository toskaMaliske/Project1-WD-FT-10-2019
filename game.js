class Game {
    constructor() {
        this.background = new Background();

        this.player = new Player();

        this.quests = [];

        this.obstacles = [];

        this.trophies = [];
    }


    setup() {
        this.player.setup();
    }


    draw() {
        if (mode == 0) {
            background('#222222');
            textAlign(CENTER);
            fill("white");

            textSize(20);
            let welcomeText = "Welcome to ";
            textSize(40);
            let startTitle = "City Run ";
            text(welcomeText + startTitle, 450, 120);

            let instructionsArrow = "Use the ARROW-UP ";
            let instructionsFlash = "to jump over the obstacles ";
            let instructionsStar = "Collect the stars to score points ";
            let instructionsHeart = " and the hearts for new lives.";
            let startText = "Press SPACE to start the game!";

            fill("white");
            textSize(20);

            text(instructionsArrow + instructionsFlash, 450, 220);
            image(obstacleImg, 700, 200, 35, 35);
            text(instructionsStar, 450, 290);
            image(startStart, 620, 265, 30, 30);
            text(instructionsHeart, 450, 360);
            image(trophyImg, 620, 340, 30, 30);
            text(startText, 450, 450);

        }

        if (mode == 1) {

            this.background.draw();
            this.player.draw();

            let scoreText = "Score: ";
            let livesText = "Lives: ";

            text(scoreText + this.player.score, width - 80, height - 450);
            text(livesText + this.player.lives, width - 80, height - 420);
            fill("white");


            if (frameCount > 320 && frameCount % 240 === 0) {
                this.quests.push(new Quests());
            }


            this.quests.forEach((quest, index) => {
                quest.draw();

                if (quest.x + quest.width <= 0 && quest.y + quest.height >= 0) {
                    this.quests.splice(index, 1);
                }

                if (this.playerCollision(quest, this.player)) {
                    this.quests.splice(index, 1);
                    this.player.score += 1;
                }

            });


            if (frameCount > 30 && frameCount % 120 === 0) {
                this.obstacles.push(new Obstacles());
            }

            this.obstacles.forEach((obstacle, index) => {
                obstacle.draw();
                if (obstacle.x + obstacle.width <= 0 && obstacle.y + obstacle.height >= 0) {
                    this.obstacles.splice(index, 1);
                }
                if (this.playerCollision(obstacle, this.player)) {
                    this.obstacles.splice(index, 1);
                    this.player.lives -= 1;

                }

                if (this.player.lives === 0) {
                    mode = 2;
                }
            });


            if (frameCount > 800 && frameCount % 1200 === 0) {
                this.trophies.push(new Trophies());
            }


            this.trophies.forEach((trophy, index) => {
                trophy.draw();

                if (trophy.x + trophy.width <= 0 && trophy.y + trophy.height >= 0) {
                    this.trophies.splice(index, 1);
                }

                if (this.playerCollision(trophy, this.player)) {
                    this.trophies.splice(index, 1);
                    this.player.lives += 1;
                    // this.triggerQuiz();
                }

            });

            //end of mode 1 ===========================================================            
        }

        if (mode == 2) {

            background('#222222');
            textAlign(CENTER);
            textSize(30);
            fill("white");

            let gameOverTitle = "Game Over";
            text(gameOverTitle, 450, 200);

            if (this.player.score === 0) {
                loseMessage = ("You're final score is: ");
                text(loseMessage + this.player.score, 450, 300);
                text("Refresh the page to try again.", 450, 400);
                fill("white");
            } else {
                congrats = "Congratulations, you're final score is: ";
                text(congrats + this.player.score, 450, 300);

            }

            fill("white");

            // let restart = "Press SPACE to restart the game";
            // text(restart, width / 3, height / 2, width / 3, height / 2);
            // fill("white");

            // keyPressed(); //restart the game
        }


        //End of draw() && mode 2=============================================================
    }


    playerCollision(item, player) {
        if (player.x + player.width < item.x || item.x + item.width < player.x) {
            return false;
        }
        if (player.y > item.y + item.height || item.y > player.y + player.height) {
            return false;
        }
        return true;
    }





    // triggerQuiz() {
    //     //use a container to hide the everything in triggerQuiz when enter is pressed, assign a class to all of the elements
    //     fill(255, 255, 255);
    //     textAlign(CENTER);

    //     input = createInput();
    //     input.position(20, 65);

    //     button = createButton('submit');
    //     button.position(input.x + input.width, 65);
    //     button.mousePressed(check);

    //     greeting = createElement('h2', 'Solve a Javascript question to earn 2 score points');
    //     greeting.position(20, 5);
    //     textSize(50);

    //     question = createElement("h3", random(quiz).prompt);
    //     quiz.splice(question);
    //     question.position(20, greeting.y + greeting.height);
    //     textSize(45);

    //     answer = random((quiz).answer);

    //     alertRight = createElement("h3", "Congrats you've scored 2 points!");
    //     alertRight.position(20, question.y + question.height);
    //     alertRight.style("color", "white");

    //     alertWrong = createElement("h3", "Sorry, that is wrong!");
    //     alertWrong.position(20, question.y + question.height);
    //     alertWrong.style("color", "white");

    //     returnGame = createElement("h3", "Press RETURN to resume the game");
    //     returnGame.position(20, question.y + question.height * 2);
    //     returnGame.style('color', 'white');

    //     function check() {
    //         if (input === answer) {
    //             text(alertRight);
    //             // clear.alertRight();
    //         } else {
    //             text(alertWrong);
    //             // clear.alertWrong();
    //         }
    //         input.value('');
    //     }

    // }


    //check button.onSubmit for the alerts?

    //end of triggerQuiz === === === === === === === === === === === ===



    //end of game()=============================================================    
}