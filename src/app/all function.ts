"use strict";
export {
  transferBaseWGB_3,
  calculationWGB_3,
  toCP1,
  toCP2,
  toSVA,
  toVFix,
  toVDouble,
  toVSimpl,
  frVFix,
  frVSimpl,
  frVDouble,
};

// cours 1 : codage decodage

function codag(num: number, base: number) {
  if (base == 10) {
    return num.toString();
  }

  if (base <= 1 || base > 16) {
    throw new Error("The base is not in the field of 2 16");
  }
  if (num < 0) {
    throw new Error("The number must be positive");
  }
  let resultE = [];
  let resultF = [];
  let i = 0;
  let numE = Math.floor(num);
  let numF = num - numE;
  while (numE != 0) {
    resultE.push(numE % base);
    numE = Math.floor(numE / base);
  }
  while (numF * base != 0 && i < 4) {
    resultF.push(Math.floor(numF * base));
    numF = numF * base - Math.floor(numF * base);
    i++;
  }
  resultE = resultE.reverse();
  let result: (number | string)[] = [];
  if (resultF.length != 0) {
    result = [...resultE, ".", ...resultF];
  } else {
    result = [...resultE];
  }
  result = result.map((e) => {
    switch (e) {
      case 10:
        return "A";
      case 11:
        return "B";
      case 12:
        return "C";
      case 13:
        return "D";
      case 14:
        return "E";
      case 15:
        return "F";
      default:
        return e;
    }
  });
  return result.join("");
}

function decodage(num: string, base: number) {
  if (num.at(0) == "+") {
    num = [...num].splice(1).join("");
  }
  let chek = num.match(/[.]/g)?.length || 0;
  if (chek > 1) {
    throw new Error("number not correct");
  }
  if (num[0] == "-") {
    throw new Error("The number must be positive");
  }
  if (base <= 0 || base > 16) {
    throw new Error("The base is not in the field of 1 16");
  }
  let finale: number = 0;
  let numE: string[] = [];
  let numF: string[] = [];
  let rendernum: any = [...num].map((e, i) => {
    let trc: number;
    switch (e) {
      case "A":
        trc = 10;
        break;
      case "B":
        trc = 11;
        break;
      case "C":
        trc = 12;
        break;
      case "D":
        trc = 13;
        break;
      case "E":
        trc = 14;
        break;
      case "F":
        trc = 15;
        break;
      case ".":
        return ".";
      default:
        trc = parseInt(e);
    }
    if (isNaN(trc)) {
      throw new Error("number not correct");
    }
    if (trc >= base) {
      throw new Error("A number greater than a base");
    }
    return trc;
  });
  if (rendernum.indexOf(".") != -1) {
    numE = [...rendernum.slice(0, rendernum.indexOf("."))].reverse();
    numF = [...rendernum.slice(rendernum.indexOf(".") + 1)];
    numE.map((e, i) => {
      finale += parseInt(e) * Math.pow(base, i);
    });
    numF.map((e, i) => {
      finale += parseInt(e) * Math.pow(base, -(i + 1));
    });
  } else {
    numE = [...rendernum].reverse();
    numE.map((e, i) => {
      finale += parseInt(e) * Math.pow(base, i);
    });
  }
  return finale;
}

function transferBase(num: string | number, baseOfNum: number, baseTo: number) {
  if (typeof num == "number") {
    num = num.toString();
  }
  return codag(decodage(num, baseOfNum), baseTo);
}

// cours 2 : mathematical calculations in base

type op = "+" | "-" | "*" | "/";

function calculation(
  num1: number | string,
  base1: number,
  num2: number | string,
  base2: number,
  op: op,
  basefin: number
) {
  if (typeof num1 == "number") {
    num1 = num1.toString();
  }
  if (typeof num2 == "number") {
    num2 = num2.toString();
  }
  let numDec1 = decodage(num1, base1);
  let numDec2 = decodage(num2, base2);
  let result: number;
  switch (op) {
    case "+":
      result = numDec1 + numDec2;
      break;
    case "-":
      result = numDec1 - numDec2;
      break;
    case "*":
      result = numDec1 * numDec2;
      break;
    case "/":
      if (numDec2 == 0) {
        throw new Error("We cannot divide by 0");
      }
      result = numDec1 / numDec2;
      break;
  }
  return codag(result, basefin);
}

