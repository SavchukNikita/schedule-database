const groups = [
  {id: 1, name: 'B77880', col: 34, idNaprt: 1},
  {id: 2, name: 'B78900', col: 12, idNaprt: 1},
  {id: 3, name: 'N7890-d', col: 38, idNaprt: 2},
  {id: 4, name: 'M76789D', col: 22, idNaprt: 3},
  {id: 5, name: 'V546533', col: 30, idNaprt: 4},
]

const plan = [
  {prepod: 1, type: 'Лекция', name: 'BD', dis: 1, group: 1, col: 34}, 
  {prepod: 2, type: 'Практика', name: 'BDыф', dis: 2, group: 1, col: 34},
  {prepod: 2, type: 'Лекция', name: 'BDыф', dis: 2, group: 1, col: 34},
  {prepod: 2, type: 'Лекция', name: 'BDыф', dis: 2, group: 2, col: 12},
  {prepod: 2, type: 'Практика', name: 'BDыф', dis: 2, group: 2, col: 12},
  {prepod: 3, type: 'Лекция', name: 'BDыыыф', dis: 4, group: 2, col: 12},
  {prepod: 1, type: 'Лекция', name: 'BD', dis: 1, group: 3, col: 38},
  {prepod: 3, type: 'Практика', name: 'BDыф', dis: 3, group: 3, col: 38},
  {prepod: 4, type: 'Лекция', name: 'BыывDыф', dis: 4, group: 3, col: 38},
  {prepod: 1, type: 'Лекция', name: 'BD', dis: 1, group: 4, col: 22},
  {prepod: 2, type: 'Практика', name: 'BDыф', dis: 1, group: 4, col: 22},
  {prepod: 2, type: 'Лекция', name: 'BDыф', dis: 1, group: 4, col: 22},
  {prepod: 4, type: 'Лекция', name: 'ййййBD', dis: 5, group: 5, col: 30},
  {prepod: 4, type: 'Практика', name: 'выфBDыф', dis: 4, group: 5, col: 30},
  {prepod: 2, type: 'Лекция', name: 'BDыф', dis: 1, group: 5, col: 30},
]

const auditoria = [
  {num: '432', type: 'Компьютерный класс', maxCol:50},
  {num: '2', type: 'Компьютерный класс', maxCol:50},
  {num: '4', type: 'Лекционная', maxCol:50},
  {num: '432в', type: 'Лекционная', maxCol:50},
  {num: '41', type: 'Лекционная', maxCol:50},
  {num: '1', type: 'Компьютерный класс', maxCol:50},
]

let i = 0;

let rasp = {};

while (i < plan.length) {
  let lesson = plan[i];

  let j = null;
  let checkCount = 0;

  while (j == null && checkCount < auditoria.length) {
    lesson.auditoria = getAuditoria(lesson.type, lesson.col, checkCount);
    j = checkLesson(lesson);

    // console.log('J = ' + j);
    // console.log('checkcount = '+ checkCount);
    // console.log('lesson = ' + lesson);

    checkCount++;
  }

  if (j == null) {
    console.log('Нет места для ' + lesson);
  } else {
    if (rasp.hasOwnProperty(j)) {
      rasp[j].push(lesson);
    } else {
      rasp[j] = [];
      rasp[j].push(lesson);
    }
  }

  i++;
}



console.log(rasp);


function checkLesson(lesson) {
  let j = 0;

  if (!Object.keys(rasp).length) {
    return j;
  }

  for (let key in rasp) {
    let count = 0;

    for(let i = 0; i < rasp[key].length; i++) {
      if (rasp[key][i].group == lesson.group || rasp[key][i].prepod == lesson.prepod || rasp[key][i].auditoria == lesson.auditoria) {
        break;
      }

      count++
    }

    if (count == rasp[key].length) {
      return j
    }

    j++;
  }

  if (j < 48) return j++

  return null;
}




function getAuditoria(type, col, startCount) {
  let num = null;

  for (let i = startCount; i < auditoria.length; i++) {
    if (validationAuditoriaType(auditoria[i].type) == type && auditoria[i].maxCol >= col) {
      num = auditoria[i].num;
      break;
    }
  }

  return num;
}

function validationAuditoriaType(type) {
  switch (type) {
    case 'Компьютерный класс':
      return 'Практика'
    case 'Лекционная':
      return 'Лекция'
  }
}


