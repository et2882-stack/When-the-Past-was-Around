let game_state;
let count;
let bgm, wall, floor, cabinet;
let started = false;
let things = [
    new Ball(595,384,10), 
    new Ball(87,242,10), 
    new Ball(210,311,10),
    new Ball(797,271,10),
    new Ball(193,82,10)
];
let dialogue = [
    "An orange drum. He always said rhythm was a second heartbeat. This one was his favorite to practice on when the nights stretched out too long. He’d tap it absentmindedly while I read on the couch.",
    "The green chair. He claimed it was too lumpy, but he always ended up sinking into it anyway. Sometimes he’d curl up there with his violin across his lap, plucking at the strings when he thought I wasn’t listening. The creaking wood, his soft humming… It felt like home.", 
    "A table with a box on it. And that table with the little wooden box. He carved that box himself during one of his silent moods. Days where he didn’t speak much, but his hands stayed busy. When he finally gave it to me, he just said, for safekeeping.",
    "The red drum. Louder, heavier. He only played it when he felt brave, when the music wanted to crash through the walls. I used to pretend to be annoyed, but truthfully… I loved those days. They were the ones where I knew he felt alive.",
    "The cork board… all our little moments. Tickets from concerts we stumbled into. Grocery lists he doodled birds on. A pressed leaf from the park where he first took my hand. It’s messy and crowded and uneven, but… so were we. And that’s what made it real."
];

let od_mode = 1;
let rd_mode = 1;
let bulletin_mode = 1;
let box_mode = 1;
let chair_mode = 1;
let xPos;
let yPos;
let violin_found;
let last;
let textboxVisible = false;
let textboxOpacity = 0;
let textboxFadingIn = false;
let textboxFadingOut = false;
const TEXTBOX_FADE_SPEED = 10;
let move = 0;
let violinAttached = false;    
let violinPlaced = false;  
let owlHasViolin = false;     
const OWL_HAND_X = 345; 
const OWL_HAND_Y = 278;  
const VIOLIN_DROP_THRESHOLD = 60;
// owl fade-away state
let owlFadingAway = false;
let owlFadeOpacity = 255;
let owlGone = false;
const OWL_FADE_SPEED = 2;
let loading_screen;
let titleScreen = true;
const TITLE_COLOR = [148, 92, 58];
let titleOpacity = 255;
let titleFadingOut = false;
const TITLE_FADE_SPEED = 6;
let blinkCounter = 0;
let screenFadingOut = false;
let screenFadeOpacity = 0;
const SCREEN_FADE_SPEED = 3;
let currentDialogueIndex = -1;
let typewriterCharIndex = 0;
let dialogueOpacity = 0;
let dialogueFadingIn = false;
let dialogueFadingOut = false;
let typewriterSpeed = 3; 
let typewriterCounter = 0;
const DIALOGUE_FADE_SPEED = 10; 
function preload() {
  loading_screen = loadImage("WTPWA_start.png");
  cloth_sound = loadSound("cloth_sound.mp3");
  wall = loadImage("WTPWA_Wall.png");
  floor = loadImage("WTPWA_Floor.png");
  cabinet = loadImage("WTPWA_cabinet.png");
  chair = loadImage("WTPWA_chair.png");
  couch = loadImage("WTPWA_couch.png");
  drum = loadImage("WTPWA_orange_drum.png");
  box = loadImage("WTPWA_box.png");
  plant = loadImage("WTPWA_plant.png");
  table = loadImage("WTPWA_trytable.png");
  jars = loadImage("WTPWA_jars.png");
  bowls = loadImage("WTPWA_bowls.png");
  bulletin = loadImage("WTPWA_bulletin.png");
  red_drum = loadImage("WTPWA_red_drum.png");
  orange_drum_sheet = loadImage("WTPWA_orange_drum_sheet.png");
  red_drum_sheet = loadImage("WTPWA_red_drum_cloth.png");
  bulletin_sheet = loadImage("WTPWA_bulletin_cloth.png");
  box_sheet = loadImage("WTPWA_box_cloth.png");
  chair_sheet = loadImage("WTPWA_chair_cloth.png");
  owl = loadImage("WTPWA_owl.png");
  owl_1 = loadImage("WTPWA_owl1.png");
  owl_2 = loadImage("WTPWA_owl2.png");
  owl_3 = loadImage("WTPWA_owl3.png");  
  owl_4 = loadImage("WTPWA_owl4.png");
  owl_5 = loadImage("WTPWA_owl5.png");
  owl_6 = loadImage("WTPWA_owl6.png");
  owl_violin = loadImage("WTPWA_owl_violin.png");
  violin = loadImage("WTPWA_violin.png");
  textbox = loadImage("WTPWA_text_box.png");
}