// coues 3 : SVA, CP1, CP2

function toSVA(num: number | string, base: number, numOfBit: number | string) {
  let chekbit = numOfBit.toString().match(/[.]/g)?.length || 0;
  if (chekbit > 0) {
    throw new Error("The number of bits should not have a fractional part");
  }
  if (typeof numOfBit == "string") {
    numOfBit = parseInt(transferBase(numOfBit, 10, 10));
  }
  if (numOfBit < 2) {
    throw new Error("The number of bits should greater then 2");
  }
  const reang = Math.pow(2, numOfBit - 1) - 1;
  if (typeof num == "number") {
    num = num.toString();
  }
  let chek = num.match(/[.]/g)?.length || 0;
  if (chek > 0) {
    throw new Error("The number should not have a fractional part");
  }
  let positiv: string;
  let ispositiv: boolean;
  if (num[0] == "-") {
    positiv = [...num].splice(1).join("");
    ispositiv = false;
  } else {
    positiv = num;
    ispositiv = true;
  }
  let numDec = decodage(positiv, base);
  if (numDec > reang) {
    throw new Error("over flow");
  }
  let numbin = codag(numDec, 2);
  if (ispositiv) {
    return [
      "0",
      ...Array(numOfBit - 1 - numbin.length)
        .fill(0)
        .join(""),
      ...numbin,
    ].join("");
  } else {
    return [
      "1",
      ...Array(numOfBit - 1 - numbin.length)
        .fill(0)
        .join(""),
      ...numbin,
    ].join("");
  }
}

function toCP1(num: number | string, base: number, numOfBit: number | string) {
  let chekbit = numOfBit.toString().match(/[.]/g)?.length || 0;
  if (chekbit > 0) {
    throw new Error("The number of bits should not have a fractional part");
  }
  if (typeof numOfBit == "string") {
    numOfBit = parseInt(transferBase(numOfBit, 10, 10));
  }
  if (numOfBit < 2) {
    throw new Error("The number of bits should greater then 2");
  }
  const reang = Math.pow(2, numOfBit - 1) - 1;
  if (typeof num == "number") {
    num = num.toString();
  }
  let chek = num.match(/[.]/g)?.length || 0;
  if (chek > 0) {
    throw new Error("The number should not have a fractional part");
  }
  let positiv: string;
  let ispositiv: boolean;
  if (num[0] == "-") {
    positiv = [...num].splice(1).join("");
    ispositiv = false;
  } else {
    positiv = num;
    ispositiv = true;
  }
  let numDec = decodage(positiv, base);
  if (numDec > reang) {
    throw new Error("over flow");
  }
  let numbin = codag(numDec, 2);
  if (ispositiv) {
    return [
      "0",
      ...Array(numOfBit - numbin.length - 1).fill(0),
      ...numbin,
    ].join("");
  } else {
    return ["0", ...Array(numOfBit - numbin.length - 1).fill(0), ...numbin]
      .map((e) => {
        if (e == "0") {
          return "1";
        } else {
          return "0";
        }
      })
      .join("");
  }
}

