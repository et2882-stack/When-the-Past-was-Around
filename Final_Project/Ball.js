class Ball{
    constructor(x, y, r) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.isTransparent = false;
    }

    display(){
        if (this.isTransparent) {
            fill(255, 183, 68, 0); 
        } else {
            fill(255, 183, 68); 
        }
        noStroke();
        ellipse(this.x, this.y, this.r, this.r);
    }

    makeTransparent() {
        this.isTransparent = true;
    }

    distance(){
        return dist(mouseX, mouseY, this.x, this.y);
    }
    getX(){
        return this.x;
    }
    getY(){
        return this.y;
    }
    getR(){
        return this.r;
    }
}
    // End of Ball class