const style = `
  .root {
    background-color: #efefef;
    cursor: pointer;
    display: flex;
    margin: 8px;
    padding: 1em;
  }
`;

class SlidePuzzleItem extends Component {
  static get observedAttributes() {
    return ['itemindex', 'matrixindex', 'rowindex'];
  };

  constructor() {
    super();

    this.componentRender();
    this.setStyles(style);
  }

  render() {
    const itemIndex = this.getAttribute('itemindex') || '';
    return this.mount('span', {
      className: 'root'
    }, itemIndex);
  }
}

customElements.define('slide-puzzle-item', SlidePuzzleItem);
