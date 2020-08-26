// importando o modulo sqlite3
const sqlite3 = require('sqlite3').verbose() // verbose mostra no terminal

// criar um objeto de banco de dados que fara as operações (SELECT, INSERT, UPDATE e DELETE)
const db = new sqlite3.Database('./src/database/database.db')

// informando o tipo de query que executará nossas operações
// serialize = executa um comando inteiro para depois executar o proximo
// parallelize = executa todos ao mesmo tempo utilizando paralelismo

db.serialize(() => {
    db.run(`
    CREATE TABLE IF NOT EXISTS places (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        image TEXT,
        adress TEXT,
        adress2 TEXT,
        state TEXT,
        city TEXT,
        items TEXT
        );
    `)
})
// // inserindo dados na tabela places
// const query = `
//   INSERT INTO places (
//     name,
//     image,
//     adress,
//     adress2,
//     state,
//     city,
//     items
//   ) VALUES (?,?,?,?,?,?,?);
//   `

// //os valores entrarão no array (rows) de objetos
// const values = [
//   'colectoria',
//   '../../public/assets/eletronico.jfif',
//   'Guilherme Gemballa, Jardim America',
//   'Número 260',
//   'Santa Catarina',
//   'Rio do Sul',
//   'Resíduos Eletrônicos, Lâmpadas '
// ]

// function afterInsertData (err) {
//   if (err) {
//     return console.log(err)
//   }
//   console.log('Cadastrando com sucesso')
//   console.log(this)
// }

// // rodando a query de INSERT, com os VALUES, e a callback de erro ou sucesso (afterInsertData):
// db.run(query, values, afterInsertData)

// // consultando os dados de uma tabela
// db.all('SELECT * FROM places', function (err, rows) { //rows armazena cada registro do banco de dados
//   if (err) {
//     return console.log(err)
//   }
// })

// // deletar um dado da tabela
// db.run('DELETE FROM places WHERE id = ?',[1], function (err) {
// if (err) {
//     return console.log(err)
//   }
//   console.log('Registro deletado com sucesso')
// })

// exportando o objeto db
module.exports = db
