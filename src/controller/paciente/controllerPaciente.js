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

