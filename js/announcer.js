"use strict";
(function(orbium) {
    orbium.Announcer = class Announcer extends orbium.Tile {
        constructor(count, xnr, ynr) {
            super(["announcer0"], count, xnr, ynr);
        }

        announceNextColor(nextColor) {
            super.setImage(0, "announcer"+nextColor);
            super.invalidate();
        }
    }
})(typeof window == "object" ? window.orbium = window.orbium || {} : orbium);