function toCP2(num: number | string, base: number, numOfBit: number | string) {
  let chekbit = numOfBit.toString().match(/[.]/g)?.length || 0;
  if (chekbit > 0) {
    throw new Error("The number of bits should not have a fractional part");
  }
  if (typeof numOfBit == "string") {
    numOfBit = parseInt(transferBase(numOfBit, 10, 10));
  }
  if (numOfBit < 2) {
    throw new Error("The number of bits should greater then 2");
  }
  const reang = Math.pow(2, numOfBit - 1);
  if (typeof num == "number") {
    num = num.toString();
  }
  let chek = num.match(/[.]/g)?.length || 0;
  if (chek > 0) {
    throw new Error("The number should not have a fractional part");
  }
  let positiv: string;
  let ispositiv: boolean;
  if (num[0] == "-") {
    positiv = [...num].splice(1).join("");
    ispositiv = false;
  } else {
    positiv = num;
    ispositiv = true;
  }
  let numDec = decodage(positiv, base);
  if (numDec > reang) {
    throw new Error("over flow");
  }
  try {
    if (ispositiv) {
      return toCP1(num, base, numOfBit);
    } else {
      return calculation(toCP1(num, base, numOfBit), 2, 1, 2, "+", 2);
    }
  } catch (eror) {
    if (ispositiv) {
      throw new Error("over flow");
    }
    return ["1", ...Array(numOfBit - 1).fill(0)].join("");
  }
}

// coues 4 : vFix, vSimpl, vDouble

function vcodag(num: number, base: number, numAF: number) {
  if (base <= 1 || base > 16) {
    throw new Error("The base is not in the field of 2 16");
  }
  if (num < 0) {
    throw new Error("The number must be positive");
  }
  let resultE = [];
  let resultF = [];
  let i = 0;
  let numE = Math.floor(num);
  let numF = num - numE;
  while (numE != 0) {
    resultE.push(numE % base);
    numE = Math.floor(numE / base);
  }
  while (numF * base != 0 && i <= numAF) {
    resultF.push(Math.floor(numF * base));
    numF = numF * base - Math.floor(numF * base);
    i++;
  }
  resultE = resultE.reverse();
  let result: (number | string)[] = [];
  if (resultF.length != 0) {
    result = [...resultE, ".", ...resultF];
  } else {
    result = [...resultE];
  }
  result = result.map((e) => {
    switch (e) {
      case 10:
        return "A";
      case 11:
        return "B";
      case 12:
        return "C";
      case 13:
        return "D";
      case 14:
        return "E";
      case 15:
        return "F";
      default:
        return e;
    }
  });
  return result.join("");
}

function toVFix(
  num: string | number,
  base: number,
  numOfBE: number | string,
  numOfBF: number | string
) {
  let chekbit1 = numOfBE.toString().match(/[.]/g)?.length || 0;
  let chekbit2 = numOfBE.toString().match(/[.]/g)?.length || 0;
  if (chekbit1 > 0 || chekbit2 > 0) {
    throw new Error("The number of bits should not have a fractional part");
  }
  if (typeof numOfBE == "string") {
    numOfBE = parseInt(transferBase(numOfBE, 10, 10));
  }
  if (typeof numOfBF == "string") {
    numOfBF = parseInt(transferBase(numOfBF, 10, 10));
  }
  if (numOfBE < 2 || numOfBF < 2) {
    throw new Error("The number of bits should greater then 2");
  }
  if (typeof num == "number") {
    num = num.toString();
  }
  let positiv: string;
  let ispositiv: boolean;
  if (num[0] == "-") {
    positiv = [...num].splice(1).join("");
    ispositiv = false;
  } else {
    positiv = num;
    ispositiv = true;
  }
  let numbin = vcodag(
    parseFloat(transferBaseWGB_3(positiv, base, 10)),
    2,
    numOfBF - 1
  );
  let pE,
    pF: string[] = [];
  if (positiv.indexOf(".") != -1) {
    pE = [...numbin.slice(0, numbin.indexOf("."))];
    pF = [...numbin.slice(numbin.indexOf(".") + 1)];
  } else {
    pE = [...numbin];
  }
  if (pE.length > numOfBE || pF.length > numOfBF) {
    throw new Error("over flow");
  }
  if (ispositiv) {
    return [
      "0",
      "|",
      ...Array(numOfBE - pE.length).fill(0),
      ...pE,
      "|",
      ...pF,
      ...Array(numOfBF - pF.length).fill(0),
    ].join("");
  } else {
    return [
      "1",
      "|",
      ...Array(numOfBE - pE.length).fill(0),
      ...pE,
      "|",
      ...pF,
      ...Array(numOfBF - pF.length).fill(0),
    ].join("");
  }
}

