module.exports = {
    psicopedagogo: {
        type: 'object',
        properties: {
            "id": {
                "type": "int",
                "description": "id",
                "example": 1
            },
            "foto": {
                "type": "string",
                "description": "photo",
                "example": "http://azure.blob.img"
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
            "foto": {
                "type": "string",
                "description": "photo",
                "example": "http://azure.blob.img"
            },
            "nome": {
                "type": "string",
                "description": "name",
                "example": "Julia Nogueira Silva"
            },
            "pacientes": {
                "type": "array",
                "items": {
                    $ref: "#/components/schemas/pacienteGet"
                }
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
    },

    //Get para o array de paciente
    pacienteGetPsicopedagogo: {
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
            "telefone": {
                "type": "string",
                "description": "phone_number",
                "example": "(11) 91245-5476"
            },
        }
    }
}