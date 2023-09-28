const m2s = require('mongoose-to-swagger');
const User = require('./models/user.model');
const Product = require('./models/product.model');

exports.options = {
    "components": {
        "schemas": {
            User: m2s(User),
            Product: m2s(Product)
        }
    },
    "openapi": "3.1.0",
    "info": {
        "version": "1.0.0",
        "title": "Products CRUD API",
        "description": "Products Project Application",
        "contact": {
            "name": "API Support",
            "url": "https://www.example.com",
            "email": "support@example.com"
        },
    },
    "servers": [
        {
            url: 'http://localhost:3000',
            description: 'Local Server'
        },
        {
            url: "https://www.example.com",
            description: "Testing Server"
        }
    ],
    "tags": [
        {
            "name": "Users",
            "description": "API for users"
        },
        {
            "name": "Products",
            "description": "API for products"
        },
        {
            "name": "Users and Products",
            "description": "API for users and products"
        }
    ],
    "paths": {
        "/api/users": {
            "get": {
                "tags": [
                    "Users"
                ],
                "description": "Returns all users",
                "responses": {
                    "200": {
                        "description": "A list of users.",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/components/schemas/User"
                                    }
                                }
                            }
                        }
                     }
                }
            },
            "post": {
                "tags": [
                    "Users"
                ],
                "description": "Create new user",
                "requestBody": {
                    "description": "User that we want to create",
                    "content": {
                        // "application/x-www--form-urlencoded": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "username": { "type": "string"},
                                    "password": { "type": "string"},
                                    "name": { "type": "string"},
                                    "surname": { "type": "string"},
                                    "email": { "type" : "string"},
                                    "address": {
                                        "type": "object",
                                        "properties": {
                                            "area": {"type": "string"},
                                            "road": {"type": "string"}
                                        }
                                    },
                                    "phone": {
                                        "type": "array",
                                        "items": {
                                            "type": "object",
                                            "properties": {
                                                "type": { "type": "string"},
                                                "number": { "type": "string"}
                                            }
                                        }
                                    }
                                },
                                "required": ["username", "password", "email"]
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "New user is created"
                    },
                    "400": {
                        "description": "Error in user creation"
                    }
                }
            }
        },
        "/api/users/{username}": {
            "get": {
                "tags": [
                    "Users"
                ],
                "parameters": [
                    {
                    "name": "username",
                    "in": "path",
                    "required": true,
                    "description": "Username of user that we want to find",
                    "type": "string"
                    }
                ],
                "description": "Get user with specific username",
                "summary": "Returns a user with specific username",
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/component/schemas/User"
                        }
                    }
                }
            },
            "patch": {
                "tags": [
                    "Users"
                ],
                "description": "Update user",
                "parameters": [
                    {
                        "name": "username",
                        "in": "path",
                        "required": true,
                        "description": "Username of the user to be updated",
                        "type": "string"
                    }
                ],
                "requestBody": {
                    "description": "Data of the updated user",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "username": { "type": "string"},
                                    "password": { "type": "string"},
                                    "name": { "type": "string"},
                                    "surname": { "type": "string"},
                                    "email": { "type" : "string"},
                                    "address": {
                                        "type": "object",
                                        "properties": {
                                            "area": {"type": "string"},
                                            "road": {"type": "string"}
                                        }
                                    },
                                    "phone": {
                                        "type": "array",
                                        "items": {
                                            "type": "object",
                                            "properties": {
                                                "type": { "type": "string"},
                                                "number": { "type": "string"}
                                            }
                                        }
                                    }
                                },
                                "required": ["email"]
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "User update success",
                        "schema": {
                            "$ref": "#/components/schemas/User"
                        }
                    }
                }
            },
            "delete": {
                "tags": [
                    "Users"
                ],
                "description": "Delete user",
                "parameters": [
                    {
                        "name": "username",
                        "in": "path",
                        "description": "Username of user to delete",
                        "schema": {
                            "$ref": "#/components/schemas/User"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Delete a user"
                    }
                }
            }
        },
        "/api/users-products": {
            "get": {
                "tags": [
                    "Users and Products"
                ],
                "summary": "Get all user's products",
                "description": "All user's products",
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "$ref": "#/components/schemas/User"
                        }
                    }
                }
            },
            "post": {
                "tags": [
                    "Users and Products"
                ],
                "description": "Add new product for user",
                "requestBody": {
                    "description": "User that we want to add product",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "username": { "type": "string"},
                                    "products": { 
                                        "type": "array",
                                        "items": {
                                            "type": "object",
                                            "properties": {
                                                "product": { "type": "string"},
                                                "cost": { "type": "number" },
                                                "quantity": { "type": "number"}
                                            }
                                        }
                                    }
                                },
                                "required": ["quantity"]
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "New product is added"
                    }
                }
            }
        },
        "/api/users-products/{username}": {
            "get": {
                "tags": [
                    "Users and products"
                ],
                "parameters": [
                    {
                        "name": "username",
                        "in": "path",
                        "required": true,
                        "description": "User's username to find products",
                        "type": "string"
                    }
                ],
                "description": "Description Text",
                "summary": "Summary Text",
                "responses": {
                    "200": {
                        "description": "User's products",
                        "schema": {
                            "$ref": "#/components/schemas/User"
                        }
                    }
                }
            },
            "patch": {
                "tags": [
                    "Users and Products"
                ],
                "description": "Update User's product",
                "parameters": [
                    {
                        "name": "username",
                        "in": "path",
                        "required": true,
                        "description": "User's username to find products",
                        "type": "string"
                    }
                ],
                "requestBody": {
                    "description": "Description for requestbody",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "username": {"type": "string"},
                                    "product": {
                                        "type": "object",
                                        "properties": {
                                            "_id": {"type": "string"},
                                            "quantity": { "type" : "number"}
                                        }
                                    }
                                },
                                "required": ["quantity"]
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "Description for response"
                    }
                }
            }
        },
        "/api/users-products/{username}/products/{product}": {
            "delete": {
                "tags": [
                    "Users and products"
                ],
                "description": "Delete a user's product",
                "parameters": [
                    {
                        "name": "username",
                        "in": "path",
                        "description": "username to find",
                        "required": true,
                        "type": "string"
                    },
                    {
                        "name": "product",
                        "in": "path",
                        "description": "name of product to delete",
                        "required": true,
                        "type": "string"
                    }
                ],
                "responses": {
                    "200": {
                        "description": "product deleted"
                    }
                }
            }
        }
    }
}