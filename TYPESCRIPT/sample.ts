let userMap = new Map<number,string>();
userMap.set(101,"Niti");
userMap.set(102,"Nitin");
userMap.set(103,"Jatin");
console.log(userMap.get(101));
let items = ["laptop","mouse","keyboard"];
for(let item of items){
    console.log("The value " , item);
}
interface users{
id:number;
name:string;
salary:number;
}
let userData : users={
id:101,
name:"Niti",
salary:54545,
}
// react props , state management 

interface Animal {
  name: string;
  sound(): void;
}
class Dog implements Animal {
  constructor(public name: string) {}
  sound() {
    console.log(`${this.name} says: Woof!`);
  }
}
let obj = new Dog("dfdf");
obj.sound();
