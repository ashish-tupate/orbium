"use strict";
(function(orbium) {
    orbium.Tile = class Tile extends orbium.Sprite {
        constructor(images, count, xnr, ynr) {
            var xpos = orbium.Tile.size*xnr;
            var ypos = orbium.Tile.size*ynr+orbium.Bar.height;

            super(images, xpos, ypos, orbium.Tile.size, orbium.Tile.size, 3);

            this.count = count;
            this.xnr = xnr;
            this.ynr = ynr;

            this.inducesSink = false;
            this.inducesPaths = [false, false, false, false];

            this.hasPaths = [false, false, false, false];
        }

        // TODO For compability
        construct(images, count, xnr, ynr) {
            this.count = count;
            this.xnr = xnr;
            this.ynr = ynr;

            this.inducesSink = false;
            this.inducesPaths = [false, false, false, false];

            this.hasPaths = [false, false, false, false];

            var xpos = orbium.Tile.size*this.xnr;
            var ypos = orbium.Tile.size*this.ynr+orbium.Bar.height;

            orbium.Sprite.prototype.construct.call(this, images, xpos, ypos,
                orbium.Tile.size, orbium.Tile.size, 3);
        }

        setBase(baseName) {
            if (baseName !== undefined) {
                // Should tile have top path?
                var idx = this.count-orbium.Machine.horizTiles;
                this.hasPaths[0] = !!(idx >= 0 &&
                    idx < orbium.Machine.horizTiles * orbium.Machine.vertTiles &&
                    orbium.machine.tiles[idx].inducesPaths[0] &&
                    this.variant !== 1 &&
                    orbium.machine.tiles[idx].variant !== 1);

                // Should tile have right path?
                idx = this.count+1;
                this.hasPaths[1] = !!(idx >= 0 &&
                    idx < orbium.Machine.horizTiles * orbium.Machine.vertTiles &&
                    (this.count + 1) % orbium.Machine.horizTiles !== 0 &&
                    orbium.machine.tiles[idx].inducesPaths[1] &&
                    this.variant !== 0 &&
                    orbium.machine.tiles[idx].variant !== 0);

                // Should tile have bottom path?
                idx = this.count+orbium.Machine.horizTiles;
                this.hasPaths[2] = !!(idx >= 0 &&
                    idx < orbium.Machine.horizTiles * orbium.Machine.vertTiles &&
                    orbium.machine.tiles[idx].inducesPaths[2] &&
                    this.variant !== 1 &&
                    orbium.machine.tiles[idx].variant !== 1);

                // Should tile have left path?
                idx = this.count-1;
                this.hasPaths[3] = !!(idx >= 0 &&
                    idx < orbium.Machine.horizTiles * orbium.Machine.vertTiles &&
                    this.count % orbium.Machine.horizTiles !== 0 &&
                    orbium.machine.tiles[idx].inducesPaths[3] &&
                    this.variant !== 0 &&
                    orbium.machine.tiles[idx].variant !== 0);

                // First row rotators
                if (this.count < orbium.Machine.horizTiles &&
                    this instanceof orbium.Rotator) {
                    this.hasPaths[0] = true;
                }

                var frame = 0;

                if (this.hasPaths[0] && !this.hasPaths[1] &&
                    !this.hasPaths[2] && !this.hasPaths[3]) {
                    frame = 0;
                } else if (!this.hasPaths[0] && this.hasPaths[1] &&
                    !this.hasPaths[2] && !this.hasPaths[3]) {
                    frame = 1;
                } else if (!this.hasPaths[0] && !this.hasPaths[1] &&
                    this.hasPaths[2] && !this.hasPaths[3]) {
                    frame = 2;
                } else if (!this.hasPaths[0] && !this.hasPaths[1] &&
                    !this.hasPaths[2] && this.hasPaths[3]) {
                    frame = 3;
                } else if (this.hasPaths[0] && this.hasPaths[1] &&
                    !this.hasPaths[2] && !this.hasPaths[3]) {
                    frame = 4;
                } else if (!this.hasPaths[0] && this.hasPaths[1] &&
                    this.hasPaths[2] && !this.hasPaths[3]) {
                    frame = 5;
                } else if (!this.hasPaths[0] && !this.hasPaths[1] &&
                    this.hasPaths[2] && this.hasPaths[3]) {
                    frame = 6;
                } else if (this.hasPaths[0] && !this.hasPaths[1] &&
                    !this.hasPaths[2] && this.hasPaths[3]) {
                    frame = 7;
                } else if (this.hasPaths[0] && this.hasPaths[1] &&
                    this.hasPaths[2] && !this.hasPaths[3]) {
                    frame = 8;
                } else if (!this.hasPaths[0] && this.hasPaths[1] &&
                    this.hasPaths[2] && this.hasPaths[3]) {
                    frame = 9;
                } else if (this.hasPaths[0] && !this.hasPaths[1] &&
                    this.hasPaths[2] && this.hasPaths[3]) {
                    frame = 10;
                } else if (this.hasPaths[0] && this.hasPaths[1] &&
                    !this.hasPaths[2] && this.hasPaths[3]) {
                    frame = 11;
                } else if (this.hasPaths[0] && !this.hasPaths[1] &&
                    this.hasPaths[2] && !this.hasPaths[3]) {
                    frame = 12;
                } else if (!this.hasPaths[0] && this.hasPaths[1] &&
                    !this.hasPaths[2] && this.hasPaths[3]) {
                    frame = 13;
                } else if (this.hasPaths[0] && this.hasPaths[1] &&
                    this.hasPaths[2] && this.hasPaths[3]) {
                    frame = 14;
                }

                if (this.broken) {
                    frame += 15;
                }

                super.setImage(0, baseName+frame);

                super.invalidate();
            }
        }

        influence(marble) {
            // Default implementation does nothing
        }
    }
})(typeof window == "object" ? window.orbium = window.orbium || {} : orbium);
