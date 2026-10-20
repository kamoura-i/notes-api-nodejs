import http from 'http';
import { pool } from './database.js';

// const notes = [
//     {
//         id: 1,
//         title: "Apologia de Socrates",
//         content: "É um livro em que vemos Socrates sendo julgado por cerca de 500 pessoas e sendo acusado de corromper a juventude"
//     },
//         {
//         id: 2,
//         title: "Confissões de Santo Agostinho",
//         content: "Agostinho narra sua infância, sua juventude tumultuada em Cartago, a busca intelectual através do maniqueísmo e da filosofia"
//     },
//         {
//         id: 3,
//         title: "O Hobbit",
//         content: "É um livro sobre fantasia em que temos, como protagonista, Biblo Bolseiro, um Hobbit. Nessa Histórias vemos as aventuras de Biblo com Gandalf e os Anãos"
//     },
// ]

let proximoId = 4;


const server = http.createServer( async (req, res) =>{
    if(req.method === 'GET' && req.url === "/notes"){
        try{
            const result = await pool.query('SELECT * FROM notes')

            res.writeHead(200,{
                'Content-Type': 'application/json'
            })
            return res.end(JSON.stringify(result.rows))
        }
        catch(error){
            console.error('Erro ao buscar notas', error.message)

            res.writeHead(500, {
                'Content-Type': 'application/json'
            })

            return res.end(JSON.stringify({
                'mensagem': 'Erro interno do servidor'
            }))
        }
    }


    if(req.method === 'GET' && req.url.startsWith("/notes/")){
        const partes = req.url.split('/')
        const id = Number(partes[2])

        try{
        const result = await pool.query('SELECT * FROM notes WHERE id = $1', [id])
        const note = result.rows[0]
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
       return  res.end(JSON.stringify(note))

        }
        catch(error){
            console.error('Erro ao busca notas', error.message)

            res.writeHead(500,{
                'Content-Type': 'application/json'
            })

            return res.end(JSON.stringify({
                'mensagem': 'Erro interno do servidor'
            }))
        }





    }

    if(req.method === 'POST' && req.url === '/notes'){
        let body = ''
        req.on('data', (chunk) => {
            body+=chunk
        })

        req.on('end', async () =>{
           
            try{
            const dados = JSON.parse(body)
            if(!dados.title || !dados.content){
                res.writeHead(400, {
                    'Content-Type': 'application/json'
                })

                return res.end(JSON.stringify({
                    "mensagem": "Um ou mais dados, estão vazios"
                }))
            }
            
            await pool.query('INSERT INTO notes (title, content) VALUES($1,$2) RETURNING *',[dados.title, dados.content]);
            
            res.writeHead(201, {
             'Content-Type': 'application/json'
            })

            res.end(JSON.stringify({
                'mensagem': 'Nota criada com sucesso!'
            }))
            }
            catch(error){
                console.error('Erro na criação da anotação', error.message)
                res.writeHead(500,{
                    'Content-Type': 'application/json'
                })
                return res.end(JSON.stringify({
                    'mensagem': 'Erro interno do servidor'
                }))
            }
            

        })

    }

    if(req.method === 'DELETE' &&  req.url.startsWith('/notes/')){
        const partes = req.url.split('/')
        const id = Number(partes[2])

        try{
        const result =  await pool.query('DELETE FROM notes WHERE id = $1 RETURNING *', [id])

        if(result.rowCount === 0) {
        res.writeHead(404,{
            "Content-Type": "application/json"
        })

        return res.end(
            JSON.stringify({
            mensagem: "Nota não encontrada"
            })
        ) 
        }
        

        res.writeHead(200, {
            'Content-Type': 'application/json'
            })

        res.end(JSON.stringify({
            'mensagem': 'Nota excluída com sucesso!'
            }))
        } catch(error){
            console.error('Erro ao excluir nota', error.message)

            res.writeHead(500,{
                'Content-Type': 'application/json'
            })

            return res.end(JSON.stringify({
                'mensagem': 'Erro interno do servidor'
            }))            
        }



    }

    if(req.method === 'PATCH' && req.url.startsWith('/notes/')){
        let body = ''
        req.on('data',(chunk) =>{
            body+=chunk
        })

        req.on('end', async () => {

            try{
            const dados = JSON.parse(body)
            
            const result = await pool.query('UPDATE notes SET title = COALESCE($1, title), content = COALESCE($2, content) WHERE id = $3 RETURNING *', [dados.title, dados.content, dados.id])

            
            if(!result.rows[0]){
                res.writeHead(404, {
                    'Content-Type': 'application/json'
                })

                return res.end(JSON.stringify({
                    'mensagem': 'Anotação não encontrada'
                    
                }))
            }


            res.writeHead(200, {
                'Content-Type': 'application/json'
            })

            res.end(JSON.stringify({
                'mensagem': 'Anotação atualizada!'
            }))
            } catch(error){
            console.error('Erro ao atualizar nota', error.message)

            res.writeHead(500,{
                'Content-Type': 'application/json'
            })

            return res.end(JSON.stringify({
                'mensagem': 'Erro interno do servidor'
            }))                    
            }

        }
        )
    }
})


server.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});


