/***********************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre App e a Model de Tentativa
 * Data: 07/04/2026
 * Autores: Enzo Carrilho
 * Versão: 1.0
 **********************************************************************************************/

const usuarioDAO = require('../model/DAO/usuario.js')
const defaultMessages = require('../module/defaultMessages.js')

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

// getUsuarioLogin
const getUsuarioLogin = async (email, senha) => {

    MESSAGES = JSON.parse(JSON.stringify(defaultMessages))

    try {
        
        if(isNaN(email) && email.length > 0 && email != "" && email != null) {

            if(isNaN(senha) && senha.length > 0 && senha != "" && senha != null) {

                result = await usuarioDAO.getUsuarioLogin(email, senha)

                if(result) {

                    if (result == 404) {
                        return MESSAGES.ERROR_NOT_FOUND //404
                    } else {
                        
                        MESSAGES.DEFAULT_HEADER.status      = MESSAGES.SUCCESS_REQUEST.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
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

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }

}

// postUsuario
const postUsuario = async (usuario, contentType) => {

    try {
        
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            const validar = validateUserPost(usuario)

            if(validar) {

                result = await usuarioDAO.postUsuario(usuario)

                if(result) {

                    if (result == 409) {
                        return MESSAGES.ERROR_CONFLICT //409
                    } else if (result == 404) {
                        return MESSAGES.ERROR_NOT_FOUND //404
                    } else {

                        MESSAGES.DEFAULT_HEADER.status      = MESSAGES.SUCCESS_CREATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_CREATED_ITEM.status_code
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
const updateUsuario = async (id, usuario, contentType) => {

    MESSAGES = JSON.parse(JSON.stringify(defaultMessages))

    try {
        
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            if(!isNaN(id) && id > 0 && id != "" && id != null) {

                result = usuarioDAO.updateUsuario(id, usuario)

                if(result) {

                    if (result == 404) {
                        return MESSAGES.ERROR_NOT_FOUND //404
                    } else if (result == 409) {
                        return MESSAGES.ERROR_CONFLICT
                    } else {

                        MESSAGES.DEFAULT_HEADER.status      = MESSAGES.SUCCESS_UPDATE_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_UPDATE_ITEM.status_code
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
            return MESSAGES.ERROR_CONTENT_TYPE //415
        }

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }

}

// updateUsuarioSenha
const updateUsuarioSenha = async (id, senha) => {

    try {
        
        if(!isNaN(id) && id > 0 && id != "" && id != null) {

            if(isNaN(senha) && senha.length > 0 && senha != "" && senha != null) {

                result = await usuarioDAO.updateUsuarioSenha(id, senha)

                if(result) {

                    if(result == 404) {

                        return MESSAGES.ERROR_NOT_FOUND //404

                    } else {

                        MESSAGES.DEFAULT_HEADER.status      = MESSAGES.SUCCESS_UPDATE_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_UPDATE_ITEM.status_code
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

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
    }

}

// deleteUsuario
const deleteUsuario = async (id, senha) => {

    try {
        
         if(!isNaN(id) && id > 0 && id != "" && id != null) {

            if(isNaN(senha) && senha.length > 0 && senha != "" && senha != null) {

                result = usuarioDAO.deleteUsuario(id, senha)

                if(result) {

                    if(result == 404) {
                        return MESSAGES.ERROR_NOT_FOUND //404
                    } else if(result == 401) {
                        return MESSAGES.ERROR_NON_AUTHORIZED //401
                    } else {

                        MESSAGES.DEFAULT_HEADER.status      = MESSAGES.SUCCESS_DELETE.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_DELETE.status_code
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

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
    }

}

const validateUserPost = (usuario) => {

    if(isNaN(usuario.nome) && usuario.nome.length > 0 && usuario.nome.trim() != "" && usuario.nome != null) {

        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [NOME INCORRETO]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if(isNaN(usuario.email) && usuario.email.length > 0 && usuario.email.trim() != "" && usuario.email != null) {

        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [EMAIL INCORRETO]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if(isNaN(usuario.senha) && usuario.senha.length > 0 && usuario.senha.trim() != "" && usuario.senha != null) {

        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [SENHA INCORRETO]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if(isNaN(usuario.data_nascimento) && usuario.data_nascimento.length > 0 && usuario.data_nascimento.trim() != "" && usuario.data_nascimento != null) {

        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [DATA DE NASCIMENTO INCORRETO]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if(isNaN(usuario.telefone) && usuario.telefone.length > 0 && usuario.telefone.trim() != "" && usuario.telefone != null) {

        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [TELEFONE INCORRETO]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if(!isNaN(usuario.id_tipo_usuario) && usuario.id_tipo_usuario > 0 && usuario.id_tipo_usuario != "" && usuario.id_tipo_usuario != null) {

        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [ID TIPO USUARIO INCORRETO]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else {
        return false
    }

}

const validateUserUpdate = (usuario) => {

    if(isNaN(usuario.nome) && usuario.nome.length > 0 && usuario.nome.trim() != "" && usuario.nome != null) {

        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [NOME INCORRETO]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if(isNaN(usuario.email) && usuario.email.length > 0 && usuario.email.trim() != "" && usuario.email != null) {

        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [EMAIL INCORRETO]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if(isNaN(usuario.data_nascimento) && usuario.data_nascimento.length > 0 && usuario.data_nascimento.trim() != "" && usuario.data_nascimento != null) {

        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [DATA DE NASCIMENTO INCORRETO]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if(isNaN(usuario.telefone) && usuario.telefone.length > 0 && usuario.telefone.trim() != "" && usuario.telefone != null) {

        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [TELEFONE INCORRETO]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else {
        return false
    }

}