function keyPressed() {
    if ((key === ' ' || keyCode === 32) && titleScreen && !titleFadingOut) {
        titleFadingOut = true;
        try { startAudio(); } catch (e) { console.warn('startAudio failed', e); }
        return false; 
    }
    if ((key === ' ' || keyCode === 32) && !titleScreen) {
        if (!screenFadingOut) {
            screenFadingOut = true;
            screenFadeOpacity = 0;
        }
        return false;
    }
}

function setup() {
    imageMode(CENTER);
    const canvas = createCanvas(920, 460);
    canvas.mousePressed(startAudio); 
    count = 0;
    violin_found = false;
    owls = [
        owl_1,
        owl_2,
        owl_3,
        owl_4,
        owl_5,
        owl_6,
        //owl
    ]
    game_state = 1;
}

function startAudio() {
    if (!started) {
        started = true;
        userStartAudio();             
        bgm = loadSound(
        "WTPWA_bgm.mp3",
        () => {
            bgm.loop();
            console.log("bgm loaded and looping");
        },
        (err) => {
            console.error("Failed to load bgm:", err);
        }
        );
    }
}

function draw() {
    if (titleScreen) {
        if (loading_screen) {
            push();
            tint(255, titleOpacity);
            image(loading_screen, 460, 230, 920, 460);
            pop();
        }
        push();
        textFont('Caveat');
        textAlign(CENTER, CENTER);
        noStroke();
        fill(TITLE_COLOR[0], TITLE_COLOR[1], TITLE_COLOR[2], titleOpacity);
        textSize(64);
        text("When the Past Was Around", 460, 230 - 40);
        textSize(28);
        text("Simplified version by Emma", 460, 230 + 10);
        // blinking prompt: smooth sine-based alpha when not fading, otherwise follow titleOpacity
        let blinkAlpha = titleFadingOut ? titleOpacity : (128 + 127 * Math.sin(frameCount * 0.08));
        fill(TITLE_COLOR[0], TITLE_COLOR[1], TITLE_COLOR[2], blinkAlpha);
        textSize(22);
        text("Press space bar to start", 460, 230+48);
        pop();

        if (titleFadingOut) {
            titleOpacity -= TITLE_FADE_SPEED;
            if (titleOpacity <= 0) {
                titleOpacity = 0;
                titleFadingOut = false;
                titleScreen = false;
            }
        }

        return;
    }


    image(wall, 460, 230, 920, 460);
    image(floor, 460, 230, 920, 460);
    image(cabinet, 460, 230, 920, 460);
    image(chair, 460, 230, 920, 460);
    image(couch, 460, 230, 920, 460);
    image(drum, 460, 230, 920, 460);  
    image(bulletin, 460, 230, 920, 460);
    image(red_drum, 460, 230, 920, 460);
    image(plant, 460, 230, 920, 460);
    image(jars, 460, 230, 920, 460);
    image(bowls, 460, 230, 920, 460);
    
    
    if (od_mode == 1){
        image(orange_drum_sheet, 460, 230, 920, 460);
    }
    if (chair_mode == 1){
        image(chair_sheet, 460, 230, 920, 460);
    }
    if (chair_mode == 1){
        image(chair_sheet, 460, 230, 920, 460);
    }   
    if (rd_mode == 1){
        image(red_drum_sheet, 460, 230, 920, 460);
    } 
    if (bulletin_mode == 1){
        image(bulletin_sheet, 460, 230, 920, 460);
    } 
    image(table, 460, 230, 920, 460);
    image(box, 460, 230, 920, 460);
    if (box_mode == 1){
        image(box_sheet, 460, 230, 920, 460);
    }
    for (let i = 0; i < things.length; i++){
        things[i].display();
    }
    // Draw background owls only when owl hasn't received the violin and hasn't faded away
    if (!owlHasViolin && !owlFadingAway && !owlGone){
        for (let i = owls.length-1; i >= 0+count; i--){
            image(owls[i], 460, 230, 920, 460);
        }
    }
    if (count == 5) {
        if (!violinPlaced) {
            violin_found = true;
            if (violinAttached) {
                image(violin, mouseX, mouseY, 37, 98);
            } else {
                image(violin, xPos, yPos + 40, 37, 98);
            }
        } else {
            violin_found = false;
        }
    }
    // If owl is fading away, draw the owl_violin with decreasing opacity
    if (owlFadingAway) {
        push();
        tint(255, owlFadeOpacity);
        image(owl_violin, 460, 230, 920, 460);
        pop();
        owlFadeOpacity -= OWL_FADE_SPEED;
        if (owlFadeOpacity <= 0) {
            owlFadeOpacity = 0;
            owlFadingAway = false;
            owlHasViolin = false;
            owlGone = true;
        }
    } else if (owlHasViolin && !owlGone) {
        image(owl_violin, 460, 230, 920, 460);
    }
    // Update textbox opacity
    if (textboxFadingIn) {
        textboxOpacity += TEXTBOX_FADE_SPEED;
        if (textboxOpacity >= 255) {
            textboxOpacity = 255;
            textboxFadingIn = false;
        }
    }
    if (textboxFadingOut) {
        textboxOpacity -= TEXTBOX_FADE_SPEED;
        if (textboxOpacity <= 0) {
            textboxOpacity = 0;
            textboxFadingOut = false;
            textboxVisible = false;
        }
    }
    
    // Draw textbox with current opacity
    if (textboxVisible || textboxFadingOut) {
        push();
        tint(255, textboxOpacity);
        image(textbox, 460, 230, 920, 460);
        pop();
    }
    
    // Handle dialogue typewriter animation
    if (currentDialogueIndex >= 0) {
        const currentDialogueText = dialogue[currentDialogueIndex];
        
        // Fade in dialogue text
        if (dialogueFadingIn) {
            dialogueOpacity += DIALOGUE_FADE_SPEED;
            if (dialogueOpacity >= 255) {
                dialogueOpacity = 255;
                dialogueFadingIn = false;
            }
        }
        
        // Typewriter animation: increment character index
        if (typewriterCharIndex < currentDialogueText.length) {
            typewriterCounter++;
            if (typewriterCounter >= typewriterSpeed) {
                typewriterCharIndex++;
                typewriterCounter = 0;
            }
        }
        
        // Fade out dialogue text
        if (dialogueFadingOut) {
            dialogueOpacity -= DIALOGUE_FADE_SPEED;
            if (dialogueOpacity <= 0) {
                dialogueOpacity = 0;
                dialogueFadingOut = false;
                currentDialogueIndex = -1;
                typewriterCharIndex = 0;
            }
        }
    }
    
    // Draw dialogue text with typewriter effect and opacity
    if (currentDialogueIndex >= 0 && (dialogueFadingIn || (typewriterCharIndex > 0 && !dialogueFadingOut) || dialogueOpacity > 0)) {
        const currentDialogueText = dialogue[currentDialogueIndex];
        const displayText = currentDialogueText.substring(0, typewriterCharIndex);
        
        push();
        fill(0, 0, 0, dialogueOpacity); // Black text with current opacity
        textSize(19);
        textAlign(LEFT, TOP);
        textFont('Caveat');
        // Draw text in a box area within the textbox (adjust positioning as needed)
        const textX = 153;
        const textY = 356;
        const textWidth = 600;
        const textHeight = 100;
        text(displayText, textX, textY, textWidth, textHeight);
        pop();
    }
    
    // Update and draw global screen fade overlay (if active)
    if (screenFadingOut) {
        screenFadeOpacity -= SCREEN_FADE_SPEED;
        if (screenFadeOpacity >= 255) {
            screenFadeOpacity = 255;
            screenFadingOut = false;
        }
    }
    if (screenFadeOpacity > 0) {
        push();
        noStroke();
        fill(0, screenFadeOpacity);
        rect(0, 0, width, height);
        pop();
    }

    // print("x: " + mouseX + " y: " + mouseY);

    // fill(255, 255, 0);
    // stroke(0);
    // strokeWeight(2);
    // textSize(32);
    // textAlign(LEFT, TOP);
    // text("x: " + mouseX + " y: " + mouseY, 20, 20);
    
}

