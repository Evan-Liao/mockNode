export default {
    name: 'mock-node',

    EVENTS: {
        HOVER_CHANGE: 'on-hover-change',
        ACTIVE_CHANGE: 'on-active-change'
    },

    data() {
        return {
            hover: false,
            active: false
        }
    },

    props: {
        tag: {
            type: String,
            default: 'div'
        },
        normalAttrs: {
            type: Object,
            default: () => ({})
        },
        hoverAttrs: {
            type: Object,
            default: () => ({})
        },
        activeAttrs: {
            type: Object,
            default: () => ({})
        },

        forceHover: {
            type: Boolean,
            default: false
        },

        forceActive: {
            type: Boolean,
            default: false
        },

        normalClass: {
            type: [String, Object, Array],
            default: ''
        },
        normalStyle: {
            type: [String, Object, Array],
            default: ''
        },
        hoverClass: {
            type: [String, Object, Array],
            default: ''
        },
        hoverStyle: {
            type: [String, Object, Array],
            default: ''
        },
        activeClass: {
            type: [String, Object, Array],
            default: ''
        },
        activeStyle: {
            type: [String, Object, Array],
            default: ''
        },
    },

    computed: {
        class() {
            return [
                this.normalClass,
                (this.forcehover || this.hover) ? this.hoverClass : '',
                (this.forceactive || this.active) ? this.activeClass : ''
            ]
        },
        style() {
            let normalStyle = this.normalStyle;
            let hoverStyle = (this.forcehover || this.hover) ? this.hoverStyle : [];
            let activeStyle = (this.forceactive || this.active) ? this.activeStyle : [];

            if (!Array.isArray(normalStyle)) {
                hoverStyle = Array.of(normalStyle)
            }

            if (!Array.isArray(hoverStyle)) {
                hoverStyle = Array.of(hoverStyle);
            }

            if (!Array.isArray(activeStyle)) {
                activeStyle = Array.of(activeStyle);
            }

            return [
                ...normalStyle,
                ...hoverStyle,
                ...activeStyle
            ]
        },
        attrs() {
            return Object.assign(
                {},
                this.normalAttrs,
                (this.forceHover || this.hover) && this.hoverAttrs,
                (this.forceActive || this.active)  && this.activeAttrs
            );
        }
    },

    watch: {
        hover: {
            handler(val) {
                this.$emit(this.$options.EVENTS.HOVER_CHANGE);
                // to do animation

                if (val) {
                }else {

                }
            },
            immediate: true
        },
        active: {
            handler(val) {
                if (val) {
                    this.$emit(this.$options.EVENTS.ACTIVE_CHANGE);
                }
            },
            immediate: true
        }
    },

    render(createElement) {
        return createElement(this.tag, {
            class: this.class,
            style: this.style,
            attrs: this.attrs,
            on: {
                mousein: () => {
                    this.hover = true;
                },
                mouseout: () => {
                    this.hover = false;
                },
                mousedown: () => {
                    this.active = true;
                },
                mouseup: () => {
                    this.active = false;
                }
            },
        }, this.$options._renderChildren)
    },
}