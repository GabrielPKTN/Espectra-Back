const { login } = require("./psicopedagogo");

module.exports = {
    responsavel: {
        type: 'object',
        properties: {
            "id": {
                "type": "int",
                "description": "id",
                "example": 1
            },
            "nome": {
                "type": "string",
                "description": "name",
                "example": "Nicolas dos Santos Durão"
            },
            "data_nascimento": {
                "type": "string",
                "description": "birth_date",
                "example": "2008-06-16"
            },
            "telefone": {
                "type": "string",
                "description": "telephone",
                "example": "(11) 11111-1111"
            },
            "email": {
                "type": "string",
                "description": "email",
                "example": "seuemail@gmai.com"
            },
            "senha": {
                "type": "string",
                "description": "password",
                "example": "senha1234@"
            }
        }
    },
    responsavelGet: {
        type: 'object',
        properties: {
             "id": {
                "type": "int",
                "description": "id",
                "example": 1
            },
            "nome": {
                "type": "string",
                "description": "name",
                "example": "Nicolas dos Santos Durão"
            },
            "data_nascimento": {
                "type": "string",
                "description": "birth_date",
                "example": "2008-06-16"
            },
            "telefone": {
                "type": "string",
                "description": "telephone",
                "example": "(11) 11111-1111"
            },
            "email": {
                "type": "string",
                "description": "email",
                "example": "seuemail@gmail.com"
            },
            "senha": {
                "type": "string",
                "description": "password",
                "example": "senha1234@"
            },
            "paciente": {
                "type": "array",
                "items": {
                    $ref: "#/components/schemas/paciente"
                }
            }
        }
    },
    login: {
        type: 'object',
          properties: {
            "id_responsavel": {
                "type": "int",
                "description": "id",
                "example": 1
            }
        }
    },
    responsavelCreate: {
        type: 'object',
        properties: {
            "nome": {
                "type": "string",
                "description": "name",
                "example": "Nicolas dos Santos Durao"
            },
            "data_nascimento": {
                "type": "string",
                "description": "birth_date",
                "example": "2008-06-16"
            },
            "telefone": {
                "type": "string",
                "description": "telephone",
                "example": "(11) 11111-1111"
            },
             "email": {
                "type": "string",
                "description": "email",
                "example": "seuemail@gmail.com"
            },
             "senha": {
                "type": "string",
                "description": "password",
                "example": "senha1234@"
            }
        }
    }
}