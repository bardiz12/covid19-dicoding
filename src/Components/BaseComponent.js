class BaseComponent extends HTMLElement{
    attributeChangedCallback(name, oldValue, newValue) {
        this[`_${name}`] = newValue;
        this.render();
    }
}

export default BaseComponent