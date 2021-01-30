const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('../../test');

db.serialize(function() {
  const sql = `SELECT [Учебные группы].*, [Направления подготовки].'Наименование', [Академические группы].'Название'
               FROM [Учебные группы] 
               INNER JOIN [Академические группы] ON ([Академические группы].'Код' = [Учебные группы].[Академическая группа])
               INNER JOIN [Направления подготовки] ON ([Академические группы].[Код направления] = [Направления подготовки].[Код])`;

  const ss = `select * from sqlite_master
              where type = 'table'`;

  db.all(sql, (err, row) => {
    if (err) throw err;

    console.log(row);
  })
})

