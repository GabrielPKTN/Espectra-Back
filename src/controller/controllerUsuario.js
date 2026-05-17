/***********************************************************************************************
 * Objetivo: Arquivo da camada de controle responsável pela validação
 * de dados da tabela de usuário do banco de dados.
 * Data: 12/05/2026
 * Autores: Gabriel Lacerda Correia
 * Versão: 1.0
 **********************************************************************************************/

const usuarioDAO = require('../model/DAO/usuario.js')
const defaultMessages = require('./module/defaultMessages.js')

const JWT = require('../middleware/middlewareJWT.js')

const azure = require('../external/azureUpload.js')

// getUsuario
const getUsuario = async (id) => {

    MESSAGES = JSON.parse(JSON.stringify(defaultMessages))

    try {
        
        if(!isNaN(id) && id > 0 && id != "" && id != null) {

            result = await usuarioDAO.getUsuario(id)

            if(result) {

                if (result == 404) {
                    return MESSAGES.ERROR_NOT_FOUND //404
                } else {

                    MESSAGES.DEFAULT_HEADER.status      = MESSAGES.SUCCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.message     = MESSAGES.SUCCESS_REQUEST.message
                    MESSAGES.DEFAULT_HEADER.items       = result
                    
                    return MESSAGES.DEFAULT_HEADER //200

                }

            } else {
                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
            }

        } else {
            return MESSAGES.ERROR_REQUIRED_FIELDS //400
        }

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }

}

// getHomeUsuario
const getHomeUsuario = async (id) => {

    MESSAGES = JSON.parse(JSON.stringify(defaultMessages))

    try {
        
        if(!isNaN(id) && id > 0 && id != "" && id != null) {

            result = await usuarioDAO.getHomeUsuario(id)

            if(result) {

                if (result == 404) {
                    return MESSAGES.ERROR_NOT_FOUND //404
                } else {

                    MESSAGES.DEFAULT_HEADER.status      = MESSAGES.SUCCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.message     = MESSAGES.SUCCESS_REQUEST.message
                    MESSAGES.DEFAULT_HEADER.items       = result
                    
                    return MESSAGES.DEFAULT_HEADER //200

                }

            } else {
                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
            }

        } else {
            return MESSAGES.ERROR_REQUIRED_FIELDS //400
        }

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }

}

// getRedefinicaoSenha
const getRedefinicaoSenha = async (email) => {

    MESSAGES = JSON.parse(JSON.stringify(defaultMessages))

    try {
        
        if(isNaN(email) && email.length > 0 && email != "" && email != null) {

            result = await usuarioDAO.getRedefinicaoSenha(email)

            if(result) {

                if (result == 404) {
                    return MESSAGES.ERROR_NOT_FOUND //404
                } else {

                    MESSAGES.DEFAULT_HEADER.status      = MESSAGES.SUCCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.message     = MESSAGES.SUCCESS_REQUEST.message
                    delete MESSAGES.DEFAULT_HEADER.items
                    
                    return MESSAGES.SUCCESS_REQUEST //200

                }

            } else {
                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
            }

        } else {
            return MESSAGES.ERROR_REQUIRED_FIELDS //400
        }

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }

}

// getUsuarioLogin
const getUsuarioLogin = async (dados, contentType) => {

    MESSAGES = JSON.parse(JSON.stringify(defaultMessages))

    try {

        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            if(isNaN(dados.email) && dados.email.length > 0 && dados.email != "" && dados.email != null) {

                if(isNaN(dados.senha) && dados.senha.length > 0 && dados.senha != "" && dados.senha != null) {

                    result = await usuarioDAO.getUsuarioLogin(dados.email, dados.senha)

                    if(result) {

                        if (result == 404) {
                            return MESSAGES.ERROR_NOT_FOUND //404
                        } else {

                            // Gera o token
                            let tokenUser = await JWT.createJWT(result.id)

                            MESSAGES.DEFAULT_HEADER.status      = MESSAGES.SUCCESS_REQUEST.status
                            MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                            MESSAGES.DEFAULT_HEADER.message     = MESSAGES.SUCCESS_REQUEST.message
                            //Adiciona o token no item retornado
                            MESSAGES.DEFAULT_HEADER.token       = tokenUser
                            MESSAGES.DEFAULT_HEADER.items       = result
                            
                            return MESSAGES.DEFAULT_HEADER //200

                        }

                    } else {
                        return MESSAGES.ERROR_INTERNAL_SERVER_MODEL
                    }

                } else {
                    return MESSAGES.ERROR_REQUIRED_FIELDS //400
                }

            } else {
                return MESSAGES.ERROR_REQUIRED_FIELDS //400
            }

        } else {
            return MESSAGES.ERROR_CONTENT_TYPE //415
        }

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }

}

