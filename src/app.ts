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

type Combinable = string | number; // type guardはunion型を使う時に便利（どの型が変数や定数に入っているかを知りたいときに使う）
type Numeric = number | boolean;
type Universal = Combinable & Numeric; // 交差型にすると共通部分が型となる（今回はnumber型）

function add(a: Combinable, b: Combinable) {
  if (typeof a === 'string' || typeof b === 'string') { // type guard(型に応じて実行する処理を切り替える)
    return a.toString() + b.toString(); 
  }
  return a + b;
}

type UnknownEmployee = Employee | Admin;

function printEmployeeInformation(emp: UnknownEmployee) {
  console.log(emp.name);
  if ('privileges' in emp) { // type guard(inを用いてemp内にprivilegesがあるかを調べている。)
    console.log('privileges' + emp.privileges); // Adminにしかprivilegesはないためエラーになる。
  }
  if ('startDate' in emp) {
    console.log('start Date' + emp.startDate);
  }
}

printEmployeeInformation(e1)

class Car {
  drive() {
    console.log("運転中...");
  }
}

class Truck {
  drive() {
    console.log("トラックを運転中...");
  }

  loadCargo(amount: number) {
    console.log("荷物を載せています..." + amount);
  }
}

type Vehicle = Car | Truck;

const v1 = new Car();
const v2 = new Truck();

function useVehicle(vehicle: Vehicle) {
  vehicle.drive();
  if (vehicle instanceof Truck) { // classで用いているときにinstanceofを使える(普通に'loadCargo' in Vehicleとしてもよい)
    vehicle.loadCargo(1000);
  }
}

useVehicle(v1);
useVehicle(v2);





