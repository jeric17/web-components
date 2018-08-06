const slidePuzzleStyle = `
  .root__row {
    display: flex;
  }
  .root {
    margin: 0 0 80px;
  }
`;

class SlidePuzzle extends Component {
  constructor() {
    super();
    this.onClick = this.onClick.bind(this);

    this.state = this.getGridState(Number(this.getAttribute('size')));

    this.componentRender();
    this.setStyles(slidePuzzleStyle);
  }

  getGridState(size) {
    const total = size ** 2;
    const shuffled = [];
    const arrayData = [];
    const temp = [];
    const matrix = [];

    for(let i = 0; i < total; i += 1) {
      arrayData.push(i);
      temp.push(i);
    }

    arrayData.forEach((item) => {
      const random = Math.floor(Math.random() * temp.length);
      const spliced = temp.splice(random, 1);
      shuffled.push(spliced[0]);
    });

    let matrixIndex = -1;
    let zeroCoords = null;
    shuffled.forEach((item, index) => {
      const target = matrix[matrixIndex];
      if (!target || target.length === size) {
        matrixIndex += 1;
        matrix[matrixIndex] = [item];
      } else {
        matrix[matrixIndex].push(item);
      }

      if (item === 0) {
        zeroCoords = {
          y: matrixIndex,
          x: matrix[matrixIndex].length - 1,
        };
      }
    });
    return {
      grid: matrix,
      zeroCoords,
      // grid: [[1,2,3], [4,5,0], [7, 8, 6]],
      // zeroCoords: {x: 2, y: 1},
      shuffled,
    };
  }

  isFinished() {
    let isOk = true;
    const { grid } = this.state;
    const flatten = grid.reduce((c, n) => c.concat(n), []);

    let index = 1;
    while(isOk && index < flatten.length) {
      if (flatten[index] === 0 && index === flatten.length - 1) {
        isOk = true;
        break;
      }
      if (flatten[index] > flatten[index - 1]) {
        isOk = true;
      } else {
        isOk = false;
      }
      index += 1;
    }

    if (isOk) {
      window.alert('Success!');
    }
  }

  setZeroCoords(x, y) {
    const zeroCoords = {
      x,
      y,
    };
    this.setState({ zeroCoords });
  }

  isValid({matrixIndex, rowIndex}) {
    const { x, y } = this.state.zeroCoords;

    if (rowIndex === x) {
      if (y - 1 === matrixIndex || y + 1 === matrixIndex) {
        return true;
      }
      return false;
    }

    if (matrixIndex === y) {
      if (x - 1 === rowIndex || x + 1 === rowIndex) {
        return true;
      }
      return false;
    }

    return false;
  }

  onClick(gridItem, evt) {
    const {x, y} = this.state.zeroCoords;

    const valid = this.isValid(gridItem);

    if (!valid) {
      return false;
    }

    const grid = [...this.state.grid];

    grid[y][x] = gridItem.gridItem;
    grid[gridItem.matrixIndex][gridItem.rowIndex] = 0;

    this.setState({
      zeroCoords: {
        x: gridItem.rowIndex,
        y: gridItem.matrixIndex,
      },
      grid,
    });
    this.isFinished();
    return false;
  }

  render() {
    return this.mount(
      'div', {
        className: 'root',
      },
      this.state.grid.map((matrix, matrixIndex) => this.mount(
        'div',
        { className: 'root__row'},
        matrix.map((gridItem, rowIndex) => this.mount(
          'slide-puzzle-item',
          {
            onClick: this.onClick.bind(this, {
              gridItem,
              matrixIndex,
              rowIndex,
            }),
            props: [
              { itemIndex: gridItem },
              { matrixIndex },
              { rowIndex }
            ],
          },
          ''
        ))
      )),
    );
  }
}

customElements.define('slide-puzzle', SlidePuzzle);
