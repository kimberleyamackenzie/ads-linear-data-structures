import DLLStack from '../dll_stack';

  describe('DLL Stack', () => {
      let stack;
    beforeEach(() => {
        stack = new DLLStack();
    });

    it('starts empty', () => {
      expect(stack.count()).toBe(0);
    });

    describe('push', () => {
      it('increases the count by 1', () => {
        stack.push('test');
        expect(stack.count()).toBe(1);

        for (let i = 0; i < 10; i += 1) {
            stack.push('test');
        }
        expect(stack.count()).toBe(11);
      });
    })

    describe('pop', () => {
      it('yields the youngest elements first', () => {
        const elements = ['various', 'interesting', 'strings'];
        elements.forEach(el => stack.push(el));

        for (let i = (elements.length - 1); i > -1; i --){
            const result = stack.pop();
            expect(result).toBe(elements[i]);
        }
      });

      it('decreases count by 1', () => {
        const elements = ['various', 'interesting', 'strings'];
        elements.forEach(el => stack.push(el));

        const start_count = stack.count();
        expect(start_count).toBe(elements.length);

        elements.forEach((_, i) => {
            stack.pop();
          expect(stack.count()).toBe(start_count - i - 1);
        })
      });

      it('yields undefined when run on an empty stack', () => {
        const result = stack.pop();
        expect(result).toBe(undefined);
      });

      it('yields undefined when all elements have been popped', () => {
        const count = 10;
        for (let i = 0; i < count; i += 1) {
            stack.push(i * i);
        }
        for (let i = 0; i < count; i += 1) {
            stack.pop();
        }

        const result = stack.pop();
        expect(result).toBe(undefined);
      });

      it('does not decrease count when popping on empty stack', () => {
        stack.pop();
        expect(stack.count()).toBe(0);

        const count = 10;
        for (let i = 0; i < count; i += 1) {
            stack.push(i * i);
        }
        for (let i = 0; i < count; i += 1) {
            stack.pop();
        }
        expect(stack.count()).toBe(0);

        stack.pop();
        expect(stack.count()).toBe(0);
      });
    });

    describe('forEach', () => {
      // Hope to match the JavaScript Array forEach interface:
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
      // Note that we ignore the thisArg

      // See also Jest function mocks: https://jestjs.io/docs/en/mock-functions.html

      it('runs the callback 0 times on an empty stack', () => {
        const cb = jest.fn();
        stack.forEach(cb);

        expect(cb.mock.calls.length).toBe(0);
      });

      it('provides element, index and the stack itself as cb args', () => {
        const elements = ['various', 'interesting', 'strings'];
        elements.forEach(el => stack.push(el));

        const cb = jest.fn();
        stack.forEach(cb);

        expect(cb.mock.calls.length).toBe(elements.length);

        elements.reverse().forEach((element, i) => {
          expect(cb.mock.calls[i][0]).toBe(element);
          expect(cb.mock.calls[i][1]).toBe(i);
          expect(cb.mock.calls[i][2]).toBe(stack);
        });
      });
    });

    describe('cancel', () => {
      it('reduces the count by one', () => {
        const elements = ['various', 'interesting', 'strings'];
        const tickets = [];
        elements.forEach(el => tickets.push(stack.push(el)));

        expect(stack.count()).toBe(elements.length);

        tickets.forEach((ticket, i) => {
            stack.cancel(ticket);
          expect(stack.count()).toBe(elements.length - i - 1);
        });
      });

      it('skips cancelled elements when popping', () => {
        const elements = ['various', 'cancelled', 'strings'];
        const tickets = [];
        elements.forEach(el => tickets.push(stack.push(el)));

        stack.cancel(tickets[1]);
        expect(stack.count()).toBe(2);

        expect(stack.pop()).toBe('strings');
        expect(stack.count()).toBe(1);

        expect(stack.pop()).toBe('various');
        expect(stack.count()).toBe(0);
      });

      it('skips cancelled elements during iteration', () => {
        const elements = ['various', 'cancelled', 'strings'];
        const tickets = [];
        elements.forEach(el => tickets.push(stack.push(el)));

        stack.cancel(tickets[1]);
        const cb = jest.fn();
        stack.forEach(cb);

        expect(cb.mock.calls.length).toBe(elements.length - 1);
        expect(cb.mock.calls[0][0]).toBe('strings');
        expect(cb.mock.calls[1][0]).toBe('various');
      });

      it('does nothing for an invalid ticket', () => {
        const elements = ['various', 'interesting', 'strings'];
        elements.forEach(el => stack.push(el));

        expect(stack.count()).toBe(elements.length);
        stack.cancel('bogus');
        expect(stack.count()).toBe(elements.length);
      });

      it('does nothing when cancelling an element that has already been popped', () => {
        const elements = ['various', 'cancelled', 'strings'];
        const tickets = [];
        elements.forEach(el => tickets.push(stack.push(el)));

        stack.pop();
        stack.pop();

        expect(stack.count()).toBe(1);
        stack.cancel(tickets[1]);
        expect(stack.count()).toBe(1);
      });
    })
  });
