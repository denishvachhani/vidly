const lib = require('../lib');
const db = require('../db');
const mail = require('../mail');

describe('absolute', () => {
    it('should return a positive number if input is positive', () => {
        const result = lib.absolute(1);
        expect(result).toBe(1);
    });
    
    it('should return a positive number if input is negative', () => {
        const result = lib.absolute(-1);
        expect(result).toBe(1);
    });
    
    it('should return a 0 if input is 0', () => {
        const result = lib.absolute(0);
        expect(result).toBe(0);
    });
})

describe('greet', () => {
    it('should return a greeting message', () => {
        const result = lib.greet('Mosh');
        expect(result).toMatch(/Mosh/);
        expect(result).toContain('Mosh');
    });
})

describe('getCurrencies', () => {
    it('should return a supported currencies', () => {
        const result = lib.getCurrencies();

        // Too general
        expect(result).toBeDefined();
        expect(result).not.toBeNull();

        // Too specific
        expect(result[0]).toBe('USD');
        
        // Proper way
        expect(result).toEqual(expect.arrayContaining(['EUR', 'USD', 'AUD']));
    });
})

describe('getProduct', () => {
    it('should return product with given id', () => {
        const result = lib.getProduct(1);

        // result should have exact same property
        expect(result).toEqual({ id: 1, price: 10 });

        // if result have more propety then it match atlease property mention
        expect(result).toMatchObject({ id: 1, price: 10 });

        expect(result).toHaveProperty('id', 1);
    });
})

describe('registerUser', () => {
    it('should throw if user is falsy', () => {
        const args = [ null, undefined, NaN, '', 0, false ];
        args.forEach( a => {
            expect(() => { lib.registerUser(a) }).toThrow();
        } )
    });

    it('should return a user object if valid username is passed', () => {
        const result = lib.registerUser('Denish');
        expect(result).toMatchObject({username: 'Denish'});
        expect(result.id).toBeGreaterThan(0);
    });
})

describe('applyDiscount', () => {
    it('should apply 10% discount if customer has more than 10 points', () => {

        // mock function
        db.getCustomerSync = function(customerId) {
            return { id: customerId, points: 20}
        }

        const order = { customerId: 1, totalPrice: 10 };
        lib.applyDiscount(order);
        expect(order.totalPrice).toBe(9)
    });
})

describe('notifyCustomer', () => {
    it('should send an email to customer', () => {

        // const mockFunction = jest.fn();
        // mockFunction.mockRetrunValue(1);
        // mockFunction.mockResolvedValue(1);
        // mockFunction.mockRejectedValue(new Error('..'));
        // const result = await mockFunction()

        // mock function
        db.getCustomerSync = jest.fn().mockReturnValue({ email: 'a' })
        mail.send = jest.fn()

        lib.notifyCustomer({ customerId: 1 });

        expect(mail.send).toHaveBeenCalled();
        expect(mail.send.mock.calls[0][0]).toBe('a');
    });
})
