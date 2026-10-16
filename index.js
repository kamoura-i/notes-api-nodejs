import http from 'http';

const notes = [
    {
        id: 1,
        title: "Apologia de Socrates",
        content: "É um livro em que vemos Socrates sendo julgado por cerca de 500 pessoas e sendo acusado de corromper a juventude"
    },
        {
        id: 2,
        title: "Confissões de Santo Agostinho",
        content: "Agostinho narra sua infância, sua juventude tumultuada em Cartago, a busca intelectual através do maniqueísmo e da filosofia"
    },
        {
        id: 3,
        title: "O Hobbit",
        content: "É um livro sobre fantasia em que temos, como protagonista, Biblo Bolseiro, um Hobbit. Nessa Histórias vemos as aventuras de Biblo com Gandalf e os Anãos"
    },
]

let proximoId = 4;


const server = http.createServer((req, res) =>{
    if(req.method === 'GET' && req.url === "/notes"){
        return res.end(JSON.stringify(notes))
    }


    if(req.method === 'GET' && req.url.startsWith("/notes/")){
        const partes = req.url.split('/')
        const id = Number(partes[2])

        const note = notes.find((note) => note.id === id)

        if(!note){
            res.writeHead(404,{
                'Content-Type': 'application/json'
            })

            return res.end(
                JSON.stringify({
                    'mensagem': 'Nota não encontrada'
                })
            )
        }
        res.writeHead(200,{
            'Content-Type': 'application/json'
        })
        res.end(JSON.stringify(note))



    }

    if(req.method === 'POST' && req.url === '/notes'){
        let body = ''
        req.on('data', (chunk) => {
            body+=chunk
        })

        req.on('end', () =>{
            const dados = JSON.parse(body)

            const newNote = {
                id: proximoId,
                title: dados.title,
                content: dados.content
            }
             proximoId++

            notes.push(newNote)

            res.writeHead(201, {
             'Content-Type': 'application/json'
            })

            res.end(JSON.stringify({
                'mensagem': 'Nota criada com sucesso!'
            }))
        })

    }

    if(req.method === 'DELETE' &&  req.url.startsWith('/notes/')){
        const partes = req.url.split('/')
        const id = Number(partes[2])
        const indice = notes.findIndex((note) => note.id === id)

        if(indice === -1) {
        res.writeHead(404,{
            "Content-Type": "application/json"
        })

        return res.end(
            JSON.stringify({
            mensagem: "Nota não encontrada"
            })
        ) 
        }
        
        notes.splice(indice, 1)


        res.writeHead(200, {
            'Content-Type': 'application/json'
            })

        res.end(JSON.stringify({
            'mensagem': 'Nota excluída com sucesso!'
            }))



    }

    if(req.method === 'PATCH' && req.url.startsWith('/notes/')){
        const partes = req.url.split('/')
        const id = Number(partes[2])
        const note = notes.find((note) => note.id === id)

        let body = ''

        req.on('data',(chunk) =>{
            body+=chunk
        })

        req.on('end', () => {
            const dados = JSON.parse(body)
            
            if(!note){
                res.writeHead(404, {
                    'Content-Type': 'application/json'
                })

                return res.end(JSON.stringify({
                    'mensagem': 'Anotação não encontrada'
                }))
            }

            if(dados.title !== undefined){
                note.title = dados.title
            }
            if(dados.content !== undefined){
                note.content = dados.content
            }

            res.writeHead(200, {
                'Content-Type': 'application/json'
            })

            res.end(JSON.stringify({
                'mensagem': 'Anotação atualizada!'
            }))
        }
        )
    }
})


server.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});


