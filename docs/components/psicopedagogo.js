const login = require("../internal/psicopedagogo/login");

module.exports = {
    psicopedagogo: {
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
                "example": "Julia Nogueira Silva"
            },
            "data_nascimento": {
                "type": "string",
                "description": "birth_date",
                "example": "1977-10-24"
            },
            "telefone": {
                "type": "string",
                "description": "phone_number",
                "example": "(11) 91245-5476"
            },
             "email": {
                "type": "string",
                "description": "email",
                "example": "julianogueira77@gmail.com"
            },
             "senha": {
                "type": "string",
                "description": "password",
                "example": "Ju_10-77"
            }
        }
    },
    psicopedagogoGet: {
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
                "example": "Julia Nogueira Silva"
            },
            "data_nascimento": {
                "type": "string",
                "description": "birth_date",
                "example": "1977-10-24"
            },
            "telefone": {
                "type": "string",
                "description": "phone_number",
                "example": "(11) 91245-5476"
            },
             "email": {
                "type": "string",
                "description": "email",
                "example": "julianogueira77@gmail.com"
            },
             "senha": {
                "type": "string",
                "description": "password",
                "example": "Ju_10-77"
            },
            "pacientes": {
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
            "id_psicopedagogo": {
                "type": "int",
                "description": "id",
                "example": 1
            }
        }
    },
    psicopedagogoCreate: {
        type: 'object',
        properties: {
            "nome": {
                "type": "string",
                "description": "name",
                "example": "Julia Nogueira Silva"
            },
            "data_nascimento": {
                "type": "string",
                "description": "birth_date",
                "example": "1977-10-24"
            },
            "telefone": {
                "type": "string",
                "description": "phone_number",
                "example": "(11) 91245-5476"
            },
             "email": {
                "type": "string",
                "description": "email",
                "example": "julianogueira77@gmail.com"
            },
             "senha": {
                "type": "string",
                "description": "password",
                "example": "Ju_10-77"
            }
        }
    }
}