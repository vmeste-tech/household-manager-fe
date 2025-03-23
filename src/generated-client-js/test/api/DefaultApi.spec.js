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
    instance = new OpenApiDefinition.DefaultApi();
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

  describe('DefaultApi', function() {
    describe('addToApartment', function() {
      it('should call addToApartment successfully', function(done) {
        //uncomment below and update the code to test addToApartment
        //instance.addToApartment(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('changePassword', function() {
      it('should call changePassword successfully', function(done) {
        //uncomment below and update the code to test changePassword
        //instance.changePassword(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('createApartment', function() {
      it('should call createApartment successfully', function(done) {
        //uncomment below and update the code to test createApartment
        //instance.createApartment(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('deleteApartment', function() {
      it('should call deleteApartment successfully', function(done) {
        //uncomment below and update the code to test deleteApartment
        //instance.deleteApartment(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('deleteFromApartment', function() {
      it('should call deleteFromApartment successfully', function(done) {
        //uncomment below and update the code to test deleteFromApartment
        //instance.deleteFromApartment(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('findApartmentByUser', function() {
      it('should call findApartmentByUser successfully', function(done) {
        //uncomment below and update the code to test findApartmentByUser
        //instance.findApartmentByUser(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('getApartment', function() {
      it('should call getApartment successfully', function(done) {
        //uncomment below and update the code to test getApartment
        //instance.getApartment(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('getApartmentUsers', function() {
      it('should call getApartmentUsers successfully', function(done) {
        //uncomment below and update the code to test getApartmentUsers
        //instance.getApartmentUsers(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('getUser', function() {
      it('should call getUser successfully', function(done) {
        //uncomment below and update the code to test getUser
        //instance.getUser(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('login', function() {
      it('should call login successfully', function(done) {
        //uncomment below and update the code to test login
        //instance.login(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('refreshToken', function() {
      it('should call refreshToken successfully', function(done) {
        //uncomment below and update the code to test refreshToken
        //instance.refreshToken(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('register', function() {
      it('should call register successfully', function(done) {
        //uncomment below and update the code to test register
        //instance.register(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('updateApartment', function() {
      it('should call updateApartment successfully', function(done) {
        //uncomment below and update the code to test updateApartment
        //instance.updateApartment(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
  });

}));