function toVSimpl(num: string | number, base: number) {
  if (typeof num == "number") {
    num = num.toString();
  }
  let positiv: string;
  let ispositiv: boolean;
  if (num[0] == "-") {
    positiv = [...num].splice(1).join("");
    ispositiv = false;
  } else {
    positiv = num;
    ispositiv = true;
  }
  let numbin = vcodag(parseFloat(transferBaseWGB_3(positiv, base, 10)), 2, 23);
  if (numbin.indexOf("1") == -1) {
    return ["0", "|", ..."0".repeat(8), "|", ..."0".repeat(23)].join("");
  }
  let onePos = numbin.indexOf("1");
  let poiPos = numbin.indexOf(".");
  let E: number;
  let M: (string | number)[] = [];
  if (onePos < poiPos) {
    E = poiPos - onePos - 1;
    M = [...numbin.slice(onePos + 1, poiPos), ...numbin.slice(poiPos + 1)];
  } else {
    E = -onePos;
    M = [...numbin.slice(onePos + 1)];
  }
  let Efin = codag(E + 127, 2);
  if (M.length > 23) {
    M = M.slice(0, 23);
  } else if (M.length < 23) {
    M = [...M, ...Array(23 - M.length).fill(0)];
  }
  if (ispositiv) {
    return [
      "0",
      "|",
      ...Array(8 - Efin.length).fill(0),
      ...Efin,
      "|",
      ...M,
    ].join("");
  } else {
    return [
      "1",
      "|",
      ...Array(8 - Efin.length).fill(0),
      ...Efin,
      "|",
      ...M,
    ].join("");
  }
}

function toVDouble(num: string | number, base: number) {
  if (typeof num == "number") {
    num = num.toString();
  }
  let positiv: string;
  let ispositiv: boolean;
  if (num[0] == "-") {
    positiv = [...num].splice(1).join("");
    ispositiv = false;
  } else {
    positiv = num;
    ispositiv = true;
  }
  let numbin = vcodag(parseFloat(transferBaseWGB_3(positiv, base, 10)), 2, 52);
  if (numbin.indexOf("1") == -1) {
    return ["0", "|", ..."0".repeat(11), "|", ..."0".repeat(52)].join("");
  }
  let onePos = numbin.indexOf("1");
  let poiPos = numbin.indexOf(".");
  let E: number;
  let M: (string | number)[] = [];
  if (onePos < poiPos) {
    E = poiPos - onePos - 1;
    M = [...numbin.slice(onePos + 1, poiPos), ...numbin.slice(poiPos + 1)];
  } else {
    E = -onePos;
    M = [...numbin.slice(onePos + 1)];
  }
  let Efin = codag(E + 1023, 2);
  if (M.length > 52) {
    M = M.slice(0, 52);
  } else if (M.length <= 52) {
    M = [...M, ...Array(52 - M.length).fill(0)];
  }
  if (ispositiv) {
    return [
      "0",
      "|",
      ...Array(11 - Efin.length).fill(0),
      ...Efin,
      "|",
      ...M,
    ].join("");
  } else {
    return [
      "1",
      "|",
      ...Array(11 - Efin.length).fill(0),
      ...Efin,
      "|",
      ...M,
    ].join("");
  }
}

type sing = "0" | "1";

function frVFix(
  sing: sing,
  pE: string | number,
  pF: string | number,
  base: base
) {
  if (typeof pE == "number") {
    pE = pE.toString();
  }
  if (typeof pF == "number") {
    pF = pF.toString();
  }
  [...pE, ...pF].forEach((e) => {
    if (!(e == "0" || e == "1")) {
      throw new Error("Inputs must be base 2 only ");
    }
  });
  if (sing == "0") {
    return transferBaseWGB_3([...pE, ".", ...pF].join(""), 2, base);
  } else {
    return [
      "-",
      ...transferBaseWGB_3([...pE, ".", ...pF].join(""), 2, base),
    ].join("");
  }
}

