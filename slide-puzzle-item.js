const style = `
  .root {
    align-items: center;
    background-color: #efefef;
    cursor: pointer;
    display: flex;
    height: 70px;
    justify-content: center;
    margin: 8px;
    width: 70px;
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
    const itemIndex = Number(this.getAttribute('itemindex')) || '';
    return this.mount('span', {
      className: 'root'
    }, itemIndex);
  }
}

customElements.define('slide-puzzle-item', SlidePuzzleItem);
