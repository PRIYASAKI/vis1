// snake.js
class SnakeGame {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.snake = [{x: 10, y: 10}];
        this.food = this.createFood();
        this.direction = 'right';
        this.score = 0;
        this.gameOver = false;

        document.addEventListener('keydown', this.changeDirection.bind(this));
        this.gameLoop();
    }

    gameLoop() {
        if (!this.gameOver) {
            this.moveSnake();
            this.draw();
            setTimeout(this.gameLoop.bind(this), 100);
        } else {
            // Game over logic
            alert(`Game Over! Your score is ${this.score}`);
        }
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw snake
        this.ctx.fillStyle = 'green';
        this.snake.forEach(segment => {
            this.ctx.fillRect(segment.x * 20, segment.y * 20, 20, 20);
        });

        // Draw food
        this.ctx.fillStyle = 'red';
        this.ctx.fillRect(this.food.x * 20, this.food.y * 20, 20, 20);
    }

    moveSnake() {
        let head = {x: this.snake[0].x, y: this.snake[0].y};

        // Move snake based on direction
        switch (this.direction) {
            case 'up':
                head.y--;
                break;
            case 'down':
                head.y++;
                break;
            case 'left':
                head.x--;
                break;
            case 'right':
                head.x++;
                break;
        }

        // Check for collision with walls or itself
        if (head.x < 0 || head.y < 0 || head.x >= this.canvas.width / 20 || head.y >= this.canvas.height / 20 || this.isSnakeCollision(head)) {
            this.gameOver = true;
            return;
        }

        // Check if snake eats food
        if (head.x === this.food.x && head.y === this.food.y) {
            this.score++;
            this.food = this.createFood();
        } else {
            // Remove tail segment
            this.snake.pop();
        }

        // Add new head
        this.snake.unshift(head);
    }

    isSnakeCollision(head) {
        for (let i = 1; i < this.snake.length; i++) {
            if (head.x === this.snake[i].x && head.y === this.snake[i].y) {
                return true;
            }
        }
        return false;
    }

    createFood() {
        return {
            x: Math.floor(Math.random() * (this.canvas.width / 20)),
            y: Math.floor(Math.random() * (this.canvas.height / 20))
        };
    }

    changeDirection(event) {
        switch (event.keyCode) {
            case 37: // Left
                if (this.direction !== 'right') this.direction = 'left';
                break;
            case 38: // Up
                if (this.direction !== 'down') this.direction = 'up';
                break;
            case 39: // Right
                if (this.direction !== 'left') this.direction = 'right';
                break;
            case 40: // Down
                if (this.direction !== 'up') this.direction = 'down';
                break;
        }
    }
}

new SnakeGame();