function frVSimpl(
  sing: sing,
  Efin: string | number,
  M: string | number,
  base: base
) {
  if (typeof Efin == "number") {
    Efin = Efin.toString();
  }
  if (typeof M == "number") {
    M = M.toString();
  }
  if (Efin.length > 8) {
    throw new Error("The Exposant part must be less than 8");
  }
  if (M.length > 23) {
    throw new Error("The Exposant part must be less than 23");
  }
  [...Efin, ...M].forEach((e) => {
    if (!(e == "0" || e == "1")) {
      throw new Error("Inputs must be base 2 only");
    }
  });
  let E = decodage(Efin, 2) - 127;
  let num: string;
  if (E >= 0) {
    num = ["1", ...M.slice(0, E), ".", ...M.slice(E)].join("");
  } else {
    num = ["0.", ...Array(E * -1 - 1), "1", ...M].join("");
  }
  if (sing == "0") {
    return [...transferBaseWGB_3(num, 2, base)].join("");
  } else {
    return ["-", ...transferBaseWGB_3(num, 2, base)].join("");
  }
}

function frVDouble(
  sing: sing,
  Efin: string | number,
  M: string | number,
  base: base
) {
  if (typeof Efin == "number") {
    Efin = Efin.toString();
  }
  if (typeof M == "number") {
    M = M.toString();
  }
  if (Efin.length > 11) {
    throw new Error("The Exposant part must be less than 11");
  }
  if (M.length > 52) {
    throw new Error("The Exposant part must be less than 52");
  }
  [...Efin, ...M].forEach((e) => {
    if (!(e == "0" || e == "1")) {
      throw new Error("Inputs must be base 2 only");
    }
  });
  let E = decodage(Efin, 2) - 1023;
  let num: string;
  if (E >= 0) {
    num = ["1", ...M.slice(0, E), ".", ...M.slice(E)].join("");
  } else {
    num = ["0.", ...Array(E * -1 - 1), "1", ...M].join("");
  }
  if (sing == "0") {
    return [...transferBaseWGB_3(num, 2, base)].join("");
  } else {
    return ["-", ...transferBaseWGB_3(num, 2, base)].join("");
  }
}

// coues 5 end : gray , BCD , BCD+3

function toGray(num: number | string, base: number) {
  let numbin = transferBase(num, base, 2);
  let chek = numbin.match(/[.]/g)?.length || 0;
  if (chek > 0) {
    throw new Error("The number should not have a fractional part");
  }
  if (num == 0) {
    return "0";
  }
  let result: string[] = [];
  [...numbin].forEach((e, i) => {
    if (i == 0) {
      result.push(e);
      return;
    }
    if (e == numbin[i - 1]) {
      result.push("0");
    } else {
      result.push("1");
    }
  });
  return result.join("");
}

function frGray(num: number | string, base: number) {
  if (typeof num == "number") {
    num = num.toString();
  }
  if (num[0] == "-") {
    throw new Error("The number must be positive");
  }
  let chek = num.match(/[.]/g)?.length || 0;
  if (chek > 0) {
    throw new Error("The number should not have a fractional part");
  }
  if (num == "0") {
    return "0";
  }
  [...num].forEach((e) => {
    if (!(e == "0" || e == "1")) {
      throw new Error("Inputs must be base Gray");
    }
  });
  num = num.slice(num.indexOf("1"));
  let result: string[] = [];
  [...num].forEach((e, i) => {
    if (i == 0) {
      result.push(e);
      return;
    }
    if (e == result[i - 1]) {
      result.push("0");
    } else {
      result.push("1");
    }
  });
  return transferBase(result.join(""), 2, base);
}

