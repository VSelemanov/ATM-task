// 100, 500, 1000, 5000

class ATM {
  constructor(cashArray) {
    this._cashArray = cashArray;
  }

  getCashSet() {
    return new Set(cashArray.sort((a, b) => b - a));
  }

  getTotalCash() {
    return cashArray.reduce((acc, value) => (acc += value), 0);
  }

  updateCashArray(cashToReturn) {
    Object.keys(cashToReturn).forEach(key => {
      for (let i = 1; i <= cashToReturn[key]; i++) {
        const indexForDel = this._cashArray.indexOf(key);
        if (indexForDel >= 0) {
          this._cashArray = this._cashArray.splice(indexForDel, 1);
        } else {
          throw new Error(error);
          // exception + logging
        }
      }
    });
  }

  getCash(cashValue) {
    const error = "Невозможно выдать введенную сумму";
    const cashSet = this.getCashSet();
    const totalCash = this.getTotalCash();

    let userCash = cashValue;

    if (cashValue > totalCash) {
      // exception + logging
      throw new Error(error);
    }

    const cashToReturn = {};

    cashSet.forEach(nom => {
      const nomCount = Math.floor(userCash / nom);
      const cashFilteredByNom = this._cashArray.filter(v => v === nom);
      if (nomCount > cashFilteredByNom.length) {
        cashToReturn[nom] = cashFilteredByNom.length;
      } else {
        cashToReturn[nom] = nomCount;
      }

      userCash -= cashToReturn[nom] * nom;
    });

    let sum = 0;

    Object.keys(cashToReturn).forEach(nomValue => {
      sum += cashToReturn[nomValue] * nomValue;
    });

    if (sum != cashValue) {
      // exception + logging
      throw new Error(error);
    }

    this.updateCashArray(cashToReturn);

    return cashToReturn;
  }
}
