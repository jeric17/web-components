class Component extends HTMLElement {
  constructor() {
    super();

    this.state = {};
    this.shadow = this.attachShadow({ mode: 'open' });
    this.mount = this.mount.bind(this);
  }

  componentRender() {
    this.renderedComponent = this.render();
    if (this.shadow.children.length) {
      [...this.shadow.children].forEach((d, i) => {
        if (d.tagName !== 'STYLE') {
          this.shadow.removeChild(d);
        }
      });
    }

    this.shadow.appendChild(this.renderedComponent);
  }

  setState(newState = {}) {
    this.state = {...this.state, ...newState};
    this.componentRender();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.componentRender();
  }

  mergeProps(props = {}) {
    const defaultProps = {
      onClick: null,
      className: '',
      props: [],
    };

    return {...defaultProps, ...props};
  }

  setStyles(styles) {
    const styleElement = document.createElement('style');
    styleElement.textContent = styles;

    this.shadow.appendChild(styleElement);
  }

  setProps(elem, props) {
    if (props.onClick) {
      elem.addEventListener('click', props.onClick);
    }

    if (props.className) {
      elem.setAttribute('class', props.className);
    }

    if (props.props.length) {
      props.props.forEach(prop => {
        const [key, value] = Object.entries(prop)[0];
        elem.setAttribute(key, value);
        return false;
      });
    }
  }

  mount(...item) {
    const [type, itemProps, childItem] = item;
    const props = this.mergeProps(itemProps);
    const elem = document.createElement(type);

    this.setProps(elem, props);

    const textContentTypes = ['string', 'number'];
    if (textContentTypes.indexOf(typeof childItem) > -1) {
      elem.textContent = childItem;
    } else if (Array.isArray(childItem)) {
      childItem.forEach(ci => elem.appendChild(ci));
    } else {
      elem.appendChild(childItem);
    }
    return elem;
  }
}
