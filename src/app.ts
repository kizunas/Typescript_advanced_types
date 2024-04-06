// 交差型＝複数の型を結合するときに使われる型
type Admin = {
  name: string;
  privileges: string[];
}

type Employee = {
  name: string;
  startDate: Date; // Date型はtypescriptがサポートしている型
}

type ElevatedEmploee = Admin & Employee; // アンパサンド(&)で結合させる（交差型）

// interfaceを使って同じこともできるが以下は継承を使って同じコードをつくってみる
// interface Admin {
//   name: string;
//   privileges: string[];
// }

// interface Employee {
//   name: string;
//   startDate: Date; // Date型はtypescriptがサポートしている型
// }

// interface ElevatedEmploee extends Admin,Employee {};

const e1: ElevatedEmploee = {
  name: 'Max',
  privileges: ['create-server'],
  startDate: new Date(), // new Dateは現在の日時を作成するもの
}

type Combinable = string | number;
type Numeric = number | boolean;
type Universal = Combinable & Numeric; // 交差型にすると共通部分が型となる（今回はnumber型）