// postUsuario
const postUsuario = async (usuario, contentType) => {

    MESSAGES = JSON.parse(JSON.stringify(defaultMessages))

    try {
        
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            const validar = validateUserPost(usuario)

            if(!validar) {

                result = await usuarioDAO.postUsuario(usuario)

                if(result) {

                    if (result == 409) {
                        return MESSAGES.ERROR_CONFLICT //409
                    } else if (result == 404) {
                        return MESSAGES.ERROR_NOT_FOUND //404
                    } else {

                        // Gera o token
                        let tokenUser = await JWT.createJWT(result.id)

                        MESSAGES.DEFAULT_HEADER.status      = MESSAGES.SUCCESS_CREATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_CREATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message     = MESSAGES.SUCCESS_CREATED_ITEM.message
                        //Adiciona o token no item retornado
                        MESSAGES.DEFAULT_HEADER.token       = tokenUser
                        MESSAGES.DEFAULT_HEADER.items       = result

                        return MESSAGES.DEFAULT_HEADER //201

                    }

                } else {
                    return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
                }

            } else {
                return validar //400 
            }

        } else {
            
            return MESSAGES.ERROR_CONTENT_TYPE //415

        }

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }

}

// updateUsuario
const updateUsuario = async (id, usuario, contentType, foto) => {

    MESSAGES = JSON.parse(JSON.stringify(defaultMessages))

    try {
        
        if (String(contentType).toUpperCase().startsWith('MULTIPART/FORM-DATA')) {

            if(!isNaN(id) && id > 0 && id != "" && id != null) {

                validar = validateUserUpdate(usuario)

                if(!validar) {

                    if(foto) {

                        const picData = {

                            originalName: foto.originalname,
                            buffer: foto.buffer,
                            size: foto.size,
                            mimetype: foto.mimetype

                        }

                        const fotoUrl = await azure.uploadAzure(picData)

                        usuario.foto = fotoUrl

                    } 

                    result = await usuarioDAO.updateUsuario(id, usuario)

                    if(result) {

                        if (result == 404) {
                            return MESSAGES.ERROR_NOT_FOUND //404
                        } else if (result == 409) {
                            return MESSAGES.ERROR_CONFLICT
                        } else {
                            
                            MESSAGES.DEFAULT_HEADER.status      = MESSAGES.SUCCESS_UPDATE_ITEM.status
                            MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_UPDATE_ITEM.status_code
                            MESSAGES.DEFAULT_HEADER.message     = MESSAGES.SUCCESS_UPDATE_ITEM.message
                            MESSAGES.DEFAULT_HEADER.items       = result

                            return MESSAGES.DEFAULT_HEADER //200

                        }

                    } else {
                        return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
                    }

                } else {
                    return validar //400
                }

            } else {
                return MESSAGES.ERROR_REQUIRED_FIELDS //400
            }

        } else {
            return MESSAGES.ERROR_CONTENT_TYPE //415
        }

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }

}

