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

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD.
    define(['expect.js', process.cwd()+'/src/index'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    factory(require('expect.js'), require(process.cwd()+'/src/index'));
  } else {
    // Browser globals (root is window)
    factory(root.expect, root.OpenApiDefinition);
  }
}(this, function(expect, OpenApiDefinition) {
  'use strict';

  var instance;

  beforeEach(function() {
    instance = new OpenApiDefinition.TaskDto();
  });

  var getProperty = function(object, getter, property) {
    // Use getter method if present; otherwise, get the property directly.
    if (typeof object[getter] === 'function')
      return object[getter]();
    else
      return object[property];
  }

  var setProperty = function(object, setter, property, value) {
    // Use setter method if present; otherwise, set the property directly.
    if (typeof object[setter] === 'function')
      object[setter](value);
    else
      object[property] = value;
  }

  describe('TaskDto', function() {
    it('should create an instance of TaskDto', function() {
      // uncomment below and update the code to test TaskDto
      //var instance = new OpenApiDefinition.TaskDto();
      //expect(instance).to.be.a(OpenApiDefinition.TaskDto);
    });

    it('should have the property id (base name: "id")', function() {
      // uncomment below and update the code to test the property id
      //var instance = new OpenApiDefinition.TaskDto();
      //expect(instance).to.be();
    });

    it('should have the property title (base name: "title")', function() {
      // uncomment below and update the code to test the property title
      //var instance = new OpenApiDefinition.TaskDto();
      //expect(instance).to.be();
    });

    it('should have the property description (base name: "description")', function() {
      // uncomment below and update the code to test the property description
      //var instance = new OpenApiDefinition.TaskDto();
      //expect(instance).to.be();
    });

    it('should have the property status (base name: "status")', function() {
      // uncomment below and update the code to test the property status
      //var instance = new OpenApiDefinition.TaskDto();
      //expect(instance).to.be();
    });

    it('should have the property scheduledAt (base name: "scheduledAt")', function() {
      // uncomment below and update the code to test the property scheduledAt
      //var instance = new OpenApiDefinition.TaskDto();
      //expect(instance).to.be();
    });

    it('should have the property apartmentId (base name: "apartmentId")', function() {
      // uncomment below and update the code to test the property apartmentId
      //var instance = new OpenApiDefinition.TaskDto();
      //expect(instance).to.be();
    });

    it('should have the property assignedTo (base name: "assignedTo")', function() {
      // uncomment below and update the code to test the property assignedTo
      //var instance = new OpenApiDefinition.TaskDto();
      //expect(instance).to.be();
    });

    it('should have the property ruleId (base name: "ruleId")', function() {
      // uncomment below and update the code to test the property ruleId
      //var instance = new OpenApiDefinition.TaskDto();
      //expect(instance).to.be();
    });

    it('should have the property isPenaltyCreated (base name: "isPenaltyCreated")', function() {
      // uncomment below and update the code to test the property isPenaltyCreated
      //var instance = new OpenApiDefinition.TaskDto();
      //expect(instance).to.be();
    });

  });

}));
