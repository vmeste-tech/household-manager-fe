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
 * The GetUserResponse model module.
 * @module model/GetUserResponse
 * @version v0
 */
class GetUserResponse {
    /**
     * Constructs a new <code>GetUserResponse</code>.
     * @alias module:model/GetUserResponse
     * @param id {String} 
     * @param firstName {String} 
     * @param lastName {String} 
     * @param status {module:model/GetUserResponse.StatusEnum} 
     */
    constructor(id, firstName, lastName, status) { 
        
        GetUserResponse.initialize(this, id, firstName, lastName, status);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, id, firstName, lastName, status) { 
        obj['id'] = id;
        obj['firstName'] = firstName;
        obj['lastName'] = lastName;
        obj['status'] = status;
    }

    /**
     * Constructs a <code>GetUserResponse</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/GetUserResponse} obj Optional instance to populate.
     * @return {module:model/GetUserResponse} The populated <code>GetUserResponse</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new GetUserResponse();

            if (data.hasOwnProperty('id')) {
                obj['id'] = ApiClient.convertToType(data['id'], 'String');
            }
            if (data.hasOwnProperty('email')) {
                obj['email'] = ApiClient.convertToType(data['email'], 'String');
            }
            if (data.hasOwnProperty('firstName')) {
                obj['firstName'] = ApiClient.convertToType(data['firstName'], 'String');
            }
            if (data.hasOwnProperty('lastName')) {
                obj['lastName'] = ApiClient.convertToType(data['lastName'], 'String');
            }
            if (data.hasOwnProperty('profilePictureUrl')) {
                obj['profilePictureUrl'] = ApiClient.convertToType(data['profilePictureUrl'], 'String');
            }
            if (data.hasOwnProperty('createdAt')) {
                obj['createdAt'] = ApiClient.convertToType(data['createdAt'], 'Date');
            }
            if (data.hasOwnProperty('status')) {
                obj['status'] = ApiClient.convertToType(data['status'], 'String');
            }
        }
        return obj;
    }

    /**
     * Validates the JSON data with respect to <code>GetUserResponse</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>GetUserResponse</code>.
     */
    static validateJSON(data) {
        // check to make sure all required properties are present in the JSON string
        for (const property of GetUserResponse.RequiredProperties) {
            if (!data.hasOwnProperty(property)) {
                throw new Error("The required field `" + property + "` is not found in the JSON data: " + JSON.stringify(data));
            }
        }
        // ensure the json data is a string
        if (data['id'] && !(typeof data['id'] === 'string' || data['id'] instanceof String)) {
            throw new Error("Expected the field `id` to be a primitive type in the JSON string but got " + data['id']);
        }
        // ensure the json data is a string
        if (data['email'] && !(typeof data['email'] === 'string' || data['email'] instanceof String)) {
            throw new Error("Expected the field `email` to be a primitive type in the JSON string but got " + data['email']);
        }
        // ensure the json data is a string
        if (data['firstName'] && !(typeof data['firstName'] === 'string' || data['firstName'] instanceof String)) {
            throw new Error("Expected the field `firstName` to be a primitive type in the JSON string but got " + data['firstName']);
        }
        // ensure the json data is a string
        if (data['lastName'] && !(typeof data['lastName'] === 'string' || data['lastName'] instanceof String)) {
            throw new Error("Expected the field `lastName` to be a primitive type in the JSON string but got " + data['lastName']);
        }
        // ensure the json data is a string
        if (data['profilePictureUrl'] && !(typeof data['profilePictureUrl'] === 'string' || data['profilePictureUrl'] instanceof String)) {
            throw new Error("Expected the field `profilePictureUrl` to be a primitive type in the JSON string but got " + data['profilePictureUrl']);
        }
        // ensure the json data is a string
        if (data['status'] && !(typeof data['status'] === 'string' || data['status'] instanceof String)) {
            throw new Error("Expected the field `status` to be a primitive type in the JSON string but got " + data['status']);
        }

        return true;
    }


}

GetUserResponse.RequiredProperties = ["id", "firstName", "lastName", "status"];

/**
 * @member {String} id
 */
GetUserResponse.prototype['id'] = undefined;

/**
 * @member {String} email
 */
GetUserResponse.prototype['email'] = undefined;

/**
 * @member {String} firstName
 */
GetUserResponse.prototype['firstName'] = undefined;

/**
 * @member {String} lastName
 */
GetUserResponse.prototype['lastName'] = undefined;

/**
 * @member {String} profilePictureUrl
 */
GetUserResponse.prototype['profilePictureUrl'] = undefined;

/**
 * @member {Date} createdAt
 */
GetUserResponse.prototype['createdAt'] = undefined;

/**
 * @member {module:model/GetUserResponse.StatusEnum} status
 */
GetUserResponse.prototype['status'] = undefined;





/**
 * Allowed values for the <code>status</code> property.
 * @enum {String}
 * @readonly
 */
GetUserResponse['StatusEnum'] = {

    /**
     * value: "ACTIVE"
     * @const
     */
    "ACTIVE": "ACTIVE",

    /**
     * value: "AWAY"
     * @const
     */
    "AWAY": "AWAY",

    /**
     * value: "SICK"
     * @const
     */
    "SICK": "SICK"
};



export default GetUserResponse;

