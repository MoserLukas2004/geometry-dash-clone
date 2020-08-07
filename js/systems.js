/**
 * Systems are functions that take an entity object.
 * Each system does different stuff for entities that have
 * different components (properties).
 * For example, the `moveEntity` system moves all entities
 * that have a `position` and `velocity` component/property.
 */

// Moves all entities (Player, etc.) that,
// have a position and a velocity.
function moveEntity(entity) {
    if (entity.position && entity.velocity && entity.solid) {
        const velRem = {
            x: entity.velocity.x % 1.0,
            y: entity.velocity.y % 1.0,
        };
        const velSign = {
            x: Math.sign(entity.velocity.x),
            y: Math.sign(entity.velocity.y),
        };

        const doesEntityCollide = targetEntity =>
            entities.some(
                otherEntity =>
                    otherEntity.solid &&
                    entity.id !== otherEntity.id &&
                    doEntitiesCollide(targetEntity, otherEntity)
            );

        let inCollision = false;
        for (const axis of ["x", "y"]) {
            if (inCollision) break;
            for (
                let i = 1;
                i <= Math.floor(Math.abs(entity.velocity[axis]));
                i++
            ) {
                const newPos = {
                    x: entity.position.x,
                    y: entity.position.y,
                };
                newPos[axis] += velSign[axis];
                const tmpEntity = {
                    position: newPos,
                    size: entity.size,
                };
                if (doesEntityCollide(tmpEntity)) {
                    inCollision = true;
                    break;
                } else {
                    entity.position = newPos;
                }
            }
            if (inCollision) break;
            if (velRem[axis] > 0.0 || velRem[axis] < 0.0) {
                const newPos = {
                    x: entity.position.x,
                    y: entity.position.y,
                };
                newPos[axis] += velRem[axis];
                const tmpEntity = {
                    position: newPos,
                    size: entity.size,
                };
                if (doesEntityCollide(tmpEntity)) {
                    inCollision = true;
                    break;
                } else {
                    entity.position = newPos;
                }
            }
        }

        if (inCollision) {
            entity.velocity = {
                x: 0.0,
                y: 0.0,
            };
        }
    } else if (entity.position && entity.velocity) {
        entity.position.x += entity.velocity.x;
        entity.position.y += entity.velocity.y;
    }
}

// Changes velocity on all entities, that
// have gravity and velocity.
// Simulates gravity.
function applyGravity(entity) {
    if (entity.gravity && entity.velocity) {
        entity.velocity.y += entity.gravity;
    }
}

// Player jumps when the button "j" is pressed
function checkJump(entity) {
    if (entity.canJump && entity.velocity) {
        if (keyIsDown(74)) {
            // 74 ... j
            entity.velocity.y -= 4;
        }
    }
}