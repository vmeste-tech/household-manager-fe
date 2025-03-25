/**
 * OpenAPI definition
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: v0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

import ApiClient from '../ApiClient';

/**
 * The DebtDto model module.
 * @module model/DebtDto
 * @version v0
 */
class DebtDto {
    /**
     * Constructs a new <code>DebtDto</code>.
     * @alias module:model/DebtDto
     */
    constructor() { 
        
        DebtDto.initialize(this);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj) { 
    }

    /**
     * Constructs a <code>DebtDto</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/DebtDto} obj Optional instance to populate.
     * @return {module:model/DebtDto} The populated <code>DebtDto</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new DebtDto();

            if (data.hasOwnProperty('id')) {
                obj['id'] = ApiClient.convertToType(data['id'], 'String');
            }
            if (data.hasOwnProperty('debtor')) {
                obj['debtor'] = ApiClient.convertToType(data['debtor'], 'String');
            }
            if (data.hasOwnProperty('creditor')) {
                obj['creditor'] = ApiClient.convertToType(data['creditor'], 'String');
            }
            if (data.hasOwnProperty('amount')) {
                obj['amount'] = ApiClient.convertToType(data['amount'], 'Number');
            }
            if (data.hasOwnProperty('status')) {
                obj['status'] = ApiClient.convertToType(data['status'], 'String');
            }
            if (data.hasOwnProperty('period')) {
                obj['period'] = ApiClient.convertToType(data['period'], 'Number');
            }
        }
        return obj;
    }

    /**
     * Validates the JSON data with respect to <code>DebtDto</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>DebtDto</code>.
     */
    static validateJSON(data) {
        // ensure the json data is a string
        if (data['id'] && !(typeof data['id'] === 'string' || data['id'] instanceof String)) {
            throw new Error("Expected the field `id` to be a primitive type in the JSON string but got " + data['id']);
        }
        // ensure the json data is a string
        if (data['debtor'] && !(typeof data['debtor'] === 'string' || data['debtor'] instanceof String)) {
            throw new Error("Expected the field `debtor` to be a primitive type in the JSON string but got " + data['debtor']);
        }
        // ensure the json data is a string
        if (data['creditor'] && !(typeof data['creditor'] === 'string' || data['creditor'] instanceof String)) {
            throw new Error("Expected the field `creditor` to be a primitive type in the JSON string but got " + data['creditor']);
        }
        // ensure the json data is a string
        if (data['status'] && !(typeof data['status'] === 'string' || data['status'] instanceof String)) {
            throw new Error("Expected the field `status` to be a primitive type in the JSON string but got " + data['status']);
        }

        return true;
    }


}



/**
 * @member {String} id
 */
DebtDto.prototype['id'] = undefined;

/**
 * @member {String} debtor
 */
DebtDto.prototype['debtor'] = undefined;

/**
 * @member {String} creditor
 */
DebtDto.prototype['creditor'] = undefined;

/**
 * @member {Number} amount
 */
DebtDto.prototype['amount'] = undefined;

/**
 * @member {module:model/DebtDto.StatusEnum} status
 */
DebtDto.prototype['status'] = undefined;

/**
 * @member {Number} period
 */
DebtDto.prototype['period'] = undefined;





/**
 * Allowed values for the <code>status</code> property.
 * @enum {String}
 * @readonly
 */
DebtDto['StatusEnum'] = {

    /**
     * value: "PAID"
     * @const
     */
    "PAID": "PAID",

    /**
     * value: "UNPAID"
     * @const
     */
    "UNPAID": "UNPAID"
};



export default DebtDto;

