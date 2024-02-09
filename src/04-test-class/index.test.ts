import {
  getBankAccount,
  InsufficientFundsError,
  TransferFailedError,
  SynchronizationFailedError,
} from '.';

describe('BankAccount', () => {
  const bankAccount = getBankAccount(123);

  test('should create account with initial balance', () => {
    expect(bankAccount.getBalance()).toBe(123);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const methCallResult = () => bankAccount.withdraw(124);

    expect(methCallResult).toThrowError(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const methCallResult = () => bankAccount.transfer(124, getBankAccount(555));

    expect(methCallResult).toThrowError(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    const methCallResult = () => bankAccount.transfer(124, bankAccount);

    expect(methCallResult).toThrowError(TransferFailedError);
  });

  test('should deposit money', () => {
    bankAccount.deposit(100);

    expect(bankAccount.getBalance()).toBe(223);
  });

  test('should withdraw money', () => {
    bankAccount.withdraw(100);

    expect(bankAccount.getBalance()).toBe(123);
  });

  test('should transfer money', () => {
    const bankAccount2 = getBankAccount(10);
    bankAccount.transfer(10, bankAccount2);

    expect(bankAccount2.getBalance()).toBe(20);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const methCallResult = await bankAccount.fetchBalance();

    if (methCallResult) {
      expect(Number.isFinite(methCallResult)).toBe(true);
    }
  });

  test('should set new balance if fetchBalance returned number', async () => {
    jest.spyOn(bankAccount, 'fetchBalance').mockResolvedValueOnce(1);
    await bankAccount.synchronizeBalance();

    expect(bankAccount.getBalance()).toBe(1);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    jest.spyOn(bankAccount, 'fetchBalance').mockResolvedValueOnce(null);
    const methCallResult = () => bankAccount.synchronizeBalance();

    await expect(methCallResult).rejects.toThrow(SynchronizationFailedError);
  });
});
