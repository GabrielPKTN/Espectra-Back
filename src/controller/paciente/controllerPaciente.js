/***********************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre App e a Model do Paciente
 * Data: 30/04/2026
 * Autores: Enzo Carrilho
 * Versão: 1.0
 **********************************************************************************************/

const patientDAO = require('../../model/DAO/paciente.js')
const defaultMessages = require('../modulo/defaultMessages.js')

const getPatientById = async function(id) {
    let MESSAGES = JSON.parse(JSON.stringify(defaultMessages))

    try {

        if(!isNaN(id) && id != '' && id > 0){
            let resultPatient = await patientDAO.selectPatientById(id)
            
            if(resultPatient){
                const patient = resultPatient.data
                
                if(patient != null){
                    return patient //200

                }else{
                    return MESSAGES.errorNotFound //404
                }

            }else{
                return MESSAGES.errorInternalServer//500
            }

        }else{
            MESSAGES.errorRequiredFields.message += ' [ID Inválido]'
            return MESSAGES.errorRequiredFields //400
        }
        
    } catch (error) {
        return MESSAGES.errorInternalServer //500
    }
}

const getPatientByRegistNumber = async function(registNumber){
    let MESSAGES = JSON.parse(JSON.stringify(defaultMessages))

    try {
        if(!isNaN(registNumber) && registNumber != '' && registNumber.length == 10){
            let resultPatient = await patientDAO.selectPatientByRegistNumber(registNumber)

            if(resultPatient){
                
                if(resultPatient != null && resultPatient.length > 0)
                    return resultPatient[0]
            }else{
               return MESSAGES.errorInternalServer //500
            }

        }else{
            MESSAGES.errorRequiredFields.message += ' [Número de Registro Inválido]' 
            return MESSAGES.errorRequiredFields //400
        }

    } catch (error) {
        return MESSAGES.errorInternalServer //500
    }
}

const setPatient = async function(patient, contentType) {
    let MESSAGES = JSON.parse(JSON.stringify(defaultMessages))

    try {

        if(String(contentType).toUpperCase() == 'APPLICATION/JSON'){
            let validate = await validatePatient(patient)
            
            if(!validate){
                let 
            }
        }
       

    } catch (error) {
         return MESSAGES.errorInternalServer //500
    }
}



const validatePatient = function(patient){
    let MESSAGES = JSON.parse(JSON.stringify(defaultMessages))

    if(patient.nome == '' || patient.nome == null || patient.nome == undefined || patient.nome.length > 150){
        MESSAGES.errorRequiredFields.message += ' [Nome Inválido]' 
        return MESSAGES.errorRequiredFields //400

    }else if(patient.data_nascimento == '' || patient.data_nascimento == null || patient.data_nascimento == undefined || patient.data_nascimento.length != 10){
        MESSAGES.errorRequiredFields.message += ' [Data de nascimento Inválido]' 
        return MESSAGES.errorRequiredFields //400

    }else if(patient.diagnostico.length > 50){
        MESSAGES.errorRequiredFields.message += ' [Diagnóstico Inválido]' 
        return MESSAGES.errorRequiredFields //400

    }else if(patient.foto.length > 255){
        MESSAGES.errorRequiredFields.message += ' [Foto Inválido]' 
        return MESSAGES.errorRequiredFields //400

    }else if(patient.id_serie_escolar <= 0 || isNaN(patient.id_serie_escolar) || patient.id_serie_escolar == '' || patient.id_serie_escolar == null || patient.id_serie_escolar == undefined){
        MESSAGES.errorRequiredFields.message += ' [id_serie_escolar Inválido]' 
        return MESSAGES.errorRequiredFields //400

    }else if(patient.id_grau_suporte <= 0 || isNaN(patient.id_grau_suporte) || patient.id_grau_suporte == '' || patient.id_grau_suporte == null || patient.id_grau_suporte == undefined){
        MESSAGES.errorRequiredFields.message += ' [id_grau_suporte Inválido]' 
        return MESSAGES.errorRequiredFields //400

    }else if(patient.id_responsavel <= 0 || isNaN(patient.id_responsavel) || patient.id_responsavel == '' || patient.id_responsavel== null || patient.id_responsavel == undefined){
        MESSAGES.errorRequiredFields.message += ' [id_responsavel Inválido]' 
        return MESSAGES.errorRequiredFields //400
    }else{
        return false
    }

} 

module.exports = {
    getPatientById,
    getPatientByRegistNumber
}