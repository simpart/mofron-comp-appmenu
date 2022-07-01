const Image = require('mofron-comp-image');
const Frame = require('mofron-comp-frame');
const FadePack = require('mofron-effect-fadepack');
const ClkFocus = require('mofron-event-clkfocus');
const comutl = mofron.util.common;
const ConfArg = mofron.class.ConfArg;

/**
 * @file mofron-comp-appmenu/index.js
 * @brief appmenu component for mofron
 * @license MIT
 */
module.exports = class extends mofron.class.Component {
    /**
     * initialize component
     * 
     * @param (mixed) 
     *                key-value: component config
     * @short image, offset
     * @type private
     */
    constructor (p1) {
        try {
            super();
            this.modname("AppMenu");
	    this.shortForm("image", "offset");
            
	    /* init config */
            this.confmng().add("offset", { type: "size", init: "0.5rem" });

	    if (0 < arguments.length) {
                this.config(p1);
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * initialize dom contents
     * 
     * @type private
     */
    initDomConts () {
        try {
            super.initDomConts();
	    this.child([this.image(), this.frame()]);
            
	    this.childDom(this.frame().childDom());

        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }

    focusEvent (p1,p2,p3) {
        try {
	    p3.frame().visible(p2);
	} catch (e) {
            console.error(e.stack);
            throw e;
	}
    }

    image (prm, cnf) {
        try {
	    if ('string' === typeof prm) {
	        this.image().src(prm);
		this.image().config(cnf);
                return;
            } else if (true === comutl.isinc(prm, "Image")) {
	        let evt_prm = new ConfArg(this.focusEvent,this);
                prm.event(new ClkFocus(evt_prm));
	    }
            return this.innerComp("image", prm, Image);
        } catch (e) {
            console.error(e.stack);
            throw e;
	}
    }

    frame (prm) {
        try {
	    if (true === comutl.isinc(prm,"Frame")) {
	        prm.config({
		    effect: new FadePack(300),
		    shadow: '0.1rem',
		    baseColor: 'white',
		    size: new ConfArg('3rem', '4rem'),
                    style: {
                        'position': 'fixed',
		        'top':      this.offset(),
		        'right':    '0.1rem',
			'overflow': 'scroll'
                    },
		    visible: false
		});
		
	    }
            return this.innerComp('frame', prm, Frame);
	} catch (e) {
            console.error(e.stack);
            throw e;
	}
    }

    offset (prm) {
        try {
            return this.confmng("offset", prm);
	} catch (e) {
            console.error(e.stack);
            throw e;
	}
    }
}
/* end of file */
