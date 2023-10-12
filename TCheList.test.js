// Пример использования TCheList.

var GLangBase = new TCheList();
GLangBase.add('entrance', 'Вход');
GLangBase.add('exit', 'Выход');

console.log(GLangBase.values('entrance'));
console.log(GLangBase.values(0));

console.log(GLangBase.delete('entrance'));
//console.log(GLangBase.delete(0));

console.log(GLangBase.values('entrance'));
console.log(GLangBase.values(0));

console.log('EXIT = ' + GLangBase.values('EXIT', true));
console.log('EXIT = ' + GLangBase.values('EXIT', false));
console.log('exit = ' + GLangBase.values('exit', true));
console.log('exIt = ' + GLangBase.values('exIt', false));