// updateUsuarioSenha
const updateUsuarioSenha = async (dados, contentType) => {
    

    MESSAGES = JSON.parse(JSON.stringify(defaultMessages))
    
    try {
        
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
            
            if(!isNaN(dados.id) && dados.id > 0 && dados.id != "" && dados.id != null) {
                
                if(isNaN(dados.senha) && dados.senha.length > 0 && dados.senha != "" && dados.senha != null) {
                    
                    result = await usuarioDAO.updateUsuarioSenha(dados.id, dados.senha)
                    
                    if(result) {

                        if(result == 404) {

                            return MESSAGES.ERROR_NOT_FOUND //404

                        } else {

                            MESSAGES.DEFAULT_HEADER.status      = MESSAGES.SUCCESS_UPDATE_ITEM.status
                            MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_UPDATE_ITEM.status_code
                            MESSAGES.DEFAULT_HEADER.message     = MESSAGES.SUCCESS_UPDATE_ITEM.message
                            MESSAGES.DEFAULT_HEADER.items       = result

                            return MESSAGES.DEFAULT_HEADER //200

                        }

                    } else {
                        return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
                    }

                } else {
                    return MESSAGES.ERROR_REQUIRED_FIELDS //400
                }

            } else {
                return MESSAGES.ERROR_REQUIRED_FIELDS //400
            }


        } else {
            return MESSAGES.ERROR_CONTENT_TYPE //415
        }

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }

}

// deleteUsuario
const deleteUsuario = async (dados, contentType) => {

    MESSAGES = JSON.parse(JSON.stringify(defaultMessages))

    try {

        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {


            if(!isNaN(dados.id) && dados.id > 0 && dados.id != "" && dados.id != null) {

                if(isNaN(dados.senha) && dados.senha.length > 0 && dados.senha != "" && dados.senha != null) {

                    result = await usuarioDAO.deleteUsuario(dados.id, dados.senha)

                    if(result) {

                        if(result == 404) {
                            return MESSAGES.ERROR_NOT_FOUND //404
                        } else if(result == 401) {
                            return MESSAGES.ERROR_NON_AUTHORIZED //401
                        } else if(result == 207) {
                            return MESSAGES.ERROR_MULTI_STATUS //207
                        } else {

                            MESSAGES.DEFAULT_HEADER.status      = MESSAGES.SUCCESS_DELETE.status
                            MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_DELETE.status_code
                            MESSAGES.DEFAULT_HEADER.message     = MESSAGES.SUCCESS_DELETE.message
                            delete MESSAGES.DEFAULT_HEADER.items

                            return MESSAGES.DEFAULT_HEADER //200

                        }

                    } else {
                        return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
                    }

                } else {
                    return MESSAGES.ERROR_REQUIRED_FIELDS //400
                }

            } else {
                return MESSAGES.ERROR_REQUIRED_FIELDS //400
            }

        } else {
            return MESSAGES.ERROR_CONTENT_TYPE //415
        }

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }

}

const validateUserPost = (usuario) => {

    if(!usuario.nome || usuario.nome.trim().length === 0) {

        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [NOME INCORRETO]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if(!usuario.email || usuario.email.trim().length === 0) {

        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [EMAIL INCORRETO]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if(!usuario.senha || usuario.senha.trim().length === 0) {

        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [SENHA INCORRETO]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if(!usuario.data_nascimento || usuario.data_nascimento.trim().length === 0) {

        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [DATA DE NASCIMENTO INCORRETO]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if(!usuario.telefone || usuario.telefone.trim().length === 0) {

        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [TELEFONE INCORRETO]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if(isNaN(usuario.id_tipo_usuario) || usuario.id_tipo_usuario <= 0) {

        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [ID TIPO USUARIO INCORRETO]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else {
        return false
    }

}

const validateUserUpdate = (usuario) => {

    if(!usuario.nome || usuario.nome.trim().length === 0) {

        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [NOME INCORRETO]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if(!usuario.email || usuario.email.trim().length === 0) {

        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [EMAIL INCORRETO]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if(!usuario.data_nascimento || usuario.data_nascimento.trim().length === 0) {

        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [DATA DE NASCIMENTO INCORRETO]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if(!usuario.telefone || usuario.telefone.trim().length === 0) {

        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [TELEFONE INCORRETO]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else {
        return false
    }

}

module.exports = {

    getUsuario,
    getHomeUsuario,
    getRedefinicaoSenha,
    updateUsuarioSenha,
    getUsuarioLogin,
    postUsuario,
    updateUsuario,
    deleteUsuario

}