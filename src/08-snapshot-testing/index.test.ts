import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  test('should generate linked list from values 1', () => {
    const elTestArray = [1, 2, 3, 4, 5];

    const resFunc = generateLinkedList(elTestArray);

    const expValue = {
      value: 1,
      next: {
        value: 2,
        next: {
          value: 3,
          next: {
            value: 4,
            next: {
              value: 5,
              next: {
                value: null,
                next: null,
              },
            },
          },
        },
      },
    };

    expect(resFunc).toStrictEqual(expValue);
  });

  test('should generate linked list from values 2', () => {
    const elTestArray = ['1', '2', '3', '4', '5'];

    const resFunc = generateLinkedList(elTestArray);

    expect(resFunc).toMatchSnapshot();
  });
});