function toBCD(num: number | string, base: number) {
  let numDec = transferBase(num, base, 10);
  let chek = numDec.match(/[.]/g)?.length || 0;
  if (chek > 1) {
    throw new Error("number not correct");
  }
  if (num == 0) {
    return "0";
  }
  while (chek == 1 && numDec[numDec.length - 1] == "0") {
    numDec = numDec.slice(0, -1);
  }
  let result: string[] = [];
  [...numDec].forEach((e) => {
    if (e == ".") {
      result.push(".");
      return;
    }
    let eDec = codag(parseInt(e), 2);
    result.push(...Array(4 - eDec.length).fill(0), ...eDec);
  });
  return result.join("");
}

function frBCD(num: number | string, base: number) {
  if (typeof num == "number") {
    num = num.toString();
  }
  if (num[0] == "-") {
    throw new Error("The number must be positive");
  }
  let chek = num.match(/[.]/g)?.length || 0;
  if (chek > 1) {
    throw new Error("number not correct");
  }
  if (num == "0") {
    return "0";
  }
  [...num].forEach((e) => {
    if (!(e == "0" || e == "1" || e == ".")) {
      throw new Error("Inputs must be base BCD");
    }
  });
  let poiPos = num.indexOf(".");
  let pE: string[] = [],
    pEfin: any = [],
    pFfin: any = [],
    pF: string[] = [];
  if (poiPos == -1) {
    pE = [...num];
    if (pE.length % 4 != 0) {
      throw new Error("Inputs must be base BCD");
    }
    for (let i = 0; i < pE.length; i += 4) {
      if (decodage([...pE.slice(i, i + 4)].join(""), 2) > 9) {
        throw new Error("Inputs must be base BCD");
      }
      pEfin = [...pEfin, decodage([...pE.slice(i, i + 4)].join(""), 2)];
    }
    return transferBase([...pEfin].join(""), 10, base);
  } else {
    pE = [...num.slice(0, num.indexOf("."))];
    pF = [...num.slice(num.indexOf(".") + 1)];
    if (pE.length % 4 != 0 || pF.length % 4 != 0) {
      throw new Error("Inputs must be base BCD");
    }
    for (let i = 0; i < pE.length; i += 4) {
      if (decodage([...pE.slice(i, i + 4)].join(""), 2) > 9) {
        throw new Error("Inputs must be base BCD");
      }
      pEfin = [...pEfin, decodage([...pE.slice(i, i + 4)].join(""), 2)];
    }
    for (let i = 0; i < pF.length; i += 4) {
      if (decodage([...pF.slice(i, i + 4)].join(""), 2) > 9) {
        throw new Error("Inputs must be base BCD");
      }
      pFfin = [...pFfin, decodage([...pF.slice(i, i + 4)].join(""), 2)];
    }
    return transferBase([...pEfin, ".", ...pFfin].join(""), 10, base);
  }
}

function toBCD_3(num: number | string, base: number) {
  let numDec = transferBase(num, base, 10);
  let chek = numDec.match(/[.]/g)?.length || 0;
  if (chek > 1) {
    throw new Error("number not correct");
  }
  if (num == 0) {
    return "0";
  }
  while (chek == 1 && numDec[numDec.length - 1] == "0") {
    numDec = numDec.slice(0, -1);
  }
  let result: string[] = [];
  [...numDec].forEach((e) => {
    if (e == ".") {
      result.push(".");
      return;
    }
    let eDec = codag(parseInt(e) + 3, 2);
    result.push(...Array(4 - eDec.length).fill(0), ...eDec);
  });
  return result.join("");
}

