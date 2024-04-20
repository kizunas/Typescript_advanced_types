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


function add(a: number, b: number): number; // function overload(関数オーバーロード)。TypeScriptの構文で引数がnumberの場合、返り値もnumberであることを伝える。末尾にセミコロン(;)をつけることが推奨されている。
function add(a: string, b: string): string;
function add(a: string, b: number): string;
function add(a: number, b: string): string;
function add(a: Combinable, b: Combinable) {
  if (typeof a === 'string' || typeof b === 'string') { // type guard(型に応じて実行する処理を切り替える)
    return a.toString() + b.toString(); 
  }
  return a + b;
}

// 型推論ではstring | numberと表示される。TypeScriptはこのresultがどちらかなのかわかっていない。
// 上述したfunction overloadのおかげでnumberという型推論が行われている。
const result = add(1, 5);



// type UnknownEmployee = Employee | Admin;

// function printEmployeeInformation(emp: UnknownEmployee) {
//   console.log(emp.name);
//   if ('privileges' in emp) { // type guard(inを用いてemp内にprivilegesがあるかを調べている。)
//     console.log('privileges' + emp.privileges); // Adminにしかprivilegesはないためエラーになる。
//   }
//   if ('startDate' in emp) {
//     console.log('start Date' + emp.startDate);
//   }
// }

// printEmployeeInformation(e1)

// class Car {
//   drive() {
//     console.log("運転中...");
//   }
// }

// class Truck {
//   drive() {
//     console.log("トラックを運転中...");
//   }

//   loadCargo(amount: number) {
//     console.log("荷物を載せています..." + amount);
//   }
// }

// type Vehicle = Car | Truck;

// const v1 = new Car();
// const v2 = new Truck();

// function useVehicle(vehicle: Vehicle) {
//   vehicle.drive();
//   if (vehicle instanceof Truck) { // classで用いているときにinstanceofを使える(普通に'loadCargo' in Vehicleとしてもよい)
//     vehicle.loadCargo(1000);
//   }
// }

// useVehicle(v1);
// useVehicle(v2);

// // Discriminated Unions(判別可能なUnions)
// // unionを使う際にtype gaurdを実装するのを楽にしてくれる。
// // object型を使う時に便利

// interface Bird {
//   type: 'bird' // interfaceは値を持てないのでこれは値ではなくliteral型、すなわちbirdという文字列だけを許容する
//   flyingSpeed: number;
// }

// interface Hourse {
//   type: 'house'
//   runningSpeed: number;
// }

// type Animal = Bird | Hourse;

// function moveAnimal(animal: Animal) {
//   let speed;
//   switch (animal.type) {
//     case 'bird':
//       speed = animal.flyingSpeed;
//       break;
//     case 'house':
//       speed = animal.runningSpeed
//   }
//   console.log("移動速度" + speed);  
// }

// moveAnimal({ type: 'bird', flyingSpeed: 10})

// // 型キャスト
// // Typescriptがある特定の型であるということを明確に推論できない場合に使う
// // const userInputElement = document.getElementById("user-input");
// // 型推論でHTMLElementと表示される。Typescriptはhtmlファイルまで見ないのでinputタグがあるかわかっていない。
// // 型キャストのやりかた
// // 型を伝えたいものの前に<>をつけ中に、指定したい型を記述する。
// // これができるのはtsconfig.json内のlibにDOMを追加しているため
// // const userInputElement = <HTMLInputElement>document.getElementById("user-input")!; // エクスクラメーションマークでnull出ないことを伝える。

// // もう一つの方法（reactを使っている場合<>は違う役割をもつため使えない）
// // 型を伝えたいものの後ろに asと指定したい型を記述する
// // const userInputElement = document.getElementById("user-input")! as HTMLInputElement;

// // エクスクラメーションを使わない場合
// const userInputElement = document.getElementById("user-input")

// if (userInputElement) {
//   (userInputElement as HTMLInputElement).value = 'こんにちは'
// }

// // インデックス型(インデックス型は[]を使って定義する。名前は任意だが型はstringかnumberのみ)
// interface ErrorContainer {
//   [prop: string]: string; // keyの名前はstringであり、valueもstringである必要がある。例として{email: '正しいアドレスではありません。'}のような形
// }

// const errorBag: ErrorContainer = {
//   // keyやvalueがstringであれば問題ない。またプロパティがいくつあっても大丈夫
//   email: '正しいメールアドレスではありません',
//   username: 'ユーザー名に記号を含めることはできません',
// };

