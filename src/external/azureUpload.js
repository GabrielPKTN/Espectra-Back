/********************************************************************************
 * Objetivo: Arquivo responsável pelo upload de fotos para a Azure
 * Data: 17/05/2026
 * Autores: Gabriel Lacerda
 * Versão: 1.0
 ********************************************************************************/

const configAzure = require('../config/azure.js')
const { v4: uuidv4 } = require('uuid')
const path = require('path')

// Responsável por enviar as fotos
const uploadAzure = async (foto) => {

    // Gera um UUID único + extensão original da foto
    const extensao  = path.extname(foto.originalName)
    const nomeUnico = `${uuidv4()}${extensao}`

    // Client do blob com o nome gerado
    const clientBlob = configAzure.clientContainer.getBlockBlobClient(nomeUnico);

    // Realizando upload da foto
    await clientBlob.upload(
        foto.buffer,
        foto.size, 
        {
        blobHTTPHeaders: {
            blobContentType: foto.mimetype
        }
    })

    return clientBlob.url

}

module.exports = {
    uploadAzure
}