function frBCD_3(num: number | string, base: number) {
  if (typeof num == "number") {
    num = num.toString();
  }
  if (num[0] == "-") {
    throw new Error("The number must be positive");
  }
  let chek = num.match(/[.]/g)?.length || 0;
  if (chek > 1) {
    throw new Error("number not correct");
  }
  if (num == "0") {
    return "0";
  }
  [...num].forEach((e) => {
    if (!(e == "0" || e == "1" || e == ".")) {
      throw new Error("Inputs must be base BCD");
    }
  });
  let poiPos = num.indexOf(".");
  let pE: string[] = [],
    pEfin: any = [],
    pFfin: any = [],
    pF: string[] = [];
  if (poiPos == -1) {
    pE = [...num];
    if (pE.length % 4 != 0) {
      throw new Error("Inputs must be base BCD+3");
    }
    for (let i = 0; i < pE.length; i += 4) {
      if (
        decodage([...pE.slice(i, i + 4)].join(""), 2) > 12 ||
        decodage([...pE.slice(i, i + 4)].join(""), 2) < 3
      ) {
        throw new Error("Inputs must be base BCD+3");
      }
      pEfin = [...pEfin, decodage([...pE.slice(i, i + 4)].join(""), 2) - 3];
    }
    return transferBase([...pEfin].join(""), 10, base);
  } else {
    pE = [...num.slice(0, num.indexOf("."))];
    pF = [...num.slice(num.indexOf(".") + 1)];
    if (pE.length % 4 != 0 || pF.length % 4 != 0) {
      throw new Error("Inputs must be base BCD+3");
    }
    for (let i = 0; i < pE.length; i += 4) {
      if (
        decodage([...pE.slice(i, i + 4)].join(""), 2) > 12 ||
        decodage([...pE.slice(i, i + 4)].join(""), 2) < 3
      ) {
        throw new Error("Inputs must be base BCD+3");
      }
      pEfin = [...pEfin, decodage([...pE.slice(i, i + 4)].join(""), 2) - 3];
    }
    for (let i = 0; i < pF.length; i += 4) {
      if (
        decodage([...pF.slice(i, i + 4)].join(""), 2) > 12 ||
        decodage([...pF.slice(i, i + 4)].join(""), 2) < 3
      ) {
        throw new Error("Inputs must be base BCD+3");
      }
      pFfin = [...pFfin, decodage([...pF.slice(i, i + 4)].join(""), 2) - 3];
    }
    return transferBase([...pEfin, ".", ...pFfin].join(""), 10, base);
  }
}

type base = number | "gray" | "BCD" | "BCD+3";

function transferBaseWGB_3(
  num: string | number,
  baseOfNum: base,
  baseTo: base
) {
  if (typeof num == "number") {
    num = num.toString();
  }
  let numin: string, numto: string;
  switch (baseOfNum) {
    case "gray":
      numin = frGray(num, 10);
      break;
    case "BCD":
      numin = frBCD(num, 10);
      break;
    case "BCD+3":
      numin = frBCD_3(num, 10);
      break;
    default:
      numin = decodage(num, baseOfNum).toString();
      break;
  }
  switch (baseTo) {
    case "gray":
      numto = toGray(numin, 10);
      break;
    case "BCD":
      numto = toBCD(numin, 10);
      break;
    case "BCD+3":
      numto = toBCD_3(numin, 10);
      break;
    default:
      numto = codag(parseFloat(numin), baseTo);
      break;
  }
  return numto;
}

function calculationWGB_3(
  num1: number | string,
  base1: base,
  num2: number | string,
  base2: base,
  op: op,
  basefin: base
) {
  if (typeof num1 == "number") {
    num1 = num1.toString();
  }
  if (typeof num2 == "number") {
    num2 = num2.toString();
  }
  let numDec1 = parseFloat(transferBaseWGB_3(num1, base1, 10));
  let numDec2 = parseFloat(transferBaseWGB_3(num2, base2, 10));
  let result: number;
  switch (op) {
    case "+":
      result = numDec1 + numDec2;
      break;
    case "-":
      result = numDec1 - numDec2;
      break;
    case "*":
      result = numDec1 * numDec2;
      break;
    case "/":
      if (numDec2 == 0) {
        throw new Error("We cannot divide by 0");
      }
      result = numDec1 / numDec2;
      break;
  }
  return transferBaseWGB_3(result, 10, basefin);
}

//Made by Assem Abdeljali Bouchekifa
