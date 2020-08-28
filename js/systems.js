// Moves the given entity (Player, etc.) that,
// has a position and a velocity.
function moveEntity(entity) {
    if (entity.position && entity.velocity) {
        const velocity = {
            x: entity.velocity.x * dt,
            y: entity.velocity.y * dt,
        };
        if(entity.solid) {
            const velRem = {
                x: velocity.x % 1.0,
                y: velocity.y % 1.0
            }
            const velSign = {
                x: Math.sign(velocity.x),
                y: Math.sign(velocity.y),
            }
            function doesEntityCollide(targetEntity) {
                return entities.some(function (otherEntity) {
                    return (
                        otherEntity.solid &&
                        entity.id !== otherEntity.id &&
                        doEntitiesCollide(targetEntity, otherEntity)
                    );
                });
            }
            ["x", "y"].forEach(function (axis) {
                let inCollision = false;
                const pixels = Math.floor(Math.abs(velocity[axis]));
                for (let i = 0; i < pixels; i++) {
                    const newPos = {
                        x: entity.position.x,
                        y: entity.position.y,
                    }
                    newPos[axis] += velSign[axis];
                    const tmpEntity = {
                        position: newPos,
                        size: entity.size,
                    }
                    if(doesEntityCollide(tmpEntity)) {
                        inCollision = true;
                        break;
                    } else {
                        entity.position[axis] = newPos[axis]
                    }
                }
                if(!inCollision && velRem[axis] !== 0.0) {
                    const newPos = {
                        x: entity.position.x,
                        y: entity.position.y,
                    }
                    newPos[axis] += velRem[axis];
                    const tmpEntity = {
                        position: newPos,
                        size: entity.size,
                    }
                    if(doesEntityCollide(tmpEntity)) {
                        inCollision = true;
                    } else {
                        entity.position[axis] = newPos[axis]
                    }
                }
                if(inCollision) {
                    entity.velocity[axis] = 0.0
                }
            })
        } else {
            entity.position.x += velocity.x;
            entity.position.y += velocity.y;
        }
    }
}

// Draws all entities as rectangles,
// that have a position and a size.
// Draws the entity with a color,
// if the enity has a color.
function drawEntities() {
    for (let i = 0; i < entities.length; i++) {
        push();
        const entity = entities[i];
        if(entity.position) {
            translate(entity.position.x - camera.x, entity.position.y - camera.y);
        }

        if(entity.rotate) {
            rotate(entity.rotate);
        }

        if(entity.size && entity.img) {
            image(entity.img, 0, 0);
        } else if (entity.size && entity.color) {
            fill(entity.color);
            rect(
                0,
                0,
                entity.size.w,
                entity.size.h,
            );
        } 
        pop();
    }
}

// Changes velocity on all entities, that
// have gravity and velocity.
// Simulates gravity.
function applyGravity(entity) {
    if (entity.gravity && entity.velocity) {
        entity.velocity.y += entity.gravity * dt;
    }
}

//Player jumps when the button "Space" is pressed
function checkJump(entity) {
    if(entity.canJump && entity.velocity && entity.size) {
        if(keyIsDown(32)) { // 32 ... Space
            const checkEntity = {
                position: {
                    x: entity.position.x,
                    y: entity.position.y + 1
                },
                size: entity.size
            }
            const isStandingOnGround = entities.some(function (otherEntity) {
                return (
                    otherEntity.solid &&
                    otherEntity.position &&
                    otherEntity.size &&
                    entity.id !== otherEntity.id &&
                    doEntitiesCollide(checkEntity, otherEntity)
                );
            });
            if(isStandingOnGround) {
                entity.velocity.y = JUMP_VELOCITY;
            }
        }
    }
}

function checkPlayerRotate(entity) {
    if(entity.player) {
        let shouldRotate = false;
        const checkEntity = {
            position: {
                x: entity.position.x,
                y: entity.position.y + 1
            },
            size: entity.size
        }
        for(let i = 0; i < entities.length; i++) {
            if(entity.id !== entities[i].id && doEntitiesCollide(checkEntity, entities[i])) {
                shouldRotate = false;
                break;
            } else {
                shouldRotate = true;
            }
        }
        if(shouldRotate) {
            entity.rotate += JUMP_ROTATE_STEP * dt;
        } else {
            entity.rotate = round(entity.rotate / 90.0) * 90.0;
        }
    }
}

function checkGoal(entity) {
    if(entity.player) {
        for(let i = 0; i < entities.length; i++) {
            if(entity.id !== entities[i].id && entities[i].goal && doEntitiesCollide(entity, entities[i])) {
                nextState = "mainMenu";
                break;
            }
        }
    }
}

function handleSpike(entity) {
    if(entity.player){
        for(let i = 0; i < entities.length; i++) {
            if(entity.id !== entities[i].id && entities[i].enemy && doEntitiesCollide(entity, entities[i])) {
                nextState = "gameover";
                break;
            }
        }
    }
}

function checkGameOverCollision(entity) {
    if(entity.player) {
        const newPos = {
            x: entity.position.x + 1,
            y: entity.position.y
        }
        const tmpEntity = {
            position: newPos,
            size: entity.size
        }
        for(let i = 0; i < entities.length; i++) {
            if(!entities[i].goal && entity.id !== entities[i].id && doEntitiesCollide(tmpEntity, entities[i])) {
                nextState = "gameover";
                break;
            }
        }
    }
}

function checkFallInfinite(entity) {
    if(entity.player) {
        if(player.position.y > SCREEN_SIZE.height * 4) {
            nextState = "gameover";
        }
    }
}