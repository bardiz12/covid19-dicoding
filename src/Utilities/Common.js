const {snakeCase} = require("snake-case")
module.exports = {
    loadComponents : (...components) => {
        for (let i = 0; i < components.length; i++) {
            const component = components[i];
            const name = snakeCase(component.name,{
                delimiter:"-"
            })
            customElements.define(name , component)
        }
        return true;
    },
    loadComponent : (name, component) => {
        return customElements.define(name, component)
    },
    beautifyNumber(number) {
        var parts = number.toString().split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return parts.join(".");
    }
}