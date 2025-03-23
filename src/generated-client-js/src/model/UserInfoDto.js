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
 * The UserInfoDto model module.
 * @module model/UserInfoDto
 * @version v0
 */
class UserInfoDto {
    /**
     * Constructs a new <code>UserInfoDto</code>.
     * @alias module:model/UserInfoDto
     */
    constructor() { 
        
        UserInfoDto.initialize(this);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj) { 
    }

    /**
     * Constructs a <code>UserInfoDto</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/UserInfoDto} obj Optional instance to populate.
     * @return {module:model/UserInfoDto} The populated <code>UserInfoDto</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new UserInfoDto();

            if (data.hasOwnProperty('id')) {
                obj['id'] = ApiClient.convertToType(data['id'], 'String');
            }
            if (data.hasOwnProperty('name')) {
                obj['name'] = ApiClient.convertToType(data['name'], 'String');
            }
            if (data.hasOwnProperty('lastname')) {
                obj['lastname'] = ApiClient.convertToType(data['lastname'], 'String');
            }
            if (data.hasOwnProperty('photoUrl')) {
                obj['photoUrl'] = ApiClient.convertToType(data['photoUrl'], 'String');
            }
            if (data.hasOwnProperty('type')) {
                obj['type'] = ApiClient.convertToType(data['type'], 'String');
            }
            if (data.hasOwnProperty('joinedAt')) {
                obj['joinedAt'] = ApiClient.convertToType(data['joinedAt'], 'Date');
            }
            if (data.hasOwnProperty('status')) {
                obj['status'] = ApiClient.convertToType(data['status'], 'String');
            }
        }
        return obj;
    }

    /**
     * Validates the JSON data with respect to <code>UserInfoDto</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>UserInfoDto</code>.
     */
    static validateJSON(data) {
        // ensure the json data is a string
        if (data['id'] && !(typeof data['id'] === 'string' || data['id'] instanceof String)) {
            throw new Error("Expected the field `id` to be a primitive type in the JSON string but got " + data['id']);
        }
        // ensure the json data is a string
        if (data['name'] && !(typeof data['name'] === 'string' || data['name'] instanceof String)) {
            throw new Error("Expected the field `name` to be a primitive type in the JSON string but got " + data['name']);
        }
        // ensure the json data is a string
        if (data['lastname'] && !(typeof data['lastname'] === 'string' || data['lastname'] instanceof String)) {
            throw new Error("Expected the field `lastname` to be a primitive type in the JSON string but got " + data['lastname']);
        }
        // ensure the json data is a string
        if (data['photoUrl'] && !(typeof data['photoUrl'] === 'string' || data['photoUrl'] instanceof String)) {
            throw new Error("Expected the field `photoUrl` to be a primitive type in the JSON string but got " + data['photoUrl']);
        }
        // ensure the json data is a string
        if (data['type'] && !(typeof data['type'] === 'string' || data['type'] instanceof String)) {
            throw new Error("Expected the field `type` to be a primitive type in the JSON string but got " + data['type']);
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
UserInfoDto.prototype['id'] = undefined;

/**
 * @member {String} name
 */
UserInfoDto.prototype['name'] = undefined;

/**
 * @member {String} lastname
 */
UserInfoDto.prototype['lastname'] = undefined;

/**
 * @member {String} photoUrl
 */
UserInfoDto.prototype['photoUrl'] = undefined;

/**
 * @member {String} type
 */
UserInfoDto.prototype['type'] = undefined;

/**
 * @member {Date} joinedAt
 */
UserInfoDto.prototype['joinedAt'] = undefined;

/**
 * @member {module:model/UserInfoDto.StatusEnum} status
 */
UserInfoDto.prototype['status'] = undefined;





/**
 * Allowed values for the <code>status</code> property.
 * @enum {String}
 * @readonly
 */
UserInfoDto['StatusEnum'] = {

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



export default UserInfoDto;

