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
 * The ExpenseItemCreateDto model module.
 * @module model/ExpenseItemCreateDto
 * @version v0
 */
class ExpenseItemCreateDto {
    /**
     * Constructs a new <code>ExpenseItemCreateDto</code>.
     * @alias module:model/ExpenseItemCreateDto
     */
    constructor() { 
        
        ExpenseItemCreateDto.initialize(this);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj) { 
    }

    /**
     * Constructs a <code>ExpenseItemCreateDto</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/ExpenseItemCreateDto} obj Optional instance to populate.
     * @return {module:model/ExpenseItemCreateDto} The populated <code>ExpenseItemCreateDto</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new ExpenseItemCreateDto();

            if (data.hasOwnProperty('apartmentId')) {
                obj['apartmentId'] = ApiClient.convertToType(data['apartmentId'], 'String');
            }
            if (data.hasOwnProperty('name')) {
                obj['name'] = ApiClient.convertToType(data['name'], 'String');
            }
            if (data.hasOwnProperty('description')) {
                obj['description'] = ApiClient.convertToType(data['description'], 'String');
            }
        }
        return obj;
    }

    /**
     * Validates the JSON data with respect to <code>ExpenseItemCreateDto</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>ExpenseItemCreateDto</code>.
     */
    static validateJSON(data) {
        // ensure the json data is a string
        if (data['apartmentId'] && !(typeof data['apartmentId'] === 'string' || data['apartmentId'] instanceof String)) {
            throw new Error("Expected the field `apartmentId` to be a primitive type in the JSON string but got " + data['apartmentId']);
        }
        // ensure the json data is a string
        if (data['name'] && !(typeof data['name'] === 'string' || data['name'] instanceof String)) {
            throw new Error("Expected the field `name` to be a primitive type in the JSON string but got " + data['name']);
        }
        // ensure the json data is a string
        if (data['description'] && !(typeof data['description'] === 'string' || data['description'] instanceof String)) {
            throw new Error("Expected the field `description` to be a primitive type in the JSON string but got " + data['description']);
        }

        return true;
    }


}



/**
 * @member {String} apartmentId
 */
ExpenseItemCreateDto.prototype['apartmentId'] = undefined;

/**
 * @member {String} name
 */
ExpenseItemCreateDto.prototype['name'] = undefined;

/**
 * @member {String} description
 */
ExpenseItemCreateDto.prototype['description'] = undefined;






export default ExpenseItemCreateDto;

