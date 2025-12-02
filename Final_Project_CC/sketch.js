// To run: open index.html in a browser (double-click) or serve with a local HTTP server:
//    python3 -m http.server 8000

let bgm, wall, floor, cabinet;
let started = false;
let things = [
    new Ball(595,384,10), 
    new Ball(87,242,10), 
    new Ball(210,311,10),
    new Ball(797,271,10),
    new Ball(193,82,10)
];
let od_mode = 1;
let rd_mode = 1;
let bulletin_mode = 1;
let box_mode = 1;
let chair_mode = 1;
// let video_oDrum;
function preload() {
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
  orange_drum_sheet = loadImage("WTPWA_orange_drum_sheet.png");
  red_drum_sheet = loadImage("WTPWA_red_drum_cloth.png");
  bulletin_sheet = loadImage("WTPWA_bulletin_cloth.png");
  box_sheet = loadImage("WTPWA_box_cloth.png");
  chair_sheet = loadImage("WTPWA_chair_cloth.png");
}

function setup() {
    imageMode(CORNER);
    const canvas = createCanvas(2069, 1080);
    canvas.mousePressed(startAudio); 
    // video_oDrum = createVideo('sheet_test.mov');
    // video_oDrum.hide(); // Hide by default
    // video_oDrum.elt.loop = false; // Play only once
    // video_oDrum.elt.controls = false;
    // video_oDrum.elt.autoplay = false;
    // video_oDrum.elt.muted = false;
    // video_oDrum.elt.playsInline = true;
    
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
  
    image(wall, 0, 0, 920, 460);
    image(floor, 0, 0, 920, 460);
    image(cabinet, 0, 0, 920, 460);
    image(chair, 0, 0, 920, 460);
    image(couch, 0, 0, 920, 460);
    image(drum, 0, 0, 920, 460);  
    image(bulletin, 0, 0, 920, 460);
    // image(table, 0, 0, 920, 460);
    // image(box, 0, 0, 920, 460);
    image(plant, 0, 0, 920, 460);
    image(jars, 0, 0, 920, 460);
    image(bowls, 0, 0, 920, 460);
    if (od_mode == 1){
        image(orange_drum_sheet, 0, 0, 920, 460);
    }
    if (chair_mode == 1){
        image(chair_sheet, 0, 0, 920, 460);
    }
    if (chair_mode == 1){
        image(chair_sheet, 0, 0, 920, 460);
    }   
    if (rd_mode == 1){
        image(red_drum_sheet, 0, 0, 920, 460);
    } 
    if (bulletin_mode == 1){
        image(bulletin_sheet, 0, 0, 920, 460);
    } 
    image(table, 0, 0, 920, 460);
    image(box, 0, 0, 920, 460);
    if (box_mode == 1){
        image(box_sheet, 0, 0, 920, 460);
    }
    for (let i = 0; i < things.length; i++){
        things[i].display();
    }
    
    print("x: " + mouseX + " y: " + mouseY);

    fill(255, 255, 0);
    stroke(0);
    strokeWeight(2);
    textSize(32);
    textAlign(LEFT, TOP);
    text("x: " + mouseX + " y: " + mouseY, 20, 20);
    
}

function mouseClicked(){
    // Check all balls in things array
    if (collidePointEllipse(mouseX, mouseY, things[0].getX(), things[0].getY(), things[0].getR(), things[0].getR())){
        od_mode = 2;
        things[0].makeTransparent();
    }
    if (collidePointEllipse(mouseX, mouseY,things[1].getX(), things[1].getY(), things[1].getR(), things[1].getR())){
        chair_mode = 2;
        things[1].makeTransparent();
    }
    if (collidePointEllipse(mouseX, mouseY,things[2].getX(), things[2].getY(), things[2].getR(), things[2].getR())){
        box_mode = 2;
        things[2].makeTransparent();
    }
    if (collidePointEllipse(mouseX, mouseY,things[3].getX(), things[3].getY(), things[3].getR(), things[3].getR())){
        rd_mode = 2;
        things[3].makeTransparent();
    }
    if (collidePointEllipse(mouseX, mouseY,things[4].getX(), things[4].getY(), things[4].getR(), things[4].getR())){
        bulletin_mode = 2;
        things[4].makeTransparent();
    }
    
}

// function o_drum(){
    
//     video_oDrum.show();
//     // Sets width to 920 and height to 460
//     video_oDrum.size(920, 460);
//     // Positions the top-left corner at (0, 0)
//     video_oDrum.position(0, 0);
//     video_oDrum.time(0); 
//     video_oDrum.play();
//     video_oDrum.elt.onended = () => {
//         video_oDrum.hide();
//     }
// }
