/*  -------------------------------------------------------------
    Dæghrefn web site
    - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    Project:        Nasqueron
    Author:         Sébastien Santoro aka Dereckson
    Dependencies:   jquery motion-ui
    Filename:       app.js
    Licence:        CC-BY 4.0, MIT, BSD-2-Clause (multi-licensing)
    -------------------------------------------------------------    */

/*  -------------------------------------------------------------
     Table of contents
    - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

     :: Animations
     :: Easter egg
     :: Code to run when document is ready
 */

/*  -------------------------------------------------------------
    Animations
    - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -    */

var animations = {

    /**
     * Animates the elements to make a dramatic entrance.
     */
    enter: function () {
        Foundation.Motion.animateIn($('header'), 'hinge-in-from-top');

        var actions = $('#actions');
        actions.find('>.row:odd').each(function () {
            Foundation.Motion.animateIn($(this), 'slide-in-right slow');
        });
        actions.find('>.row:even').each(function () {
            Foundation.Motion.animateIn($(this), 'slide-in-left slow');
        });

        Foundation.Motion.animateIn($('footer'), 'hinge-in-from-bottom');

        animations.state = 'in';
    },

    /**
     * Animates the elements to leave the scene dramatically.
     *
     * Used in easter egg.
     */
    leave: function () {
        Foundation.Motion.animateOut($('header'), 'hinge-out-from-top slow');
        Foundation.Motion.animateOut($('footer'), 'hinge-out-from-bottom slow');

        var actions = $('#actions');
        actions.find('>.row:odd').each(function () {
            Foundation.Motion.animateOut($(this), 'slide-out-left slow');
        });
        actions.find('>.row:even').each(function () {
            Foundation.Motion.animateOut($(this), 'slide-out-right slow');
        });

        animations.state = 'out';
    },

    /**
     * Switches between in and out animation state.
     *
     * @throws StateException when state is unexpected
     */
    switch: function () {
        switch (animations.state) {
            case 'unanimated':
                console.warn(
                    "Can't switch animation state: we're still unanimated."
                );
                return;

            case 'in':
                animations.leave();
                return;

            case 'out':
                animations.enter();
                return;

            default:
                throw new animations.StateException(
                    'Unexpected state: unanimated, in or out was expected.'
                );
        }
    },

    /**
     * Exception to throw when state contains an unexpected value.
     *
     * @param message
     * @constructor
     */
    StateException: function (message) {
        this.message = message;
        this.name = 'StateException';
    },

    /**
     * Allows to know the current state of the elements.
     *
     * State will be one of these values:
     *   - unanimated: JS animations not yet played
     *   - in: enter() has been played, the elements are in the page
     *   - out: leave() has been played, the elements left the page
     *
     * @property string
     */
    state: 'unanimated'

};

/*  -------------------------------------------------------------
    Easter egg

    Based on https://github.com/snaptortoise/konami-js
    Author:  George Mandis
    License: MIT
    Version: 1.4.5 (3/2/2016)
    - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -    */

var EasterEgg = function (callback) {
    var easterEgg = {

        addEvent: function (obj, type, fn, ref_obj) {
            if (obj.addEventListener)
                obj.addEventListener(type, fn, false);
            else if (obj.attachEvent) {
                // IE
                obj['e' + type + fn] = fn;
                obj[type + fn] = function () {
                    obj['e' + type + fn](window.event, ref_obj);
                };
                obj.attachEvent('on' + type, obj[type + fn]);
            }
        },

        input: '',

        pattern: '38384040373937396665',

        load: function (link) {
            this.addEvent(document, 'keydown', function (e, ref_obj) {
                if (ref_obj) {
                    easterEgg = ref_obj; // IE
                }
                easterEgg.input += e ? e.keyCode : event.keyCode;
                if (easterEgg.input.length > easterEgg.pattern.length) {
                    easterEgg.input = easterEgg.input.substr(
                        easterEgg.input.length - easterEgg.pattern.length
                    );
                }
                if (easterEgg.input == easterEgg.pattern) {
                    easterEgg.code(link);
                    easterEgg.input = '';
                    e.preventDefault();
                    return false;
                }
            }, this);
            this.touchscreen.load(link);
        },

        code: function (link) {
            window.location = link
        },

        touchscreen: {

            start_x: 0,
            start_y: 0,
            stop_x: 0,
            stop_y: 0,
            tap: false,
            capture: false,
            orig_keys: '',
            keys: [
                'UP', 'UP',
                'DOWN', 'DOWN',
                'LEFT', 'RIGHT',
                'LEFT', 'RIGHT',
                'TAP', 'TAP'
            ],

            code: function (link) {
                easterEgg.code(link);
            },

            load: function (link) {
                this.orig_keys = this.keys;

                easterEgg.addEvent(document, 'touchmove', function (e) {
                    if (e.touches.length == 1 && easterEgg.touchscreen.capture == true) {
                        var touch = e.touches[0];
                        easterEgg.touchscreen.stop_x = touch.pageX;
                        easterEgg.touchscreen.stop_y = touch.pageY;
                        easterEgg.touchscreen.tap = false;
                        easterEgg.touchscreen.capture = false;
                        easterEgg.touchscreen.check_direction();
                    }
                });

                easterEgg.addEvent(document, 'touchend', function (evt) {
                    if (easterEgg.touchscreen.tap == true) {
                        easterEgg.touchscreen.check_direction(link);
                    }
                }, false);

                easterEgg.addEvent(document, 'touchstart', function (evt) {
                    easterEgg.touchscreen.start_x = evt.changedTouches[0].pageX;
                    easterEgg.touchscreen.start_y = evt.changedTouches[0].pageY;
                    easterEgg.touchscreen.tap = true;
                    easterEgg.touchscreen.capture = true;
                });
            },

            check_direction: function (link) {
                var x_magnitude = Math.abs(this.start_x - this.stop_x);
                var y_magnitude = Math.abs(this.start_y - this.stop_y);
                var x = ((this.start_x - this.stop_x) < 0) ? 'RIGHT' : 'LEFT';
                var y = ((this.start_y - this.stop_y) < 0) ? 'DOWN' : 'UP';
                var result = (x_magnitude > y_magnitude) ? x : y;
                result = (this.tap == true) ? 'TAP' : result;

                if (result == this.keys[0]) {
                    this.keys = this.keys.slice(1, this.keys.length);
                }

                if (this.keys.length == 0) {
                    this.keys = this.orig_keys;
                    this.code(link);
                }
            }

        }

    };

    typeof callback === 'string' && easterEgg.load(callback);

    if (typeof callback === 'function') {
        easterEgg.code = callback;
        easterEgg.load();
    }

    return easterEgg;
};

/*  -------------------------------------------------------------
    Code to run when document is ready
    - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -    */

$( document ).ready(function() {
    $(document).foundation();

    animations.enter();

    new EasterEgg(function() {
        animations.switch();
    });
});
