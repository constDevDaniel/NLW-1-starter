//arquivo responsável por fazer as configurações do servidor e rotas da aplicação

const express = require('express') // importando o modulo/pasta express como retorno da var express
const server = express() // instanciando o arquivo express.js, na qual tem as seguintes funções: route, router, req, res

//AGORA NOSSA APLICAÇÃO TEM ACESSO AO ARQUIVO DE BANCO DE DADOS:
const db = require('./database/db')

// ligando o servidor na porta 3000
server.listen(3000)

// configurar pasta public (onde contem o css e o javascript)
server.use(express.static('public'))


//habilitar o resquest body na nossa aplicação
server.use(express.urlencoded({ extended: true }))


// utilizando template engine nunjucks
const nunjucks = require('nunjucks')
nunjucks.configure('src/views', {
    express: server, // informando o express como servidor
    noCache: true // desativando o cache do NJK
})

// configurar rota da aplicação
// rota da pagina inicial
server.get('/', (req, res) => {
    return res.render('index.html', { title: 'um titulo' }) // renderizando o html
})

server.get('/create-point', (req, res) => {
    //req.query recupera o valor enviado
    return res.render('create-point.html')
})

server.post('/savepoint', (req, res) => { //rota de envio dos dados do usuario
    //tendo acesso aos dados que o usuario enviou
    // console.log(req.body);

    //inserindo dados no banco de dados
    const query = `
    INSERT INTO places (
    name,
    image,
    adress,
    adress2,
    state,
    city,
    items
    ) VALUES (?,?,?,?,?,?,?);
    `

    const values = [
        req.body.name,
        req.body.image,
        req.body.adress,
        req.body.adress2,
        req.body.state,
        req.body.city,
        req.body.items
    ]

    function afterInsertData(err) { //depois de inserir os dados
        if (err) {
            console.log(err)
            return res.send('erro no cadastro !')
        }
        console.log('cadastrado com sucesso');
        console.log(this);

        return res.render('create-point.html', { saved: true })
    }
    db.run(query, values, afterInsertData) //inserção de dados
})


server.get('/search', (req, res) => {
    // trazendo do banco de dados os locais com SELECT
    const search = req.query.search

    if (search == '') {
        //caso a pesquisa seja vazia
        return res.render('search-results.html', { total: 0 })
    }

    db.all(` SELECT * FROM places WHERE city LIKE '%${search}%'`, function (err, rows) {
        if (err) {
            return console.log(err)
        }


        const total = rows.length // quantidade de registros (tamanho do array de registros)

        //mostrar a pagina html com os dados do banco
        //places: tabela do banco de dados, rows: ARRAY de registros do banco de dados
        return res.render('search-results.html', {places: rows, total: total})
    })
})