function mouseClicked(){
    // If textbox is open and clicked, close it AND fade out dialogue
    if (textboxVisible && collidePointRect(mouseX, mouseY, 460 - 460, 230 - 230, 920, 460)) {
        textboxVisible = false;
        textboxFadingOut = true;
        textboxFadingIn = false;
        dialogueFadingOut = true;
        dialogueFadingIn = false;
        return;
    }

    // If player is currently holding the violin, a click releases it (drop)
    if (violinAttached) {
        
        const d = dist(mouseX, mouseY, OWL_HAND_X, OWL_HAND_Y);
        if (d <= VIOLIN_DROP_THRESHOLD) {
            violinPlaced = true;
            violinAttached = false;
            violin_found = false;
            owlHasViolin = true;
            // start fade-away sequence for the owl with violin
            owlFadingAway = true;
            owlFadeOpacity = 255;
            owlGone = false;
        } else {
            violinAttached = false;
        }
        return; 
    }

    
    if (violin_found && !violinPlaced) {
        const violinX = xPos;
        const violinY = yPos + 40;
        const d = dist(mouseX, mouseY, violinX, violinY);
        if (d <= 30) {
            violinAttached = true;
            return; 
        }
    }

    if (collidePointEllipse(mouseX, mouseY, things[0].getX(), things[0].getY(), things[0].getR(), things[0].getR())){
        od_mode = 2;
        things[0].makeTransparent();
        xPos = things[0].getX();
        yPos = things[0].getY();
        count++;
        textboxVisible = true;
        textboxFadingIn = true;
        textboxFadingOut = false;
        cloth_sound.play();
        last = things[0];
        // Start dialogue typewriter animation
        currentDialogueIndex = 0;
        typewriterCharIndex = 0;
        dialogueOpacity = 0;
        dialogueFadingIn = true;
        dialogueFadingOut = false;
        typewriterCounter = 0;
    }
    if (collidePointEllipse(mouseX, mouseY,things[1].getX(), things[1].getY(), things[1].getR(), things[1].getR())){
        chair_mode = 2;
        things[1].makeTransparent();
        xPos = things[1].getX();
        yPos = things[1].getY();
        count++;
        last = things[1];
        textboxVisible = true;
        textboxFadingIn = true;
        textboxFadingOut = false;
        cloth_sound.play();
        last = things[1];
        // Start dialogue typewriter animation
        currentDialogueIndex = 1;
        typewriterCharIndex = 0;
        dialogueOpacity = 0;
        dialogueFadingIn = true;
        dialogueFadingOut = false;
        typewriterCounter = 0;
    }
    if (collidePointEllipse(mouseX, mouseY,things[2].getX(), things[2].getY(), things[2].getR(), things[2].getR())){
        box_mode = 2;
        things[2].makeTransparent();
        xPos = things[2].getX();
        yPos = things[2].getY();
        count++;
        last = things[2];
        textboxVisible = true;
        textboxFadingIn = true;
        textboxFadingOut = false;
        cloth_sound.play();
        last = things[2];
        // Start dialogue typewriter animation
        currentDialogueIndex = 2;
        typewriterCharIndex = 0;
        dialogueOpacity = 0;
        dialogueFadingIn = true;
        dialogueFadingOut = false;
        typewriterCounter = 0;
    }
    if (collidePointEllipse(mouseX, mouseY,things[3].getX(), things[3].getY(), things[3].getR(), things[3].getR())){
        rd_mode = 2;
        things[3].makeTransparent();
        xPos = things[3].getX();
        yPos = things[3].getY();
        count++;
        last = things[3];
        textboxVisible = true;
        textboxFadingIn = true;
        textboxFadingOut = false;   
        cloth_sound.play();
        last = things[3];
        // Start dialogue typewriter animation
        currentDialogueIndex = 3;
        typewriterCharIndex = 0;
        dialogueOpacity = 0;
        dialogueFadingIn = true;
        dialogueFadingOut = false;
        typewriterCounter = 0;
    }
    if (collidePointEllipse(mouseX, mouseY,things[4].getX(), things[4].getY(), things[4].getR(), things[4].getR())){
        bulletin_mode = 2;
        things[4].makeTransparent();
        xPos = things[4].getX();
        yPos = things[4].getY();
        count++;
        last = things[4];
        textboxVisible = true;
        textboxFadingIn = true;
        textboxFadingOut = false;
        cloth_sound.play();
        last = things[4];
        // Start dialogue typewriter animation
        currentDialogueIndex = 4;
        typewriterCharIndex = 0;
        dialogueOpacity = 0;
        dialogueFadingIn = true;
        dialogueFadingOut = false;
        typewriterCounter = 0;
    }
}
