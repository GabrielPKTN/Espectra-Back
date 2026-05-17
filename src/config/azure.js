/********************************************************************************
 * Objetivo: Arquivo responsável pela configuração
 * da depêndencia da azure
 * Data: 17/05/2026
 * Autores: Gabriel Lacerda
 * Versão: 1.0
 ********************************************************************************/

const blobService = require('@azure/storage-blob')

const stringConnection = process.env.CONNECTION_STRING_AZURE
const nomeContainer    = process.env.CONTAINER_NAME_AZURE

if (!stringConnection) {
    console.error('A string de conexão do Azure não foi configurada no .env')
} 

// Criação do client Azure
const clientBlobService = blobService.BlobServiceClient.fromConnectionString(stringConnection)

// CLiente específico do container onde os arquivos serão salvos
const clientContainer = clientBlobService.getContainerClient(nomeContainer)

// Função que garante que o container está funcionando
const validarContainer = async () => {

    try {
        
        await clientContainer.createIfNotExists({ access: 'blob' })

    } catch (error) {
        
        console.error('Erro ao criar/verificar container')

    }

}

validarContainer();

module.exports = {
    clientContainer,
    nomeContainer
};