"use strict";
(function(orbium) {
    orbium.Bar = class Bar extends orbium.Sprite {
        constructor(nr) {
            var images = ["bar"+nr];
            var xpos = orbium.Tile.size*nr;
            var ypos = 0;

            super(images, xpos, ypos, orbium.Tile.size, orbium.Bar.height, 3);

            this.nr = nr;
            this.passed = false;
        }

        makeSink() {
            var n = this.nr+8;
            super.setImage(0, "bar"+n);
            super.invalidate();
        }

        unSink() {
            super.setImage(0, "bar"+this.nr);
            super.invalidate();
        }

        makePassed() {
            if (!this.passed) {
                this.passed = true;
                super.setImage(1, "timer1");
                super.invalidate();
            }
        }

        clearPassed() {
            this.passed = false;
            super.setImage(1, null);
            super.invalidate();
        }
    };
})(typeof window == "object" ? window.orbium = window.orbium || {} : orbium);
