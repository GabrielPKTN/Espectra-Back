/********************************************************************************
 * Objetivo: Arquivo responsável pela configuração
 * do middleware do multer
 * Data: 17/05/2026
 * Autores: Gabriel Lacerda
 * Versão: 1.0
 ********************************************************************************/

const multer =          require("multer");
const defaultMessages = require("../controller/module/defaultMessages.js")

MESSAGES = JSON.parse(JSON.stringify(defaultMessages))

//Configuração do multer - 
// responsável por receber os arquivos vindos da requisição
const multerConfig = multer({

    //Armazena na memória para mandar a Azure depois
    storage: multer.memoryStorage(),
    
    //Limites de tamanho de arquivo até 5MB
    limits: {
        fileSize: 5 * 1024 * 1024
    },

    //Filtra o tipo de arquivo permitido
    fileFilter: (req, arquivo, callback) => {

        const tiposPermitidos = [

            'image/jpeg',
            'image/png',
            'image/webp'

        ]

        //Se o tipo do arquivo vindo da requisição estiver na lista, aceita
        if(tiposPermitidos.includes(arquivo.mimetype)) {
            callback(null, true) // null = sem erro, true = aceito
        } else {
            callback(new Error('Tipo de arquivo não permitido.')) // rejeita
        }

    }

})

module.exports = multerConfig;